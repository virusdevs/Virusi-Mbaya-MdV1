import fetch from 'node-fetch';

const InstaDl = async (m, Gifted) => {
//  const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const BaseUrl = 'https://api.giftedtech.us.kg';
  const giftedapikey = '_0x5aff35,_0x187643kkr';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['insta', 'ig', 'igdl', 'instadl', 'instagram'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      await m.reply(`Hello _*${m.pushName}*_ ,\nPlease provide instagram video URL, \nEg *.insta _your_url_`);
      return;
    }

    try {
      await m.React('🕘');
      await m.reply(`A moment, Processing from GiftedAPi...`);
      let Q = giftedapikey;

      // Check if the provided text is a valid YouTube URL
      const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      const isUrl = urlPattern.test(text);

      // Call the new API endpoint with the video URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/instadlv3?url=${encodeURIComponent(text)}&apikey=${Q}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const videoDownloadUrl = apiResult.result[0].url;

        
        await Gifted.sendMessage(m.from, {
          video: { url: videoDownloadUrl },
          mimetype: 'video/mp4',
          caption: `> *VIRUSI-MD V2*`,
          contextInfo: {
            externalAdReply: {
              showAdAttribution: false,
              body: 'Powered by Vurusian',
              thumbnailUrl: 'https://github.com/Vurusian.png',
              sourceUrl: 'https://whatsapp.com/channel/0029VafL5zUKbYMKza6vAv1V',
              mediaType: 1,
              renderLargerThumbnail: false
            }
          }
        }, { quoted: m });


        await m.React('✅');
      } else {
        await m.reply('Failed to download video. Please try again later.');
      }
    } catch (error) {
      console.error('Error from Gifted API:', error);
      await Gifted.sendMessage(m.from, { text: "Failed with error from Gifted API. Please try again later." });
    }
  }
};

export default InstaDl; 
