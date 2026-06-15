---
name: onenote
description: Gera página .md de resumo executivo para colar no OneNote, com identificação de partes, dados de processo, números de protocolo e lista mestre de dados copiáveis em duas versões (formatado e limpo). Use SEMPRE que pedir '/onenote', 'post pro onenote', 'monta pro onenote', 'resumo onenote', 'ficha do caso', 'página de protocolo', 'página mestre', 'cola no onenote', 'gera a ficha', 'ficha pra colar'. Estrutura padrão Rodrigues & Sordi / RadéC: título + status + índice + seções + lista mestre. Identificadores numéricos (CPF, CNPJ, RG, processo CNJ, matrícula, protocolo) SEMPRE em duas versões lado a lado (formatado | limpo). Órgão expedidor sempre sem barra (SSP RS). Cobre inventários, ações judiciais, protocolos administrativos (RFB, INSS, juntas, prefeituras), contratos, previdenciário, abertura de PJ, regularizações fiscais. NÃO confundir com /recap (transição entre chats) nem /fullrecap (arquivamento processual denso) — onenote é página estática de consulta rápida.
---

# OneNote

Gera arquivo `.md` de página única para colar no OneNote como ficha de referência permanente de um caso, protocolo ou cliente. Estrutura previsível, dados em duas versões, índice no topo, lista mestre no fim.

O comando é a confirmação — não pergunta, executa. SEMPRE entrega arquivo `.md` em `/mnt/user-data/outputs/` com link de download. Não entrega inline.

## Quando usar

- Após protocolar qualquer requerimento, ação, declaração ou cadastro que gere número de processo
- Para consolidar dados de um cliente novo (CPFs, RGs, endereços, contatos, processos vinculados)
- Para fechar a sessão de uma matéria operacional (RFB, INSS, junta comercial, prefeitura, cartório)
- Para criar a página-mestre de um caso jurídico (inventário, ação, contrato, regularização)
- Sempre que o usuário precisar de "uma página com tudo organizado para colar"

## Quando NÃO usar

- Para transição entre chats Claude → usar `/recap` (skill recap, modo rápido)
- Para arquivamento institucional de caso encerrado → usar `/fullrecap`
- Para preenchimento ativo de campos em sistema → usar formato checklist enxuto (sem tabelas longas)
- Para peça jurídica → usar `rs-advogados`
- Para fechamento de horas → usar `rs-cobrancas`

## Procedimento

1. NÃO rodar `bash` pra checar diretório. O `create_file` cria o path.
2. Identificar o **objeto da ficha**: cliente único, caso/protocolo específico, ou consolidação de matéria.
3. Identificar todos os identificadores numéricos presentes no contexto: CPF, CNPJ, RG, número CNJ, matrícula, protocolos, telefones, CEPs.
4. Gerar UM único `.md` direto em `/mnt/user-data/outputs/` via `create_file`.
5. `present_files` único no fim.
6. Mensagem final curta com link. Não repete conteúdo inline.

**Nome do arquivo:** `onenote_[assunto_slug]_[YYYY-MM-DD].md`

Exemplos:
- `onenote_procuracao_ecac_ieda_2026-06-02.md`
- `onenote_cliente_paulo_floriani_2026-06-02.md`
- `onenote_inventario_floriani_2026-06-02.md`
- `onenote_abertura_pj_radec_2026-06-02.md`

## Estrutura padrão (em ordem)

### Cabeçalho

```
# [TÍTULO — Assunto + nome/identificação]

**Status:** [estado atual em destaque]
**Data do protocolo/marco:** [DD/MM/AAAA]
**Próxima ação:** [próximo passo objetivo]
```

### Índice (sempre)

Lista numerada das seções da página. Mesmo que a página seja curta, manter o índice para navegação no OneNote.

### Seções de conteúdo (escolher conforme o objeto)

Seções típicas — não obrigatórias todas:

1. **Identificação das partes** — uma subseção por pessoa/empresa envolvida, com tabela `Campo | Formatado | Limpo`
2. **Processo judicial / Procedimento administrativo** — tabela com número CNJ ou de protocolo, vara/órgão, datas-chave
3. **Dados de geração / Sistema** — para protocolos eletrônicos (vigência, palavra-chave, código de controle, URLs do sistema)
4. **Protocolo / Números do processo** — tudo o que o sistema gerou (processo digital, requerimento, juntada, etc)
5. **Documentos protocolados / juntados** — lista numerada com nome do arquivo e data
6. **Próximos passos** — com caminhos de sistema em caixa de código
7. **Lista mestre — dados para copiar** — sempre por último, agrupados por tipo

### Lista mestre (sempre — é a razão de existir da ficha)

Agrupar dados copiáveis por tipo, em caixas de código:

```
### CPFs
Nome:   formatado  |  limpo

### CNPJs
Nome:   formatado  |  limpo

### RGs
Nome:   número órgão (sem barra)

### Datas
Marco:  DD/MM/AAAA

### Processos e protocolos
Tipo:   formatado  |  limpo

### Contato
Tipo:   formatado  |  limpo

### Endereços
[bloco em texto livre]

### Sistemas e URLs
Sistema:  https://...

### Senha padrão
@Radec123 (ou específica do caso)
```

### Observações operacionais (quando relevante)

Bullets curtos com pegadinhas, restrições ou pontos de atenção que não se enquadram em outras seções.

## Regras de formatação CRÍTICAS

### Identificadores numéricos — sempre duas versões

| Tipo | Formatado | Limpo |
|---|---|---|
| CPF | 254.748.200-20 | 25474820020 |
| CNPJ | 92.829.100/0001-43 | 92829100000143 |
| Processo CNJ | 5317020-07.2025.8.21.0001 | 53170200720258210001 |
| Matrícula imóvel | 65.940 | 65940 |
| Processo admin | 13033.107230/2026-19 | 13033107230202619 |
| Requerimento RFB | 2026/00401994370RW | 202600401994370RW |
| Protocolo juntada | 42033343615725 | 42033343615725 |
| Telefone | (51) 99518-3878 | 51995183878 |
| CEP | 90620-150 | 90620150 |
| Data | 30/06/1934 | 30061934 |
| Matrícula óbito/casamento | 099002 01 55 2025 4 00354 075 0070675 42 | 09900201552025400354075007067542 |

### Órgão expedidor — NUNCA com barra

| Errado | Certo |
|---|---|
| SSP/RS | SSP RS |
| DETRAN/RS | DETRAN RS |
| OAB/RS | OAB RS |

### Tabelas vs caixas de código

- **Tabelas** (markdown `| ... |`) para seções de identificação onde cada linha é um campo
- **Caixas de código** (` ``` `) para listas mestre onde o usuário vai copiar valores soltos
- **Listas numeradas** para documentos e passos sequenciais

### URLs

Sempre completas, sem encurtar, prontas para clicar:
- `https://cav.receita.fazenda.gov.br` ✓
- `cav.receita.fazenda.gov.br` ✗

## Princípios gerais

- Densidade proporcional ao caso. Não inventa dados.
- Lacunas marcadas explicitamente: `[FALTA: descrever o que falta]`
- Português Brasil, registro técnico-operacional, sem floreios
- Cada dado aparece **uma vez na sua seção principal** e **uma vez na lista mestre**. Não repetir mais.
- Status no topo em uma palavra/frase curta de destaque (PROTOCOLADO, EM ANÁLISE, DEFERIDO, PENDENTE, etc.)
- Sem confirmações intermediárias com o usuário. Executa.

## Anti-padrões

- NÃO entregar inline quando o filesystem está OK. Sempre arquivo + link.
- NÃO perguntar "quer que eu inclua X?" — incluir o que tem no contexto, marcar `[FALTA: ...]` o que não tem
- NÃO usar emojis decorativos no corpo (✓ no status é aceitável)
- NÃO criar seções vazias só pra preencher estrutura — se não tem CNPJ, não cria seção de CNPJ
- NÃO repetir o mesmo dado em três lugares — uma vez na tabela da seção, uma vez na lista mestre, fim
- NÃO inventar números — se o usuário não passou o RG do cônjuge, marca `[FALTA: RG do cônjuge]`
- NÃO usar formatação `**` em excesso dentro das tabelas — polui
- NÃO terminar com call to action genérico ("me avisa se precisar de algo") — termina no link e fim

## Variações por tipo de matéria

### Caso jurídico (inventário, ação, contrato)

Foco em: partes qualificadas, processo CNJ, vara, juiz, próximos atos, documentos juntados, prazos.

### Protocolo administrativo (RFB, INSS, junta, prefeitura)

Foco em: requerente, sistema, número de protocolo, requerimento, prazo de análise, caminho de consulta, documento de confirmação.

### Cliente novo (consolidação de dados)

Foco em: qualificação completa, todos os identificadores, contatos, endereços, processos vinculados, observações.

### Empresa / PJ

Foco em: razão social, CNPJ, sócios, capital social, endereço, regime tributário, certificado digital, senhas, e-CAC, conectividade social.

Consultar `references/template-completo.md` para o esqueleto vazio pronto para preencher e `references/exemplos.md` para casos paradigma.
