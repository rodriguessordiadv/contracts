# Exemplos paradigma — skill onenote

## Exemplo 1 — Protocolo administrativo (RFB / e-CAC)

**Contexto:** Após concluir protocolo de procuração digital RFB para o Espólio de Ieda Floriani. Usuário: "monta o post pro onenote".

**Características do caso:**
- 2 partes (falecida + inventariante)
- Inventário judicial vinculado
- Protocolo eletrônico com múltiplos números (processo, requerimento, juntada)
- Documentos protocolados (5)
- Próximos passos com caminhos de sistema

**Seções usadas:** Identificação das partes, Inventário judicial, Procuração RFB (dados de geração), Protocolo e-CAC, Documentos, Próximos passos, Lista mestre, Observações.

**Arquivo gerado:** `onenote_procuracao_ecac_ieda_2026-06-02.md`

**Pegadinhas do caso:**
- Endereço da DIRPF ≠ endereço da certidão de óbito (anotar nas observações para evitar erro futuro)
- Causa da morte sustenta moléstia grave (art. 6º, XIV, Lei 7.713/88) — registrar nas observações
- Checkbox "Todos os serviços" marcado — cobre serviços futuros, não precisa renovar dentro da vigência

---

## Exemplo 2 — Cliente novo (consolidação)

**Contexto:** Cliente físico novo no escritório. Usuário: "monta a ficha do João pro onenote".

**Características do caso:**
- 1 parte principal (+ cônjuge e dependentes se houver)
- Múltiplos processos vinculados (cível, trabalhista, contratual)
- Sem protocolo ativo — é página de referência permanente

**Seções usadas:** Identificação (cliente + cônjuge + dependentes), Lista de processos vinculados (não tabela única — uma tabela por processo), Observações sobre o cliente (preferências de contato, restrições orçamentárias, particularidades), Lista mestre.

**Variação:** sem seção "Próximos passos" — é página de referência, não de protocolo ativo.

---

## Exemplo 3 — Empresa nova (abertura de PJ)

**Contexto:** RadéC abre nova PJ. Usuário: "gera a ficha pra colar no onenote da empresa nova".

**Características do caso:**
- Razão social, nome fantasia, CNPJ
- Quadro societário (1 ou mais sócios com CPF e participação)
- Endereço da sede
- Capital social
- Regime tributário (Simples / Presumido / Real)
- Certificado digital (e-CNPJ A1/A3)
- Senhas de acesso a sistemas
- Atividades CNAE
- Inscrições estadual / municipal

**Seções usadas:** Identificação da empresa, Sócios (uma tabela por sócio), Dados fiscais, Sistemas e credenciais, Documentos da abertura, Lista mestre completa.

**Lista mestre tem campos específicos:** códigos CNAE, inscrições estaduais e municipais, número do certificado digital, senha da JUCERGS, senha do e-CAC PJ.

---

## Exemplo 4 — Inventário (página-mestre do caso)

**Contexto:** Caso de inventário com múltiplos imóveis e herdeiros. Usuário: "página mestre do inventário Floriani".

**Características do caso:**
- Falecido (com qualificação completa pré e pós-óbito)
- Múltiplos herdeiros (uma tabela por herdeiro)
- Inventariante (pode ser um dos herdeiros)
- Múltiplos imóveis (uma tabela por matrícula, com número formatado/limpo)
- Processo CNJ + processos satélites (alvarás, autorizações de venda)
- ITCD (se já calculado, com valor e UPF-RS)

**Seções usadas:** Falecido, Herdeiros (cada um com tabela), Inventariante (destacado), Imóveis (uma tabela por matrícula), Processo principal, Processos satélites, Fase atual, Próximos atos, Lista mestre.

**Variação:** lista mestre tem subseção "Matrículas e imóveis" com endereço e número de matrícula em duas versões cada.

---

## Exemplo 5 — Protocolo previdenciário (INSS)

**Contexto:** Após protocolar requerimento de aposentadoria. Usuário: "post pro onenote do pedido do João".

**Características do caso:**
- Segurado (qualificação completa)
- Dados do benefício (espécie, NB, DER, RMI estimada)
- Protocolo Meu INSS (número, data, status)
- Documentos juntados (RG, CPF, CTPS, CNIS, comprovantes, laudos)
- Próximos passos (cumprimento de exigência, perícia agendada, recurso)

**Seções usadas:** Segurado, Benefício pleiteado, Protocolo INSS, Documentos juntados, Cronograma (datas agendadas), Próximos passos, Lista mestre.

**Lista mestre tem subseção:** NB do benefício, DER, datas-chave do CNIS, telefones úteis (perícia, INSS-Atende).

---

## Padrões transversais (válidos em todos os exemplos)

### Status no topo

Uma palavra/frase de impacto visual:
- `PROTOCOLADO ✓`
- `EM ANÁLISE`
- `DEFERIDO`
- `PENDENTE`
- `EM ANDAMENTO`
- `AGUARDANDO PERÍCIA`
- `EXIGÊNCIA EM CUMPRIMENTO`
- `PRAZO EM FLUÊNCIA — fim em DD/MM/AAAA`

### Próxima ação (sempre 1 linha)

Imperativo, acionável:
- "Monitorar Caixa Postal do Paulo nos próximos dias úteis"
- "Cumprir exigência de juntada do laudo até 15/06/2026"
- "Aguardar designação de audiência"
- "Distribuir agravo até 12/06/2026"

### Senha padrão do escritório

`@Radec123` é o padrão Rodrigues & Sordi / RadéC para todos os casos onde não há senha específica do cliente. Sempre incluir no fim da lista mestre, mesmo que o caso não precise de senha — fica como referência rápida.

### Lacunas

Quando faltar dado, marcar:
- `[FALTA: CPF do cônjuge]`
- `[FALTA: número da matrícula atualizada]`
- `[FALTA: data de nascimento da Márcia]`

NUNCA inventar ou inferir.

### Repetição controlada

Cada dado aparece **duas vezes** na ficha:
1. Na sua **seção temática** (tabela do início)
2. Na **lista mestre** do fim (caixa de código para copiar)

Não repete uma terceira vez. Se o mesmo dado serve a dois assuntos diferentes, fica na seção temática mais relevante e na lista mestre apenas uma vez.
