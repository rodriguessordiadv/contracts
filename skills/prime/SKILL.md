---
name: prime
description: >
  Framework de análise e entrega estruturada para qualquer tarefa complexa do escritório Rodrigues & Sordi / RadéC / BHS / iCT.
  Use SEMPRE que o usuário digitar 'PRIME', '/prime', 'aplica PRIME', 'faz o PRIME', 'analisa com PRIME', 'usa o framework', 'passa pelo PRIME', 'atualiza o mapa PRIME'.
  Também dispara quando a tarefa for complexa e envolver múltiplos pilares (dados incompletos + entrega final + formato específico) — mesmo sem a palavra PRIME.
  PRIME = Purpose / Research / Interview / Mechanics / Examples.
  O pilar M tem dois modos: Mapeado (skill conhecida) e Inédito (sem skill → propõe caminhos alternativos ou criação de nova skill).
  Nunca misturar com FILLUP (irpf-fillup) nem com widgets de preenchimento. PRIME é análise + planejamento; FILLUP é execução de campos PGD.
  Crossover total: funciona para jurídico (R&S), contábil (RadéC), imobiliário (BHS), educação (iCT) e uso pessoal.
---

# PRIME — Framework de Análise e Entrega

**P**urpose · **R**esearch · **I**nterview · **M**echanics · **E**xamples

Framework genérico do escritório Sávio Radé Sordi para estruturar qualquer entrega complexa antes de produzir o output final.
Crossover total: jurídico, contábil, imobiliário, tributário, educacional, pessoal.

---

## Regra de Ouro

> Quando acionado PRIME, **não entregue o produto final imediatamente**.
> Percorra os 5 pilares, apresente o mapa ao usuário e aguarde confirmação ou complementação antes de gerar o output.
> Exceção: se todos os 5 pilares já estiverem totalmente preenchidos pelo contexto do chat, pode executar diretamente — mas sempre exiba o resumo PRIME antes do output.

---

## Os 5 Pilares

### P — Purpose (Propósito)
Qual é o objetivo desta entrega? O que o usuário quer **de fato** ao final?

Perguntas-chave:
- É para protocolo, envio a cliente, uso interno, negociação, ou análise?
- Tem prazo ou urgência?
- Quem vai receber / usar o output? (juiz, cliente, contador, sócio, banco, cartório...)
- É uma entrega única ou ponto de partida para algo maior?

### R — Research (Levantamento)
O que já está disponível no contexto, nas memórias e nos arquivos?

Checklist:
- [ ] Dados do cliente / parte / empresa já mapeados?
- [ ] Documentos anexados ou referenciados?
- [ ] Informações pendentes identificadas?
- [ ] Legislação / jurisprudência relevante já carregada?
- [ ] Histórico do caso/projeto disponível?

Quando pesquisar:
- Se houver lacunas factuais → identificar e listar antes de prosseguir
- Se houver atualização legislativa necessária → buscar antes de gerar
- Se o caso tiver precedentes no histórico de conversas → referenciar

### I — Interview (Perguntas Abertas)
Máximo **3 perguntas cirúrgicas** antes de executar. Nunca fazer pergunta óbvia que já está no contexto.

Critérios para uma boa pergunta I:
- A resposta vai **mudar significativamente** o output
- A informação **não pode ser inferida** com segurança
- É melhor perguntar do que assumir e errar

Formato das perguntas:
> I.1 — [pergunta direta, máximo 2 linhas]
> I.2 — [idem]
> I.3 — [somente se imprescindível]

### M — Mechanics (Mecânica de Entrega)
Como o output deve ser estruturado? Qual skill, formato e estilo?

O pilar M tem **dois modos**: Mapeado e Inédito.

---

#### M.1 — Território Mapeado (skill conhecida)

| Tipo de entrega | Skill/Formato |
|---|---|
| Petição, contestação, agravo, contrato | `rs-advogados` → .docx Book Antiqua |
| Proposta, relatório, parecer contábil | `radec-contabilidade` → .docx verde/azul |
| Widget IRPF interativo com campos | `irpf-fillup` → HTML widget (NÃO PRIME) |
| Declaração IRPF passo a passo | `irpf` → fluxo de coleta |
| Fechamento de horas / cobrança | `rs-cobrancas` → .md de jobs |
| Tarefa Nibo | `nibo` → ficha estruturada |
| Admissão eSocial | `esocial-cadastro` → ficha .md |
| Previdenciário | `previdenciario-bruno-rs` → laudo/cartas |
| Recap de chat | `recap` ou `fullrecap` |
| Texto no estilo Sávio | `sotaque-savio` |
| Slide/apresentação | `pptx` skill → .pptx |
| Planilha | `xlsx` skill → .xlsx |
| PDF / leitura de documento | `pdf` / `pdf-reading` skill |
| Procuração e-CAC | `procuracao-ecac` skill |
| IRPF via e-CAC / Nibo fiscal | `procuracao-ecac` + `radec-contabilidade` |

---

#### M.2 — Território Inédito (sem skill mapeada)

Quando a tarefa **não encaixa em nenhuma skill existente**, o PRIME não trava — ele age como **arquiteto de solução**. Protocolo obrigatório:

**Passo 1 — Diagnóstico:**
Declarar explicitamente: *"Esta entrega não tem skill mapeada ainda."*
Descrever em 1-2 linhas o que a tarefa exige que ainda não existe no arsenal.

**Passo 2 — Propor 2 ou 3 caminhos alternativos:**

| Opção | Abordagem | Trade-off |
|---|---|---|
| A | Usar skill mais próxima adaptando o output | Mais rápido, menos preciso |
| B | Construir formato ad-hoc (md / html / docx simples) | Flexível, sem padrão visual |
| C | Propor criação de nova skill para este padrão | Mais lento agora, ganho futuro |

**Passo 3 — Perguntar ao usuário qual caminho seguir antes de executar.**

Exemplo de declaração M inédito:
```
M — Mecânica
⚠️ Território inédito — sem skill mapeada para este tipo de entrega.
Tarefa: [descrição do que é necessário]

Opções:
A) Adaptar `rs-advogados` com estrutura livre → entrega hoje
B) Montar .md ad-hoc com seções personalizadas → entrega hoje
C) Criar skill nova `[nome-sugerido]` → padrão permanente para o futuro

Qual caminho seguimos?
```

**Passo 4 — Se escolher opção C (nova skill):**
- Sugerir nome, descrição e estrutura básica da skill
- Perguntar se executa agora ou registra para depois
- Se executar agora: usar skill-creator como base

---

#### M.3 — Sinal de Evolução do PRIME

Toda vez que o caminho **M.2 / opção C** for escolhido e uma nova skill for criada, isso significa que o mapa do PRIME cresceu.
O usuário pode a qualquer momento dizer `atualiza o mapa PRIME` para incorporar a nova skill na tabela M.1.

### E — Examples (Referências)
Qual é o padrão de qualidade aprovado para esta entrega?

- Citar casos ou documentos anteriores que serviram de referência
- Indicar nível de densidade esperado (resumido / padrão / denso)
- Indicar tom: técnico-forense / consultivo / direto-informal / carta a cliente
- Se houver template aprovado no Drive ou no projeto → referenciar

---

## Output do PRIME

Quando acionado, entregar **sempre** neste formato antes do output final:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIME — [Nome do caso/tarefa] — [Data]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

P — Propósito
[1-3 linhas resumindo o objetivo e destinatário]

R — Research — Status
✅ Disponível: [lista do que já está mapeado]
⚠️ Pendente: [lista do que falta]

I — Interview
I.1 — [pergunta 1]
I.2 — [pergunta 2, se necessário]
I.3 — [pergunta 3, somente se imprescindível]

M — Mecânica
Skill: [nome da skill] | Formato: [.docx / .md / widget / texto]
Tom: [técnico / consultivo / informal]
Entregável: [descrição em 1 linha]

E — Referência
[Caso/documento anterior como padrão de qualidade]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aguardando confirmação ou respostas antes de executar.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Regras de Comportamento

1. **Nunca confundir PRIME com FILLUP.** PRIME é planejamento. FILLUP é execução de campos no PGD da Receita Federal. São skills separadas e não se sobrepõem.

2. **Máximo 3 perguntas no pilar I.** Se houver mais de 3 lacunas críticas, priorizar as que mais impactam o output final.

3. **PRIME não é burocracia.** Se o contexto já responde todos os pilares, executar diretamente — mas exibir o bloco PRIME resumido antes do output.

4. **Crossover de personas:** PRIME funciona igual para qualquer chapéu do Sávio:
   - `savio@rs-adv.com` → jurídico
   - `savio@radecontabil.com` → contábil
   - `saviosordi@bhsempreendimentos.com.br` → imobiliário
   - `savio@icontactbrazil.com` → educação/iCT

5. **Quando a sócia Juliana usar:** mesmo fluxo. Persona padrão jurídico R&S.

6. **Tom do bloco PRIME:** direto, sem enrolação. Gaúcho que vai ao ponto.

---

## Exemplos de Acionamento

- `PRIME — Cristina Vale Scott` → analisa o caso de cirurgia estética antes de gerar petição
- `aplica PRIME na proposta RadéC pro cliente X` → estrutura proposta contábil
- `PRIME pra esse negócio aqui` → analisa qualquer tarefa jogada no chat
- `/prime — planejamento sucessório Lilian` → estrutura análise patrimonial
- `faz o PRIME do fechamento de horas de março` → estrutura cobrança R&S

---

## Integração com Outras Skills

Após o PRIME ser confirmado pelo usuário, chamar a skill correspondente identificada no pilar **M**:
- PRIME resolve o *quê* e *como*
- A skill de destino resolve o *fazer*

PRIME nunca substitui a skill de destino — ele **alimenta** ela com contexto estruturado.
