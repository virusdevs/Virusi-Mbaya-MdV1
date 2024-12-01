import fetch from 'node-fetch';

const BestWallPapers = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  
  const validCommands = ['bestwallp', 'best-wall-paper', 'best-wallp', 'random', 'random-wallp', 'random-wall-paper', 'nature', 'nature-wallp', 'nature-wall-paper', 'best-wallpaper'];

  if (validCommands.includes(cmd)) {
    try {
      await m.reply('A moment, *Gifted-Md* is Generating Your BestWallPaper Search Request...');

  const response = await fetch('https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc');
  const data = await response.json();
  const url =data.urls.regular
  //citel.reply ('url here :'+url);

                let buttonMessaged = {
                    image: { url: url },
                    caption: `> *VIRUSI-MD V2*`,
                    
                   
                };
                return await Gifted.sendMessage(m.from, buttonMessaged , {quoted : m});


    } catch (error) {
      console.error('Error from Gifted APi:', error);
      await Gifted.sendMessage(m.from, { text: "Error from GiftedAPi. Please try again later." }, { quoted: m });
    }
  }
};

export default BestWallPapers;
