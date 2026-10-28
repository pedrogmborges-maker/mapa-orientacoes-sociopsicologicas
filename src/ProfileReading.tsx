import {interpret} from './interpretation';
import type {calculate} from './calculate';

export function Interpretation({result}:{result:ReturnType<typeof calculate>}) {
 const reading=interpret(result);
 return <section aria-labelledby="reading-title">
  <div className="eyebrow">UMA LEITURA PARA REFLETIR</div>
  <h2 id="reading-title">Leitura do seu perfil sociopsicológico</h2>
  <p className="small">{reading.scope}</p>
  <p>{reading.summary}</p>
  {reading.highlights.map(h=><article className="coefficient" key={h.id}><h3>{h.name} nas suas respostas</h3><p>{h.text}</p></article>)}
  {reading.connection&&<article className="coefficient"><h3>Considerando os campos em conjunto: {reading.connection.title}</h3><p>{reading.connection.text}</p><p><strong>Para refletir:</strong> {reading.connection.question}</p></article>}
  {reading.questions.length>0&&<><h3>Perguntas para aprofundar sua leitura</h3><ul>{reading.questions.map(q=><li key={q}>{q}</li>)}</ul></>}
  <p>Contexto, oportunidades, necessidades e expectativas sociais podem influenciar as respostas. Campos com médias menores não representam defeitos ou capacidades ausentes. Os coeficientes históricos não são usados para deduzir traços de personalidade nesta leitura.</p>
  <aside className="notice"><p>{reading.limits}</p></aside>
 </section>;
}
