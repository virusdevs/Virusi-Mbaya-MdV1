const menu = async (m, Gifted) => {
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';

  if (cmd === "menu") {
    const startTime = new Date();
    const { key } = await Gifted.sendMessage(m.from, { text: '*_Who sold the menu??🤔🤔..._*' }, { quoted: m });
    await m.React('🚀');

    const text = `*_Madafaka Virusi Sold the Menu to Support your broke  Girlfriend send 100 to 0748721079 to buy menu💀💀😂😂 because you're Stingy lemme me Give you just a ping Kino,Current ping is : ${new Date() - startTime} ms!_*`;

    await m.React(' 🦠 ');
                                           
    return m.reply(`${text}`, { quoted: key });
    
  }
}

export default menu;
