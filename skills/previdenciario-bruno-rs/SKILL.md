---
name: previdenciario-bruno-rs
description: "Skill de atendimento previdenciário em parceria Bruno + Rodrigues & Sordi Advogados. Use SEMPRE que pedir 'laudo previdenciário', 'carta pro cliente previdenciário', 'atendimento previdenciário', 'cenários de aposentadoria', 'planejamento previdenciário', 'carta do doutor Bruno', 'laudo PCD', 'aposentadoria por deficiência', 'aposentadoria professor', 'aposentadoria por tempo', 'aposentadoria por idade', 'estudo previdenciário', 'carta 1', 'carta 2', 'laudo jurídico previdenciário', 'documento previdenciário cliente', 'montar dossiê previdenciário'. Produz até 4 documentos padronizados por cliente: (1) Laudo Jurídico-Previdenciário, (2) Carta 1 de Recomendação, (3) Carta 2 explicativa com passo a passo e perguntas de verificação, e (4) Laudo PCD quando aplicável. Crédito ao Dr. Bruno obrigatório. Escritório Rodrigues & Sordi assina todos os documentos."
---

# Atendimento Previdenciário — Dr. Bruno + Rodrigues & Sordi Advogados

## Visão Geral

Este skill padroniza a produção de documentos previdenciários para clientes atendidos em parceria entre o **Dr. Bruno** (especialista em planejamento previdenciário) e o **Rodrigues & Sordi Advogados Associados**.

A cada atendimento, são produzidos até **4 documentos**, dependendo do perfil do cliente. O fluxo garante que o crédito ao Dr. Bruno seja preservado em todos os documentos, que o escritório apareça como responsável jurídico formal, e que o cliente receba comunicação clara e verificável.

---

## Dados Fixos

```
Escritório: Rodrigues & Sordi Advogados Associados
Endereço: R. Gen. Andrade Neves, nº 100, conj. 901 — Centro Histórico — CEP 90010-210 — Porto Alegre/RS
Telefone: (51) 3211.5252
E-mail: advogados@rs-adv.com
Advogados: Sávio Radé Sordi — OAB/RS 93.284 | Juliana Alves Rodrigues — OAB/RS 62.221
Especialista Previdenciário Parceiro: Dr. Bruno
```

---

## Os 4 Documentos do Atendimento

### DOCUMENTO 1 — LAUDO JURÍDICO-PREVIDENCIÁRIO
**Destinatário:** Arquivo interno do escritório (não circula diretamente ao cliente)
**Tom:** Técnico, legislativo, analítico
**Conteúdo obrigatório:**
- Identificação do cliente (nome, idade, vínculos CNIS)
- Resumo dos cenários identificados pelo Dr. Bruno
- Fundamentação legal de cada cenário (artigos de lei, datas de implementação, regras de transição quando aplicável)
- Análise de riscos e probabilidades
- Recomendação fundamentada do caminho prioritário
- Data e assinatura do escritório

**Base legal a citar quando pertinente:** EC 103/2019 (Reforma), LC 142/2013 (PCD), Lei 8.213/1991 (RGPS), Lei 9.796/1999 (compensação previdenciária), RPS (Decreto 3.048/1999)

---

### DOCUMENTO 2 — CARTA 1 (CARTA DE RECOMENDAÇÃO AO CLIENTE)
**Destinatário:** Cliente, em linguagem acessível
**Tom:** Empático, profissional, claro
**Conteúdo obrigatório:**
- Abertura acolhedora apresentando o escritório e o Dr. Bruno
- Resumo dos cenários analisados (sem juridiquês excessivo)
- Indicação do caminho recomendado com justificativa simplificada
- Próximos passos em linhas gerais (detalhamento fica na Carta 2)
- Reforço de que não há garantias, mas há estratégia
- Assinatura do escritório com crédito explícito ao Dr. Bruno

**Crédito padrão ao Dr. Bruno:**
> *"Com base no estudo aprofundado realizado pelo Dr. Bruno, especialista em planejamento previdenciário e parceiro deste escritório, identificamos os seguintes caminhos para a sua aposentadoria..."*

---

### DOCUMENTO 3 — CARTA 2 (EXPLICATIVA + PASSO A PASSO + VERIFICAÇÃO)
**Destinatário:** Cliente
**Tom:** Didático, direto, sequencial
**Conteúdo obrigatório:**
1. Apresentação resumida do contexto (o que foi estudado, por quem)
2. Explicação da modalidade recomendada (sem jargão)
3. Requisitos necessários em linguagem simples
4. Passo a passo numerado das ações do cliente:
   - O que reunir (documentação)
   - O que providenciar agora
   - O que esperar no processo (perícias, prazos, protocolos)
5. Alerta honesto sobre ausência de garantias
6. **Seção de Perguntas de Verificação** — mínimo 5 perguntas abertas para confirmar que o cliente compreendeu o essencial
7. Assinatura do escritório com crédito ao Dr. Bruno

**Estrutura das Perguntas de Verificação:**
As perguntas devem testar compreensão real, não apenas leitura. Exemplos de tipos:
- O que é necessário para ter direito ao benefício?
- Por que documentos antigos são importantes?
- O que acontece após o protocolo no INSS?
- Qual o próximo passo prático do cliente?
- O que NÃO é garantido nesse processo?

---

### DOCUMENTO 4 — LAUDO PCD (quando aplicável)
**Quando usar:** Sempre que o caso envolver aposentadoria por deficiência (visão monocular, deficiência física, intelectual, auditiva, etc.)
**Destinatário:** Cliente + arquivo
**Tom:** Explicativo, técnico simplificado

**Conteúdo obrigatório:**
- Base legal: LC 142/2013, art. 3º, incisos I a IV
- Modalidades PCD disponíveis (por tempo de contribuição e por idade)
- Exigência dos 15 anos de contribuição na condição de PCD
- Exigência de 60 anos (por idade) ou 25M/20F anos de contribuição (por tempo)
- Ausência de impacto da Reforma da Previdência nessa modalidade
- O que é a perícia biopsicossocial e o que é avaliado
- Orientações práticas de documentação (histórico médico, laudos, exames com data)
- Diferença entre grau leve, moderado e grave (e quando importa)
- Aviso sobre a importância de comprovar barreiras e limitações do cotidiano

Leia `references/pcd-base-legal.md` para referências legislativas detalhadas desta modalidade.

---

## Workflow de Geração

### Passo 1 — Coletar dados do caso
Antes de gerar qualquer documento, confirmar:
- Nome do cliente
- Idade atual e data de nascimento
- Profissão (professor? atividade especial? atividade comum?)
- Histórico de contribuição (tempo aproximado, se sabe)
- Condição especial presente (deficiência? qual?)
- Transcrição ou resumo do atendimento com o Dr. Bruno (se disponível)
- Quais documentos o cliente já tem

### Passo 2 — Identificar quais documentos gerar
| Situação | Documentos |
|---|---|
| Atendimento padrão | Doc 1 + Doc 2 + Doc 3 |
| Caso com deficiência | Doc 1 + Doc 2 + Doc 3 + Doc 4 |
| Só carta ao cliente | Doc 2 + Doc 3 |
| Só laudo jurídico | Doc 1 |

### Passo 3 — Gerar os documentos
Para documentos em .docx, ler `/mnt/skills/public/docx/SKILL.md` antes de gerar.
Para documentos em .md ou texto direto, seguir este skill.

### Passo 4 — Validar crédito e assinaturas
Antes de entregar, verificar:
- [ ] Dr. Bruno está creditado em todos os documentos destinados ao cliente
- [ ] Escritório Rodrigues & Sordi assina todos os documentos
- [ ] Perguntas de verificação estão presentes na Carta 2
- [ ] Nenhuma jurisprudência inventada no Laudo Jurídico

### Passo 5 — Entregar
Apresentar os documentos ao usuário na ordem: Doc 4 (se houver) → Doc 1 → Doc 2 → Doc 3.

---

## Regras de Linguagem nas Cartas ao Cliente

- **NUNCA usar "Prezado" ou "Prezada".** Abrir sempre com o nome direto: "José," ou "Maria,"
- **Menos é mais.** Frases curtas, sem floreios, sem abertura protocolada.
- Tom: educado, sintético, profissional e afetuoso — como alguém que respeita o tempo e a inteligência do cliente.
- Sem juridiquês. Sem enrolação. Cada parágrafo precisa ter razão de existir.

---

## Regras Críticas

1. **NUNCA inventar jurisprudência.** Citar apenas lei. Se não lembra o número do artigo com certeza, descrever a regra sem citar.
2. **SEMPRE creditar o Dr. Bruno** nas cartas ao cliente. Ele é o especialista previdenciário — o escritório é o parceiro jurídico.
3. **SEMPRE incluir perguntas de verificação** na Carta 2. Mínimo 5, abertas, testando compreensão real.
4. **SEMPRE deixar claro que não há garantia** de concessão do benefício.
5. **Tom da Carta 2 é didático**, não técnico. Se um cliente de 55 anos sem formação jurídica não entende, reescrever.
6. **Laudo PCD é obrigatório** sempre que deficiência estiver no caso, independentemente de o cliente ter pedido.

---

## Referências

- `references/pcd-base-legal.md` — Legislação completa da aposentadoria PCD (LC 142/2013)
- `references/modalidades-aposentadoria.md` — Tabela de modalidades pós-Reforma de 2019
- `references/checklist-documentacao.md` — Checklist de documentos por tipo de benefício
