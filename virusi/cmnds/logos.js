
import fetch from 'node-fetch';

const LogoCommand = async (m, Gifted) => {
  const giftedapi = 'mcandy';
 // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = [
    'avenger', 'glow', 'blackink', 'blood', 'breakwall', 'cake', 'captain',
    'clouds', 'deadpool', 'eraser', 'flames', 'glasses', 'glitch', 'gradient',
    'grass', 'joker', 'lifebuoys', 'matrix', 'marvel', 'multicolor', 'naruto',
    'neon', 'papercut', 'pig', 'pornhub', 'puppy', 'sand', 'slice', 'sunset',
    'typography'
  ];

  if (validCommands.includes(cmd)) {
    let apiUrl = '';

    // Set the API URL based on the command and text input
    if (cmd === 'avenger') {
      if (!text.includes('|')) {
        await m.reply('*Example Usage:* .avenger Virusi|Md');
        return;
      }
      const [text1, text2] = text.split('|');
      if (!text1 || !text2) {
        await m.reply('Both text1 and text2 are required for the avenger command.');
        return;
      }
      apiUrl = `https://api.neoxr.eu/api/avenger?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&apikey=${giftedapi}`;
    } else if (cmd === 'glow') {
      if (!text) {
        await m.reply('*Example Usage*: .glow Virusi Md');
        return;
      }
      apiUrl = `https://api.neoxr.eu/api/glow?text=${encodeURIComponent(text)}&apikey=${giftedapi}`;
    } else if (cmd === 'deadpool') {
      if (!text.includes('|')) {
        await m.reply('*Example Usage:* .deadpool Virusi|Md');
        return;
      }
      const [text1, text2] = text.split('|');
      if (!text1 || !text2) {
        await m.reply('Both text1 and text2 are required for the deadpool command.');
        return;
      }
      apiUrl = `https://api.neoxr.eu/api/deadpool?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&apikey=${giftedapi}`;
    } else if (cmd === 'lifebuoys') {
      if (!text.includes('|')) {
        await m.reply('*Example Usage:* .lifebuoys Virusi|Md');
        return;
      }
      const [text1, text2] = text.split('|');
      if (!text1 || !text2) {
        await m.reply('Both text1 and text2 are required for the lifebuoys command.');
        return;
      }
      apiUrl = `https://api.neoxr.eu/api/lifebuoys?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&apikey=${giftedapi}`;
    } else if (cmd === 'marvel') {
      if (!text.includes('|')) {
        await m.reply('*Example Usage:* .marvel Virusi|Md');
        return;
      }
      const [text1, text2] = text.split('|');
      if (!text1 || !text2) {
        await m.reply('Both text1 and text2 are required for the marvel command.');
        return;
      }
      apiUrl = `https://api.neoxr.eu/api/marvel?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&apikey=${giftedapi}`;
    } else if (cmd === 'pornhub') {
      if (!text.includes('|')) {
        await m.reply('*Example Usage:* .pornhub Virusi|Md');
        return;
      }
      const [text1, text2] = text.split('|');
      if (!text1 || !text2) {
        await m.reply('Both text1 and text2 are required for the pornhub command.');
        return;
      }
      apiUrl = `https://api.neoxr.eu/api/pornhub?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&apikey=${giftedapi}`;
    } else {
      if (!text) {
        await m.reply(`*Example Usage:* .${cmd} Virusi-Md`);
        return;
      }
      apiUrl = `https://api.neoxr.eu/api/${cmd}?text=${encodeURIComponent(text)}&apikey=${giftedapi}`;
    }

    try {
      await m.React('🕘');
      await m.reply('A Moment, Generating Your Logo...');

      // Fetch the data from the API
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status && data.data && data.data.url) {
        const imageUrl = data.data.url;
        await m.reply(`Here's your ${cmd} logo:`);
        await Gifted.sendMessage(m.from, { 
          image: { url: imageUrl },
          caption: '> *VIRUSI-MD V2*'
        });
      } else {
        throw new Error('Invalid response from the API.');
      }
      await m.React('✅');
    } catch (error) {
      console.error('Error from Gifted API:', error);
      await Gifted.sendMessage(m.from, { text: "Failed with error from Gifted API. Please try again later." });
    }
  }
};

export default LogoCommand;
