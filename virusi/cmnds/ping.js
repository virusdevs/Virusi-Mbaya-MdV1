const sex = async (m, Gifted) => {
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';

  if (cmd === "sex") {
    const startTime = new Date();
    const { key } = await Gifted.sendMessage(m.from, { text: '*_Virusi Calculating Body count..._*' }, { quoted: m });
    await m.React('🚀');

    const text = `*_Body-Count at: ${new Date() - startTime} ms!!!_*`;

    await m.React('⚡');
                                           
    return m.reply(`${text}`, { quoted: key });
    
  }
}

export default sex;
