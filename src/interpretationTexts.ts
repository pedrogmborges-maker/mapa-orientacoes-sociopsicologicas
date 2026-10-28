import type {Dimension} from './dimensions';

// Contemporary application texts, not quotations, original classifications,
// or psychometrically validated findings by Pontes de Miranda.
export const descriptionNotice = 'Esta descrição combina suas respostas por regras predefinidas. É uma interpretação exploratória, não uma avaliação completa da personalidade ou um teste psicológico validado.';
export const editorialNotice = 'Para a redação, diferenças de até 0,2 ponto são tratadas como próximas. Essa é apenas uma regra editorial da aplicação, sem significado estatístico ou psicológico demonstrado. Ela não modifica as médias, os empates exatos do sociopsicograma ou os coeficientes.';
export const contextText = 'Contexto, oportunidade e identificação com os itens influenciam as respostas. Uma orientação pode aparecer por escolha, por necessidade ou pelas possibilidades de participação disponíveis nos últimos seis meses. Médias menores não são deficiências, e médias maiores não comprovam competências. As relações descritas aqui são possibilidades para reflexão, não previsões sobre sua conduta.';
export const foundationText = 'Os sete campos vêm da teoria histórica de Pontes de Miranda. Os itens, os textos desta descrição e a regra editorial de proximidade são adaptações contemporâneas desta aplicação. A leitura reúne referências presentes no autorrelato; ela não estabelece como você agirá em outra situação nem descreve todas as dimensões da sua vida.';
export const dimensionTexts: Record<Dimension,{reading:string;question:string}> = {
 R:{reading:'Suas respostas indicam a presença de referências religiosas ou espirituais na maneira como você atribui sentido às experiências e orienta escolhas.',question:'Como você lida com situações em que suas referências espirituais diferem das de outras pessoas?'},
 M:{reading:'Suas respostas destacam a consideração de princípios éticos, compromissos e consequências das próprias ações para outras pessoas.',question:'Como decide quando dois compromissos éticos entram em conflito?'},
 A:{reading:'Suas respostas destacam a presença de experiências artísticas, expressão pessoal e aspectos estéticos em sua vida cotidiana.',question:'Que espaço você encontra para expressão e experiências estéticas no cotidiano?'},
 C:{reading:'Suas respostas destacam a busca por evidências, a comparação de explicações e a disposição relatada para rever ideias diante de novas informações.',question:'Como decide quando precisa agir com informações incompletas?'},
 D:{reading:'Suas respostas destacam a importância de direitos, deveres, acordos e procedimentos na organização das relações.',question:'Como lida com situações em que as regras existentes não oferecem uma resposta clara?'},
 P:{reading:'Suas respostas destacam o envolvimento com decisões coletivas, a negociação de interesses e a participação na organização dos grupos.',question:'Como equilibra sua participação nas decisões com o espaço de participação das outras pessoas?'},
 E:{reading:'Suas respostas destacam a consideração de recursos, necessidades materiais, custos e viabilidade prática nas escolhas.',question:'Como concilia necessidades materiais e outras prioridades importantes para você?'}
};

// Alphabetic sorting is only a lookup key, never a ranking tie-break.
export function pairKey(a:Dimension,b:Dimension){return [a,b].sort().join('+');}
export const combinationTexts: Record<string,string> = {
 'M+R':'Referências religiosas ou espirituais e compromissos éticos aparecem conjuntamente na maneira como você descreve suas escolhas. Os dois campos podem participar da atribuição de sentido e da consideração das consequências para outras pessoas.',
 'A+R':'Experiências artísticas e referências religiosas ou espirituais aparecem juntas nas suas respostas. Ao considerar uma experiência, expressão e sentido espiritual podem participar conjuntamente da maneira como você relata suas escolhas.',
 'C+R':'A busca de evidências e as referências religiosas ou espirituais aparecem nas suas respostas. Ao tomar uma decisão, a investigação das explicações e o sentido atribuído à experiência podem participar conjuntamente, sem que o questionário determine como você os articula.',
 'D+R':'Direitos, deveres e procedimentos aparecem junto de referências religiosas ou espirituais. Em uma escolha que envolve relações com outras pessoas, acordos reconhecidos e referências de sentido podem participar conjuntamente da sua consideração.',
 'P+R':'A participação nas decisões coletivas e as referências religiosas ou espirituais aparecem nas suas respostas. Ao negociar uma decisão de grupo, referências de sentido e atenção à construção coletiva podem participar conjuntamente.',
 'E+R':'Referências religiosas ou espirituais e a consideração de recursos aparecem conjuntamente nas suas respostas. Ao organizar um projeto, o sentido atribuído à iniciativa e suas condições materiais podem participar da escolha.',
 'A+M':'Experiências expressivas e compromissos éticos aparecem nas suas respostas. Ao escolher como se expressar ou participar de uma experiência artística, critérios estéticos e consideração pelas outras pessoas podem ser referências conjuntas.',
 'C+M':'Essa combinação sugere que informações fundamentadas e compromissos éticos são referências presentes nas escolhas que você relata. Ao examinar uma alternativa, evidências e consequências interpessoais podem participar conjuntamente da decisão.',
 'D+M':'Princípios éticos e referências a direitos, deveres e acordos aparecem como orientações complementares nas suas respostas. Ao considerar uma responsabilidade, compromissos pessoais e procedimentos reconhecidos podem participar conjuntamente da escolha.',
 'M+P':'Compromissos éticos e participação nas decisões coletivas aparecem nas suas respostas. Ao negociar interesses de um grupo, princípios e consideração pelas consequências para as pessoas podem participar da construção da decisão.',
 'E+M':'Princípios éticos e consideração de recursos aparecem juntos nas suas respostas. Ao assumir um compromisso, suas implicações interpessoais e sua viabilidade material podem participar conjuntamente da escolha, sem que uma necessariamente se sobreponha à outra.',
 'A+C':'Experiências expressivas e investigação aparecem juntas, sugerindo espaço tanto para explorar possibilidades quanto para examinar explicações. Na consideração de uma ideia, expressão e comparação de evidências podem participar conjuntamente.',
 'A+D':'Expressão artística e referências a direitos, deveres e acordos aparecem nas suas respostas. Em uma atividade compartilhada, possibilidades expressivas e responsabilidades reconhecidas podem participar conjuntamente das decisões sobre como realizá-la.',
 'A+P':'Experiências artísticas e participação coletiva aparecem nas suas respostas. Ao construir uma iniciativa de grupo, expressão e negociação das decisões podem funcionar como referências conjuntas, sem comprovar habilidades artísticas ou de liderança.',
 'A+E':'Experiências artísticas e consideração de recursos aparecem conjuntamente nas suas respostas. Ao criar ou apreciar algo, o interesse expressivo e as condições de tempo, materiais ou dinheiro podem participar da decisão.',
 'C+D':'Investigação de evidências e referências a procedimentos aparecem nas suas respostas. Ao examinar uma situação, a comparação de explicações e a consideração de direitos e responsabilidades podem participar conjuntamente da escolha.',
 'C+P':'A busca de evidências e a participação coletiva aparecem nas suas respostas. Ao discutir uma decisão de grupo, informações fundamentadas e negociação dos interesses envolvidos podem participar conjuntamente da consideração das alternativas.',
 'C+E':'A investigação de alternativas e a consideração de recursos podem aparecer juntas na maneira como você descreve a resolução de problemas. Evidências disponíveis e viabilidade prática podem participar conjuntamente da escolha de um caminho.',
 'D+P':'Referências a direitos, deveres e procedimentos aparecem junto da participação coletiva. Ao negociar uma decisão de grupo, acordos reconhecidos e espaço para os interesses envolvidos podem participar conjuntamente da organização das relações.',
 'D+E':'Direitos, deveres e consideração de recursos aparecem nas suas respostas. Ao estabelecer um acordo, responsabilidades formais e condições materiais de realização podem participar conjuntamente da decisão sobre o que assumir.',
 'E+P':'A participação nas decisões coletivas e a consideração da viabilidade material aparecem como referências presentes nas suas respostas. Ao organizar uma iniciativa de grupo, negociação de interesses e recursos disponíveis podem participar conjuntamente.'
};
export function combinationFor(a:Dimension,b:Dimension){return combinationTexts[pairKey(a,b)]??null;}
export const stabilityTexts = {
 positive:'Neste cálculo, as contribuições ponderadas de Religião, Moral e Arte superaram as de Direito, Política e Economia. Na teoria histórica, isso corresponde ao lado associado à conservação e resistência às mudanças.',
 negative:'Neste cálculo, as contribuições ponderadas de Direito, Política e Economia superaram as de Religião, Moral e Arte. Na teoria histórica, isso corresponde ao lado associado à transformação.',
 zero:'As contribuições ponderadas dos dois lados se compensaram neste cálculo.'
};
