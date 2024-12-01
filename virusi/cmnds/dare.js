import nodeFetch from 'node-fetch';

const dare = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['dare', 'dares'];

  if (validCommands.includes(cmd)) {
    try {
      const giftech = 'shizo';

      const response = await nodeFetch(`https://shizoapi.onrender.com/api/texts/dare?apikey=${giftech}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch dares: ${await response.text()}`);
      }

      const resps = await response.json();
      const result = resps.result;
      await Gifted.sendMessage(m.from, { text: result, mentions: [m.sender] }, { quoted: m });
    } catch (error) {
      console.error('Error fetching dares:', error);
      await Gifted.sendMessage(m.from, { text: "Failed to retrieve dares. Please try again later." });
    }
  }
};

export default dare;
