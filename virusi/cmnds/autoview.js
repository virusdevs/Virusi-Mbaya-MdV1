import config from '../../set.cjs';

// Main command function
const anticallCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim().toLowerCase();
  
  const validCommands = ['autostatus', 'viewstatus', 'status', 'autosview', 'autostatusview'];

 if (validCommands.includes(cmd)){
   if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");
    let responseMessage;

    if (text === 'on') {
      config.AUTO_READ_STATUS = true;
      responseMessage = "Status Auto View Has Been Enabled.";
    } else if (text === 'off') {
      config.AUTO_READ_STATUS = false;
      responseMessage = "Status Auto View Has Been Disabled.";
    } else {
      responseMessage = `Usage:\n- *${prefix + cmd} ON:* Enable AUTO STATUS VIEW\n- *${prefix + cmd} off:* Disable AUTO STATUS SEEN`;
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default anticallCommand;
