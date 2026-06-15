# Nova Tarefa — Referência Detalhada

URL: https://contador.nibo.com.br/TaskCard/Index  
Abrir modal: botão "+ Nova tarefa" (canto superior direito, ≈ x:1163, y:126)

---

## Campos a coletar (uma mensagem só)

| # | Campo | Obrigatório | Observações |
|---|---|---|---|
| 1 | **Tarefa** | ✅ | Título curto, máx ~80 chars |
| 2 | **Descrição** | Não | Texto livre, multilinha, emojis OK |
| 3 | **Departamento** | Não | Ver mapeamento abaixo |
| 4 | **Responsável** | ✅ | Ver usuários válidos |
| 5 | **Prazo** | Não | DD/MM/AAAA; aceitar linguagem natural |
| 6 | **Cliente(s)** | Não | Nome, código ou CNPJ; pode ser múltiplos |
| 7 | **Seguidores** | Não | Usuários adicionais |
| 8 | **Checklist** | Não | Lista de itens |

---

## Mapeamento de departamentos

| O usuário diz | Valor no sistema |
|---|---|
| contabilidade / contábil | Departamento Contábil |
| fiscal | Departamento Fiscal |
| DP / pessoal / RH | Departamento Pessoal |
| financeiro | Departamento Financeiro |
| administrativo / administração | Administração de Clientes |
| registro / societário | Departamento de Registro |
| (não informado) | Departamento Contábil |

---

## Sequência de execução no browser

Usar `browser_batch` sempre que possível.

1. Navegar para https://contador.nibo.com.br/TaskCard/Index
2. Clicar em "+ Nova tarefa" (≈ 1163, 126)
3. **Tarefa** → clicar input (≈ 933, 99) → digitar título
4. **Descrição** → clicar textarea (≈ 933, 161) → digitar texto (`\n` para quebras)
5. **Departamento** → dropdown (≈ 737, 367) → digitar parte do nome → selecionar
6. **Responsável** → dropdown (≈ 925, 367) → selecionar (ATENÇÃO: Nibo pré-preenche com usuário logado — sempre trocar)
7. **Prazo** → input data (≈ 1120, 367) → digitar DD/MM/AAAA (pular se vazio)
8. **Clientes** → clicar "+ Selecionar clientes":
   - Digitar termo de busca → clicar "Filtrar" (NÃO "Limpar filtros")
   - Marcar checkbox do cliente
   - Repetir se múltiplos
   - Clicar "Confirmar" (inferior direito) — pode precisar de dois cliques
   - Se busca vazia: avisar usuário e perguntar se prossegue sem cliente
9. **Seguidores** → ícone "👤+" → selecionar (pular se vazio)
10. **Checklist** → "+ Adicionar" → digitar cada item + Enter (pular se vazio)
11. **Salvar** → botão "Salvar" (≈ 1190, 687) → aguardar ~2s → screenshot

---

## Pós-salvamento

- Modal fecha e volta à listagem
- Tarefa pode NÃO aparecer imediatamente (filtros ativos)
- Avisar usuário: sugerir "Limpar filtros" se não encontrar

---

## Fallback de coordenadas

Se coordenadas falharem:
```
find "Nova tarefa" → read_page (filter: interactive)
```
O drawer às vezes não expõe campos na árvore de acessibilidade — cair para coordenadas do screenshot.
