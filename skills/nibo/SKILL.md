---
name: nibo
description: "Skill de operação do Nibo Contador (contador.nibo.com.br) para a RadéC Contabilidade. Use SEMPRE que pedir 'nova tarefa nibo', 'cria tarefa no nibo', 'tarefa pra Rakel', 'tarefa pra Sávio', 'lança no nibo', 'abre tarefa', 'registra tarefa', 'responder atendimento nibo', 'mensagem no nibo', 'responder cliente nibo', 'relacionamento nibo', ou qualquer operação dentro do sistema Nibo. Cobre dois módulos: Módulo 1 — Nova Tarefa (criação completa com todos os campos); Módulo 2 — Atendimento/Relacionamento (resposta a mensagens de clientes como WhatsApp interno). Usuários válidos: Sávio Radé Sordi, Rakel Bolzan, Atendimento."
---

# Nibo Contador — Skill Operacional RadéC

Sistema: https://contador.nibo.com.br  
Escritório: RadéC Contabilidade (CNPJ 46.435.424/0001-80)

## Usuários do sistema

| Apelido | Nome completo no Nibo |
|---|---|
| Sávio | Sávio Radé Sordi |
| Rakel | Rakel Bolzan |
| Atendimento | Atendimento |

---

## Módulo 1 — Nova Tarefa

**Referência detalhada:** `references/nova-tarefa.md`  
**Dispara com:** "nova tarefa nibo", "cria tarefa", "tarefa pra [usuário]", "lança no nibo", "abre tarefa"

### Fluxo resumido

1. **Coletar campos** — perguntar tudo em uma mensagem só (ver referência para lista completa)
2. **Confirmar** — mostrar resumo e pedir ok
3. **Executar no browser** — seguir sequência de cliques da referência
4. **Verificar** — screenshot pós-salvamento; avisar sobre filtros ativos se tarefa não aparecer

### Entrega padrão (formato Nibo)

Quando o usuário pedir "nova tarefa nibo" sem abrir o browser (ex: no chat), entregar neste formato visual:

```
📋 NOVA TAREFA — NIBO

Tarefa:       [título curto]
Descrição:    [texto pronto pra colar]
Departamento: [se informado]
Responsável:  [nome completo do sistema]
Prazo:        [DD/MM/AAAA ou —]
Cliente(s):   [nome(s)]
Seguidores:   [se houver]

──────────────────────────────
Mini prompt: "[instrução rápida pro Claude preencher campos faltantes]"
```

---

## Módulo 2 — Atendimento / Relacionamento

**Referência detalhada:** `references/atendimento.md`  
**Dispara com:** "responder atendimento nibo", "mensagem no nibo", "responder cliente", "relacionamento nibo"

### Fluxo resumido

1. Identificar cliente e contexto da mensagem recebida
2. Redigir resposta no tom RadéC (profissional, direto, gaúcho com medida)
3. Entregar texto pronto pra colar no campo de mensagem do Nibo
4. Se browser disponível: navegar até Relacionamento > [cliente] e colar

---

## Regras gerais

- **Nunca inventar responsável** — sempre um dos três usuários válidos acima
- **Nunca salvar sem confirmação** do usuário
- **Rakel = Rakel Bolzan** no sistema; nunca "Raquel"
- **Departamento padrão** quando não informado: Departamento Contábil
- **Prazo em branco** quando usuário disser "depois", "—", "a combinar"
- Se browser falhar em coordenadas: usar `find` ou `read_page` (filter: interactive)
