
import fetch from 'node-fetch';

const LoveNight = async (m, Gifted) => {
//  const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['night', 'nightlove', 'lovenight', 'night-love', 'love-night'];

  if (validCommands.includes(cmd)) {
    try {
      await m.react('🕘');
      await m.reply('A moment, Generating your LoveNight message...');

      const giftedkeys = 'shizo';
      const res = await fetch(`https://shizoapi.onrender.com/api/texts/lovenight?apikey=${giftedkeys}`);
      if (!res.ok) throw new Error(await res.text());

      const json = await res.json();
      if (!json.result) throw new Error('Invalid response format');

      const message = json.result;
      await Gifted.sendMessage(m.from, { text: message, mentions: [m.sender] }, { quoted: m });
      await m.react('✅');
    } catch (error) {
      console.error('Error fetching LoveNight message:', error.message);
      console.error('Error details:', error);
      await Gifted.sendMessage(m.from, { text: 'Failed to retrieve message.' });
    }
  }
};

export default LoveNight;
