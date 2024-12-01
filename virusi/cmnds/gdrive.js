import fetch from 'node-fetch';

const GDriveDownloader = async (m, Gifted) => {
 // const prefixMatch = m.body.match(/^[\\/!#.]/);
 const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);  
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const BaseUrl = 'https://api.giftedtech.us.kg';
  const giftedapikey = '_0x5aff35,_0x187643kkr';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['gdrive', 'drive', 'drivedl', 'googledrive', 'gdrivedl', 'gdrivedownloader'];

  if (validCommands.includes(cmd)) {
    try {
      await m.React('🕘');
      if (!text) return m.reply(`Hello _*${m.pushName}*_ Please insert a valid Google Drive link!`);
      let X = giftedapikey;
      
      await m.reply('Downloading media from Google Drive. Please wait...');

      const response = await fetch(`${BaseUrl}/api/download/gdrivedl?url=${text}&apikey=${X}`);
      const result = await response.json();

      if (result && result.result.download) {
        const downloadUrl = result.result.download;
        const fileName = result.result.name;

        // Determine file type based on the extension
        const fileExtension = fileName.split('.').pop().toLowerCase();

        // Handle audio files
        if (fileExtension === 'mp3' || fileExtension === 'wav') {
          await Gifted.sendMessage(m.from, { audio: { url: downloadUrl }, caption: `Downloaded audio: *${fileName}*\n\n> *VIRUSI-MD V2*` }, { quoted: m });
        }
        // Handle video files
        else if (fileExtension === 'mp4' || fileExtension === 'mkv') {
          await Gifted.sendMessage(m.from, { video: { url: downloadUrl }, caption: `Downloaded video: *${fileName}*\n\n> *VIRUSI-MD V2*` }, { quoted: m });
        }
        // Handle images
        else if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'gif') {
          await Gifted.sendMessage(m.from, { image: { url: downloadUrl }, caption: `Downloaded image: *${fileName}*\n\n> *VIRUSI-MD V2*` }, { quoted: m });
        }
        // For other files, treat them as documents
        else {
          await Gifted.sendMessage(m.from, { document: { url: downloadUrl, filename: fileName }, caption: `Downloaded file: *${fileName}*\n\n> *VIRUSI-MD V2*` }, { quoted: m });
        }
      } else {
        await Gifted.sendMessage(m.from, { text: "Failed to retrieve the media. Please try again later." }, { quoted: m });
      }

      await m.React('💜');
    } catch (error) {
      console.error('Error fetching media:', error);
      await Gifted.sendMessage(m.from, { text: "Failed to retrieve the media. Please try again later." }, { quoted: m });
    }
  }
};

export default GDriveDownloader;
