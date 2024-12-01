import fetch from 'node-fetch';

const TwitterDl = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['twitter', 'twitterdl', 'tw', 'twdl'];

  if (validCommands.includes(cmd)) {
    try {
      if (!text[0]) return m.reply(`Hello _*${m.pushName}*_ Please Insert a valid Twitter Video Link!`);

const response = await fetch(`https://api.giftedtech.us.kg/api/download/twitter?url=${text}&apikey=_0x5aff35,_0x187643krr`);
const data = await response.json();


await m.reply('A moment, Downloading...');
if (data && data.result && data.result.url) {
const twittervid = data.result.url;

await Gifted.sendMessage(m.from,{video : {url : twittervid },caption : "> *VIRUSI-MD V2*",gifPlayback : false },{quoted : m}) 
}
    } catch (error) {
      console.error('Error fetching video:', error);
      await Gifted.sendMessage(m.from, { text: "Failed to retrieve the video. Please try again later." }, { quoted: m });
    }
}
};

export default TwitterDl;
