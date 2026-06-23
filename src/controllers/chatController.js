const axios = require("axios");

function index(req, res) {
  res.render("chat/index", {
    messages: [],
    error: null,
  });
}

async function sendMessage(req, res) {
  const { message, history } = req.body;

  if (!message) {
    return res.json({ error: "Pesan tidak boleh kosong" });
  }

  try {
    const chatHistory = history ? JSON.parse(history) : [];

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      ...chatHistory,
      { role: "user", content: message },
    ];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    const reply = response.data.choices[0].message.content;
    console.log("Messages sent to OpenAI:", JSON.stringify(messages, null, 2));

    res.json({ reply, role: "assistant" });
  } catch (error) {
    console.error("OpenAI Error:", error.response?.data || error.message);
    res.json({ error: "Gagal menghubungi AI. Coba lagi." });
  }
}

module.exports = { index, sendMessage };
