
import { writeFileSync } from 'fs';

const saveContact = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  // Define valid commands
  const validCommands = ['vcf', 'contacts', 'vcard', 'savecontact'];

  if (validCommands.includes(cmd)) {
    try {
      await m.React('🦠');
      await m.reply('A Moment,*Virusi-Md* is Compiling Contacts, Please Wait...');
 

      // Handle the vcf, contacts, savecontact commands
      if (!m.isGroup) {
        return m.reply('This command can only be used in group chats.');
      }

      // Fetch group metadata
      const groupMetadata = await Gifted.groupMetadata(m.from);
      const participants = groupMetadata.participants;
      const groupName = groupMetadata.subject;

      // Check if there are any participants
      if (!participants || participants.length === 0) {
        return m.reply('No participants found in this group.');
      }

      // Create vCard entries for each participant
      let vCardEntries = '';
      participants.forEach((participant, index) => {
        const contactName = `Virusi ${index + 1}` || `Gifted ${index + 1}`;
        const phoneNumber = participant.id.split('@')[0]; // Extract phone number from ID

        vCardEntries += `
BEGIN:VCARD
VERSION:3.0
FN:${contactName}
TEL;TYPE=CELL:${phoneNumber}
END:VCARD
`;
      });

      // Save vCard data to a file
      const vCardFileName = 'contacts.vcf';
      writeFileSync(vCardFileName, vCardEntries);

      // Send the vCard file with group name in caption
      await Gifted.sendMessage(m.from, {
        document: { url: `./${vCardFileName}` },
        mimetype: 'text/x-vcard',
        fileName: groupName + '.vcf', // Use exact group name
        caption: `VCF FOR: *${groupName}*\nGroup contacts saved successfully. Feel free to import the vcf file.`,
      }, { quoted: m });

      // Send message with total number of contacts saved
      const totalContacts = participants.length;
      await m.reply(`Total number of contacts saved: *${totalContacts} Contacts*`);

      await m.React('✅');
      await m.reply('Success...');
 
    } catch (error) {
      console.error('Error saving contacts:', error.message);
      await m.reply(`Error saving contacts: ${error.message}`);
      await m.React('❌');
    }
  }
};

export default saveContact;
