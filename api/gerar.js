import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, escolaridade, experiencia, objetivo } = req.body;

  try {
    const resposta = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Crie um currículo profissional em português do Brasil.
Não invente informações.
Organize em:
- Dados pessoais
- Objetivo
- Formação
- Experiência
- Habilidades

Nome: ${nome}
Escolaridade: ${escolaridade}
Experiência: ${experiencia}
Objetivo: ${objetivo}
`
        }
      ]
    });

    res.status(200).json({
      texto: resposta.choices[0].message.content
    });
  } catch (e) {
    res.status(500).json({ error: "Erro ao gerar currículo" });
  }
}
