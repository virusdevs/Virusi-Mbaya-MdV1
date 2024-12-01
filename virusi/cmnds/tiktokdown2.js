
import fetch from 'node-fetch';

const tikdown2 = async (m, Gifted) => {
 // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['tiktok2', 'tt2', 'tiktokdl2', 'tiktokdown2', 'tikdown2'];

  if (validCommands.includes(cmd)) {
    try {
      if (!text[0]) return m.reply('insert a tiktok video link!');

const response = await fetch(`https://api.prabath-md.tech/api/tiktokdl?url=${text}`);
const data = await response.json();


await m.reply('A moment, *Virusi-Md* is Downloading...');

const tikvid = data.data.no_wm;

await Gifted.sendMessage(m.from,{video : {url : tikvid },caption : "> *VIRUSI-MD V2*",gifPlayback : false },{quoted : m}) 

    } catch (error) {
      console.error('Error fetching video:', error);
      await Gifted.sendMessage(m.from, { text: "Failed to retrieve the video. Please try again later." }, { quoted: m });
    }
  }
};

export default tikdown2;
