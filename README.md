# Mapa de Orientações Sociopsicológicas — Piloto 0.1

## Leitura automática do perfil

O relatório inclui uma descrição por regras locais, sem IA generativa, API, chave ou custo por análise. `src/interpretation.ts` contém os textos contemporâneos e a função pura; `src/ProfileReading.tsx` apresenta a leitura e participa da impressão. Os textos não são citações nem classificações de Pontes de Miranda.

A leitura preserva todos os empates exatos na maior média. Se houver exatamente dois campos empatados no topo, apresenta uma pergunta sobre essa combinação. Se houver um primeiro e um segundo isolados, e o segundo tiver média positiva, apresenta uma pergunta sobre ambos. Empates maiores não são divididos para escolher arbitrariamente um par. Existem perguntas para os 21 pares possíveis. Essas perguntas sugerem reflexão; não comprovam conflitos ou comportamentos.

Resultados iguais, zero ou insuficientes têm mensagens específicas. Dados parciais são identificados e não geram uma descrição do conjunto completo. Não há faixas de personalidade, previsões ou interpretações de traços com base em IE e QD. A posição nas médias não equivale a diferença psicológica relevante. A leitura é editorial e exploratória, sem validação psicométrica.

Aplicação React e TypeScript. Todos os dados permanecem na memória da página. Não há cadastro, analytics, envio de respostas, cookies nem armazenamento automático. Fechar ou recarregar apaga as respostas. Imprimir ou salvar PDF exige ação do participante.

## Executar

Requer Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
```

Abra a URL exibida pelo Vite. Para verificar: `npm test` e `npm run build`. A compilação estática fica em `dist/`.

## Limites da adaptação

1. Os sete processos e os pesos dos coeficientes IE e QD são conceitos históricos, utilizados conforme a especificação fornecida.
2. Os 35 itens são contemporâneos e não foram elaborados ou validados por Pontes de Miranda.
3. A regra de quatro respostas válidas por dimensão e a normalização `v_j = 28*m_j/S` são escolhas operacionais desta aplicação. Não representam procedimento original do autor.
4. Não há validação psicométrica. Os resultados não permitem diagnóstico, avaliação de capacidade, hierarquia de pessoas ou classificação definitiva da personalidade.

Respostas numéricas válidas são inteiros entre zero e quatro; `null` indica recusa explícita e `undefined` indica item em branco. Nenhum é imputado. Cálculos mantêm precisão completa; arredondamento ocorre somente na apresentação. Empates usam igualdade exata das médias.

Dados em `src/items.ts`, campos e textos em `src/dimensions.ts`, funções puras em `src/calculate.ts`, testes em `src/calculate.test.ts`, interface em `src/main.tsx` e estilos em `src/style.css`. A ordem é gerada por posição dentro dos sete campos, mantendo os IDs originais.

A impressão inclui versão, data no fuso de São Paulo, médias, sociopsicograma, coeficientes, pesos e limitações. Reflexões opcionais não recebem pontuação.

Referência de base fornecida: Pontes de Miranda, Francisco Cavalcanti. *Método de análise sócio-psicológica*. Tradução e organização de Antonio do Passo Cabral. Rio de Janeiro, 2024. Não foi feita validação bibliográfica independente.
