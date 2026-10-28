import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculate,type Answers} from './calculate';
import {interpret,interpretHistorical} from './interpretation';
import {combinationFor,combinationTexts,pairKey} from './interpretationTexts';
import {dimensions} from './dimensions';
import {items} from './items';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Interpretation,ReflectionQuestions} from './ProfileReading';
import {HistoricalReport,CalculationDetails} from './HistoricalReport';

const answers=(means:number[]):Answers=>Object.fromEntries(items.map(i=>[i.id,means[Math.floor((i.id-1)/5)]]));
// Means in 0.2 increments, using five valid integer item responses per field.
function graded(means:number[]):Answers{
 const a:Answers={};
 for(let d=0;d<7;d++){let total=Math.round(means[d]*5);for(let k=1;k<=5;k++){const value=Math.min(4,total);a[d*5+k]=value;total-=value;}}
 return a;
}
const ids=(reading:ReturnType<typeof interpret>)=>reading.highlights.map(h=>h.id).sort();
function wordCount(r:ReturnType<typeof interpret>){return [r.notice,r.scope,r.summary,r.evidence,...r.highlights.map(h=>h.text),r.connection?.text??'',r.synthesis??'',...r.paragraphs,r.editorial].join(' ').trim().split(/\s+/u).length;}

test('no valid data produces no invented profile',()=>{const r=interpret(calculate({}));assert.deepEqual(r.highlights,[]);assert.equal(r.connection,null);assert.match(r.summary,/não há campos/);assert.equal(r.status,'insufficient');});
test('all zero precedes the uniform rule and has no predominant fields',()=>{const r=interpret(calculate(answers([0,0,0,0,0,0,0])));assert.match(r.summary,/itens não foram endossados/);assert.equal(r.status,'zero');assert.deepEqual(r.highlights,[]);assert.equal(r.connection,null);});
test('equal positive means have no clear predominance or arbitrary pair',()=>{const r=interpret(calculate(answers([2,2,2,2,2,2,2])));assert.match(r.summary,/valores próximos nos sete campos, sem uma predominância clara/);assert.equal(r.status,'uniform');assert.equal(r.connection,null);assert.equal(r.questions[0].id,null);});
test('two exactly tied leaders receive an integrated text',()=>{const r=interpret(calculate(answers([1,4,0,4,1,0,0])));assert.deepEqual(ids(r),['C','M']);assert.equal(r.connection?.text,combinationFor('M','C'));assert.equal(r.questions.length,2);});
test('three and four tied leaders are never truncated to two',()=>{for(const means of [[1,4,4,4,2,0,0],[4,4,4,4,2,0,0]]){const r=interpret(calculate(answers(means)));assert.equal(r.highlights.length,means.filter(m=>m===4).length);assert.equal(r.connection,null);assert.ok(r.synthesis);assert.ok(r.questions.length<=3);if(r.highlights.length===4){assert.equal(r.questions[0].id,null);assert.match(r.questionNote!,/evita dar preferência/);}}});
test('two leading positions include all ties at the second position',()=>{const r=interpret(calculate(answers([1,3,0,4,3,0,0])));assert.deepEqual(ids(r),['C','D','M']);assert.equal(r.connection,null);assert.ok(r.synthesis);});
test('boundary 0.2 proximity is inclusive, but 0.4 is not',()=>{const r=interpret(calculate(graded([4,3.8,3.8,2,1,0,0])));assert.deepEqual(ids(r),['A','M','R']);const far=interpret(calculate(graded([4,3.8,3.6,2,1,0,0])));assert.deepEqual(ids(far),['M','R']);});
test('all seven values within 0.2 receive the exact uniform notice',()=>{const r=interpret(calculate(graded([4,3.8,3.8,4,3.8,4,4])));assert.equal(r.status,'uniform');assert.equal(r.summary,'Suas respostas apresentaram valores próximos nos sete campos, sem uma predominância clara nesta aplicação.');});
test('proximity does not change the exact sociopsychogram or formulas',()=>{const data=graded([4,3.8,3.8,2,1,0,0]);const r=calculate(data);const before=JSON.stringify(r);interpret(r);assert.equal(JSON.stringify(r),before);assert.ok(r.sequence?.startsWith('R–(M/A)'));assert.deepEqual(calculate(data),r);});
test('partial data is explicitly limited and a sole valid field is not dominant',()=>{const a=answers([1,2,3,4,1,2,3]);for(const i of items)if(i.dimension!=='C')a[i.id]=null;const r=interpret(calculate(a));assert.match(r.scope,/Perfil incompleto: 1 de 7/);assert.match(r.summary,/não pode ser chamado de predominante/);assert.deepEqual(ids(r),['C']);assert.equal(r.connection,null);});
test('partial zero data do not imply endorsement or a complete profile',()=>{const a:Answers={};for(let id=1;id<=5;id++)a[id]=0;const r=interpret(calculate(a));assert.equal(r.status,'zero');assert.match(r.scope,/Perfil incompleto/);assert.deepEqual(r.highlights,[]);});
test('all 21 combinations use a canonical bidirectional key',()=>{assert.equal(Object.keys(combinationTexts).length,21);for(let a=0;a<7;a++)for(let b=a+1;b<7;b++){const x=dimensions[a].id,y=dimensions[b].id;assert.equal(pairKey(x,y),pairKey(y,x));assert.ok(combinationFor(x,y));assert.equal(combinationFor(x,y),combinationFor(y,x));const values=[0,0,0,0,0,0,0];values[a]=4;values[b]=4;assert.equal(interpret(calculate(answers(values))).connection?.text,combinationFor(x,y));}});
test('positive, negative and zero stability use the historical wording',()=>{for(const [values,sign,fragment] of [[[4,0,0,0,0,0,0],'positive','conservação'],[[0,0,0,0,0,0,4],'negative','transformação'],[[1,1,1,1,1,1,1],'zero','se compensaram']] as const){const r=interpretHistorical(calculate(answers([...values])));assert.equal(r.stability,sign);assert.match(r.stabilityText!,new RegExp(fragment));assert.match(r.stabilityLimit,/não mede estabilidade emocional/);assert.match(r.quantumText!,/não mede agressividade/);}});
test('floating-point tolerance applies to the zero stability wording only',()=>{const r=calculate(answers([1,1,1,1,1,1,1]));r.ie=1e-13;assert.equal(interpretHistorical(r).stability,'zero');r.ie=-1e-13;assert.equal(interpretHistorical(r).stability,'zero');assert.equal(interpretHistorical(calculate({})).stabilityText,null);});
test('same data always produce the same description without mutation',()=>{const r=calculate(graded([4,3.8,3.8,2,1,0,0]));const before=JSON.stringify(r);assert.deepEqual(interpret(r),interpret(r));assert.equal(JSON.stringify(r),before);const reverse={...r,scores:r.scores.slice().reverse()};assert.deepEqual(ids(interpret(reverse)),ids(interpret(r)));});
test('regular complete descriptions contain approximately 250 to 450 words',()=>{for(const means of [[1,4,0,4,1,0,0],[1,4,4,4,2,0,0],[2,2,2,2,2,2,2],[4,3,3,3,3,3,3],[4,0,0,0,0,0,0],[4,4,4,4,4,4,2]]){const r=interpret(calculate(answers(means)));const count=wordCount(r);assert.ok(count>=250&&count<=450,`${means}: ${count} words`);}});
test('report markup includes automatic description, reflection, historical and printable calculation sections',()=>{const result=calculate(answers([1,4,0,4,1,0,0]));const reading=interpret(result);const html=renderToStaticMarkup(createElement('div',null,createElement(Interpretation,{reading}),createElement(ReflectionQuestions,{reading}),createElement(HistoricalReport,{result}),createElement(CalculationDetails,{result})));for(const text of ['Descrição automática do perfil sociopsicológico','Descrição integrada','Perguntas para reflexão','Coeficientes históricos','Como o resultado foi calculado','vⱼ × peso IE','vⱼ × peso QD'])assert.ok(html.includes(text),text);assert.ok(!html.includes('no-print'));assert.ok(html.indexOf('Descrição integrada')<html.indexOf('Perguntas para reflexão'));assert.ok(html.indexOf('Perguntas para reflexão')<html.indexOf('Coeficientes históricos'));assert.ok(html.indexOf('Coeficientes históricos')<html.indexOf('Como o resultado foi calculado'));});
