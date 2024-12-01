
const restartBot = async (m) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === 'restart') {
    try {
    await m.reply(`Hello *_${m.pushName}_,*\n *Virusi-Md is Restarting....*`)
      process.exit()
    } catch (error) {
      console.error(error);
      await m.React("❌");
      return m.reply(`An error occurred while restarting the bot: ${error.message}`);
    }
  }
};

export default restartBot;
