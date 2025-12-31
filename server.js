        import express from "express";
        import cors from "cors";
        import dotenv from "dotenv";
        import OpenAI from "openai";

        dotenv.config();
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use(express.static("public"));

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        app.post("/gerar", async (req, res) => {
          const { nome, escolaridade, experiencia, objetivo } = req.body;
          try {
            const r = await openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages: [{
                role: "user",
                content: `Crie um currículo profissional em português do Brasil.
Não invente informações.
Nome: ${nome}
Escolaridade: ${escolaridade}
Experiência: ${experiencia}
Objetivo: ${objetivo}`
              }]
            });
            res.json({ texto: r.choices[0].message.content });
          } catch {
            res.status(500).json({ erro: "Erro ao gerar currículo" });
          }
        });

        app.listen(3000, () => console.log("Rodando em http://localhost:3000"));
