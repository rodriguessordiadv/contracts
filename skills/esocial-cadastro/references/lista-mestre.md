# Lista-Mestre de Campos — Cadastro eSocial de Empregado

Referência detalhada de todos os campos exigidos no cadastro de empregado novo, cruzando o **formulário Google Forms do escritório** com as **8 telas do sistema de folha**.

**Legenda:**
- 🟢 **Obrigatório eSocial** — sem ele, o S-2200 é rejeitado
- 🟡 **Recomendado** — não obrigatório, mas necessário operacionalmente
- 🔵 **Condicional** — só pedir conforme regra (ver SKILL.md, seção "Lógica Condicional")
- ⚠️ **Campo crítico** — validar com atenção

---

## Bloco 1 — Empresa Contratante

| Campo | Tipo | Origem | Tela do sistema |
|-------|------|--------|-----------------|
| Razão social | 🟢 | Form atual | (cabeçalho do cadastro) |
| Endereço completo | 🟢 | Form atual | — |
| CNPJ | 🟢 ⚠️ | Form atual | "Serviço" (tela 1) |

---

## Bloco 2 — Identificação do Empregado

| Campo | Tipo | Origem | Tela |
|-------|------|--------|------|
| Nome completo | 🟢 | Form atual | tela 1, 5, 6, 7, 8 |
| Nome social | 🟡 | **Adicionar** | tela 8 |
| Data de nascimento | 🟢 | Form atual | tela 7 |
| Naturalidade — cidade | 🟢 | Form atual | tela 7 |
| Naturalidade — UF | 🟢 | Form atual (parcial) | tela 7 |
| País de nascimento | 🟢 | **Adicionar** | tela 7 (default Brasil) |
| Nacionalidade | 🟢 | Form atual | tela 7 |
| Sexo | 🟢 | Form atual | tela 8 |
| Raça/cor | 🟢 | Form atual | tela 8 |
| Estado civil | 🟢 | Form atual | tela 8 |
| Nome do cônjuge | 🔵 | **Adicionar** | tela 8 (se casado/UE) |
| Regime de bens | 🔵 | **Adicionar** | tela 8 (se casado) |
| Escolaridade / grau de instrução | 🟢 | Form atual | tela 8 |
| Filiação — pai | 🟢 | Form atual | tela 7 |
| Filiação — mãe | 🟢 | Form atual | tela 7 |
| Deficiência (tipo e CID) | 🔵 | **Adicionar** | tela 8 (aba Deficiência) |
| Aposentado? | 🔵 | **Adicionar** | tela 8 |
| Grupo sanguíneo / RH | 🟡 | **Adicionar** | tela 8 |

---

## Bloco 3 — Documentos Pessoais

| Campo | Tipo | Origem | Tela |
|-------|------|--------|------|
| **CPF** ⚠️ | 🟢 | Form atual | tela 1 |
| RG — número | 🟢 | Form atual | tela 5 |
| RG — órgão expedidor | 🟢 | Form atual | tela 5 |
| RG — UF | 🟢 | Form atual | tela 5 |
| RG — data de expedição | 🟢 | Form atual | tela 5 |
| **PIS/PASEP/NIS** ⚠️ | 🟢 | Form atual | tela 1 |
| CTPS — número | 🟢 | Form atual | (Demais Documentos) |
| CTPS — série | 🟢 | Form atual | — |
| CTPS — UF | 🟢 | Form atual | — |
| Título de eleitor | 🟢 | Form atual | — |
| Certificado de reservista | 🔵 | Form atual | — (se masc. 18-45) |
| CNH | 🔵 | **Adicionar** | — (se cargo exigir) |
| Certidão civil (nasc./casamento) | 🔵 | **Adicionar** | tela 8 |
| NIF (estrangeiros) | 🔵 | **Adicionar** | tela 5 |

---

## Bloco 4 — Endereço Residencial

| Campo | Tipo | Origem | Tela |
|-------|------|--------|------|
| CEP | 🟢 | Form atual | tela 6 |
| Tipo de logradouro | 🟢 | Form atual | tela 6 |
| Logradouro | 🟢 | Form atual | tela 6 |
| Número | 🟢 | Form atual | tela 6 |
| Complemento | 🟡 | Form atual | tela 6 |
| Bairro | 🟢 | Form atual | tela 6 |
| Município | 🟢 | Form atual | tela 6 |
| UF | 🟢 | Form atual | tela 6 |
| País | 🟢 | **Adicionar** | tela 6 (default Brasil) |
| Residência própria? | 🔵 | **Adicionar** | tela 6 (impacto IRRF) |
| Imóvel adquirido via FGTS? | 🔵 | **Adicionar** | tela 6 |
| Residente/domiciliado no exterior? | 🔵 | **Adicionar** | tela 6 |

---

## Bloco 5 — Contato

| Campo | Tipo | Origem | Tela |
|-------|------|--------|------|
| E-mail principal | 🟡 | **Adicionar** | tela 6 |
| E-mail alternativo | 🟡 | **Adicionar** | tela 6 |
| Telefone residencial | 🟡 | **Adicionar** | tela 6 |
| Celular | 🟡 | **Adicionar** | tela 6 |

> Por que importa: sem e-mail, fica inviável mandar holerite eletrônico, comunicação de férias, comunicação de demissão, contracheque, etc.

---

## Bloco 6 — Dependentes

Para **cada** dependente declarado:

| Campo | Tipo | Origem |
|-------|------|--------|
| Nome completo | 🔵 | Form atual |
| Data de nascimento | 🔵 | Form atual |
| CPF | 🔵 | Form atual |
| Grau de parentesco | 🔵 | **Adicionar** |
| Dependente para IRRF? | 🔵 | **Adicionar** |
| Dependente para salário-família? | 🔵 | **Adicionar** |
| Dependente para plano de saúde? | 🔵 | **Adicionar** |

**Regras de elegibilidade:**
- **Salário-família** — filho até 14 anos (ou inválido de qualquer idade), salário do empregado dentro da faixa-teto da Portaria anual do MTE.
- **IRRF** — filho até 21 anos (ou 24 se universitário/técnico), cônjuge/companheiro com declaração, pais com renda até o limite isento, etc. (ver art. 35 Lei 9.250/95).
- **Plano de saúde** — depende da regra da operadora; geralmente cônjuge + filhos até 21/24.

---

## Bloco 7 — Dados Contratuais

| Campo | Tipo | Origem | Tela |
|-------|------|--------|------|
| Data de admissão ⚠️ | 🟢 | Form atual | tela 1 |
| Cargo (função) | 🟢 | Form atual | tela 1 |
| **CBO** ⚠️ | 🟢 | Form atual | tela 1 |
| Descrição das atividades | 🟢 | Form atual | — |
| Salário bruto | 🟢 | Form atual | tela 1 |
| Forma de pagamento (periodicidade) | 🟢 | **Adicionar** | tela 1 ("Mensalista") |
| Categoria eSocial | 🟢 | **Adicionar** | tela 1 (101/104/111/...) |
| Vínculo empregatício | 🟢 | **Adicionar** | tela 1 ("Celetista") |
| Tipo de contrato | 🟢 | Form atual | (45+45 / Indeterminado) |
| Local de trabalho | 🟡 | **Adicionar** | tela 2 |
| Departamento | 🟡 | **Adicionar** | tela 1 |
| Centro de custo | 🟡 | **Adicionar** | tela 1 |

### Categorias eSocial principais

| Código | Descrição |
|--------|-----------|
| 101 | Empregado — Geral, exceto doméstico e aprendiz |
| 102 | Empregado — Trabalhador rural por pequeno prazo |
| 103 | Empregado — Aprendiz |
| 104 | Empregado — Doméstico |
| 105 | Empregado — Contrato a termo firmado nos termos da Lei 9.601/98 |
| 106 | Trabalhador temporário (Lei 6.019/74) |
| 111 | Empregado — Dirigente sindical |
| 201 | Trabalhador avulso portuário |
| 721 | Contribuinte individual — Diretor não-empregado com FGTS |
| 722 | Contribuinte individual — Diretor não-empregado sem FGTS |

---

## Bloco 8 — Jornada de Trabalho

| Campo | Tipo | Origem | Tela |
|-------|------|--------|------|
| Modalidade (presencial/HO/híbrida) | 🟢 | Form atual | tela 1 |
| Horário entrada seg-sex | 🟢 | Form atual | — |
| Intervalo (saída) seg-sex | 🟢 | Form atual | — |
| Intervalo (retorno) seg-sex | 🟢 | Form atual | — |
| Horário saída seg-sex | 🟢 | Form atual | — |
| Horário sábado (ou compensado) | 🟢 | Form atual | — |
| Dia(s) de folga semanal | 🟢 | Form atual | — |
| Carga horária mensal | 🟢 | **Adicionar** | tela 3 (220h) |
| Carga horária semanal | 🟢 | **Adicionar** | tela 3 (44h) |
| Carga horária diária | 🟢 | **Adicionar** | tela 3 (7,33h) |
| Carga horária variável? | 🔵 | **Adicionar** | tela 3 |
| Usa cartão-ponto? | 🟡 | **Adicionar** | tela 3 |
| Banco de horas / horas compensadas | 🔵 | **Adicionar** | tela 3 |
| Isenção art. 62, II CLT? | 🔵 | **Adicionar** | (se cargo de confiança) |

---

## Bloco 9 — Remuneração: Benefícios e Descontos

| Campo | Tipo | Origem |
|-------|------|--------|
| Recebe adiantamento (vale)? | 🟢 | Form atual |
| Dia do adiantamento | 🔵 | Form atual |
| Insalubridade — grau (10/20/40%) | 🔵 | Form atual |
| **Periculosidade (30%)** ⚠️ | 🔵 | **Adicionar** |
| Vale-transporte? | 🟢 | Form atual |
| VT — qtde passagens/dia | 🔵 | Form atual |
| VT — valor unitário | 🔵 | Form atual |
| VT — observações (baldeação) | 🔵 | Form atual |
| Vale-refeição / alimentação | 🟡 | **Adicionar** |
| Plano de saúde — operadora | 🔵 | **Adicionar** |
| Plano de saúde — valor | 🔵 | **Adicionar** |
| Empresa optante do PAT? | 🟡 | **Adicionar** |

---

## Bloco 10 — Dados Bancários / PIX

| Campo | Tipo | Origem | Tela |
|-------|------|--------|------|
| Instituição financeira (nome + código) | 🟡 | Form atual | tela 3 |
| Agência (4 dígitos) | 🟡 | Form atual | tela 3 |
| Conta + dígito | 🟡 | Form atual | tela 3 |
| Tipo de conta | 🟡 | **Adicionar** | tela 3 (Corr/Pop/Salário) |
| PIX — tipo de chave | 🟡 | Form atual | — |
| PIX — chave | 🟡 | Form atual | — |

---

## Bloco 11 — Sindicato

| Campo | Tipo | Origem | Tela |
|-------|------|--------|------|
| Sindicato de registro | 🟢 | Form atual | tela 1 |
| Convenção coletiva aplicável | 🟢 | **Adicionar** | tela 1 |
| Sindicalizado? | 🟡 | **Adicionar** | tela 4 |
| Piso salarial da categoria | 🟡 | **Adicionar** | tela 4 |
| Piso salarial em experiência | 🟡 | **Adicionar** | tela 4 |
| Autoriza desconto contribuição sindical? | 🔵 ⚠️ | **Adicionar** | tela 4 |

> ⚠️ **Reforma Trabalhista (Lei 13.467/2017):** a contribuição sindical só pode ser descontada com autorização **expressa e individual** do empregado. Sem essa autorização, não desconta — STF reafirmou em 2018 (ADIs 5794, 5810, 5811, 5813, 5815).

---

## Bloco 12 — FGTS

| Campo | Tipo | Origem | Tela |
|-------|------|--------|------|
| Optante do FGTS? | 🟢 | **Adicionar** | tela 3 (sempre Sim para celetista) |
| Data de opção | 🟢 | **Adicionar** | tela 3 (= data de admissão) |

---

## Bloco 13 — Saúde Ocupacional (ASO)

| Campo | Tipo | Origem |
|-------|------|--------|
| Data do ASO admissional ⚠️ | 🟢 | Form atual |
| Resultado (apto/inapto) | 🟢 | **Adicionar** |
| Nome do médico examinador | 🟡 | **Adicionar** |
| CRM do médico | 🟡 | **Adicionar** |
| CNPJ da clínica | 🟡 | **Adicionar** |
| PCMSO atualizado | 🟡 | **Adicionar** |
| PGR atualizado | 🟡 | **Adicionar** |

> ⚠️ **NR-7:** o ASO admissional deve ser realizado **antes** da admissão. Data do ASO ≤ data de admissão. Empresa que admite sem ASO está em infração administrativa (multa) e o ato pode ser anulado.

---

## Bloco 14 — Específico de Sócio (Pró-labore)

Quando o cadastrado é **sócio** da empresa (não empregado celetista):

| Campo | Tipo | Observação |
|-------|------|------------|
| Data de entrada no quadro social | 🟢 | Bater com o contrato social / JUCISRS |
| Função: "sócio" | 🟢 | Texto literal |
| Pró-labore (salário) | 🟢 | Não pode ser zero; mínimo R$ 1,00 simbólico ou valor real |
| Categoria eSocial | 🟢 | 721 (com FGTS) ou 722 (sem FGTS) |
| Vínculo | 🟢 | Contribuinte individual |

**Não se aplica** ao sócio:
- Jornada de trabalho
- Vale-transporte
- Adiantamento
- Insalubridade / Periculosidade
- Sindicato
- FGTS (salvo opção expressa — categoria 721)
- Férias / 13º salário (sócio não tem)

> ⚠️ **Cuidado eSocial:** pró-labore tem evento próprio (S-1200) e contribuição previdenciária do sócio é 11% (Lei 8.212/91, art. 21).

---

## Tabela de campos a INCLUIR no Google Forms atual

Os 10 campos mais críticos que estão faltando no formulário atual e que vale a pena incorporar:

1. E-mail e celular do empregado
2. Nome social, deficiência (e CID), grau de parentesco dos dependentes
3. Periculosidade (além da insalubridade)
4. Tipo de conta bancária (corrente/poupança/salário)
5. Vale-refeição/alimentação e plano de saúde
6. Autorização expressa de desconto sindical
7. Residência própria / imóvel adquirido com FGTS (IRRF)
8. Cônjuge e regime de bens (se casado/UE)
9. Carga horária mensal/semanal/diária explícita
10. Dados da clínica do ASO (médico + CNPJ + CRM)
