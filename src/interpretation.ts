import type {calculate} from './calculate';
import type {Dimension} from './dimensions';
import {combinationFor,contextText,descriptionNotice,dimensionTexts,editorialNotice,foundationText,stabilityTexts} from './interpretationTexts';

export const PROXIMITY = 0.2;
export const NUMERIC_TOLERANCE = 1e-12;
type Result = ReturnType<typeof calculate>;
type Score = Result['scores'][number];
export type Reading = {
 status:'insufficient'|'zero'|'uniform'|'profile'; scope:string; notice:string;
 summary:string; evidence:string; highlights:{id:Dimension;name:string;text:string}[];
 connection:{title:string;text:string}|null; synthesis:string|null;
 questions:{id:Dimension|null;text:string}[]; questionNote:string|null;
 paragraphs:string[]; editorial:string;
};
const format=(n:number)=>n.toLocaleString('pt-BR',{maximumFractionDigits:2});
const close=(a:number,b:number)=>Math.abs(a-b)<=PROXIMITY+NUMERIC_TOLERANCE;

// Pure deterministic editorial rules. Never change scores or sociopsychogram.
export function interpret(result:Result):Reading {
 const sorted=result.scores.filter((s):s is Score&{mean:number}=>s.mean!==null).slice().sort((a,b)=>b.mean-a.mean);
 const scope=result.complete?'Esta leitura considera os sete campos e descreve suas respostas sobre os últimos seis meses.':`Perfil incompleto: ${sorted.length} de 7 campos têm informação suficiente. A descrição considera somente os campos disponíveis, sem inferir resultados para os demais.`;
 const base:Reading={status:'insufficient',scope,notice:descriptionNotice,summary:'Ainda não há campos com informação suficiente para uma leitura. Você pode revisar as respostas, se desejar.',evidence:'',highlights:[],connection:null,synthesis:null,questions:[],questionNote:null,paragraphs:[],editorial:editorialNotice};
 if(!sorted.length)return base;
 if(sorted.every(s=>s.mean===0))return {...base,status:'zero',summary:`${result.complete?'Todas as médias foram zero.':'Todas as médias disponíveis foram zero.'} Os itens não foram endossados e não há base para descrever orientações predominantes. Isso não significa ausência desses processos na sua vida.`,questions:[{id:null,text:'Os itens se aproximam das experiências que você viveu nos últimos seis meses?'}]};
 const uniform=sorted.length>1&&close(sorted[0].mean,sorted.at(-1)!.mean);
 // Top two positions, all exact ties at position two, and every field within
 // 0.2 of the maximum. Input order never selects a winner among equal scores.
 const cutoff=sorted[Math.min(1,sorted.length-1)].mean;
 const selected=uniform?sorted:sorted.filter(s=>s.mean>=cutoff||close(s.mean,sorted[0].mean));
 const summary=uniform
  ?result.complete?'Suas respostas apresentaram valores próximos nos sete campos, sem uma predominância clara nesta aplicação.':'Suas respostas apresentaram valores próximos nos campos disponíveis, sem uma predominância clara entre eles nesta aplicação. O perfil está incompleto.'
  :sorted.length===1?'Há somente um campo com média disponível. Ele pode ser descrito isoladamente, mas não pode ser chamado de predominante em relação aos demais.'
   :`${selected.map(s=>s.name).join(', ')} compõem as primeiras posições consideradas nesta descrição. Foram incluídas as duas maiores médias, todos os empates nessas posições e os campos a até 0,2 ponto da maior média, sem escolher arbitrariamente apenas dois.`;
 const evidence=`Médias originais (0 a 4): ${selected.map(s=>`${s.name}: ${format(s.mean)} (${s.n} respostas válidas)`).join('; ')}. ${uniform?'A proximidade não demonstra equilíbrio psicológico.':'A ordem numérica é descritiva e não estabelece uma hierarquia de pessoas.'}`;
 const highlights=selected.map(s=>({id:s.id,name:s.name,text:s.mean>0?dimensionTexts[s.id].reading:'Os itens deste campo não foram endossados (média zero). A inclusão preserva o empate, sem indicar presença dessa orientação.'}));
 const pair=!uniform&&selected.length===2&&selected.every(s=>s.mean>0)?selected:null;
 const connection=pair?{title:`${pair[0].name} e ${pair[1].name}`,text:combinationFor(pair[0].id,pair[1].id)!}:null;
 const synthesis=!uniform&&selected.length>=3?`A leitura reúne ${selected.map(s=>s.name).join(', ')} como um conjunto, preservando empates e proximidades. Esses campos podem oferecer referências distintas na mesma escolha: ${selected.filter(s=>s.mean>0).map(s=>s.description).join('; ')}. O questionário não determina como você combina essas referências nem qual prevalece em uma situação concreta.`:null;
 // Group by proximity to each group's maximum; don't chain transitively or
 // truncate a tied/close group merely to fill three reflection slots.
 const questions:Reading['questions']=[];
 let questionNote:string|null=null;
 if(!uniform){
  const groups:typeof selected[]=[];
  selected.filter(s=>s.mean>0).forEach(s=>{const last=groups.at(-1);if(last&&close(last[0].mean,s.mean))last.push(s);else groups.push([s]);});
  for(const group of groups){if(questions.length+group.length>3){questionNote='Para manter o limite de três perguntas sem escolher arbitrariamente entre campos empatados ou próximos, o grupo que excedeu esse limite não recebeu perguntas individuais.';break;}questions.push(...group.map(s=>({id:s.id,text:dimensionTexts[s.id].question})));}
 }
 if(!questions.length){questions.push({id:null,text:'Como essas orientações participam das suas escolhas na família, no trabalho e em outros grupos?'});if(uniform||selected.length>3)questionNote='Uma pergunta comum aos campos evita dar preferência a uma orientação entre valores próximos ou empatados.';}
 const paragraphs=result.complete?(selected.length>3?[contextText]:[contextText,foundationText]):['Contexto, oportunidade e identificação com os itens influenciam as respostas. Médias menores não indicam deficiências. Esta leitura parcial não permite conclusões sobre os campos sem dados suficientes.'];
 return {...base,status:uniform?'uniform':'profile',summary,evidence,highlights,connection,synthesis,questions,questionNote,paragraphs};
}

export function interpretHistorical(result:Result){
 const stability=result.ie===null?null:Math.abs(result.ie)<=NUMERIC_TOLERANCE?'zero':result.ie>0?'positive':'negative';
 return {stability,stabilityText:stability?stabilityTexts[stability]:null,
  stabilityLimit:'Esse índice não mede estabilidade emocional nem comprova flexibilidade ou rigidez pessoal.',
  quantumText:result.qd===null?null:`O quantum despótico calculado foi ${format(result.qd)}. Trata-se de um índice histórico que atribui pesos diferentes aos sete processos sociais. Este resultado não mede agressividade, violência individual ou autoritarismo.`};
}
