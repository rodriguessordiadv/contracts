---
name: rs-cobrancas
description: Gera .md de fechamento de horas e cobranças do escritório Rodrigues & Sordi Advogados (Porto Alegre/RS) a partir do contexto de um projeto. Use SEMPRE que pedir "fechar o mês", "gerar cobrança", "extrair jobs", "consolidar serviços", "calcular horas trabalhadas", "relatório de horas técnicas", "preencher planilha de cobranças", "fechamento de honorários", "gerar md de cobrança", "horas do cliente", "fechamento de assessoria continuada", "preparar planilha de honorários" — ou qualquer pedido para consolidar serviços jurídicos prestados em um projeto/cliente e alimentar a planilha Cobrancas.xlsx. Detecta peças e atividades em memórias, conversas anteriores e arquivos do projeto, classifica por área (cível, trabalhista, empresarial, imobiliário, família, criminal, consultivo) e complexidade (baixa, média, alta), estima horas com tabela forense gaúcha de referência, confirma cada item antes de gerar, e produz .md pronto para o Claude da planilha preencher a aba Cadastro Jobs.
---

# rs-cobrancas — Fechamento de horas e cobranças

Gera o arquivo `.md` de fechamento de cobranças/horas técnicas do escritório **Rodrigues & Sordi Advogados Associados** (Porto Alegre/RS), a partir do contexto de um projeto do Claude. O `.md` gerado serve de input direto para o "Claude da planilha" `Cobrancas.xlsx`, que preenche automaticamente a aba **Cadastro Jobs** sem esforço manual.

## Workflow híbrido (4 etapas)

A skill segue **nesta ordem**:

### Etapa 1 — Detecção automática

Vasculhar TODO o contexto do projeto buscando atividades realizadas. Use, em sequência:

1. **Memórias do usuário** — ler `userMemories` (especialmente "Top of mind" e "Recent months") para identificar matérias e peças recentes.
2. **`conversation_search`** — rodar queries com nome do cliente, parte contrária, número do processo, tipo de peça (ex: "contestação", "agravo", "embargos", "inicial"). Cada query retorna trechos das conversas relevantes.
3. **`recent_chats`** — varrer a janela temporal (mês corrente por padrão; perguntar ao usuário se for outro período).
4. **Arquivos no projeto** — verificar `.docx`, `.pdf` e outros arquivos gerados que indiquem peça protocolada ou serviço entregue.
5. **Contexto da conversa atual** — atos mencionados (ex.: "fiz a contestação", "elaborei o agravo", "negociei com a parte contrária").

Para cada atividade detectada, registrar internamente:

- **Cliente** e **parte contrária**
- **Número do processo** (formato CNJ se houver) e **tribunal/instância**
- **Área** (cível, trabalhista, empresarial, imobiliário, família, criminal, consultivo)
- **Tipo de peça/atividade** (nome formal: "Contestação", "Agravo de Instrumento", "Notificação Extrajudicial" etc.)
- **Status** (Concluído / Em andamento / Aguardando)
- **Descrição** (1–2 frases objetivas)
- **Indícios de complexidade** (volume documental, densidade técnica, urgência, novidade da tese)

### Etapa 2 — Classificação e estimativa

Para cada job detectado:

1. **Consultar `references/tabela-horas.md`** (tabela forense gaúcha por área + complexidade — Baixa, Média, Alta).
2. **Atribuir complexidade** com base em:
   - Volume de documentos analisados
   - Densidade técnica e novidade da tese
   - Quantidade de pedidos/teses
   - Dificuldade probatória
   - Urgência ou prazo exíguo
3. **Sugerir horas estimadas** (número inteiro ou meio a meio), dentro da faixa da tabela.
4. **Justificar em uma frase curta**, técnica e objetiva, no estilo gaúcho forense — sem floreio, sem bullet points dentro do texto.

### Etapa 3 — Confirmação com o usuário

ANTES de gerar o .md, **listar todos os jobs candidatos em tabela markdown** e pedir confirmação. Formato:

```
Detectei N jobs neste projeto. Confere antes de eu gerar o .md?

| # | Cliente / Parte Contrária | Processo | Tipo | Área | Complexidade | Horas |
|---|---------------------------|----------|------|------|--------------|-------|
| 1 | ...                       | ...      | ...  | ...  | Média        | 8     |
| 2 | ...                       | ...      | ...  | ...  | Alta         | 12    |
...
                                                              Total:    NN h
```

Em seguida, em **uma única pergunta**, levantar três pontos:

- **Valor da hora técnica** para este fechamento (padrão da planilha: R$ 500/h, mas pode variar por cliente VIP).
- **Tipo de cobrança padrão** (Mensalidade saldo geral / Avulsa / Mista).
- **Ajustes** (remover item, adicionar item esquecido, mudar complexidade, alterar horas).

Aceitar respostas livres do tipo:

- "OK" / "confirma" → segue para Etapa 4.
- "remove o 3" / "ajusta horas do 2 pra 6" / "muda complexidade do 4 pra alta" → aplicar mudanças, recalcular horas se complexidade mudou, e **re-listar** a tabela atualizada para confirmação final.
- "adiciona um job de X" → solicitar dados mínimos (cliente, tipo, status) e classificar.

### Etapa 4 — Geração do .md

Seguir o template em `references/formato-saida.md`. Salvar em:

```
/mnt/user-data/outputs/cobrancas-{cliente-slug}-{YYYY-MM}.md
```

Onde `{cliente-slug}` é o nome do cliente em kebab-case (ex.: `marcelo-severo`) e `{YYYY-MM}` é o mês de referência. Apresentar ao usuário via `present_files`.

## Estrutura do .md gerado

Cinco seções, nesta ordem (template completo em `references/formato-saida.md`):

1. **Cabeçalho YAML** — metadados (escritório, cliente, mês, valor hora, total horas, total R$).
2. **Bloco de instruções pro Claude da planilha** — qual aba preencher, próxima linha vazia, regra de inserção, fórmulas a aplicar.
3. **Tabela markdown com os jobs** — uma linha por job, colunas idênticas à aba "Cadastro Jobs" (#, Parte Contrária / Cliente, Número do Processo, Tribunal / Instância, Tipo / Natureza, Status, Descrição / Observações, Horas Estimadas, Justificativa da Estimativa, Cobrança).
4. **Detalhamento por job** — descrição expandida + justificativa técnica.
5. **Resumo financeiro** — total de horas, valor bruto (horas × valor hora), distribuição por área, observações sobre saldo de banco de horas se aplicável.

## Regras de redação (padrão do escritório)

- **Estilo gaúcho forense direto** — sem rebuscamento, sem floreio publicitário.
- **Justificativas em uma frase**, no máximo duas, técnicas e objetivas.
- **Sem bullet points dentro das justificativas** — texto corrido.
- **Tom firme e diplomático**.
- **Termos técnicos precisos** — peças com nome formal: "Embargos à Execução Fiscal" (não "embarguinho"), "Agravo de Instrumento" (não "agravo").
- **Numeração de processos no formato CNJ** completo (NNNNNNN-DD.AAAA.J.TR.OOOO).

## Identidade do escritório (para cabeçalho do .md)

- **Escritório:** Rodrigues & Sordi Advogados Associados
- **Sócio:** Sávio Radé Sordi — OAB/RS 93.284
- **Sócia:** Juliana Alves Rodrigues — OAB/RS 62.221
- **Sede:** Porto Alegre/RS — Centro Histórico
- **Áreas:** Civil, Imobiliário, Trabalhista, Empresarial, Família, Criminal, com ênfase em negociação extrajudicial

## Como o usuário usará o .md

Fluxo final pensado pelo Sávio:

1. Skill gera o `.md` num projeto qualquer (ex.: "Cliente Marcelo — abr/2026").
2. Sávio abre o **Claude do projeto da planilha** (onde mora `Cobrancas.xlsx`).
3. Cola o conteúdo do `.md`.
4. O Claude da planilha lê o **bloco de instruções** no topo do `.md`, identifica a próxima linha vazia da aba "Cadastro Jobs" e insere os jobs com as fórmulas corretas (`Valor Estimado (R$)` = `H{linha} * 'Horas Técnicas'!$B$8`).

Por isso o **bloco de instruções** dentro do `.md` é crítico: ele dispensa qualquer explicação adicional do Sávio.

## Referências

- `references/tabela-horas.md` — Tabela completa de horas por área e complexidade.
- `references/formato-saida.md` — Template e exemplo completo do `.md` final.
