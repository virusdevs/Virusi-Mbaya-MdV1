
import fg from 'api-dylux';
import fetch from 'node-fetch';

const TiktokStalk = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['tikstalk', 'tik-stalk', 'tiktok-stalk', 'tiktokstalk'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply(`Hello *_${m.pushName}_,*\nPlease provide a TikTok Username for stalking after the command, e.g., *.tiktokstalk giftedtechke*`);
    }

    try {
      await m.React('🕘');
      await m.reply('A moment, Generating Your TiktokStalk Request...');

      // Fetch TikTok user details
      let res = await fg.ttStalk(text);
      if (res && res.name && res.username && res.followers && res.following) {
        // Construct the message text
        let txt = `
┌──「 *TIKTOK STALK* 」
▢ *🔖 Name:* ${res.name}
▢ *🔖 Username:* ${res.username}
▢ *👥 Followers:* ${res.followers}
▢ *🫂 Following:* ${res.following}
▢ *📌 Desc:* ${res.desc || 'No description available'}

▢ *🔗 Link* : https://tiktok.com/${res.username}
└────────────\n\n> *VIRUSI-MD V2*`;

        // Fetch the profile image
        const response = await fetch(res.profile);
        if (!response.ok) throw new Error('Failed to fetch profile image.');
        const imageBuffer = await response.buffer();

        // Send the image with the caption
        await Gifted.sendMessage(m.from, { image: imageBuffer, caption: txt }, { quoted: m });
        await m.React('✅');
      } else {
        throw new Error('Incomplete data received from the TikTok API.');
      }
    } catch (error) {
      console.error('Error getting TikTok data:', error.message);
      await m.reply(`Error getting response: ${error.message}`);
      await m.React('❌');
    }
  }
};

export default TiktokStalk;
