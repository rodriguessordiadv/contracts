# Template da Ficha Final (.md)

Este é o modelo padrão da ficha entregue ao final do processo. Salvar em `/mnt/user-data/outputs/ficha_irpf_[nome_slug]_[exercicio].md`.

## Estrutura

Frontmatter YAML + 15 seções em markdown.

### Frontmatter

```yaml
---
cliente: [Nome completo]
cpf: [xxx.xxx.xxx-xx]
exercicio: [aaaa]
ano_calendario: [aaaa]
tipo_declaracao: [Original | Retificadora]
modalidade: [Desconto simplificado (20%) | Completa]
recibo_anterior: [nº ou "primeira declaração"]
cenario_operacional: [COM gov.br | SEM gov.br | HÍBRIDO]
status: [Rascunho pronto para transmissão | Transmitida em dd/mm/aaaa | Aguardando dados | Retificada]
data_ficha: [dd/mm/aaaa]
---
```

### Corpo da ficha

```markdown
# IRPF [NOME EM CAIXA ALTA] — EXERCÍCIO [aaaa]

## 1. Identificação do contribuinte

Tabela com: nome, CPF, nascimento, endereço, telefone, e-mail, estado civil, dependentes, ocupação, doença grave declarada.

## 2. Mudança estrutural do ano (se houver)

Bloco em prosa descrevendo se houve alteração relevante (mudou de empresa, aposentou, abriu MEI, casou, viuvou, comprou imóvel, etc.). Se nada estrutural, omitir esta seção ou escrever "Sem mudança estrutural relevante em relação ao exercício anterior".

## 3. Rendimentos tributáveis de PJ — Titular

Tabela com cada fonte: nome, CNPJ, rendimentos, contribuição previdenciária, IRRF, 13º, IRRF 13º. Linha de TOTAL.

## 4. Rendimentos tributáveis de PF e Exterior

Tabela com cada pagador. Se sem informações, "Sem informações".

## 5. Rendimentos isentos e não tributáveis

Tabela com cada categoria e valor.

## 6. Rendimentos sujeitos à tributação exclusiva/definitiva

Tabela com: 13º salário (titular + dependentes), aplicações financeiras (CNPJ, fonte, valor), outras (PLR, JCP, ganho capital etc.).

## 7. Bens e direitos

Tabela com: Grupo/Cód., Discriminação, valor 31/12 ano anterior, valor 31/12 ano-calendário, variação. Linha TOTAL.

## 8. Dívidas e ônus reais

Tabela ou "Sem informações".

## 9. Resumo numérico

Tabela: total rendimentos tributáveis, desconto simplificado, base de cálculo, imposto devido, imposto retido, saldo a pagar/restituir, alíquota efetiva.

## 10. Forma de pagamento

- Modalidade: à vista ou parcelado em N quotas
- Valor da quota base
- Débito automático: sim/não + dados bancários
- Início e fim das quotas
- Acréscimo da Selic (se aplicável)

OU em caso de restituição:
- Conta para crédito ou PIX

## 11. Evolução patrimonial

Tabela: bens 31/12 ano-1, bens 31/12 ano, dívidas ano-1, dívidas ano, patrimônio líquido (calculado), variação.

Comentário em 1-2 linhas sobre se a variação é coerente com a renda do ano.

## 12. Pegadinhas detectadas e pendências

Lista numerada das checagens da skill que retornaram alerta. Cada item:
- O que foi detectado
- Por que importa
- Se foi tratado ou ficou como pendência
- Responsável pela continuidade

## 13. Projeção próximos 1-2 anos

Cenários:
- **Status quo**: mantendo tudo como está
- **Cenário com mudança legislativa relevante**: ex. Lei 15.270/2025
- **Cenário com providência tomada**: ex. obteve isenção por doença grave, ou cônjuge passou a ter renda

Tabela comparativa com imposto projetado em cada cenário.

Recomendação estratégica final.

## 14. Documentos consultados

Lista numerada. Sempre incluir:
- Declaração do exercício anterior
- Comprovante(s) de rendimentos das fontes pagadoras
- Informes bancários
- Comprovantes de bens/dívidas alterados
- Rascunho da Receita (se aplicável)
- Outros documentos específicos

## 15. Próximos passos

Tabela: #, Ação, Prazo, Responsável.

Sempre incluir:
- Conferir pré-preenchida vs informes (se aplicável)
- Confirmar dados bancários
- Transmitir até X data
- Avisar cliente do saldo a pagar (se aplicável)
- Cobrar pendências de empresa/cliente
- Sugerir gov.br para próximo ano (se foi SEM gov.br)
- Acompanhamento de eventuais ações em andamento (pedido de isenção, processo de retificadora, etc.)
```

## Princípios de redação

- **Densidade proporcional ao caso**: caso simples = ficha curta; caso com várias fontes/bens = ficha extensa
- **Sem invenção factual**: lacunas devem ser marcadas como `[a confirmar]` ou `[pendente do cliente]`
- **Prosa quando explica, tabela quando lista**
- **Português profissional brasileiro**: sem regionalismos, mas tom técnico-acessível
- **Cifras sempre em R$**: com pontos como separador de milhar e vírgula decimal
- **Datas no formato dd/mm/aaaa**
- **CPF com pontuação**: xxx.xxx.xxx-xx
- **CNPJ com pontuação**: xx.xxx.xxx/xxxx-xx
- **Sem emojis**

## O que NÃO entra na ficha

- Conversas intermediárias
- Telas que foram preenchidas sem peculiaridades (a ficha registra o resultado, não o passo a passo do preenchimento)
- Telas do PGD que não foram usadas (omitir ou marcar "Sem informações")
- Opiniões pessoais sobre o cliente
- Detalhes médicos sensíveis além do estritamente necessário para o enquadramento legal

## Versionamento

Se a ficha for retificada (declaração retificadora), gerar novo arquivo com sufixo `_retificadora` e atualizar campo `tipo_declaracao` no frontmatter.

Ex.: `ficha_irpf_marines_ceresa_2026_retificadora.md`

## Apresentação ao usuário

Sempre via `present_files`. Mensagem final curta confirmando entrega + link. NÃO repetir o conteúdo da ficha no chat.
