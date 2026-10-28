import type {calculate} from './calculate';
import {type Dimension} from './dimensions';

// Contemporary editorial rules, not statements or validated classifications by
// Pontes de Miranda. Only exact rankings are used; no score bands or cutoffs.
const readings: Record<Dimension, {reading:string; question:string}> = {
 R:{reading:'Suas respostas dão destaque às referências religiosas ou espirituais nas decisões, nas práticas cotidianas e no sentido atribuído à vida. Isso descreve o lugar dessas referências no período considerado, sem avaliar a qualidade da sua fé ou comparar pessoas religiosas e não religiosas.',question:'Em quais escolhas suas referências espirituais se tornam mais presentes? Elas mudam conforme a situação?'},
 M:{reading:'Suas respostas dão destaque à consideração de princípios éticos, compromissos e consequências para outras pessoas. Esses conteúdos aparecem como referências nas escolhas relatadas; a pontuação não mede seu valor moral nem garante uma determinada conduta.',question:'Como você decide quando dois compromissos importantes apontam para caminhos diferentes?'},
 A:{reading:'Suas respostas dão destaque ao contato com experiências artísticas, à expressão e aos critérios estéticos. Esses conteúdos participam da maneira como você relata perceber e viver situações; a pontuação não mede talento ou capacidade criativa.',question:'Que espaço a criação ou a apreciação artística encontra na sua rotina, e que espaço você gostaria que encontrasse?'},
 C:{reading:'Suas respostas dão destaque à procura de evidências, à comparação de explicações e à revisão de ideias. A investigação aparece como referência nas situações relatadas; isso não mede inteligência, formação acadêmica ou habilidade científica.',question:'O que costuma ajudar você a rever uma explicação quando encontra novas informações?'},
 D:{reading:'Suas respostas dão destaque a direitos, deveres, responsabilidades e procedimentos reconhecidos pelas partes. Esses conteúdos participam das decisões e da confiança em instituições relatadas; isso não permite concluir que você sempre segue regras ou tem uma personalidade rígida.',question:'Quando uma regra parece inadequada, como você concilia as garantias formais com as particularidades da situação?'},
 P:{reading:'Suas respostas dão destaque à participação, à negociação e à influência em decisões dos grupos. Essa presença diz respeito às situações coletivas relatadas, sem identificar preferência partidária, capacidade de liderança ou desejo de dominar pessoas.',question:'Em quais grupos você encontra espaço para participar das decisões, e em quais esse espaço é limitado?'},
 E:{reading:'Suas respostas dão destaque à organização de recursos, aos custos práticos e à viabilidade material das escolhas. Isso pode refletir tanto prioridades quanto necessidades do momento; não mede riqueza, ambição ou valor pessoal.',question:'Quais escolhas sobre tempo, dinheiro e materiais são preferências suas, e quais são impostas pelas circunstâncias?'}
};

// Pair texts are reflection prompts, never inferred conflicts or predictions.
const pairQuestions: Record<string,string> = {
 'M/R':'Como suas referências religiosas ou espirituais dialogam com seus compromissos éticos quando surge uma decisão difícil?',
 'A/R':'Como a expressão artística e as referências espirituais se encontram na construção de sentido da sua vida?',
 'C/R':'Quando crenças e evidências entram na mesma decisão, como você considera cada uma dessas referências?',
 'D/R':'Como você lida com situações em que uma referência espiritual e uma regra formal apontam caminhos diferentes?',
 'P/R':'Como suas referências espirituais participam das decisões coletivas, considerando pessoas com crenças diferentes?',
 'E/R':'Como você organiza seus recursos para aquilo que considera significativo ou sagrado?',
 'A/M':'Como você concilia a liberdade de expressão com os compromissos que assume com outras pessoas?',
 'C/M':'Como você articula as evidências disponíveis e as consequências éticas de uma decisão?',
 'D/M':'O que você faz quando um procedimento permitido não parece adequado aos seus princípios éticos?',
 'M/P':'Como seus compromissos éticos participam da negociação entre interesses de um grupo?',
 'E/M':'Como você decide quando a viabilidade material e um compromisso interpessoal entram em tensão?',
 'A/C':'Como a exploração expressiva e a investigação de evidências se encontram nas suas experiências?',
 'A/D':'Como você concilia possibilidades de expressão com regras e responsabilidades compartilhadas?',
 'A/P':'Como experiências artísticas podem participar da sua atuação nos grupos?',
 'A/E':'Que condições de tempo e recursos tornam possível criar ou apreciar arte na sua rotina?',
 'C/D':'Como você lida com uma situação em que novas evidências sugerem rever um procedimento estabelecido?',
 'C/P':'Que lugar as evidências encontram nas decisões coletivas das quais você participa?',
 'C/E':'Como você compara as evidências sobre uma alternativa com seus custos e sua viabilidade prática?',
 'D/P':'Como você combina procedimentos reconhecidos e negociação ao participar de decisões coletivas?',
 'D/E':'Como direitos, deveres e garantias entram na organização dos seus recursos?',
 'E/P':'Como você considera os recursos disponíveis ao negociar objetivos coletivos?'
};

export function interpret(result: ReturnType<typeof calculate>) {
 const valid=result.scores.filter(s=>s.mean!==null);
 const scope=result.complete
  ? 'Esta leitura considera os sete campos e descreve suas respostas sobre os últimos seis meses.'
  : `Leitura parcial: ${valid.length} de 7 campos têm informação suficiente. Campos sem média válida não são comparados, e não é possível descrever o conjunto completo.`;
 const limits='Análise automática por regras editoriais desta aplicação, sem uso de IA generativa. É uma adaptação contemporânea inspirada na teoria histórica, sem validação psicométrica. Não descreve uma personalidade definitiva nem faz diagnóstico. Diferenças pequenas entre médias não demonstram diferenças psicológicas relevantes.';
 if(!valid.length)return {scope,limits,summary:'Ainda não há campos com informação suficiente para uma leitura. Você pode revisar as respostas, se desejar.',highlights:[],connection:null,questions:[]};
 const allEqual=result.groups.length===1;
 if(allEqual)return {scope,limits,summary:result.sum===0
  ? 'Todas as médias foram zero. As afirmações não descreveram sua experiência no período considerado. Esse resultado não significa ausência desses processos na sua vida e não permite uma descrição diferenciada de perfil.'
  :valid.length===1
   ? 'Há somente um campo com média disponível. Ele pode ser descrito isoladamente, mas não pode ser chamado de predominante em relação aos demais.'
   :`As médias ${result.complete?'dos sete campos':'dos campos disponíveis'} foram exatamente iguais. Não há predominância nas respostas ${result.complete?'':'que podem ser comparadas'}. Isso não demonstra equilíbrio psicológico nem presença equivalente em todas as situações da vida.`,highlights:valid.length===1&&valid[0].mean!>0?[{id:valid[0].id,name:valid[0].name,text:readings[valid[0].id].reading}]:[],connection:null,questions:valid.length===1?[readings[valid[0].id].question]:['Esse resultado se mantém quando você pensa separadamente na família, no trabalho e em outros grupos?']};
 const leaders=result.groups[0];
 const pair=leaders.length===2?leaders:leaders.length===1&&result.groups[1]?.length===1&&result.groups[1][0].mean!>0?[leaders[0],result.groups[1][0]]:null;
 const question=pair?pairQuestions[pair.map(s=>s.id).sort().join('/')]:null;
 return {scope,limits,summary:`${leaders.map(s=>s.name).join(', ')} ${leaders.length===1?'teve a maior média':'tiveram médias máximas exatamente iguais'} entre os campos com informação suficiente. Essa posição é uma comparação das respostas, sem indicar superioridade ou um tipo fixo de pessoa.`,highlights:leaders.map(s=>({id:s.id,name:s.name,text:readings[s.id].reading})),connection:pair&&question?{title:`${pair[0].name} e ${pair[1].name}`,text:leaders.length===2?'Estes dois campos compartilharam a maior média. A pergunta a seguir explora uma possível relação entre seus conteúdos, sem afirmar que ela acontece na sua vida.':'Estes campos ocuparam as duas primeiras posições entre as médias disponíveis. Isso não estabelece uma diferença psicológica relevante entre eles nem comprova como interagem na sua vida.',question}:null,questions:leaders.map(s=>readings[s.id].question)};
}
