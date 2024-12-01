import fetch from 'node-fetch';
const Advice = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['advice'];

  if (validCommands.includes(cmd)) {
    try {
      await m.React('🦠');
      await m.reply('Fetching...');
      
    const response = await fetch(`https://api.adviceslip.com/advice`);
    const data = await response.json();
    const quote = data.slip.advice;
    await m.reply(`*Here is an advice for you:* \n${quote}`);
      await m.React('🦠');
    } catch (error) {
      console.error('Error from API:', error);
      await Gifted.sendMessage(m.from, { text: "Failed with error from API. Please try again later." });
    }
  }
};

export default Advice;
