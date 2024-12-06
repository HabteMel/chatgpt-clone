import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: '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'
});

app.post('/generate', async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

