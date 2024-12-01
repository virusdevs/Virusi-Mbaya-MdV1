import config from '../../set.cjs';

const autoreadCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  //const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim().toLowerCase();

  if (cmd === 'autoread') {
    if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");
    let responseMessage;

    if (text === 'on') {
      config.AUTO_READ = true;
      responseMessage = "Auto-Read has been Enabled.";
    } else if (text === 'off') {
      config.AUTO_READ = false;
      responseMessage = "Auto-Read has been Disabled.";
    } else {
      responseMessage = "Usage:\n- `autoread on`: Enable Auto-Read\n- `autoread off`: Disable Auto-Read";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default autoreadCommand;
