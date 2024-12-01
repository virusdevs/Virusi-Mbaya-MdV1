
import axios from 'axios';

  const mediafireDownload = async (m, Matrix) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
     const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const BaseUrl = 'https://giftedapis.us.kg';
  const giftedapikey = '_0x5aff35,_0x187643';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['mediafire', 'mfiredl', 'mfdownload'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a MediaFire URL.');

    try {
      await m.React('🕘');
      let N = giftedapikey;

      const apiUrl = `${BaseUrl}/api/download/mediafiredl?url=${encodeURIComponent(text)}&apikey=${N}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result.success && result.data) {
        const mediaUrl = result.data.link;
        const caption = `> > *VIRUSI-MD V2*\n> File: ${result.data.name}\n> Size: ${result.data.size}\n> Date: ${result.data.date}`;

        const extension = mediaUrl.split('.').pop().toLowerCase();

        await Matrix.sendMedia(m.from, mediaUrl, extension, caption, m);

        await m.React('✅');
      } else {
        throw new Error('Invalid response from MediaFire downloader.');
      }
    } catch (error) {
      console.error('Error downloading MediaFire file:', error.message);
      m.reply('Error downloading MediaFire file.');
      await m.React('❌');
    }
  }
};

export default mediafireDownload;
