# Mapa de Orientações Sociopsicológicas — Piloto 0.1

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
