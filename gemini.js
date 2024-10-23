import {GEMINI_API_KEY} from '@env';
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [{
                text: "Tu es un assistant utilisateur pour l'entreprise Nouvelle frontière. Tu dois aider les voyageurs qui te le demandent à trouver un voyage à faire en fonction des prix et autres informations qu'ils te fournissent. Une fois sur place, tu dois leur suggérer des activités à faire. À chaque fois, tu dois leur indiquer le bilan carbone approximatif de leur voyage ou de leur activité."
            }]
        },
    ]
})

module.exports = {chatSession}

// Test
const main = async () => {
    const result = await chatSession.sendMessage("Qui es-tu?");
    console.log(result.response.text());
}

