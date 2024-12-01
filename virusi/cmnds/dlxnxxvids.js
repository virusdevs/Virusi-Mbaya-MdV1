import config from '../../set.cjs';
import fetch from 'node-fetch';

const XnxxvidsDl = async (m, Gifted) => {
  const botNumber = await Gifted.decodeJid(Gifted.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['xnxxvids', 'xnxxvidsdl', 'xnxxvideo', 'xnxxvideodl', 'xnxxvideos', 'xnxxvideosdl', 'xnxx', 'xnxxviddl'];

  if (validCommands.includes(cmd)) {
    if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");
    if (!text) {
      return m.reply(`Hello _*${m.pushName}*_ Please insert a valid Xnxx-Video Link or Search Query! \nEg. .xnxx https://www.xnxx.com/video-x2uttb2/fucking_with_the_neighbor or \n.xnxx mom and son hot`);
    }

    try {
      let videoUrl = '';
      const urlRegex = /(https?:\/\/[^\s]+)/;

      if (urlRegex.test(text)) {
        // If input is a URL, use it directly
        videoUrl = text;
      } else {
        // If input is a search query, fetch the first URL from the search results
        const searchResponse = await fetch(`https://api.prabath-md.tech/api/xnxxsearch?q=${encodeURIComponent(text)}&apikey=prabath-api_5f6557`);
        const searchData = await searchResponse.json();

        if (searchData.status === "success ✅" && searchData.data && searchData.data.datax && searchData.data.datax.length > 0) {
          videoUrl = searchData.data.datax[0].link;
        } else {
          return m.reply(`No results found for the query: ${text}`);
        }
      }

      // Download video using the obtained URL
      const response = await fetch(`https://api.prabath-md.tech/api/xnxxdl?url=${videoUrl}&apikey=prabath-api_5f6557`);
      const data = await response.json();

      if (data && data.data && data.data.download) {
        const xvideo = data.data.download;
        await m.reply('A moment, Downloading Your +18 video, Please Wait...');
        await Gifted.sendMessage(m.from, { video: { url: xvideo }, caption: "> *VIRUSI-MD V2*", gifPlayback: false }, { quoted: m });
      } else {
        await Gifted.sendMessage(m.from, { text: "Failed to retrieve the video. Please try again later." }, { quoted: m });
      }
    } catch (error) {
      console.error('Error fetching video:', error);
      await Gifted.sendMessage(m.from, { text: "Failed to retrieve the video. Please try again later." }, { quoted: m });
    }
  }
};

export default XnxxvidsDl;
