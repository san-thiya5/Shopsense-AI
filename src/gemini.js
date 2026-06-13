const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function parseVoiceCommand(text) {
  const prompt = `
You are a smart assistant for a small shop in India.
The shop owner spoke this command: "${text}"

Understand the command and return a JSON object with these fields:
- action: "add_product" or "add_sale" or "add_udhaar" or "unknown"
- name: product name in English
- quantity: number only
- unit: "kg" or "litre" or "piece" or "packet" or "box"
- price: number only (if mentioned, else 0)
- customer: customer name (only for udhaar)
- amount: number only (only for udhaar)

Return ONLY the JSON object, no extra text, no markdown.

Example input: "rendu kilo sugar add pannu"
Example output: {"action":"add_product","name":"sugar","quantity":2,"unit":"kg","price":0,"customer":"","amount":0}
`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  )

  const data = await response.json()
  const raw = data.candidates[0].content.parts[0].text
  const clean = raw.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}