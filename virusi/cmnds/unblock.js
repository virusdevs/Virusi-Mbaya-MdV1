
import config from '../../set.cjs';

const unblock = async (m, Gifted) => {
  try {
    // Get the bot's own number in WhatsApp format
    const botNumber = await Gifted.decodeJid(Gifted.user.id);
    
    // Check if the sender is the bot owner (creator)
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    
    // Ensure the command starts with a recognized prefix
   // const prefixMatch = m.body.match(/^[\\/!#.]/);
     const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    
    // Extract the command and the text following it
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();
    
    // Define valid commands for this handler
    const validCommands = ['unblock'];
    
    if (!validCommands.includes(cmd)) return; // If it's not a valid command, exit
    
    // Ensure only the bot owner can execute this command
    if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");
    
    // Initialize a variable for the user to unblock
    let users = '';

    // Check if the message contains mentioned users or a quoted message
    if (m.message && m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo) {
      const contextInfo = m.message.extendedTextMessage.contextInfo;
      
      // If a message was quoted, use the sender of the quoted message
      if (contextInfo.participant) {
        users = contextInfo.participant;
      } 
      // If a user was mentioned, use the first mentioned user
      else if (contextInfo.mentionedJid && contextInfo.mentionedJid.length > 0) {
        users = contextInfo.mentionedJid[0];
      }
    }
    
    // Fallback to using text input if no mentioned or quoted user is found
    if (!users && text) {
      users = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    }
    
    // If no valid user is identified, notify the sender
    if (!users) {
      return m.reply('Please reply to a user\'s message to unblock them or use *.unblock 2547........*');
    }
    
    // Unblock the user and handle the response
    await Gifted.updateBlockStatus(users, 'unblock')
      .then((res) => m.reply(`Unblocked ${users.split('@')[0]} successfully.`))
      .catch((err) => m.reply(`Failed to unblock user: ${err.message}`));
      
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default unblock;
