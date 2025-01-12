
import fetch from 'node-fetch'; // Import node-fetch

const test = async (m, Gifted) => {
  try {
    // Extract prefix and command
    // const prefixMatch = m.body.match(/^[\\/!#.]/);
     const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    // Define valid commands
    const validCommands = ['test'];

    if (validCommands.includes(cmd)) {
      await m.React("🦠");
      await m.reply(`Hello _*${m.pushName},*_\n *Virusi-Md* is Sending a Random Test Audio...`);

      // Define audio URLs
      const audioUrls = [
        "https://files.catbox.moe/npi5nz.mp3",
        "https://files.catbox.moe/5x9pup.m4a",
        "https://files.catbox.moe/iy8itm.m4a",
        "https://files.catbox.moe/7rujoa.m4a",
        "https://files.catbox.moe/y43umn.mp3",
        "https://files.catbox.moe/58145i.m4a",
        "https://files.catbox.moe/f93xir.m4a",
        "https://files.catbox.moe/3dhvl0.mp3",
        "https://files.catbox.moe/7rujoa.m4a",
        "https://files.catbox.moe/hu4fl8.mp3",
        "https://files.catbox.moe/gjzs0z.mp3",
        "https://files.catbox.moe/znhtzc.mp3"
      ];

      // Select a random audio URL
      const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

      // Fetch the audio file
      const audioResponse = await fetch(randomAudioUrl);
      const audioBuffer = await audioResponse.buffer();

      const audioMessage = {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform: [1000, 0, 1000, 0, 1000, 0, 1000],
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: "VIRUSI-MD IS ACTIVE",
            body: `Powered By Virusian`,
            thumbnailUrl: `https://github.com/Virusian.png`,
            sourceUrl: `https://whatsapp.com/channel/0029VafL5zUKbYMKza6vAv1V`,
            mediaType: 5,
            renderLargerThumbnail: false
          }
        }
      };

      await Gifted.sendMessage(m.from, audioMessage, { quoted: m });
      await m.React("🤔");
      await m.reply('Test Successful, Bot is Active...');
    }
  } catch (error) {
    console.error("Error generating response:", error);
    await m.reply('Error processing your request.');
    await m.React("😌");
  }
};

export default test;
