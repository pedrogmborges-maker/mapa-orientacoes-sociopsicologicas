import type {Reading} from './interpretation';

export function Interpretation({reading}:{reading:Reading}) {
 return <section aria-labelledby="reading-title">
  <div className="eyebrow">Descrição automática do perfil sociopsicológico</div>
  <h2 id="reading-title">Descrição integrada das orientações mais presentes</h2>
  <aside className="notice"><p>{reading.notice}</p></aside>
  <p className="small">{reading.scope}</p><p>{reading.summary}</p>
  {reading.evidence&&<p>{reading.evidence}</p>}
  {reading.highlights.map(h=><p key={h.id}><strong>{h.name}:</strong> {h.text}</p>)}
  {reading.connection&&<article className="coefficient"><h3>Considerando os campos em conjunto: {reading.connection.title}</h3><p>{reading.connection.text}</p></article>}
  {reading.synthesis&&<p>{reading.synthesis}</p>}
  {reading.paragraphs.map(p=><p key={p}>{p}</p>)}
  {reading.status!=='insufficient'&&reading.status!=='zero'&&<p className="small">{reading.editorial}</p>}
 </section>;
}

export function ReflectionQuestions({reading}:{reading:Reading}) {
 return <section aria-labelledby="reflection-title"><h2 id="reflection-title">Perguntas para reflexão</h2>
  <p>Estas perguntas são opcionais e não recebem pontuação.</p>
  {reading.questionNote&&<p className="small">{reading.questionNote}</p>}
  {reading.questions.map(q=><label className="reflection" key={q.id??'shared'}>{q.text}<textarea aria-label={q.text} placeholder="Se quiser, registre uma reflexão…" rows={2}/></label>)}
  {!reading.questions.length&&<p>Não há dados suficientes para selecionar perguntas relacionadas às orientações. Você pode revisar as respostas.</p>}
 </section>;
}
