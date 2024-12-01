
import fetch from 'node-fetch';
import pkg from 'gifted-baileys'; // Import the entire module
const { MessageType } = pkg; // Destructure the MessageType from the module

const sendStickersFromTelegram = async (m, Gifted) => {
 // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  // Define valid commands
  const validCommands = ['tgs', 'tgstickers'];

  if (cmd === 'take' && m.quoted && m.quoted.type === MessageType.sticker) {
    try {
      const stickerData = await m.quoted.download(); // Download the sticker data
      
      if (!stickerData) {
        await m.reply('No sticker found to resend.');
        return;
      }

      // Send the sticker to the chat using buffer
      await Gifted.sendMessage(m.from, {
        sticker: stickerData
      }, { quoted: m });

      await m.reply('Sticker has been taken.');

    } catch (error) {
      console.error('Error resending sticker:', error.message);
      await m.reply(`Error resending sticker: ${error.message}`);
    }
  } else if (validCommands.includes(cmd)) {
    if (!text) {
      await m.reply('Please provide a valid Telegram stickers URL.');
      return; // Exit early if no URL is provided
    }

    try {
      await m.reply('A moment, Downloading stickers. Please wait...');

      // Fetch sticker URLs from the API
      const response = await fetch(`https://api.maskser.me/api/dowloader/telesticker?url=${encodeURIComponent(text)}`);
      const data = await response.json();

      if (!data.status) {
        await m.reply('Failed to retrieve stickers. Please check the Telegram URL and try again.');
        return; // Exit early if stickers retrieval fails
      }

      const stickers = data.result;
      if (stickers.length === 0) {
        await m.reply('No stickers found in the provided URL.');
        return; // Exit early if no stickers are found
      }

      // Send each sticker
      for (const sticker of stickers) {
        const stickerUrl = sticker.url;

        // Send the sticker to the chat
        await Gifted.sendMessage(m.from, {
          sticker: { url: stickerUrl }
        }, { quoted: m });
      }

      await m.reply(`Success...\nSent ${stickers.length} stickers.\nPause for 5 minutes so that your bot/WhatsApp account is not banned.`);

    } catch (error) {
      console.error('Error sending stickers:', error.message);
      await m.reply(`Error sending stickers: ${error.message}`);
    }
  }
};

export default sendStickersFromTelegram;
