import type {Dimension} from './dimensions';
export const items: {id:number; dimension:Dimension; text:string}[] = [
    {
        "dimension":  "R",
        "id":  1,
        "text":  "Minhas crenças religiosas ou espirituais orientam decisões importantes."
    },
    {
        "dimension":  "R",
        "id":  2,
        "text":  "Reservo momentos para práticas que considero religiosas ou espirituais."
    },
    {
        "dimension":  "R",
        "id":  3,
        "text":  "Diante de dificuldades, recorro a uma referência religiosa ou espiritual."
    },
    {
        "dimension":  "R",
        "id":  4,
        "text":  "Ensinamentos de uma tradição religiosa ou espiritual influenciam minha maneira de viver."
    },
    {
        "dimension":  "R",
        "id":  5,
        "text":  "Minha relação com aquilo que considero sagrado participa do sentido que atribuo à vida."
    },
    {
        "dimension":  "M",
        "id":  6,
        "text":  "Considero meus princípios éticos quando preciso tomar uma decisão difícil."
    },
    {
        "dimension":  "M",
        "id":  7,
        "text":  "Antes de agir, penso nas consequências de minha conduta para outras pessoas."
    },
    {
        "dimension":  "M",
        "id":  8,
        "text":  "Cumprir os compromissos que assumo pesa nas minhas escolhas."
    },
    {
        "dimension":  "M",
        "id":  9,
        "text":  "Quando percebo que prejudiquei alguém, procuro reparar minha conduta."
    },
    {
        "dimension":  "M",
        "id":  10,
        "text":  "Considerações sobre o que é certo ou errado influenciam minhas decisões, mesmo quando ninguém está observando."
    },
    {
        "dimension":  "A",
        "id":  11,
        "text":  "Procuro experiências artísticas, como música, literatura, cinema, dança ou artes visuais."
    },
    {
        "dimension":  "A",
        "id":  12,
        "text":  "Utilizo alguma forma de expressão artística para comunicar o que sinto ou penso."
    },
    {
        "dimension":  "A",
        "id":  13,
        "text":  "A beleza e a composição dos ambientes influenciam minhas escolhas."
    },
    {
        "dimension":  "A",
        "id":  14,
        "text":  "Experiências artísticas modificam minha maneira de perceber situações da vida."
    },
    {
        "dimension":  "A",
        "id":  15,
        "text":  "Reservo tempo para criar ou apreciar algo por seu valor expressivo ou estético."
    },
    {
        "dimension":  "C",
        "id":  16,
        "text":  "Quando quero compreender um assunto, procuro evidências que sustentem as explicações disponíveis."
    },
    {
        "dimension":  "C",
        "id":  17,
        "text":  "Comparo explicações diferentes antes de chegar a uma conclusão."
    },
    {
        "dimension":  "C",
        "id":  18,
        "text":  "Ao encontrar informações contrárias ao que penso, examino a possibilidade de rever minha opinião."
    },
    {
        "dimension":  "C",
        "id":  19,
        "text":  "Procuro distinguir uma afirmação bem fundamentada de uma opinião."
    },
    {
        "dimension":  "C",
        "id":  20,
        "text":  "Para resolver problemas, observo resultados e ajusto minha maneira de agir."
    },
    {
        "dimension":  "D",
        "id":  21,
        "text":  "Procuro conhecer meus direitos e deveres nas situações que vivencio."
    },
    {
        "dimension":  "D",
        "id":  22,
        "text":  "Ao estabelecer um acordo, considero importante esclarecer as responsabilidades das partes."
    },
    {
        "dimension":  "D",
        "id":  23,
        "text":  "Em conflitos, recorro a regras ou procedimentos que possam ser reconhecidos pelas pessoas envolvidas."
    },
    {
        "dimension":  "D",
        "id":  24,
        "text":  "Antes de tomar uma decisão com consequências legais, procuro informações sobre as normas aplicáveis."
    },
    {
        "dimension":  "D",
        "id":  25,
        "text":  "A existência de garantias e procedimentos formais influencia minha confiança em uma instituição."
    },
    {
        "dimension":  "P",
        "id":  26,
        "text":  "Procuro participar de decisões que afetam os grupos dos quais faço parte."
    },
    {
        "dimension":  "P",
        "id":  27,
        "text":  "Observo quem tem influência e como as decisões são tomadas nos grupos."
    },
    {
        "dimension":  "P",
        "id":  28,
        "text":  "Mobilizo pessoas para alcançar objetivos coletivos."
    },
    {
        "dimension":  "P",
        "id":  29,
        "text":  "Negocio interesses quando existem posições diferentes em um grupo."
    },
    {
        "dimension":  "P",
        "id":  30,
        "text":  "Procuro influenciar regras ou decisões coletivas com as quais discordo."
    },
    {
        "dimension":  "E",
        "id":  31,
        "text":  "Considero custos e benefícios práticos antes de assumir compromissos."
    },
    {
        "dimension":  "E",
        "id":  32,
        "text":  "Organizo meus recursos para atender às necessidades presentes e futuras."
    },
    {
        "dimension":  "E",
        "id":  33,
        "text":  "Procuro maneiras de utilizar melhor o tempo, o dinheiro ou os materiais disponíveis."
    },
    {
        "dimension":  "E",
        "id":  34,
        "text":  "A segurança material influencia minhas decisões importantes."
    },
    {
        "dimension":  "E",
        "id":  35,
        "text":  "Considero a viabilidade financeira ou material ao transformar uma ideia em ação."
    }
];
export const orderedItems = Array.from({length:5},(_,position)=>Array.from({length:7},(_,dimension)=>items[dimension*5+position])).flat();