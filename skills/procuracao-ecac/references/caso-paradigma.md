# Caso Paradigma — Espólio Sordi

Caso de referência completo, com todas as decisões documentadas, para a skill consultar como exemplo concreto.

---

## Contexto

- **Outorgantes:** Vera Maria Radé Sordi (†25/07/2013) e José Baldo Bordignon Sordi (†03/05/2022) — espólios separados
- **Outorgado:** Sávio Radé Sordi (filho), CPF 764.133.730-91, OAB/RS 93.284, inventariante por escritura pública
- **Base da representação:** Escritura Pública de Nomeação de Inventariante, lavrada no 3º Tabelionato de Notas de Porto Alegre/RS, Livro 624, fls 038, em 13/10/2025
- **Demanda:** acessar e-CAC dos dois espólios para diagnóstico fiscal e regularização de declarações em atraso

---

## Trajetória do Erro

### Tentativa 1 (incorreta)

Sávio logou no e-CAC, clicou em **"Nova Autorização de Acesso"** e tentou colocar o CPF da Vera (064.588.150-34).

**Resultado:** sistema retornou:
> "Este CPF não pode receber autorização porque não está regular."

**Diagnóstico:** CPF da Vera está como "Titular Falecido" — fluxo automático não aceita.

### Tentativa 2 (correta)

Caminho do Sistema de Procurações RFB:
```
https://servicos.receita.fazenda.gov.br/Servicos/procuracoesrfb/
```

---

## Decisões Tomadas no Caso

### 1. Perfil tributário

A Vera era **advogada autônoma** (consta na certidão de óbito: "Era advogada"). Logo, perfil **PF Autônoma (B)** — tem CAEPF, possivelmente Carnê Leão, ISS municipal de POA.

O José era **aposentado** (consta: "Era aposentado"). Mas pode ter tido CNPJ ou autonomia no passado (Sávio confirmou que sim em sessão posterior). Logo perfil **C (sócio de PJ)**.

### 2. Vigência

5 anos para ambos. Data de geração: 16/05/2026 → término: 16/05/2031.

### 3. Serviços marcados

Pela complexidade de ambos os perfis (B + C, com possível PJ ativa do José), foi entregue a **lista de exclusão** — marcar tudo e desmarcar 22 itens específicos. Mais rápido para o usuário.

### 4. Prioridade na análise

**Vera:** TODOS NÃO (óbito há 12 anos, prioridade extemporânea).

**José:** doença grave SIM + inciso IV SIM (neoplasia maligna no cólon, óbito recente em 2022). Certidão de óbito serve como prova pré-constituída.

### 5. Documentos anexados

**Campo A — Procuração assinada (1 arquivo):**
- `procuracao RFB Vera assinada.pdf`

**Campo B — Comprovantes (3 arquivos):**
- `25-07-2013 obito Vera Maria Rade Sordi.pdf` (Título: "Certidao de obito Vera Maria Rade Sordi", Data: 25/07/2013)
- `Escritura Publica Nomeacao Inventariante.pdf` (Título: "Escritura Publica de Nomeacao de Inventariante", Data: 13/10/2025)
- `OAB Savio Rade Sordi.pdf` (Título: "Carteira OAB Savio Rade Sordi", Data: 26/06/2015)

### 6. Texto da Descrição do Processo

```
Cadastramento de procuracao digital para acesso ao e-CAC em nome do
espolio de VERA MARIA RADE SORDI (CPF 064.588.150-34), falecida em
25/07/2013, sendo o requerente SAVIO RADE SORDI (CPF 764.133.730-91)
o inventariante nomeado por escritura publica lavrada no 3º
Tabelionato de Notas de Porto Alegre/RS, Livro 624, fls 038, em
13/10/2025.
```

---

## Erros Reais Encontrados na Sessão

Cada um foi catalogado em `troubleshooting.md`:

1. **Erro 1.1** — Tela "Nova Autorização de Acesso" rejeitou o CPF (status "Não regular")
2. **Erro 3.1** — Sávio confundiu o redirecionamento entre e-Processo e Requerimentos Web
3. **Erro 4.1** — Tentou enviar requerimento sem anexar arquivos, sistema bloqueou
4. **Erro 4.2** — Sistema rejeitou nome de arquivo com acentos ("óbito Vera Maria Radé Sordi.pdf")
5. **Erro 4.3** — Sistema rejeitou título com acentos ("Certidão de óbito")
6. **Erro 4.5** — Popup de anexo apareceu "vazio" depois de "Sair" (comportamento normal)

---

## Dados do Caso (Cards Reutilizáveis)

### Card 1 — Outorgante 1 (Vera)

```
Nome: VERA MARIA RADE SORDI
CPF: 064.588.150-34
RG: 5006407224 SJS/RS
Data de nascimento: 07/12/1947
Data do óbito: 25/07/2013
Filiação: Jamil Antonio Moises Radé / Olivia de Campos Radé
Naturalidade: Bagé/RS
Profissão: Advogada
Certidão de óbito: matrícula 099010 01 55 2013 4 00258 046 0051392 21
  Cartório: Registro Civil da 6ª Zona de Porto Alegre/RS
  Livro C-258, Folha 46, Termo 51392
```

### Card 2 — Outorgante 2 (José)

```
Nome: JOSE BALDO BORDIGNON SORDI
CPF: 013.617.830-87
RG: 2001625033 SSP/RS (expedida 24/06/2015)
Data de nascimento: 31/01/1948
Data do óbito: 03/05/2022
Filiação: Antonio Sordi / Deonilda Baldo Sordi
Naturalidade: Muçum/RS
Profissão: Aposentado
Certidão de óbito: matrícula 100024 01 55 2022 4 00605 010 0192573 82
  Cartório: 2º Ofício do Registro Civil de Porto Alegre/RS
  Livro C-605, Folha 10, Termo 192573
Causa da morte: Neoplasia maligna colon rigmoide (relevante para prioridade)
```

### Card 3 — Outorgado (Sávio)

```
Nome: SAVIO RADE SORDI
CPF: 764.133.730-91
RG: 6059877404 SSP/RS
Data de nascimento: 03/01/1977
OAB/RS: 93.284
CRC/RS: 102812/O-6
Endereço: R. Gen. Andrade Neves, 100, sala 901, Centro Histórico, Porto Alegre/RS
CEP: 90010-210
E-mail: advogados@rs-adv.com (escritório) / savio@radecontabil.com (contabilidade)
Telefone: (51) 99518-3878
```

### Card 4 — Escritura de Nomeação (válida para ambos os espólios)

```
Documento: Escritura Pública de Nomeação de Inventariante
Tabelionato: 3º Tabelionato de Notas de Porto Alegre/RS
Livro: 624
Folha: 038
Número: 020-69.526
Data: 13/10/2025
Plataforma: e-Notariado (assinaturas digitais ICP-Brasil)
Código de validação: FV3C7-M7VC5-DKYUJ-U48A3
Matrícula Notarial Eletrônica: 104067.2025.10.13.00006024-37

Comparecentes:
- HADIGE RADE SORDI (CPF 940.506.860-15) — herdeira
- SAVIO RADE SORDI (CPF 764.133.730-91) — herdeiro e inventariante nomeado
- MARIA RITA CEZIMBRA (CPF 443.236.620-68) — companheira do José
- JULIANA ALVES RODRIGUES (CPF 928.400.000-91, OAB/RS 62.221) — assistência jurídica

Nomeia inventariante: SAVIO RADE SORDI (art. 617 CPC, art. 902 CNNR)
Para os espólios de: VERA MARIA RADE SORDI e JOSE BALDO BORDIGNON SORDI
```

---

## Como Esta Skill Usa o Caso Paradigma

Quando outro usuário pedir ajuda com procuração para espólio, a skill pode:

1. **Comparar o cenário** com o caso Sordi para identificar similaridades
2. **Reusar templates de texto** trocando apenas os dados nominais
3. **Antecipar erros** (acentos em nomes, redirecionamento e-Processo/RW, etc.)
4. **Validar pré-requisitos** com o mesmo checklist (escritura, gov.br ouro/prata, documentos)
5. **Sugerir prioridade** baseada na causa da morte (igual ao caso José)

O caso Sordi é a **fonte primária de validação operacional** desta skill — todos os passos descritos no SKILL.md foram testados nele.
