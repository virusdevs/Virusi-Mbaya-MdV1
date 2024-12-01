import { GiftedGpt } from 'gifted-gpt';
const gpt4 = new GiftedGpt();

const AiGifted = async (m, Gifted) => {
    // const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();
    const validCommands = ['virusi', 'Hiv', 'ai', 'bot'];

    if (validCommands.includes(cmd)) {
        if (!text) {
            await m.reply(`Hello _*${m.pushName}*_ , Please provide your query, e.g., *.ai What is the meaning of Virusi Hiv Md*`);
            
        }

        try {
            await m.React('🦠');
            await m.reply(`A moment, Connecting to Api...`);

            const messages = [
                { role: "system", content: "You're a WhatsApp bot called Virusi-Md that processes users text and accepts commands. You work courtesy of Bing from Microsoft." },
                { role: "user", content: text }
            ];
            const options = {
                provider: gpt4.providers.GPT,
                model: "davinci",
                debug: true,
                proxy: ""
            };

            const result = await gpt4.chatCompletion(messages, options);
            const response = result; // Assuming result is already the desired response string

            await Gifted.sendMessage(m.from, { text: response }, { quoted: m });
            await m.React('🦠');
        } catch (error) {
            console.error('Error fetching Api data:', error);
            await Gifted.sendMessage(m.from, { text: "Failed to retrieve Api data. Please try again later." });
        }
    }
};

export default AiGifted;
