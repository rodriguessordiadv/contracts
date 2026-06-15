---
name: irpf-fillup
description: Gera widget interativo de preenchimento do PGD para declaração IRPF já analisada. Use SEMPRE que pedir '/irpf assistente', 'ficha pra preencher', 'monta o widget', 'widget de preenchimento', 'checklist PGD', 'me dá os campos pra copiar', 'refaz o assistente', 'atualiza o widget'. Dispara IMEDIATAMENTE sem perguntas. Gera widget HTML com: checkbox por item, badge de prioridade (crítico/alto/médio) no topo direito do card, campos label+valor em linhas, botões copiar INDIVIDUAIS por campo (CNPJ, nome, discriminação, valor 2024, valor 2025, RENAVAM etc.) posicionados EMBAIXO À ESQUERDA de cada item, contador de progresso no cabeçalho. Layout: grid 22px + 1fr, botões em flex-wrap embaixo. NUNCA usar botão genérico — cada campo tem seu próprio botão com label descritivo ('copiar CNPJ', 'copiar discriminação', 'copiar 2024' etc.). Itens concluídos: checkbox verde + texto riscado.
---

# IRPF Fillup — Widget de Preenchimento PGD

Gera widget interativo para preenchimento tela a tela do PGD da Receita Federal. Baseado na ficha .md do cliente já analisada e nos itens pendentes identificados na sessão.

## Princípio central

**Um item = um card. Um campo = um botão copiar.** Nunca agrupar valores num botão só. O usuário está com o PGD aberto em paralelo — cada clique deve copiar exatamente o valor que precisa colar naquele campo.

## Gatilho e execução

Dispara com `/irpf assistente`, `ficha pra preencher`, `widget de preenchimento`, `refaz o assistente`, `atualiza o widget`. Execução imediata — sem `ask_user_input`, sem perguntas. Lê o contexto da conversa e monta o widget com o estado atual (itens feitos marcados, itens pendentes abertos).

## Layout do widget

### Estrutura geral

Cabeçalho com 4 métricas: crítico | alto | médio | concluído X/Y

Seções em ordem canônica das telas do PGD:
1 — Dependentes
2 — Rendimentos PJ
3 — Rendimentos isentos
4 — Tributação exclusiva
5 — Pagamentos efetuados
6 — Bens e direitos
7 — Dívidas e ônus reais
8 — Cálculo do imposto

### Estrutura de cada card

```
[checkbox]  [Título do item]                    [badge DIREITA]
            Campo: CNPJ       XX.XXX.XXX/XXXX-XX
            Campo: Nome       NOME DA INSTITUIÇÃO
            Campo: Discrim.   TEXTO COMPLETO
            Campo: 31/12/2024 1234,56
            Campo: 31/12/2025 789,00
            [copiar CNPJ] [copiar nome] [copiar discriminação] [copiar 2024] [copiar 2025]
            ↑ botões EMBAIXO À ESQUERDA, flex-wrap
```

### CSS layout obrigatório

```css
.row { display: grid; grid-template-columns: 22px minmax(0,1fr); gap: 8px; padding: 8px 0; border-bottom: .5px solid var(--color-border-tertiary); align-items: start; }
.head { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 5px; }
.lb { font-size: 13px; font-weight: 500; flex: 1; }
.lb.x { text-decoration: line-through; color: var(--color-text-tertiary); }
.f { display: flex; align-items: baseline; gap: 6px; margin-bottom: 3px; }
.fl { font-size: 11px; color: var(--color-text-secondary); min-width: 90px; flex-shrink: 0; }
.fv { font-size: 11px; font-family: var(--font-mono); flex: 1; word-break: break-all; }
.btns { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 7px; }
.btn { font-size: 11px; cursor: pointer; background: none; border: .5px solid var(--color-border-secondary); border-radius: 4px; padding: 3px 9px; color: var(--color-text-secondary); }
```

### Cores dos badges

| Prioridade | data-p | bg | text |
|---|---|---|---|
| Crítico | cr | #FCEBEB | #A32D2D |
| Alto | al | #FAEEDA | #854F0B |
| Médio | me | #EAF3DE | #3B6D11 |
| Pendente | pe | #E6F1FB | #185FA5 |
| Feito | ok | #E1F5EE | #0F6E56 |

### JS (3 funções — copiar, toggle, contador)

```javascript
function T(cb) {
  cb.classList.toggle('on');
  cb.closest('.row').querySelector('.lb').classList.toggle('x', cb.classList.contains('on'));
  U();
}
function C(v, b) {
  navigator.clipboard.writeText(v).catch(() => {});
  const o = b.textContent;
  b.textContent = 'copiado';
  setTimeout(() => b.textContent = o, 1300);
}
function U() {
  const rows = document.querySelectorAll('.row');
  let cr=0,al=0,me=0,dn=0;
  rows.forEach(row => {
    const done = row.querySelector('.cb').classList.contains('on');
    if (done) { dn++; return; }
    const p = row.dataset.p;
    if (p==='cr') cr++; else if (p==='al') al++; else if (p==='me') me++;
  });
  document.getElementById('nr').textContent = cr;
  document.getElementById('na').textContent = al;
  document.getElementById('nm').textContent = me;
  document.getElementById('nd').textContent = dn+'/'+rows.length;
}
U();
```

## Campos obrigatórios por tipo de item

### Rendimentos PJ — excluir linha
- CNPJ + ação ("deletar item N")
- Botão: copiar CNPJ

### Rendimentos isentos
- Tipo (código numérico), CNPJ, Nome, Beneficiário (titular/dependente + CPF), Valor, Descrição (se 99/Outros)
- Botão por campo

### Pagamentos efetuados (cód. 21 ou 26)
- Código, Titular/Dependente, CNPJ, Nome beneficiário, Descrição, Valor pago, Parcela não dedutível
- Botão por campo

### Bens e Direitos — aplicações financeiras (04/xx)
- Grupo/Código, CNPJ, Nome instituição, Discriminação, 31/12/2024, 31/12/2025
- Botão por campo

### Bens e Direitos — veículos (02/01)
- Grupo/Código, RENAVAM, Discriminação (modelo + ano + placa + RENAVAM + valor aquisição), 31/12/2024, 31/12/2025
- Botão RENAVAM separado, botão discriminação separado, botão valor separado

### Bens e Direitos — outros (99/99)
- Grupo/Código, Discriminação completa, 31/12/2024, 31/12/2025
- Botão discriminação, botão 2024, botão 2025

### Dívidas e Ônus Reais
- Código, CNPJ credor, Nome credor, Descrição (contrato + vencimento), 31/12/2024, 31/12/2025
- Botão por campo

### Cálculo do Imposto — informações bancárias
- Banco, Agência (sem DV), Conta débito
- Botão banco, botão agência, botão conta — SEPARADOS

## Regras de conteúdo

I. Valores numéricos: sem R$, sem ponto de milhar, vírgula decimal — `60000,00` não `R$ 60.000,00`
II. Textos de discriminação em caixa alta (padrão PGD)
III. Itens já lançados: checkbox marcado + texto riscado + badge "feito"
IV. Itens aguardando cliente: campo com `[aguarda cliente]` sem botão copiar
V. Nunca inventar CNPJ, RENAVAM ou valor — lacunas marcadas explicitamente
VI. Seções em ordem canônica das telas do PGD

## Anti-padrões

- NUNCA agrupar múltiplos campos num único botão
- NUNCA colocar botões à direita ou inline com o valor
- NUNCA botão genérico "copiar" sem label descritivo
- NUNCA omitir discriminação mesmo que longa
- NUNCA preencher R$ ou ponto de milhar nos valores
- NUNCA gerar widget sem ler o contexto da conversa — reflete estado real da declaração
