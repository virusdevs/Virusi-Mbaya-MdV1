import config from '../../set.cjs';

const deleteMessage = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    // const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['del', 'wipe', 'delete', 'antidelete'];

    if (validCommands.includes(cmd)) {
      if (!isCreator) {
        return m.reply("*📛 THIS IS AN OWNER COMMAND*");
      }

      if (cmd === 'antidelete') {
        config.ANTI_DELETE = !config.ANTI_DELETE;
        return m.reply(`🔄 ANTI-DELETE is now *${config.ANTI_DELETE ? 'ON' : 'OFF'}*`);
      }

      if (!m.quoted) {
        return m.reply('✳️ Reply to the message you want to delete');
      }

      const key = {
        remoteJid: m.from,
        id: m.quoted.key.id,
        participant: m.quoted.key.participant || m.quoted.key.remoteJid
      };

      // Anti-delete functionality
    if (m.messageStubType === 68 && config.ANTI_DELETE) { // 68 is the stub type for message deletions
      const senderJid = m.key.participant || m.key.remoteJid;
      const messageContent = m.message?.conversation || m.message?.extendedTextMessage?.text || 'Media message';

      const messageToSend = `
        *VIRUSI-MD ANTIDELETE MESSAGE*\n
        *Sender:* @${senderJid.split('@')[0]}\n
        *Deleted Message:* ${messageContent}
      `;

      await gss.sendMessage(config.OWNER_NUMBER + '@s.whatsapp.net', { text: messageToSend }, { mentions: [senderJid] });
    }

      await gss.sendMessage(m.from, { delete: key });
    }
  } catch (error) {
    console.error('Error processing command:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default deleteMessage;
