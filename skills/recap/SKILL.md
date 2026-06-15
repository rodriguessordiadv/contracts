---
name: recap
description: Gera arquivo .md de transição de contexto entre chats Claude no mesmo projeto (ou para iniciar novo projeto carregando conhecimento do anterior). DOIS MODOS distintos. MODO RÁPIDO (default) — dispara com '/recap', 'faz o recap', 'recap esse chat', 'fecha esse chat', 'gera o md desse chat', 'memória pra próxima', 'passa pro próximo Claude', 'dump do chat', 'encerra com resumo', 'recap pra começar outro chat'. Produz .md enxuto (frontmatter YAML mínimo + 5 seções) em 30-60s, foco em transição operacional. MODO DENSO — dispara APENAS com '/fullrecap', 'recap completo', 'recap denso', 'recap pra arquivo', 'recap pra fechar o caso', 'dump completo do projeto', 'arquivamento do projeto'. Produz .md institucional (frontmatter completo + 16 blocos) com referências cruzadas a documentos do projeto. Voltado para advocacia (Rodrigues & Sordi) mas adaptável. Densidade proporcional ao chat, sem invenção factual.
---

# Recap

Skill de transição de contexto entre chats Claude. Dois modos com gatilhos distintos. O comando é a confirmação — não pergunta, executa. SEMPRE entrega arquivo .md em /mnt/user-data/outputs/ com link de download. NUNCA entrega o recap inline no chat.

## Modo 1 — `/recap` (rápido, default)

**Gatilhos:** `/recap`, "faz o recap", "recap esse chat", "fecha esse chat", "gera o md desse chat", "memória pra próxima", "passa pro próximo Claude", "dump do chat", "encerra com resumo", "recap pra começar outro chat", "passa o bastão". Sempre que o gatilho não for explicitamente do modo denso, este é o default.

**Objetivo:** transição operacional. O próximo Claude (no mesmo projeto OU em novo projeto carregando este conhecimento) precisa retomar SEM perder fio. Não é arquivamento.

**Velocidade alvo:** 30-60s do comando ao link de download.

**Procedimento (rígido — não desvia):**

1. NÃO rodar `bash` pra checar diretório de saída. O `create_file` cria o path.
2. NÃO ler skills aninhadas, NÃO ler documentos do projeto, NÃO chamar tool_search.
3. Gerar UM único `.md` direto em `/mnt/user-data/outputs/` via `create_file` (uma chamada só).
4. `present_files` único no fim.
5. Sem confirmações intermediárias, sem ask_user_input.
6. Frase curta confirmando entrega e link. NUNCA repetir conteúdo do recap inline.

**FALLBACK obrigatório:** se `create_file` ou `bash_tool` falharem (filesystem indisponível), avisar o usuário em UMA frase ("Filesystem do container fora; entrego inline como fallback") e só então entregar inline. Nunca entregar inline silenciosamente.

**Nome do arquivo:** `recap_[cliente_slug]_[YYYY-MM-DD].md`

**Estrutura do .md (frontmatter YAML enxuto + 5 seções em prosa):**

Frontmatter: `tipo: recap_rapido`, `data`, `cliente`, `parte_adversa`, `processo_cnj`, `vara`, `fase`, `proxima_acao`, `pecas_produzidas_neste_chat`.

Corpo:
1. **Síntese** — 3-5 linhas.
2. **Estado atual** — onde paramos. Pronto vs pendente. Sem cronologia longa.
3. **Próximo passo** — imperativo, acionável.
4. **Peças produzidas neste chat** — nome + path. Omitir se nenhuma.
5. **Decisões estratégicas e restrições aplicáveis** — bullets curtos.

**O que NÃO entra no recap rápido:** cronologia processual extensa, glossário, teses descartadas, anti-padrões explicados, histórico de chats anteriores, referências cruzadas a documentos.

## Modo 2 — `/fullrecap` (denso, arquivamento)

**Gatilhos:** `/fullrecap`, "recap completo", "recap denso", "recap pra arquivo", "recap pra fechar o caso", "dump completo do projeto", "arquivamento do projeto", "fim de matéria desse projeto".

**Objetivo:** memória institucional do caso. Arquivo permanente do projeto, com referências cruzadas pros documentos consultados.

**Procedimento:**
1. Pode rodar `bash`/`tool_search` pra localizar arquivos do projeto.
2. Pode ler documentos-chave pra referenciar com precisão.
3. Gerar `.md` denso em `/mnt/user-data/outputs/` via `create_file`.
4. `present_files`.
5. Mensagem final curta com link.

**Mesmo FALLBACK** caso filesystem falhe: avisar e entregar inline.

**Nome do arquivo:** `fullrecap_[cliente_slug]_[YYYY-MM-DD].md`

**Estrutura (frontmatter completo + 16 blocos):**

Frontmatter: `tipo: recap_denso`, `data`, `cliente` (qualif. completa), `parte_adversa` (idem), `processo_cnj`, `vara`, `fase`, `proxima_acao`, `pecas_produzidas`, `documentos_referenciados` (com path), `chats_anteriores_relevantes`.

Corpo (16 blocos em prosa densa):
1. Síntese executiva (5-8 linhas)
2. Partes qualificadas (CPF/CNPJ, endereço, advogados)
3. Cronologia material
4. Cronologia processual (data + ato)
5. Documentos analisados (path + síntese de 1 linha)
6. Teses ativas (com fundamento)
7. Teses descartadas (com motivo)
8. Jurisprudência mobilizada
9. Peças produzidas (path + finalidade)
10. Decisões estratégicas (linha do tempo)
11. Escalada (frentes ativas)
12. Valores e cálculos
13. Prazos e datas críticas
14. Restrições do usuário
15. Glossário operacional do caso
16. Anti-padrões (o que NÃO fazer, com motivo)

## Princípios gerais

- Densidade proporcional ao chat. Não inventa.
- Zero invenção factual. Lacunas: `[lacuna: descrever]`.
- Prosa, não bullets longos.
- pt-BR forense gaúcho.
- Sem confirmações intermediárias.
- Sem preâmbulo longo. Mensagem final = link e fim.

## Anti-padrões da skill

- NÃO perguntar "rápido ou denso?" — gatilho decide.
- NÃO entregar inline quando o filesystem está OK. SÓ inline se houver falha real, com aviso.
- NÃO rodar bash desnecessário no modo rápido.
- NÃO chamar tool_search no modo rápido.
- NÃO copiar arquivo entre /tmp e /mnt/user-data/outputs/ — `create_file` direto no destino.
- NÃO repetir conteúdo do recap na resposta do chat.
