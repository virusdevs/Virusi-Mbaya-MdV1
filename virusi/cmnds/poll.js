
const Poll = async (m, Gifted) => {
  //bconst prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['poll', 'polll', 'vote', 'votes', 'polls'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      await m.reply(`Hello _*${m.pushName}*_ , Please use the example: *.poll Do you love Gifted-Md:Yes, No, Not Sure*`);
      return;
    }

    try {
      await m.React('🕘');
      await m.reply(`A moment, Generating your poll...`);

      let [poll, opt] = text.split(":");

      if (text.split(":").length < 2) {
        return m.reply(`Incorrect format.\nExample: *.poll Do you love Virusi-Md:Yes, No, Not Sure*`);
      }

      let options = opt.split(',').map(option => option.trim());

      await Gifted.sendMessage(m.from, {
        poll: {
          name: poll.trim(),
          values: options 
        }
      }, {quoted: m});

      await m.React('✅');
    } catch (error) {
      console.error('Error from Gifted API:', error);
      await m.React('❌');
      await Gifted.sendMessage(m.from, { text: "Failed with an error from Gifted API. Please try again later." }, { quoted: m });
    }
  }
};

export default Poll;
