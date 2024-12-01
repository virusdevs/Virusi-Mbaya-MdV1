
import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const saveContact = async (m, Gifted) => {
  try {
    // const prefixMatch = m.body.match(/^[\\/!#.]/);
     const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['vcf', 'vcard', 'contacts', 'savecontact'];

    if (!validCommands.includes(cmd)) return;

    await m.React('🕘');

    if (cmd === 'vcard') {
      if (!m.quoted) {
        return m.reply('Please reply to a user message to save their contact.');
      }

      // Handle sending a single contact as a vCard
      const quotedMessage = m.quoted;
      const userJid = quotedMessage.sender || quotedMessage.id;
      const userName = quotedMessage.pushName || quotedMessage.notify || 'Unknown';
      const phoneNumber = userJid.split('@')[0];

      if (!userJid) {
        return m.reply('Could not retrieve contact information. Please try again.');
      }

      await Gifted.sendMessage(m.from, {
        contacts: {
          displayName: userName,
          contacts: [{
            vcard: `
BEGIN:VCARD
VERSION:3.0
FN:${userName}
TEL;TYPE=CELL:${phoneNumber}
END:VCARD
            `
          }]
        }
      }, { quoted: m });

      await m.reply('Contact sent.');
      await m.React('✅');
    } else {
      if (!m.isGroup) {
        return m.reply('This command can only be used in group chats.');
      }

      // Handle saving all contacts in a group chat
      const groupMetadata = await Gifted.groupMetadata(m.from);
      const participants = groupMetadata.participants;
      const groupName = groupMetadata.subject;

      if (!participants || participants.length === 0) {
        return m.reply('No participants found in this group.');
      }

      let vCardEntries = '';
      participants.forEach((participant, index) => {
        const contactName = `Virusi ${index + 1}`;
        const phoneNumber = participant.id.split('@')[0];

        vCardEntries += `
BEGIN:VCARD
VERSION:3.0
FN:${contactName}
TEL;TYPE=CELL:${phoneNumber}
END:VCARD
        `;
      });

      const vCardFileName = 'contacts.vcf';
      writeFileSync(vCardFileName, vCardEntries);

      await Gifted.sendMessage(m.from, {
        document: { url: `./${vCardFileName}` },
        mimetype: 'text/x-vcard',
        fileName: `${groupName}.vcf`,
        caption: `VCF FOR ${groupName}\nGroup contacts saved successfully. Feel free to import the vcf file.`,
      }, { quoted: m });

      const totalContacts = participants.length;
      await m.reply(`Total number of contacts saved: ${totalContacts}`);
      await m.React('✅');
    }
  } catch (error) {
    console.error('Error saving contacts:', error.message);
    await m.reply(`Error saving contacts: ${error.message}`);
    await m.React('❌');
  }
};

export default saveContact;
