import type {calculate} from './calculate';
import {interpretHistorical,NUMERIC_TOLERANCE} from './interpretation';
type Result=ReturnType<typeof calculate>;
const fmt=(n:number)=>n.toLocaleString('pt-BR',{maximumFractionDigits:2});

export function HistoricalReport({result}:{result:Result}){
 const text=interpretHistorical(result);
 return <section><h2>Coeficientes históricos</h2>
  <p>Os conceitos e pesos abaixo pertencem à teoria histórica. A normalização das médias adotada nesta aplicação é uma escolha matemática contemporânea, sem validação psicométrica.</p>
  {result.normalized?<>
   <div className="coefficient"><h3>Índice histórico de estabilidade</h3>
    <strong className="number">{fmt(Math.abs(result.ie!)<=NUMERIC_TOLERANCE?0:result.ie!)}</strong>
    <Scale min={-84} max={84} value={result.ie!} center/>
    <p>{text.stabilityText}</p><p>{text.stabilityLimit}</p>
    {text.stability==='zero'&&<p>Essa compensação não demonstra equilíbrio psicológico.</p>}
    <p className="small">Não representa saúde mental, rigidez clínica, conservadorismo partidário ou capacidade de adaptação.</p>
   </div>
   <div className="coefficient"><h3>Quantum despótico — índice histórico</h3>
    <strong className="number">{fmt(result.qd!)}</strong><Scale min={28} max={196} value={result.qd!}/>
    <p>{text.quantumText}</p><p><strong>O nome é histórico.</strong> Ele não mede risco de causar dano.</p>
    <p className="small">112 corresponde à distribuição matemática de quatro pontos em cada campo. Não é média populacional, ponto de corte ou padrão de normalidade.</p>
   </div>
  </>:<p className="notice">{result.sum===0?'Todas as médias foram zero. Não é possível calcular a distribuição relativa nem os coeficientes históricos.':'Informação insuficiente: os coeficientes exigem pelo menos quatro respostas válidas em cada um dos sete campos.'}</p>}
 </section>;
}

export function CalculationDetails({result}:{result:Result}){
 return <section><h2>Como o resultado foi calculado</h2><details><summary>Como calculamos: fórmulas, pesos e memória de cálculo</summary>
  <p>mⱼ = soma das respostas numéricas válidas ÷ nⱼ, quando nⱼ ≥ 4. Essa exigência é uma regra operacional do Piloto 0.1. Recusas e itens em branco não são substituídos por zero.</p>
  <p>S = m_R + m_M + m_A + m_C + m_D + m_P + m_E. Com sete médias válidas e S &gt; 0, vⱼ = 28 × mⱼ / S. A soma dos valores normalizados é 28.</p>
  <p>IE = 3v_R + 2v_M + v_A − v_D − 2v_P − 3v_E. Intervalo teórico: −84 a +84.</p>
  <p>QD = 5v_R + 3v_M + 2v_A + v_C + 4v_D + 7v_P + 6v_E. Intervalo teórico: 28 a 196.</p>
  <p>{result.sum===null?'S não está disponível: há dimensões sem média válida.':`S = ${fmt(result.sum)}.${result.sum===0?' A divisão por zero impede a normalização.':''}`}</p>
  <p>Os coeficientes são relativos: aumentar ou diminuir todas as médias na mesma proporção não modifica os valores normalizados. Os cálculos mantêm a precisão completa; apenas a apresentação é arredondada.</p>
  <div className="table-wrap"><table><caption>Médias, normalização e contribuições dos pesos históricos</caption><thead><tr><th>Campo</th><th>Média</th><th>vⱼ</th><th>Peso IE</th><th>vⱼ × peso IE</th><th>Peso QD</th><th>vⱼ × peso QD</th></tr></thead><tbody>{result.scores.map(d=>{
   const normalized=result.normalized?.find(n=>n.id===d.id);
   return <tr key={d.id}><th>{d.name}</th><td>{d.mean===null?'—':fmt(d.mean)}</td><td>{normalized?fmt(normalized.value):'—'}</td><td>{d.ie}</td><td>{normalized?fmt(normalized.value*d.ie):'—'}</td><td>{d.qd}</td><td>{normalized?fmt(normalized.value*d.qd):'—'}</td></tr>;
  })}</tbody>{result.normalized&&<tfoot><tr><th>Total</th><td>{fmt(result.sum!)}</td><td>{fmt(result.normalized.reduce((s,d)=>s+d.value,0))}</td><td>—</td><td>{fmt(result.ie!)}</td><td>—</td><td>{fmt(result.qd!)}</td></tr></tfoot>}</table></div>
  <p>Os totais usam os valores completos. A soma dos números arredondados da tabela pode diferir ligeiramente do total mostrado.</p>
 </details></section>;
}

function Scale({min,max,value,center=false}:{min:number;max:number;value:number;center?:boolean}){
 return <div className="scale" aria-label={`Valor ${fmt(value)} na escala de ${min} a ${max}`}><div className="scale-line"><span style={{left:`${(value-min)/(max-min)*100}%`}}/></div><div className="scale-labels"><span>{min}</span>{center&&<span>0</span>}<span>+{max}</span></div></div>;
}
