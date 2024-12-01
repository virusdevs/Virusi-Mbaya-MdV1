
import axios from 'axios';

const RandomAnime = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  
  const validCommands = ['ranime', 'randomanime', 'random-anime', 'anime'];

  if (validCommands.includes(cmd)) {
    try {
      await m.reply('A moment, Generating Your Random Anime Search Request...');

    const jsonURL = "https://api.jikan.moe/v4/random/anime"; // Remplacez par votre URL JSON

    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url; // Utilisez l'URL de l'image JPG
    const episodes = data.episodes;
    const status = data.status;

    const message = `📺 Tittle: ${title}\n🎬 Episodes: ${episodes}\n📡 Status: ${status}\n📝 Synopsis: ${synopsis}\n🔗 URL: ${data.url}`;
    
    Gifted.sendMessage(m.from, { image: { url: imageUrl }, caption: message }, { quoted: m });


    } catch (error) {
      console.error('Error from Gifted APi:', error);
      await Gifted.sendMessage(m.from, { text: "Error from GiftedAPi. Please try again later." }, { quoted: m });
    }
  }
};

export default RandomAnime;
