# Atendimento / Relacionamento — Referência Detalhada

Módulo de resposta a mensagens de clientes no Nibo Contador.  
Funciona como WhatsApp interno — tom direto, profissional, gaúcho com medida.

---

## Quando usar

- Cliente enviou mensagem pelo Nibo e precisa de resposta
- Usuário quer redigir mensagem proativa para cliente no sistema
- Qualquer comunicação no módulo Relacionamento do Nibo

---

## Fluxo de coleta

Perguntar em uma mensagem só:

1. **Cliente** — nome ou código
2. **Contexto** — o que o cliente perguntou / qual a situação
3. **Tom** — padrão RadéC (direto, profissional) ou há algo específico?
4. **Urgência** — normal ou precisa de marcação de prioridade?

---

## Tom e estilo

- Profissional mas humano — sem "prezado senhor", sem "conforme solicitado"
- Direto: cliente quer resposta, não introdução
- Gaúcho com medida: natural, não caricato
- Máximo 3-4 parágrafos curtos
- Emojis só se o contexto pedir (cliente informal, boa notícia)

---

## Entrega padrão (sem browser)

```
💬 MENSAGEM — NIBO RELACIONAMENTO

Cliente: [nome]
Para:    [quem responde — Sávio / Rakel / Atendimento]

──────────────────────────────
[texto pronto pra colar]
──────────────────────────────
```

---

## Execução no browser (se disponível)

1. Navegar para https://contador.nibo.com.br
2. Menu lateral → Relacionamento (ou CRM)
3. Buscar cliente pelo nome
4. Abrir thread de mensagens
5. Colar texto no campo de resposta
6. Enviar → screenshot de confirmação
