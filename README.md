# Skills Sávio Radé Sordi — Bundle Completo

Coleção de skills personalizadas para os fluxos Rodrigues & Sordi Advogados,
RadéC Contabilidade, BHS Empreendimentos e iCT.

## Conteúdo (14 skills)

| Skill | Finalidade |
|---|---|
| `rs-advogados` | Peças jurídicas .docx no padrão R&S (Book Antiqua, ABNT) |
| `rs-cobrancas` | Fechamento de horas e cobranças do escritório |
| `radec-contabilidade` | Documentos contábeis/tributários RadéC |
| `irpf` | Condução de Declaração de Ajuste Anual no PGD |
| `irpf-fillup` | Widget interativo de preenchimento do PGD |
| `procuracao-ecac` | Procuração digital no e-CAC |
| `esocial-cadastro` | Cadastro de empregado novo no eSocial |
| `certificados-radec` | Operação de certificados digitais RadéC |
| `nibo` | Operação do Nibo Contador (tarefas e atendimento) |
| `previdenciario-bruno-rs` | Laudos e cartas previdenciárias (parceria Bruno) |
| `prime` | Framework de análise estruturada (Purpose/Research/Interview/Mechanics/Examples) |
| `onenote` | Página de resumo executivo para OneNote |
| `recap` | Arquivo .md de transição de contexto entre chats |
| `sotaque-savio` | Voz e estilo de escrita do Sávio |

## Como instalar

### Opção A — script automático
Em uma máquina/ambiente com diretório de skills do usuário:
```bash
bash install.sh /caminho/destino/skills
```
Se nenhum caminho for informado, usa `/mnt/skills/user` por padrão.

### Opção B — manual
Descompacte o bundle e copie a pasta `skills/` (ou skills individuais)
para o diretório de skills do seu ambiente Claude.

## Padrão de Contratos (CNTR)

Os skills `rs-advogados` e `radec-contabilidade` incluem o padrão **CNTR** de
numeração e layout de contratos:

- Número `CNTRNNNNNN` (ex.: `CNTR000262`); antes de gerar, **perguntar sempre** o
  número e em qual lista registrá-lo (nunca presumir o próximo).
- Contrato: página 1 sem cabeçalho; pág. 2+ com `Título | CNTRNNNNNN`; rodapé com
  número à esquerda e `Página X de Y` à direita, **sem** dados institucionais.
- **Escopo crítico:** o layout sem-cabeçalho vale **só para contratos**. Peças
  forenses (petição, contestação, agravo etc.) mantêm o cabeçalho institucional
  Rodrigues & Sordi.

Detalhes em cada `SKILL.md` (seção "Numeração e Layout de Contratos") e no
respectivo `references/formatting-spec.md` (seção "Contratos — Layout CNTR").

## Versão
Gerado em: 2026-06-15
