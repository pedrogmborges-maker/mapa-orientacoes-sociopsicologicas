import {dimensions} from './dimensions';
import {items} from './items';
export type Answers = Record<number, number | null | undefined>;
// Contemporary items and the four-response threshold belong to this pilot.
// Normalizing to 28 is an application choice, not a validated historical procedure.
export function calculate(answers: Answers) {
 const scores = dimensions.map(d => {
  const values = items.filter(i=>i.dimension===d.id).map(i=>answers[i.id]).filter((v):v is number=>typeof v==='number' && Number.isInteger(v) && v>=0 && v<=4);
  return {...d, n:values.length, mean:values.length>=4 ? values.reduce((a,b)=>a+b,0)/values.length : null};
 });
 const complete=scores.every(s=>s.mean!==null);
 const sorted=scores.filter(s=>s.mean!==null).sort((a,b)=>b.mean!-a.mean!);
 const groups: typeof sorted[]=[];
 sorted.forEach(s=>{const last=groups.at(-1); if(last && last[0].mean===s.mean)last.push(s);else groups.push([s]);});
 const sequence=complete ? groups.map(g=>g.length>1?'('+g.map(s=>s.id).join('/')+')':g[0].id).join('–') : null;
 const sum=complete?scores.reduce((s,d)=>s+d.mean!,0):null;
 const normalized=complete && sum!>0?scores.map(d=>({...d,value:28*d.mean!/sum!})):null;
 return {scores,complete,groups,sequence,sum,normalized,ie:normalized?.reduce((s,d)=>s+d.value*d.ie,0)??null,qd:normalized?.reduce((s,d)=>s+d.value*d.qd,0)??null};
}
