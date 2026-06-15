# Troubleshooting — Erros Conhecidos no Fluxo de Procuração RFB

Catálogo de erros encontrados em uso real do sistema, com diagnóstico e solução. Esta lista é a "memória de cicatrizes" da skill — cada item aqui representa um erro que custou tempo em alguma sessão.

---

## Bloco 1 — Erros na geração da procuração (Sistema de Procurações RFB)

### Erro 1.1 — "Este CPF não pode receber autorização porque não está regular"

**Onde aparece:** tela "Nova Autorização de Acesso" dentro do e-CAC, no campo "Pessoa Autorizada".

**Causa:** o usuário está no caminho ERRADO. Esse fluxo é o automático, que só funciona quando outorgante é vivo, capaz, e tem gov.br ouro/prata.

**Solução:** sair dessa tela. Ir direto para o **Sistema de Procurações RFB**:
```
https://servicos.receita.fazenda.gov.br/Servicos/procuracoesrfb/
```

### Erro 1.2 — Usuário não encontra "Procuração Digital para falecido" na busca do gov.br

**Onde aparece:** ao pesquisar "procuração digital para" no portal da Receita, só aparecem 2 resultados, ambos do fluxo automático.

**Causa:** o serviço para falecido não tem entrada própria na busca — está dentro do mesmo serviço "Cadastrar Autorização de Acesso (Procuração Digital)", mas usa outra URL.

**Solução:** orientar URL direta (igual ao erro 1.1).

### Erro 1.3 — Usuário tenta acessar o e-CAC logado como o falecido

**Sintoma:** "como entro na conta gov.br dele?"

**Causa:** confusão sobre quem deve estar logado.

**Esclarecimento crítico:** o **procurador** (outorgado, vivo, capaz) é quem loga no sistema com a **própria** conta gov.br. O outorgante falecido **não loga em lugar nenhum**. A representação se materializa via documento (procuração + comprovação de representação legal).

---

## Bloco 2 — Erros na assinatura eletrônica

### Erro 2.1 — Tenta assinar pelo certificado digital do falecido

**Causa:** o falecido tinha um e-CPF antes de morrer, e o procurador acha que pode usar.

**Solução:** **NÃO USAR.** Certificado digital de pessoa falecida não tem validade jurídica para atos novos. Sempre assinar com a conta gov.br **do procurador**.

### Erro 2.2 — Conta gov.br do procurador é só bronze

**Sintoma:** Assinador Gov.br não permite assinar.

**Solução:** elevar a conta para prata (mais fácil) ou ouro:
- **Prata:** via biometria facial CNH ou Título de Eleitor, ou vinculação bancária (Itaú, Banrisul, BB, Caixa etc.)
- **Ouro:** via certificado digital ICP-Brasil ou biometria facial TSE

---

## Bloco 3 — Erros na abertura do processo digital

### Erro 3.1 — Usuário confunde e-Processo com Requerimentos Web

**Sintoma:** clica no menu "Processos Digitais (e-Processo)" e vê tela diferente do que o tutorial diz. Pergunta "é em outra tela?"

**Causa:** para o serviço **"Cadastrar Procuração para Acesso ao e-CAC"**, o e-Processo redireciona automaticamente para o **Requerimentos Web** quando o usuário seleciona o tipo de processo no dropdown. Os dois sistemas são integrados para este caso.

**Solução:** explicar que é o **mesmo destino**. Não importa por qual menu chegou:
- Caminho A: `e-CAC → Legislação e Processo → Requerimentos Web → PROCURAÇÕES → CADASTRAR PROCURAÇÃO`
- Caminho B: `e-CAC → Processos Digitais (e-Processo) → Solicitar Serviço → PROCURAÇÕES → CADASTRAR PROCURAÇÃO`

Ambos terminam na mesma tela. Seguir o preenchimento normalmente.

### Erro 3.2 — Não encontra o campo "Tipo do Processo"

**Sintoma:** está em tela do e-Processo, vê só "Área de Concentração" e "Serviço", mas "Tipo do Processo" e "Subtipo" aparecem em branco.

**Causa:** esses campos só são preenchidos APÓS selecionar Área e Serviço, ou são preenchidos automaticamente pelo sistema.

**Solução:** se não aparecer dropdown ativo, ignorar e clicar em "Solicitar Serviço" — o sistema preenche sozinho ou pula esses campos.

---

## Bloco 4 — Erros no preenchimento do Requerimentos Web

### Erro 4.1 — Erro silencioso ao enviar sem anexar arquivos

**Sintoma:** clica "Enviar Requerimento", a tela rola para o topo, aparecem dois avisos laranjas:
```
⚠ É necessário anexar pelo menos um arquivo para o documento
  Solicitação de Procuração Digital assinada antes de enviar este requerimento.
⚠ Informação obrigatória.
```

**Causa:** o usuário pulou os campos de anexo, OU pulou a marcação da "Situação da pessoa" no bloco DECLARAÇÃO.

**Solução:** rolar a página até o fim, garantir:
- Marcou a opção 1, 2, 3 ou 4 em "Situação da pessoa"
- Anexou pelo menos 1 arquivo no **Campo A** (procuração assinada)
- Anexou pelo menos 1 arquivo no **Campo B** (comprovantes)

### Erro 4.2 — Sistema rejeita nome do arquivo

**Sintoma:** popup de anexo retorna aviso:
```
⚠ O nome do arquivo selecionado possui caracteres inválidos
  (caracteres permitidos: letras, números, espaço em branco, '-' e '_').
  Renomeie o arquivo e tente novamente.
```

**Causa:** nome do arquivo contém **acento** (á é í ó ú â ê ô ã õ), **cedilha** (ç), **barras** (/ \\), **aspas**, ou **símbolos especiais**.

**Solução:** renomear o arquivo no computador ANTES de subir. Substituir:
| Acento | Substituir por |
|--------|----------------|
| á â ã | a |
| é ê | e |
| í | i |
| ó ô õ | o |
| ú | u |
| ç | c |
| Á Â Ã | A |
| É Ê | E |
| Í | I |
| Ó Ô Õ | O |
| Ú | U |
| Ç | C |

**Exemplos antes/depois:**
```
"óbito Vera Maria Radé Sordi.pdf" → "obito Vera Maria Rade Sordi.pdf"
"Escritura pública de nomeação.pdf" → "Escritura Publica de Nomeacao.pdf"
"procuração Receita Federal.pdf" → "procuracao Receita Federal.pdf"
```

### Erro 4.3 — Sistema rejeita título do anexo

**Mesmo erro 4.2**, mas no campo **Título** do popup (não no nome do arquivo). Regra é igual.

**Exemplos:**
```
"Certidão de óbito" → "Certidao de obito"
"Escritura Pública de Nomeação de Inventariante" → "Escritura Publica de Nomeacao de Inventariante"
"Carteira da OAB" → "Carteira OAB"
```

### Erro 4.4 — Underscore aparentemente proibido (não é)

**Sintoma:** usuário acha que o aviso de "caracteres inválidos" também bloqueia underscore.

**Esclarecimento:** o aviso diz literalmente *"caracteres permitidos: letras, números, espaço em branco, '-' e '_'"*. Underscore é PERMITIDO.

**Mas:** se o usuário preferir nomes só com hífen e espaço, funciona igual. Não é obrigatório usar underscore.

### Erro 4.5 — Tela de anexo "vazia" depois de fechar e reabrir

**Sintoma:** o usuário aborta um upload (clica em "Sair"), volta a clicar em "Anexar Comprovantes", e o popup aparece sem campos de Título e Data — só "Selecionar arquivo".

**Causa:** comportamento normal — só aparece o botão de seleção até o usuário escolher um arquivo. Depois de selecionado, os campos Título e Data aparecem.

**Solução:** clicar em **"Selecionar arquivo"** primeiro, escolher o arquivo, e aí os campos aparecem.

### Erro 4.6 — Múltiplos arquivos no Campo B

**Sintoma:** o usuário pergunta se precisa juntar todos os comprovantes em um único PDF.

**Esclarecimento:** **NÃO**. O Campo B (Comprovantes) aceita **vários anexos separados**. Após anexar o 1º arquivo, clicar de novo em "Anexar Comprovantes" e repetir o ciclo: Selecionar arquivo + Título + Data + Anexar.

**Recomendação:** subir cada comprovante separado, com título descritivo. Facilita análise do servidor da Receita.

### Erro 4.7 — Campo A só aceita 1 arquivo

**Esclarecimento contrário ao 4.6:** o **Campo A** ("Anexar Solicitação de Procuração Digital assinada") aceita **só 1 arquivo** (a procuração assinada). Se o usuário tentar subir outro, sobrescreve o anterior.

### Erro 4.8 — Código de Controle errado

**Sintoma:** processo é deferido inicialmente, mas depois é rejeitado por "código de controle inválido".

**Causa:** o usuário digitou os 5 últimos dígitos errados — confundiu com os 5 primeiros, ou copiou caracteres adicionais.

**Solução:** o Código de Controle aparece no **rodapé do PDF da procuração assinada**, no formato:
```
CÓDIGO DE CONTROLE: XXXXX.XXXXX.XXXXX.XXXXX
```

Os "5 últimos dígitos" são os 5 caracteres finais (geralmente alfanuméricos, ex.: `61E16`, `A9F37`).

**Atenção:** pode ser letra + número misturados (hexadecimal). Não é só dígitos numéricos.

---

## Bloco 5 — Erros no envio

### Erro 5.1 — Usuário fecha a página durante o processamento

**Sintoma:** popup de Confirmação avisa: *"O processamento... pode demorar alguns minutos. Não feche esta página antes de sua conclusão."*

Usuário fecha mesmo assim → o processo não é finalizado → tem que começar tudo de novo.

**Solução preventiva:** AVISAR explicitamente antes de o usuário clicar em "Confirmar". Deixar claro que pode levar **alguns minutos** e a página NÃO pode ser fechada.

### Erro 5.2 — Sessão expirou durante o preenchimento

**Causa:** usuário demora muito preenchendo o formulário (especialmente nos anexos) e a sessão do e-CAC expira (timeout ~15-30 min sem atividade).

**Solução:** manter uma aba secundária ativa no e-CAC durante o preenchimento, ou ter todos os documentos prontos (renomeados, com dados de título e data anotados) antes de começar o preenchimento.

---

## Bloco 6 — Erros pós-protocolo

### Erro 6.1 — Processo rejeitado por documentação insuficiente

**Causa típica:** anexou a procuração e o óbito, mas esqueceu a escritura/termo de inventariante. O servidor não tem como confirmar que tu é inventariante.

**Solução:** o despacho de rejeição aparece no acompanhamento do processo (e-CAC → Processos Digitais → Consultar). Lê o despacho, corrige a falha (anexa documento faltante) e abre **NOVO processo** — não dá para emendar o anterior.

### Erro 6.2 — Processo deferido, mas usuário não consegue acessar e-CAC do falecido

**Causa:** o usuário entrou no e-CAC normalmente (como ele mesmo) e procurou "espólio" no menu — não está lá.

**Solução:** o acesso é via "**Alterar Perfil de Acesso**":
- Canto superior direito do e-CAC, ao lado do nome do usuário
- Clicar na **seta** ▼
- Selecionar **"Alterar perfil de acesso"**
- Em **"Procurador de pessoa física - CPF"**, digitar o CPF do falecido
- Clicar em **"Alterar"**

A partir daí, está navegando como representante. Para voltar ao próprio perfil, mesmo caminho mas escolhe "Titular".

### Erro 6.3 — CPF do falecido aparece como "Pendente de Regularização" mesmo após anos do óbito

**Causa:** ninguém comunicou o óbito à Receita Federal, e nenhum ente público o fez automaticamente.

**Solução:** antes (ou em paralelo) de protocolar a procuração, abrir outro processo de **Atualização Cadastral de CPF** anexando a certidão de óbito. Isso muda o status para "Titular Falecido" e regulariza a base.

---

## Bloco 7 — Erros conceituais sobre o caminho

### Erro 7.1 — Usuário insiste em usar o fluxo automático

**Sintoma:** após o erro 1.1, o usuário volta a tentar o mesmo caminho automático, achando que vai funcionar dessa vez.

**Esclarecimento dogmático:** o sistema **nunca** vai aceitar CPF de falecido no fluxo automático. É uma trava sistêmica, não erro pontual. **Sempre** Requerimentos Web.

### Erro 7.2 — Usuário acha que precisa abrir inventário formal antes de procurar a Receita

**Esclarecimento:** **NÃO precisa**. A Receita aceita:
- Escritura pública de nomeação de inventariante (extrajudicial) — mesmo que ainda não tenha sido feito o inventário em si
- Termo judicial de inventariante (se já foi nomeado em ação de inventário)
- Decisão judicial de nomeação de administrador provisório (se inventário ainda não foi aberto e tem urgência)

Basta UMA dessas. O inventário em si (a partilha) é independente e pode tramitar em paralelo.

### Erro 7.3 — Procurador é o próprio inventariante e acha que tem conflito

**Esclarecimento:** **não tem conflito.** O inventariante pode legalmente outorgar procuração para si mesmo como pessoa física natural. O CPF do procurador (pessoa natural) é diferente da função jurídica do inventariante. A Receita aceita normalmente.

---

## Checklist de "vai dar certo na primeira" antes do protocolo

Antes de o usuário clicar em "Solicitar Serviço" no e-CAC, validar **TODOS** estes itens:

- [ ] PDF da procuração gerado e baixado (do Sistema de Procurações RFB)
- [ ] PDF da procuração **assinado eletronicamente** (no Assinador Gov.br ou ICP-Brasil)
- [ ] Os **5 últimos dígitos** do Código de Controle anotados (formato alfanumérico)
- [ ] Certidão de óbito (ou termo de tutela/curatela, ou certidão de nascimento) em mãos
- [ ] **Escritura pública** OU **termo judicial** de nomeação de inventariante/administrador/curador em mãos
- [ ] Documento de identificação do **procurador** (RG/CNH/OAB)
- [ ] **TODOS** os arquivos renomeados sem acentos, ç, /, \\, aspas
- [ ] **Títulos** preparados (sem acentos) para cada anexo
- [ ] **Datas** de cada documento anotadas (DD/MM/AAAA)
- [ ] Conta gov.br do procurador é **ouro ou prata** (não bronze)
- [ ] Telefone de contato à mão
- [ ] **Decisão pré-tomada** sobre cada uma das 4 perguntas de prioridade (deficiência, doença grave)
- [ ] **Decisão pré-tomada** sobre qual das 4 situações da declaração marcar
- [ ] Texto de descrição do processo escrito e copiado (se aplicável)
- [ ] Sessão do e-CAC com início recente (menos de 10 min) para evitar timeout

Se TODOS os 13 itens estão prontos, o protocolo deve sair em uma sessão sem retrabalho.
