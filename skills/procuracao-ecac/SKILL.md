---
name: procuracao-ecac
description: "Guia operacional para gerar e protocolar procuração digital no e-CAC da Receita Federal quando o fluxo automático falha. Use SEMPRE que pedir 'fazer procuração e-CAC', 'procuração RFB', 'procuração de espólio', 'representar falecido no e-CAC', 'cadastrar procuração e-CAC', 'autorização de acesso negada', 'CPF não regular procuração', 'CPF titular falecido', 'inventariante e-CAC', 'requerimentos web procuração', 'representar incapaz/menor no e-CAC'. Cobre pessoa falecida (inventário extrajudicial, judicial, sem inventário, sem bens, encerrado), incapaz (tutela/curatela), menor de 18, e adulto sem gov.br ouro/prata. Segmenta serviços a marcar por perfil tributário do outorgante (PF pura, PF autônoma com CAEPF/ISS, sócio de PJ Simples/Presumido/Real, MEI, rural). Gera textos prontos para os campos do formulário, descrição do processo, e checklist de documentos com nomes ASCII válidos. NÃO confundir com 'Cadastrar Autorização de Acesso' automática — falha para CPF de falecido ou sem gov.br ouro/prata."
---

# Procuração Digital para o e-CAC da Receita Federal

Skill operacional para gerar, assinar e protocolar **procuração digital RFB** quando o fluxo automático de "Autorização de Acesso" do e-CAC não funciona — tipicamente porque o CPF do outorgante está como "Titular Falecido", o outorgante é incapaz/menor, ou não tem conta gov.br nível ouro/prata.

A skill cobre o ciclo completo, prevê os erros mais comuns, e gera textos prontos para copiar e colar nos campos da Receita.

---

## Quando usar

Use SEMPRE que o usuário relatar qualquer um destes cenários:

| Sintoma | Diagnóstico | Caminho correto |
|---------|-------------|-----------------|
| Tela "Nova Autorização de Acesso" do e-CAC retorna **"Este CPF não pode receber autorização porque não está regular"** | CPF do outorgante está como "Titular Falecido" ou "Pendente" | Procuração Digital via Requerimentos Web |
| Usuário precisa acessar e-CAC de pessoa falecida | CPF de morto não outorga procuração pelo fluxo automático | Procuração Digital via Requerimentos Web |
| Usuário é inventariante e quer representar espólio na Receita | Mesma situação | Procuração Digital via Requerimentos Web |
| Outorgante é menor de 18, tutelado ou curatelado | gov.br exige nível ouro/prata, que pessoas sem capacidade civil não conseguem | Procuração Digital via Requerimentos Web |
| Outorgante adulto capaz, mas só tem conta gov.br bronze (sem biometria) | Fluxo automático exige ouro/prata | Procuração Digital via Requerimentos Web |

Se o caso **não** se encaixa em nenhum desses, então é fluxo automático normal — não usa esta skill.

---

## Visão Geral do Fluxo (5 etapas)

Tudo é executado pelo **procurador (outorgado)** usando a **própria conta gov.br ouro/prata** ou **certificado digital**:

```
[1] GERAR a procuração no Sistema de Procurações RFB
    URL direta: https://servicos.receita.fazenda.gov.br/Servicos/procuracoesrfb/
    → Preenche outorgante + outorgado + serviços + vigência
    → Baixa o PDF (anota o Código de Controle no fim)

[2] ASSINAR eletronicamente o PDF
    Assinador Gov.br: https://assinador.iti.br/
    → Quem assina é o REPRESENTANTE LEGAL do outorgante (não o outorgante)

[3] ABRIR processo digital no e-CAC
    e-CAC → Legislação e Processo → Requerimentos Web
    → Área: PROCURAÇÕES
    → Serviço: CADASTRAR PROCURAÇÃO PARA ACESSO AO E-CAC

[4] PREENCHER o formulário e ANEXAR documentos
    → Campo A: procuração assinada (1 arquivo)
    → Campo B: comprovantes (3+ arquivos)

[5] ENVIAR → aguardar análise (5-30 dias úteis) → ACESSAR como representante
    e-CAC → Alterar Perfil de Acesso → Procurador de pessoa física
```

---

## Workflow do Claude

### Passo 1 — Identificar o caso

Pergunta ao usuário (ou deduz do contexto):

1. **Quem é o outorgante?** (nome, CPF, RG, data de nascimento)
2. **Qual a situação do outorgante?**
   - Falecida (data do óbito, tem inventário aberto?)
   - Incapaz (tutela/curatela)
   - Menor de idade
   - Não possui conta gov.br ouro/prata
3. **Quem é o outorgado (procurador)?** (geralmente o próprio usuário — nome, CPF, RG)
4. **Qual a base legal da representação?** (escritura de inventariante, termo judicial, sentença de curatela, certidão de nascimento, etc.)
5. **Qual o perfil tributário do outorgante?** (PF pura, autônomo com CAEPF/ISS, sócio de PJ, MEI, etc.) — define quais serviços marcar
6. **Documentos disponíveis no projeto/uploads?**

### Passo 2 — Validar pré-requisitos

Antes de avançar, confirma com o usuário:

- [ ] Tem conta gov.br nível **ouro ou prata** (ou certificado digital ICP-Brasil)
- [ ] Tem o **documento de comprovação** da representação (escritura pública, termo de inventariante, termo de tutela/curatela, certidão de óbito averbada, etc.)
- [ ] Tem **identificação do outorgante** (RG, CNH, ou nº da certidão de óbito)
- [ ] Tem **identificação própria** (RG, CNH ou OAB)

### Passo 3 — Definir vigência

**Sempre 5 anos.** É o máximo permitido pela Receita. Não há motivo para colocar menos.

Data inicial: hoje (`HOJE`)
Data final: hoje + 5 anos (`HOJE+5y`)

### Passo 4 — Selecionar serviços a marcar

Consulta `references/servicos-procuracao.md` e segmenta por perfil:

- **Perfil A** — PF pura (só CPF, sem PJ, sem autonomia, sem imóvel rural)
- **Perfil B** — PF autônoma (advogado, médico, engenheiro etc. — tem CAEPF e/ou ISS municipal)
- **Perfil C** — Sócio/admin de PJ (com CNPJ vinculado)
- **Perfil D** — Empresa do Simples Nacional
- **Perfil E** — Empresa Lucro Presumido/Real
- **Perfil F** — MEI
- **Perfil G** — Proprietário de imóvel rural (ITR)

Se múltiplos perfis se aplicam, soma os serviços.

**Lista de serviços a NÃO marcar (sempre, independente do perfil):**

```
☒ Renda Variável (a menos que o outorgante tivesse comprovadamente investimentos em bolsa)
☒ Reforma Tributária CBS - Apuração Assistida e Devolução de CBS
☒ Reforma Tributária CBS - Gerar credenciais para acessar API
☒ Refri - Termo de Opção
☒ RECOB - Regime Especial de Apuração e Pagamento da Contribuição para o PIS/PASEP e COFINS
☒ Formulário Dcide-Combustíveis
☒ E-DMOV - Declaração Aduaneira de Movimentação Física de Valores
☒ Sistema de Medição de Vazão
☒ Agendamento do SAGA
☒ Piloto da CBS na Reforma Tributária sobre o Consumo
☒ SISCOSERV - Sistema Integrado de Comércio Exterior e Serviços (descontinuado em 2020)
☒ Pagamento e Parcelamento Lei nº 12.996/2014 (transação encerrada)
☒ Sistema de Leilão Eletrônico
```

**Serviços do MEI** (Parcelamento MEI, PGMEI, PERT-MEI, RELP-MEI, Agendamento Simples) — só marcar se outorgante era MEI.

**Serviços rurais** (DITR Web, PRR) — só marcar se outorgante tinha imóvel rural.

### Passo 5 — Gerar o material de preenchimento

Apresenta ao usuário, em ordem, **prontos para copiar**:

#### 5.1 — Dados do outorgante (caixa para colar)

```
Nome: [NOME COMPLETO]
CPF: [CPF formatado]
RG/Doc: [número] [órgão emissor/UF]
Data de nascimento: [DD/MM/AAAA]
[outros campos pedidos pelo formulário]
```

#### 5.2 — Dados do outorgado (caixa para colar)

```
Nome: [NOME COMPLETO]
CPF: [CPF formatado]
RG: [número] [órgão/UF]
Data de nascimento: [DD/MM/AAAA]
Endereço, telefone, e-mail
```

#### 5.3 — Vigência

```
Data inicial: [HOJE no formato DD/MM/AAAA]
Data final: [HOJE+5y no formato DD/MM/AAAA]
```

#### 5.4 — Lista de serviços (modo "por exclusão")

Se a lista de serviços a marcar é grande (>30), entrega ao contrário: **"marca tudo e desmarca estes"** (consultar `references/servicos-procuracao.md` para a lista de exclusão por perfil). É mais rápido para o usuário.

### Passo 6 — Acompanhar o protocolo

Quando o usuário começa a abrir o processo digital, guia ele passo a passo:

1. **Acesso:** e-CAC → Legislação e Processo → Requerimentos Web
2. **Solicitar Serviço via Processo Digital** (botão azul)
3. **Área de Concentração:** `PROCURAÇÕES`
4. **Serviço:** `CADASTRAR PROCURAÇÃO PARA ACESSO AO E-CAC`
5. **Tipo do Processo:** `CADASTRAR PROCURAÇÃO PARA ACESSO AO E-CAC` (selecionar no dropdown — observação: o sistema pode confundir o usuário aqui, redirecionando entre e-Processo e Requerimentos Web; ambos chegam no mesmo formulário)
6. **Telefone com DDD:** preencher
7. **Descrição:** usar texto gerado em `references/templates-textos.md`
8. **Clicar em Solicitar Serviço** → vai direto para o formulário detalhado

### Passo 7 — Preencher o Requerimentos Web

**Campos obrigatórios** (em ordem na tela):

1. **Telefone de Contato:** já preenchido na etapa anterior, mas confirma
2. **Código de Controle (5 últimos dígitos):** os 5 dígitos finais que aparecem no fim do PDF da procuração — formato típico `XXXXX.XXXXX.XXXXX.XXXXX` → pega os 5 últimos do bloco final
3. **Pessoa com deficiência física/mental?** → ver `references/decisao-prioridade.md`
4. **Prioridade inciso II?** → ver mesma referência
5. **Pessoa com doença grave?** → ver mesma referência
6. **Prioridade inciso IV?** → ver mesma referência
7. **Documentos de prioridade:** anexar laudo médico SE marcou SIM acima — caso contrário deixar vazio
8. **DECLARAÇÃO — Situação da pessoa:** marca uma das 4 opções:
   - `1. Falecida`
   - `2. Incapaz (tutelada/curatelada)`
   - `3. Menor de 18 anos`
   - `4. Não possui a conta gov.br ouro ou prata`
9. **Campo A — Anexar Solicitação de Procuração Digital assinada:** 1 arquivo (a procuração)
10. **Campo B — Anexar Comprovantes:** múltiplos arquivos (certidão de óbito + escritura/termo + RG/OAB do procurador + outros que justifiquem a situação)

### Passo 8 — Renomeação dos arquivos (CRÍTICO)

**ANTES** de anexar qualquer arquivo, validar/renomear:

- **Permitido no nome do arquivo:** letras (A-Z, a-z), números (0-9), espaço, hífen (`-`), underscore (`_`)
- **PROIBIDO:** acentos (á é í ó ú â ê ô ã õ), cedilha (ç), barras (/ \\), aspas, símbolos especiais

**Padrão recomendado de nomenclatura (sem underscore, mais limpo):**

```
procuracao RFB [nome curto] assinada.pdf
obito [nome curto].pdf
Escritura Nomeacao Inventariante.pdf
Termo Inventariante Judicial.pdf
RG [nome procurador].pdf
OAB [nome procurador].pdf
CNH [nome procurador].pdf
Termo Curatela [nome].pdf
Certidao Nascimento [nome].pdf
Declaracao Inexistencia Bens.pdf
```

**Cada anexo pede 3 campos no popup:**
- **Arquivo selecionado** (botão "Selecionar arquivo" → procurar o arquivo já renomeado)
- **Título** (texto sem acentos — limite de caracteres curto)
- **Data do Documento** (data do original — DD/MM/AAAA)
- Clica em **"Anexar"** (botão laranja)

Para o **Campo B** (Comprovantes), o usuário precisa repetir o ciclo de "Selecionar arquivo + Título + Data + Anexar" para cada um dos 3+ documentos comprobatórios.

### Passo 9 — Enviar e confirmar

1. Clica em **"Enviar Requerimento"** (botão laranja, no fim)
2. Aparece popup **"Confirmação da ação"** com aviso: *"O processamento... pode demorar alguns minutos. Não feche esta página antes de sua conclusão."*
3. Clica em **"Confirmar"** (botão laranja)
4. **NÃO FECHA A PÁGINA** durante o processamento
5. Ao final, o sistema retorna o **número do processo digital** (formato `10120.XXXXXX/AAAA-XX`)
6. **Baixar o comprovante de protocolo** (PDF)

### Passo 10 — Acompanhamento

- e-CAC → Processos Digitais → Consultar Processo
- Informa o número do processo
- Prazo médio: **5 a 30 dias úteis**
- Se rejeitado: ver despacho, corrigir, abrir **novo** processo (não dá pra emendar)

### Passo 11 — Acessar como representante (após aprovação)

- e-CAC → canto superior direito → **seta** ao lado do nome → **"Alterar perfil de acesso"**
- Campo "Procurador de pessoa física - CPF" → informa CPF do outorgante
- Clica em **"Alterar"**

---

## Regras Críticas

1. **NÃO usa a tela "Nova Autorização de Acesso" para falecido/incapaz/menor.** Ela só funciona entre vivos com gov.br ouro/prata. O caminho é sempre Requerimentos Web.

2. **NÃO redige os "Atos de manifestação de vontade" como obstáculo.** Sávio/inventariante já legitimado por escritura pública ou termo judicial pode marcar **todos** os serviços sem restrição.

3. **Vigência sempre 5 anos.** Não há razão para menos.

4. **Nome de arquivo sem acentos.** Sempre. Sem exceção. Renomear antes de anexar.

5. **Título do anexo também sem acentos.** Mesma regra do nome do arquivo.

6. **Quem assina a procuração é o REPRESENTANTE LEGAL**, não o outorgante. Isso confunde o sistema (o outorgante consta como assinante no PDF do RFB, mas a assinatura digital é do representante).

7. **Para outorgante falecido com inventário aberto**, anexar **escritura pública de nomeação de inventariante** (extrajudicial) OU **termo de inventariante** (judicial). Sem isso, o pedido é negado.

8. **Para outorgante sem bens (inventário negativo)**, anexar **certidão de inventário negativo** OU **Declaração de Inexistência de Bens a Inventariar ou Arrolar** (Anexo IX da Receita) — disponível em: `https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/formularios/modelos/anexo-ix.pdf`.

9. **Procuração com manifestação de vontade** (parcelar, confessar, impugnar) só pode ser assinada pelo **inventariante** se o outorgante é falecido. Por herdeiro só se for inventariante encerrado e sem ato de vontade.

10. **NÃO confiar no fluxo de e-Processo.** Para esse serviço específico (Cadastrar Procuração para Acesso ao e-CAC), o sistema redireciona para Requerimentos Web. Pode parecer que tu estás em uma tela diferente da que deveria — é o sistema redirecionando, não é erro.

---

## Casos Especiais — Decisão Rápida

### Caso 1 — Espólio com escritura de inventariante (caso mais comum)

```
Outorgante: o falecido
Outorgado: o inventariante
Quem assina: o inventariante
Documentos: certidão de óbito + escritura pública de nomeação + RG/OAB do inventariante
Serviços: marcar todos do perfil tributário (ver references)
Vigência: 5 anos
Situação na declaração: 1. Falecida
```

### Caso 2 — Espólio com inventário judicial em curso

```
Outorgante: o falecido
Outorgado: o inventariante (ou advogado contratado)
Quem assina: o inventariante (que recebeu termo de compromisso)
Documentos: certidão de óbito + TERMO JUDICIAL DE INVENTARIANTE + RG do inventariante
Situação: 1. Falecida
```

### Caso 3 — Espólio sem inventário aberto

```
Outorgante: o falecido
Outorgado: o administrador provisório (judicial) OU representante (escritura)
Quem assina: o administrador OU o representante
Documentos: certidão de óbito + decisão judicial OU escritura pública + RG do representante
Situação: 1. Falecida

LIMITAÇÃO: NÃO pode marcar serviços com manifestação de vontade
(parcelar, confessar, impugnar) se não há inventariante formalmente nomeado.
```

### Caso 4 — Espólio sem bens (inventário negativo)

```
Outorgante: o falecido
Outorgado: o sucessor (meeiro ou herdeiro)
Documentos: certidão de óbito + Declaração de Inexistência de Bens OU certidão de inventário negativo + RG do sucessor
Situação: 1. Falecida
```

### Caso 5 — Inventário encerrado (com partilha homologada)

```
Outorgante: o falecido
Outorgado: qualquer herdeiro contemplado
Quem assina: o herdeiro contemplado (se não envolver atos de manifestação de vontade)
            OU o inventariante (se envolver parcelar/confessar/impugnar)
Documentos: certidão de óbito + escritura de partilha OU formal de partilha + RG do herdeiro
Situação: 1. Falecida
```

### Caso 6 — Incapaz (tutela/curatela)

```
Outorgante: o incapaz
Outorgado: o tutor/curador OU advogado contratado
Quem assina: o tutor/curador
Documentos: termo de tutela/curatela (registrado no cartório) + RG do tutor/curador
Situação: 2. Incapaz (tutelada/curatelada)
```

### Caso 7 — Menor de 18 anos

```
Outorgante: o menor
Outorgado: o responsável legal (pai/mãe/tutor)
Quem assina: o responsável legal
Documentos: certidão de nascimento do menor + RG do responsável
Situação: 3. Menor de 18 anos
```

### Caso 8 — Adulto capaz sem gov.br ouro/prata

```
Outorgante: o próprio (adulto sem conta ouro/prata)
Outorgado: terceiro (ex.: contador, advogado)
Quem assina: o próprio outorgante (reconhecimento de firma em cartório ou
             elevar a conta gov.br para prata via biometria/título de eleitor)
Documentos: RG do outorgante + RG do procurador
Situação: 4. Não possui a conta gov.br ouro ou prata

OBSERVAÇÃO: nesse caso é mais fácil orientar o outorgante a elevar a própria
conta gov.br para prata (via biometria facial da CNH, vinculação bancária,
ou Título de Eleitor) e usar o fluxo automático normal. Só usar este caminho
de Requerimentos Web se a pessoa realmente não consegue elevar a conta.
```

---

## Outputs Esperados

Quando o usuário pede ajuda com procuração e-CAC, o Claude entrega:

1. **Diagnóstico do caso** (qual dos 8 cenários se aplica)
2. **Material pronto para colar nos campos** do Sistema de Procurações RFB (etapa 1)
3. **Lista de serviços a marcar** (ou a lista de exclusão se >30 itens)
4. **Lista de documentos a renomear** (com nomes ASCII válidos)
5. **Material pronto para colar nos campos** do Requerimentos Web (etapa 4)
6. **Texto da descrição do processo** (etapa 3)
7. **Templates de título e data** para cada anexo (etapa 4)
8. **Guidance passo a passo** durante a navegação (acompanhar o usuário em tempo real)

---

## Arquivos de Referência

- `references/servicos-procuracao.md` — Lista completa de serviços segmentada por perfil tributário do outorgante (qual marcar / não marcar)
- `references/troubleshooting.md` — Erros conhecidos do sistema e como evitar/contornar
- `references/templates-textos.md` — Textos prontos para descrição do processo, declarações, etc.
- `references/caso-paradigma.md` — Caso de referência (Espólio Sordi) com todas as decisões documentadas
- `references/decisao-prioridade.md` — Quando marcar SIM/NÃO nas 4 perguntas de prioridade do art. 69-A da Lei 9.784/99
