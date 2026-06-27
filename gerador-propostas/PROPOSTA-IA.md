# Gerador de Propostas de Acordo — com preenchimento por IA

Aplicativo de página única (`index.html`) para montar **propostas de acordo** de
pagamento de dívidas dos clientes do escritório. Roda 100% no navegador — basta
hospedar o arquivo. O botão **✨ Preencher com IA** lê os documentos que você
anexa e preenche o formulário sozinho usando o Claude.

---

## Como funciona

```
Você anexa documentos  ─►  Claude lê (PDF / imagem / texto)  ─►  devolve JSON estruturado
   (modal "Preencher com IA")                                         │
                                                                      ▼
                                            formulário preenchido  ─►  você confere  ─►  PDF / Word
```

1. Clique em **✨ Preencher com IA**.
2. Cole sua **chave da API Anthropic** (fica salva só no seu navegador).
3. **Arraste os documentos** (planilha de débito, e-mail do cliente, contrato,
   print de conversa, PDF do processo...).
4. Clique em **Analisar e preencher**. O Claude extrai devedor, CPF/CNPJ,
   processo, valor total, entrada e o plano de parcelas.
5. **Confira** os campos (a IA pode errar) e clique em **📄 PDF** ou **📘 Word**.

---

## O que mudou em relação à versão antiga

| Antes | Agora |
|---|---|
| Anos chumbados (2026/2027/2028) | **Blocos de parcelas dinâmicos** — adiciona/remove à vontade |
| Sem identificação das partes | Campos de **credor, devedor, CPF/CNPJ, processo, comarca** |
| Nenhuma conferência de conta | **Conferência automática**: avisa se entrada + parcelas ≠ total |
| Preenchimento 100% manual | **Botão de IA** que lê documentos e preenche tudo |
| Nome de arquivo fixo | PDF/Word saem com o **nome do devedor** |

---

## Como hospedar

É um único arquivo estático. Qualquer uma destas opções serve:

- **GitHub Pages** — suba `index.html` num repositório e ative o Pages.
- **Netlify / Vercel** — arraste a pasta `gerador-propostas/` no painel (deploy por drag-and-drop).
- **Servidor próprio** — copie o `index.html` para a pasta pública (`public_html`, etc.).

Não precisa de build, banco de dados nem servidor de aplicação.

---

## Detalhes técnicos da integração

A chamada à IA é feita direto do navegador para a API da Anthropic:

- **Endpoint:** `POST https://api.anthropic.com/v1/messages`
- **Modelo:** `claude-opus-4-8`
- **Cabeçalho especial:** `anthropic-dangerous-direct-browser-access: true`
  (libera o CORS para chamadas a partir do navegador)
- **Entrada de documentos:**
  - PDF → bloco `document` (base64, `application/pdf`)
  - Imagem → bloco `image` (base64)
  - Texto → incluído direto no prompt
- **Saída estruturada:** `output_config.format` com um JSON Schema, garantindo que
  a resposta volte exatamente nos campos do formulário (sem precisar "adivinhar"
  o texto).

---

## 🔒 Segurança da chave da API

A chave é guardada **apenas no `localStorage` do seu navegador** e enviada
direto para a Anthropic — **nunca fica escrita no código** do `index.html`.

**Importante:**
- Para **uso pessoal seu**, numa máquina de confiança, esse modelo é adequado:
  cada pessoa que abrir a página coloca a própria chave.
- **Não** embuta a chave no HTML antes de publicar a página em local de acesso
  público — quem abrir o código-fonte conseguiria lê-la.

### Opção mais segura (servidor intermediário)

Se a página for ficar pública (vários usuários, ou você não quer distribuir a
chave), o ideal é um **proxy mínimo**: a página chama o seu servidor, e só o
servidor guarda a chave e fala com a Anthropic.

```
Navegador  ─►  seu /api/proposta (Vercel/Netlify Function)  ─►  api.anthropic.com
                       ▲
            a chave da Anthropic mora aqui (variável de ambiente), nunca no navegador
```

Esboço da função serverless (Node, ~30 linhas):

```js
// /api/proposta  — a chave vem de process.env.ANTHROPIC_API_KEY
export default async function handler(req, res) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify(req.body)   // mesma estrutura que o front monta hoje
  });
  res.status(r.status).json(await r.json());
}
```

No `index.html`, bastaria trocar a URL do `fetch` de
`https://api.anthropic.com/v1/messages` para `/api/proposta` e remover os
cabeçalhos de chave. O resto continua igual.

---

## Limitações e cuidados

- **Sempre confira** o que a IA preencheu antes de enviar a proposta — ela pode
  interpretar mal um valor ou data.
- A **conferência de valores** (entrada + parcelas vs. total) ajuda a pegar erros
  de conta, mas não substitui revisão.
- PDFs muito grandes ou imagens de baixa qualidade reduzem a precisão da leitura.
- O custo da API é por documento processado — pesa principalmente o tamanho dos
  arquivos anexados.

---

## Arquivos

| Arquivo | O quê |
|---|---|
| `index.html` | O aplicativo completo (formulário + IA + exportação PDF/Word) |
| `PROPOSTA-IA.md` | Este documento |
