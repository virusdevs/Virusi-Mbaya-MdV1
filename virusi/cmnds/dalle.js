import fetch from 'node-fetch';

  const DalleImg = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['dalle', 'dalleimg', 'dalle-img', 'dalleai'];

  if (validCommands.includes(cmd)) {
    try {
      if (!text[0]) return m.reply(`Hello _*${m.pushName}*_ Please Insert a text for Dalle to Generate an Image!`);
  await m.reply('A moment, Generating Your Image Request...');

  const data = `https://widipe.com/dalle?text=${text}`;
      
  let caption = '> *VIRUSI-MD V2*';
     
  Gifted.sendMessage(m.from, { image: { url: data }, caption: caption }, { quoted: m });
    } catch (error) {
      console.error('Error from Gifted APi:', error);
      await Gifted.sendMessage(m.from, { text: "Error from GiftedAPi. Please try again later." }, { quoted: m });
    }
}
};

export default DalleImg;
