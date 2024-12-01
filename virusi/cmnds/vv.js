
import { downloadContentFromMessage } from 'gifted-baileys';
import fs from 'fs';

const vv = async (m, Gifted) => {
  try {
    console.log('Quoted message:', m.quoted); // Logging statement to check the quoted message

    // const prefixMatch = m.body.match(/^[\\/!#.]/);
     const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['rvo', 'vv', 'reveal', 'antiviewonce', 'viewonce'];
    if (!validCommands.includes(cmd)) return;
    
    // Check if the quoted message is a view-once message
    if (!m.quoted || m.quoted.type !== 'view_once' || 
        (m.quoted.mtype !== 'imageMessage' && m.quoted.mtype !== 'videoMessage' && m.quoted.mtype !== 'audioMessage')) {
      return m.reply('This is not a view once message');
    }

    // Extract the message and its type
    const msg = m.quoted.message;
    const type = Object.keys(msg)[0];
    
    const originalCaption = msg[type].caption || '';
    const newCaption = `${originalCaption}\n\n> *VIRUSI-MD V2*`;

    // Determine the correct media type for downloading
    let mediaType = 'image';
    if (type === 'videoMessage') {
      mediaType = 'video';
    } else if (type === 'audioMessage') {
      mediaType = 'audio';
    }

    // Download the media content
    const mediaStream = await downloadContentFromMessage(msg[type], mediaType);
    let buffer = Buffer.from([]);
    for await (const chunk of mediaStream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    console.log('Downloaded media content');

    // Send the media to the bot user (the user who sent the command) in their inbox
    const botUser = m.sender; // The user who sent the command

    if (type === 'videoMessage') {
      await Gifted.sendMessage(botUser, {
        video: buffer,
        caption: newCaption,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 9999,
          isForwarded: false,
        }
      }, { quoted: m });
    } else if (type === 'imageMessage') {
      await Gifted.sendMessage(botUser, {
        image: buffer,
        caption: newCaption,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 9999,
          isForwarded: false,
        }
      }, { quoted: m });
    } else if (type === 'audioMessage') {
      await Gifted.sendMessage(botUser, {
        audio: buffer,
        mimetype: 'audio/ogg; codecs=opus', // Ensure correct mime type for audio
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 9999,
          isForwarded: false,
        }
      }, { quoted: m });
    }

  } catch (e) {
    console.error('Error:', e);
    m.reply('An error occurred while processing the command.');
  }
};

export default vv;
