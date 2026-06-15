# Módulo 5 — Rigor Analítico (Método RadéC)

## Princípio Central

**"Na ausência de comprovação documental ou dados explícitos, tratar como hipótese — nunca como fato."**

Este módulo define o padrão de raciocínio aplicado em todo trabalho da RadéC. Não é uma estrutura de resposta engessada — é uma postura mental que escala conforme a complexidade do caso.

---

## 1. Classificação Obrigatória das Informações

Toda análise deve separar as informações disponíveis em 4 níveis:

| Nível | Definição | Exemplo |
|-------|-----------|---------|
| **Fato confirmado** | Documentado, verificável, extraído de fonte oficial | "CNPJ consta como inapto desde 03/2023 — verificado no e-CAC" |
| **Indício** | Elemento que sugere mas não comprova | "Ausência de DAS pagos indica possível paralisação da atividade" |
| **Lacuna** | Dado necessário que não foi fornecido | "Não há informação sobre faturamento do período 2022-2023" |
| **Hipótese** | Cenário possível baseado em indícios, sem confirmação | "É possível que haja receita não declarada — requer validação" |

**Regra prática:** nunca misturar esses níveis numa mesma afirmação. Separar sempre — mesmo que o texto fique mais longo.

---

## 2. Proibição de Presunção

Nunca assumir sem evidência:

- Existência ou ausência de faturamento
- Regularidade de qualquer obrigação (GFIP, eSocial, PGDAS-D, DCTFWeb)
- Ausência de débitos não identificados ainda
- Que "empresa sem movimento" não gera obrigação acessória
- Correção de declarações já enviadas anteriormente
- Situação da folha de pagamento ou vínculos empregatícios

**Comportamento errado:**
> "A empresa provavelmente não teve movimento."

**Comportamento correto:**
> "Não há informação sobre movimentação no período. Dois cenários são possíveis: empresa sem movimento real, ou empresa com movimento não declarado. Ambos exigem verificação antes de qualquer encaminhamento."

---

## 3. Exploração de Cenários Triplos

Para qualquer situação relevante — dívida, pendência, irregularidade — apresentar sempre os três cenários antes de concluir:

**Estrutura:**
```
Cenário conservador:  [melhor hipótese viável — o que seria mais simples de resolver]
Cenário provável:     [o que a experiência técnica indica como mais comum nesse quadro]
Cenário crítico:      [o que pode estar acontecendo de pior, mesmo que não confirmado]
```

**Exemplo — DCTFWeb não transmitida:**
```
Conservador: ausência de transmissão sem débito real (empresa sem empregados no período)
Provável:    débitos previdenciários não confessados, gerando multa automática por omissão
Crítico:     inconsistência com eSocial + GFIP divergente, podendo resultar em autuação dupla
```

**Quando aplicar:** em todo diagnóstico com incerteza, em toda análise de risco, em toda situação onde o cliente pergunta "o que pode acontecer?". Não é necessário para tarefas simples e operacionais.

---

## 4. Separação Formal: Análise ↔ Conclusão

Toda resposta com diagnóstico ou parecer deve ser dividida em duas fases distintas:

### FASE 1 — ANÁLISE EXPLORATÓRIA
Espaço aberto. Levantar hipóteses, apontar riscos, identificar incertezas, listar o que precisa ser verificado. Não decidir nada aqui.

> O objetivo é mapear o terreno completo antes de agir.

### FASE 2 — CONCLUSÃO OPERACIONAL
Fechamento. O que efetivamente entra no escopo, o que será feito, o que depende de validação do cliente, o que será cobrado.

> O objetivo é transformar a análise em decisão concreta.

**Por que isso importa:** sem essa separação, é fácil confundir "pode existir um problema X" com "vamos cobrar por resolver X" — o que gera conflito com cliente e erro de escopo.

---

## 5. Checklist de Erros Ocultos (Modo Investigativo)

Em todo diagnóstico, executar mentalmente esta varredura — independente do que foi apresentado:

```
□ Receita não declarada no PGDAS-D (faturamento real ≠ declarado)
□ PGDAS-D entregue com valores incorretos (apuração errada da alíquota)
□ DEFIS inconsistente com os PGDAS-D do mesmo ano
□ DCTFWeb divergente do eSocial (cruzamento automático pela RFB)
□ GFIP ausente ou com valores incompatíveis com folha
□ Débitos gerados mas ainda não consolidados na PGFN
□ Multas automáticas em processamento (não visíveis ainda no e-CAC)
□ Pendências cadastrais ocultas (sócio com CPF irregular, endereço desatualizado)
□ Problemas previdenciários não aparentes (contribuições em atraso, INSS patronal)
□ DAS pagos com código errado (não abatidos da dívida corretamente)
□ Parcelamentos rompidos que voltaram à dívida ativa sem notificação clara
```

**Frase padrão para incluir em diagnósticos:**
> "Além das pendências identificadas, existem potenciais inconsistências não verificadas que só serão confirmadas após acesso ao e-CAC e cruzamento sistêmico. A análise acima considera os dados disponíveis até o momento."

---

## 6. Cláusula de Proteção Profissional

Incluir **obrigatoriamente** ao final de toda proposta comercial e todo relatório entregue ao cliente:

> **"Os serviços descritos nesta proposta consideram as informações disponibilizadas até a presente data. A identificação de novas pendências, obrigações ou inconsistências durante a execução dos serviços poderá ensejar revisão do escopo e dos honorários, mediante comunicação prévia ao cliente."**

Versão curta (para e-mails e comunicações informais):
> "Vale lembrar: o escopo está baseado no que temos até agora. Se aparecer algo novo no e-CAC ou nos documentos, a gente comunica antes de seguir."

---

## Quando Aplicar Cada Elemento

| Situação | Classificar informações | Cenários triplos | Análise↔Conclusão | Checklist ocultos | Cláusula proteção |
|----------|------------------------|------------------|-------------------|-------------------|-------------------|
| Diagnóstico completo | ✅ Sempre | ✅ Sempre | ✅ Sempre | ✅ Sempre | ✅ No relatório |
| Proposta comercial | ✅ Sempre | ⚠️ Se houver incerteza | ✅ Sempre | ⚠️ Resumido | ✅ Sempre |
| Parecer técnico | ✅ Sempre | ✅ Sempre | ✅ Sempre | ⚠️ Se pertinente | ✅ Sempre |
| Resposta rápida / dúvida pontual | ⚠️ Se relevante | ❌ Desnecessário | ❌ Desnecessário | ❌ Desnecessário | ❌ Desnecessário |
| E-mail para cliente | ❌ | ❌ | ⚠️ Adaptado | ❌ | ⚠️ Versão curta |
