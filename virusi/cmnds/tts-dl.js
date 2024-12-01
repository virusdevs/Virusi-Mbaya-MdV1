
import fetch from 'node-fetch';

const TtsDl = async (m, Gifted) => {
 // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['tts', 'tospeech', 'to-speech', 'text-to-speech'];

  if (validCommands.includes(cmd)) {
    try {
      if (!text[0]) return m.reply(`Hello _*${m.pushName}*_ Please insert text to be converted to speech!\n Usage: .tts I am Virusi-Md Whatsapp Bot`);

   const response = await fetch(`https://api.maskser.me/api/soundoftext?text=${text}&lang=en-US`);
   const data = await response.json();

//let final = data.result;
  const final = data.result; 

  Gifted.sendMessage(m.from, { audio: { url: final}, mimetype: 'audio/mpeg'}, { quoted: m });

    } catch (error) {
      console.error('Error from Gifted APi:', error);
      await Gifted.sendMessage(m.from, { text: "Error from Gifted APi. Please try again later." }, { quoted: m });
    }
  }
};

export default TtsDl;
