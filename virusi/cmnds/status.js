import config from '../../set.cjs';
import fs from 'fs';

const handleGreeting = async (m, bot) => {
  const botNumber = await bot.decodeJid(bot.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  try {
    const textLower = m.body.toLowerCase();

    const triggerWords = [
      'send', 'statusdown', 'take', 'sent', 'giv', 'save', 'upload',
      'send me', 'sent me', 'oh', 'take', 'get', 'do', 'mee'
    ];

    if (triggerWords.includes(textLower)) {
      if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");
      if (m.message && m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo) {
        const quotedMessage = m.message.extendedTextMessage.contextInfo.quotedMessage;

        const botUser = m.sender; // The user who sent the command

        if (quotedMessage) {
          // Check if it's an image
          if (quotedMessage.imageMessage) {
            const imageCaption = quotedMessage.imageMessage.caption;
            const imageUrl = await bot.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
            await bot.sendMessage(botUser, {
              image: { url: imageUrl },
              caption: imageCaption,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: false,
              },
            });
          }

          // Check if it's a video
          if (quotedMessage.videoMessage) {
            const videoCaption = quotedMessage.videoMessage.caption;
            const videoUrl = await bot.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
            await bot.sendMessage(botUser, {
              video: { url: videoUrl },
              caption: videoCaption,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: false,
              },
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default handleGreeting;
