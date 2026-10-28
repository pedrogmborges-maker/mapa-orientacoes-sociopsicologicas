# Mapa de Orientações Sociopsicológicas — Piloto 0.1

## Leitura automática do perfil

O relatório inclui a **Descrição automática do perfil sociopsicológico**, por regras locais, sem IA generativa, API, chave ou custo por análise. `src/interpretation.ts` contém as funções puras de descrição e de leitura dos coeficientes. `src/interpretationTexts.ts` separa os textos contemporâneos das regras. `src/ProfileReading.tsx` apresenta a descrição e as perguntas; `src/HistoricalReport.tsx` apresenta os coeficientes e a memória de cálculo. Todos participam da impressão. Os textos editoriais não são citações nem classificações de Pontes de Miranda.

A leitura usa as médias originais. Considera as duas primeiras posições numéricas, inclui todos os empates na segunda posição e também todos os campos a até 0,2 ponto do máximo. Não usa a ordem das letras para desempatar. A diferença de 0,2 é uma regra editorial, sem significado estatístico ou psicológico demonstrado, e não altera o sociopsicograma ou os coeficientes. A tolerância de `1e-12` só corrige a representação de ponto flutuante na fronteira editorial e na descrição do sinal de IE; não modifica médias ou empates exatos.

Se a amplitude dos sete campos é de até 0,2, o texto informa ausência de predominância clara. Todas as médias zero recebem uma mensagem própria, antes da regra de proximidade. Campos incompletos nunca são imputados. Uma média zero não recebe um texto que afirme presença da orientação, mesmo se entrar num empate na segunda posição.

Há textos integrados para os 21 pares, acessados por `pairKey(a,b)`, de forma que a ordem dos argumentos não importa. Quando três ou mais campos entram na descrição, uma síntese substitui a seleção de um par arbitrário. Os textos descrevem como os conteúdos podem participar de escolhas e não inferem competências ou comportamentos.

As perguntas são selecionadas em grupos editoriais completos, ancorados na maior média de cada grupo, sem encadear proximidades transitivamente. Cabem até três perguntas. Se um grupo empatado ou próximo excede as vagas, ele não é cortado; uma nota explica a omissão. Quando nenhum grupo inteiro cabe, ou quando os campos disponíveis têm valores uniformes, há uma pergunta compartilhada, sem favorecer uma dimensão.

O relatório segue: mapa (incluindo sociopsicograma), descrição integrada, perguntas de reflexão, coeficientes históricos e seção expansível de cálculo. A descrição costuma ter aproximadamente 250 a 450 palavras nos casos completos; dados insuficientes e zero usam textos menores. A interpretação de IE distingue os sinais positivo, negativo e zero; QD não recebe faixas nem porcentagens comportamentais. A memória inclui os valores normalizados e as contribuições individuais aos coeficientes. Na impressão, as seções expansíveis são abertas e seu estado original é restaurado ao terminar.

Resultados iguais, zero ou insuficientes têm mensagens específicas. Dados parciais são identificados e não geram uma descrição do conjunto completo. Não há faixas de personalidade, previsões ou interpretações de traços com base em IE e QD. A posição nas médias não equivale a diferença psicológica relevante. A leitura é editorial e exploratória, sem validação psicométrica.

Aplicação React e TypeScript. Todos os dados permanecem na memória da página. Não há cadastro, analytics, envio de respostas, cookies nem armazenamento automático. Fechar ou recarregar apaga as respostas. Imprimir ou salvar PDF exige ação do participante.

## Executar

Requer Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
```

Abra a URL exibida pelo Vite. Para verificar: `npm test` e `npm run build`. A compilação estática fica em `dist/`.

## Publicação no GitHub Pages

O workflow `.github/workflows/pages.yml` testa, compila e publica o site a cada envio para `main`, ou por execução manual em Actions. Em Settings → Pages, a origem deve ser GitHub Actions. No plano gratuito, o repositório precisa ser público; em um repositório privado, é necessário um plano que ofereça Pages para esse tipo de repositório.

A compilação do workflow usa `--base /<nome-do-repositório>/` para carregar corretamente JavaScript e CSS no endereço do GitHub Pages. A compilação normal e o servidor local mantêm a base `/`. O workflow envia apenas `dist/` como site, sem os arquivos de desenvolvimento.

Endereço previsto depois de uma publicação bem-sucedida: `https://pedrogmborges-maker.github.io/mapa-orientacoes-sociopsicologicas/`. A presença deste endereço no README não confirma a conclusão da publicação.

## Limites da adaptação

1. Os sete processos e os pesos dos coeficientes IE e QD são conceitos históricos, utilizados conforme a especificação fornecida.
2. Os 35 itens são contemporâneos e não foram elaborados ou validados por Pontes de Miranda.
3. A regra de quatro respostas válidas por dimensão e a normalização `v_j = 28*m_j/S` são escolhas operacionais desta aplicação. Não representam procedimento original do autor.
4. Não há validação psicométrica. Os resultados não permitem diagnóstico, avaliação de capacidade, hierarquia de pessoas ou classificação definitiva da personalidade.

Respostas numéricas válidas são inteiros entre zero e quatro; `null` indica recusa explícita e `undefined` indica item em branco. Nenhum é imputado. Cálculos mantêm precisão completa; arredondamento ocorre somente na apresentação. Empates usam igualdade exata das médias.

Dados em `src/items.ts`, campos e textos em `src/dimensions.ts`, funções puras em `src/calculate.ts`, testes em `src/calculate.test.ts`, interface em `src/main.tsx` e estilos em `src/style.css`. A ordem é gerada por posição dentro dos sete campos, mantendo os IDs originais.

A impressão inclui versão, data no fuso de São Paulo, médias, sociopsicograma, coeficientes, pesos e limitações. Reflexões opcionais não recebem pontuação.

Referência de base fornecida e consultada no PDF local em português: Pontes de Miranda, Francisco Cavalcanti. *Método de análise sócio-psicológica*. Tradução e organização de Antonio do Passo Cabral. Rio de Janeiro, 2024. A distinção entre temperamento e adaptação social (p. 4) e as considerações sobre adequação dos questionários e influências sociais (pp. 19–20) ajudam a delimitar a proposta. Os dois outros PDFs fornecidos são digitalizações sem texto extraível e não foram integralmente comparados por OCR. Os textos contemporâneos não reproduzem juízos de valor históricos sobre pessoas ou grupos. Não foi feita validação bibliográfica ou psicométrica independente.
