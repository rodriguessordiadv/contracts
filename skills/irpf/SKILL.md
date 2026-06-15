---
name: irpf
description: Conduz a elaboração de Declaração de Ajuste Anual IRPF no PGD da Receita Federal. Use SEMPRE que pedir "fazer IR de [cliente]", "declaração de [cliente]", "IRPF [ano]", "ajuste anual", "fazer imposto de renda", "/irpf", "/declaração", "/ir", "preencher IR", "ficha de IR", "rascunho IRPF", "começar declaração", "DIRPF", "DAA". Cobre perfis CLT, aposentado/pensionista, acumulação, autônomo/MEI, locador, sócio PJ, ganho de capital, renda variável, rural, espólio, doença grave. Dois cenários — COM gov.br (rascunho pré-preenchido, conferência) e SEM gov.br (montagem manual, checklist expandido) — e modo HÍBRIDO. Conduz tela por tela com recortáveis, perguntas adaptativas, checagens (acumulação, parcela isenta 65+, Tema 1.037 STJ, Lei 15.270/2025, e-Financeira) e fecha com ficha .md padrão Rodrigues & Sordi.
---

# IRPF — Skill de Declaração de Ajuste Anual

Skill conduz o preenchimento do IRPF no PGD da Receita Federal, do levantamento de documentos à transmissão. SEMPRE entrega passo a passo no chat (tela por tela em recortáveis) + ficha .md final em `/mnt/user-data/outputs/`.

## Princípio-mãe

**Cada turno = uma tela do PGD.** O usuário copia o recortável e cola no PGD. Próxima mensagem dele = confirmação que aquela tela foi feita + qualquer dúvida.

Velocidade não é prioridade. Precisão é. Cada tela tem checagens próprias antes de passar para a próxima.

## Etapa 0 — Identificação do cenário operacional (SEMPRE pergunta)

Antes de qualquer coisa, pergunta usando `ask_user_input_v0`:

**Pergunta 1 — Cenário:**
- "Importou o rascunho da Receita pelo gov.br?" (COM gov.br)
- "Não consegui gov.br, vou montar do zero" (SEM gov.br)
- "Gov.br veio parcial — só alguns dados" (HÍBRIDO)
- "Não sei o que é isso" → explica e ajuda a decidir

**Pergunta 2 — Dados do cliente** (texto livre):
- Nome completo
- CPF
- Exercício (ex.: 2026, ano-calendário 2025)
- Tipo de declaração (Original ou Retificadora — se retificadora, pedir nº recibo a retificar)

**Pergunta 3 — Perfil tributário** (multi-select):
- CLT (vínculo empregatício)
- Aposentado/pensionista (INSS, militar, servidor)
- Autônomo / MEI / RPA
- Sócio de PJ (recebe pró-labore e/ou distribuição)
- Locador de imóveis
- Tem ações / fundos / day trade
- Tem imóveis vendidos no ano (ganho de capital)
- Atividade rural
- Tem bens/conta no exterior
- Espólio (declaração de falecido)
- Doença grave reconhecida ou em pleito

Esse perfil define quais telas vão ser puladas e quais vão exigir checklist expandido.

## Modos operacionais

### MODO COM gov.br

O rascunho do e-CAC já trouxe dados pré-preenchidos via eSocial, e-Financeira, escrituras e plano de saúde. **Foco**: detectar **divergências** entre rascunho × informes do cliente.

Procedimento:
1. Pede o PDF do rascunho exportado do PGD (ou prints das telas)
2. Pede TODOS os informes que o cliente recebeu (mesmo redundantes)
3. Confere campo a campo: nome da fonte, CNPJ, valor tributável, IRRF, 13º, contribuição previdenciária
4. Bate saldos de bens em 31/12 com extratos
5. Marca cada divergência encontrada e investiga (rascunho costuma estar certo, mas pode ter atraso de transmissão de algum eSocial)

Ler `references/com_govbr.md` para passos detalhados.

### MODO SEM gov.br

Sem rascunho da Receita. **Foco**: não deixar NADA de fora. A Receita já tem os dados via eSocial/e-Financeira/DIMOB/DIMOF/Carnê-Leão Web — divergir traz malha.

Procedimento OBRIGATÓRIO antes de tela por tela: aplicar **checklist expandido** de `references/checklist_sem_govbr.md`. Esse checklist tem 23 perguntas que cobrem fontes de renda esquecidas, contas em outros bancos, aplicações em corretoras, vendas de bens, recebimentos em Pix, sócios em empresas, etc.

**Recomendação fixa ao final**: sugerir ao cliente conseguir gov.br ouro/prata para o próximo ano. Vale o esforço.

Ler `references/sem_govbr.md` para passos detalhados.

### MODO HÍBRIDO

Aplica protocolo do modo COM gov.br nos dados que vieram + protocolo SEM gov.br para os pontos cegos identificados. Marcar na ficha final quais blocos foram preenchidos por cada fonte.

## Etapa 1 — Levantamento de documentos

Lista padrão que sempre é pedida (adapta ao perfil):

**Sempre necessários:**
- Declaração de IRPF do ano anterior (PDF da declaração entregue)
- Recibo da última declaração entregue (nº do recibo)
- Informes de rendimentos de TODAS as fontes pagadoras (empresas, INSS, militar, RPPS)
- Informes bancários (saldos em 31/12 + rendimentos de aplicações)
- Comprovantes de bens e direitos novos ou alterados
- Comprovantes de dívidas adquiridas/quitadas

**Conforme perfil:**
- Sócio de PJ: comprovante anual de retenção (Domínio Escrita Fiscal → Relatórios → Informativos → Federais → Comprovante Anual de Retenção) + extrato de distribuição de lucros
- Aposentado/pensionista: Comprovante de rendimentos do Meu INSS ou Comprovante de Rendimentos do RPPS
- CLT: Comprovante de rendimentos da empresa (Domínio Folha → Relatórios → Informativos → Anuais → Comprovante de rendimentos)
- Autônomo: livro-caixa, RPAs recebidos, Carnê-Leão pago, DARFs do Carnê-Leão
- Locador: contratos de locação, recibos, comprovantes de IPTU e taxa de administração (deduzem)
- Vendeu imóvel: escritura de aquisição e de venda, GCAP do exercício anterior se houver, comprovantes de benfeitorias
- Renda variável: notas de corretagem, DARFs mensais pagos, informe da corretora
- Despesas médicas/educação (se for tentar modalidade completa): notas fiscais com CPF do paciente/aluno, recibos com CPF do prestador, comprovantes de pagamento
- Pensão alimentícia: decisão judicial ou escritura pública + comprovantes de pagamento + CPF do alimentando
- Plano de saúde: declaração anual da operadora discriminando titular e dependentes

## Etapa 2 — Tela por tela (núcleo da skill)

Cada tela segue o mesmo protocolo:

1. **Abre** com o nome da tela do PGD e explicação de 1 linha do que ela faz
2. **Recortável** em tabela markdown com os campos e valores prontos pra digitar
3. **Checagens automáticas** da tela (se aplicáveis)
4. **Perguntas pertinentes** adaptadas ao perfil e aos dados já coletados
5. **Confirma** antes de seguir: "Preencheu? Posso seguir pra próxima tela?"

A sequência canônica das telas e o conteúdo de cada uma está em `references/telas_pgd.md`. Esse é o documento mais consultado da skill.

## Etapa 3 — Checagens automáticas obrigatórias

Antes de fechar a ficha, rodar TODAS as checagens de `references/pegadinhas.md`:

1. **Pré-preenchida vs informes**: divergências geram alerta
2. **Saldos bancários em 31/12** batem com e-Financeira (até R$ 1,00 de tolerância)
3. **Acumulação de fontes pagadoras**: simular imposto a pagar surpresa
4. **Aposentado ≥ 65 anos no ano-calendário**: parcela isenta de R$ 26.963,20/ano (R$ 2.246,93/mês em 2025) + parcela isenta proporcional do 13º
5. **Doença grave em atividade laboral**: Tema 1.037 STJ — só INSS isenta, salário ativo continua tributável
6. **Lei 15.270/2025**: isenção até R$ 5.000/mês — só vale para o exercício 2027 em diante (ano-calendário 2026). NÃO aplicar em declaração ano-base 2025.
7. **Ganho de capital em imóvel**: verificar isenção único imóvel até R$ 440 mil (em 180 dias) ou compra de outro residencial em 180 dias (art. 39 Lei 11.196/2005)
8. **Atualização de bens imóveis Lei 14.973/2024**: se cliente pagou ganho de capital até 16/12/2024 pra atualizar, marcar SIM na pergunta da ficha de bens
9. **Renda variável**: se vendas > R$ 20 mil/mês em ações OU houve day trade, exigia DARFs mensais — verificar se foram pagos
10. **Despesas médicas/educação**: comparar simplificada vs completa. Simplificada (20% até limite de R$ 16.754,34) vence em quase 100% dos casos sem despesas vultosas
11. **Dependente com renda própria**: se dependente teve rendimento > R$ 24.511,92/ano, NÃO PODE ser declarado como dependente
12. **Debito automático**: só funciona se transmissão for até **10/05** do ano-corrente para a 1ª quota. Após essa data, só a partir da 2ª quota
13. **Saldo a pagar < R$ 10,00**: dispensado de DARF (a Receita não cobra)
14. **Restituição via PIX**: priorizada pela Receita — sempre cadastrar PIX do CPF do titular nas informações bancárias

## Etapa 4 — Ficha final (.md) + Pasta do cliente

Ao final, gerar `/mnt/user-data/outputs/ficha_irpf_[nome_slug]_[exercicio].md` seguindo o template de `references/ficha_modelo.md`.

A ficha tem frontmatter YAML + 15 seções:
1. Identificação
2. Mudança estrutural do ano (se houver)
3. Rendimentos tributáveis PJ
4. Rendimentos tributáveis PF/Exterior
5. Rendimentos isentos
6. Tributação exclusiva
7. Bens e direitos (com variação)
8. Dívidas
9. Resumo numérico
10. Forma de pagamento
11. Evolução patrimonial
12. Pegadinhas detectadas e pendências
13. Projeção próximos 1-2 anos (cenários)
14. Documentos consultados
15. Próximos passos com prazos

Sempre apresenta o arquivo com `present_files`.

## Anti-padrões

- NÃO sair pedindo dados antes de definir cenário (com/sem gov.br)
- NÃO atropelar telas — uma por turno, sempre confirma antes de avançar
- NÃO assumir que cliente CLT puro não tem mais nada — sempre roda checklist
- NÃO aplicar Lei 15.270/2025 em declaração ano-base 2025 (só vale a partir de 2026)
- NÃO recomendar modalidade completa sem ter feito o cálculo das duas
- NÃO transmitir antes de confirmar débito automático ou PIX da restituição
- NÃO esquecer de avisar valor a pagar com antecedência se houver imposto devido
- NÃO entregar ficha final inline — sempre como arquivo .md em outputs

## Referências internas

Consulte conforme o passo:

- `references/com_govbr.md` — protocolo para cenário com rascunho pré-preenchido
- `references/sem_govbr.md` — protocolo para montagem manual + checklist expandido
- `references/telas_pgd.md` — sequência canônica das 18 telas do PGD com modelo de recortável
- `references/perguntas_por_tela.md` — perguntas pertinentes adaptativas a cada bloco
- `references/pegadinhas.md` — as 14 checagens automáticas obrigatórias com base legal
- `references/tabelas_irpf.md` — tabelas progressivas, limites de dedução, parcela isenta 65+, valores referência por exercício
- `references/ficha_modelo.md` — template da ficha final no padrão R&S
