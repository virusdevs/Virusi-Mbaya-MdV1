
import axios from 'axios';
import pkg, { prepareWAMessageMedia } from 'gifted-baileys';
const { generateWAMessageFromContent, proto } = pkg;

const weatherCommand = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['weather'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply(`Hello *_${m.pushName}_,*\nPlease provide a city/location name after the command, e.g., *.weather Kisumu*`);

    try {
      await m.React('🕘');
      await m.reply('A moment, Generating Your Weather Search Request...');

      const apiUrl = `https://widipe.com/weather?text=${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result && result.status && result.result) {
        const {
          location,
          country,
          weather,
          currentTemp,
          maxTemp,
          minTemp,
          humidity,
          windSpeed,
        } = result.result;

        // Construct the response message
        const messageText = `*Weather Search Results for ${text}:*

*Location:* ${location}
*Country:* ${country}
*Weather:* ${weather}
*Current Temperature:* ${currentTemp}
*Maximum Temperature:* ${maxTemp}
*Minimum Temperature:* ${minTemp}
*Humidity:* ${humidity}
*Wind Speed:* ${windSpeed}\n\n> VIRUSI-MD V2`;

        await Gifted.sendMessage(m.from, { text: messageText }, { quoted: m });
        await m.React('✅');
      } else {
        throw new Error('Invalid response from the Gifted API.');
      }
    } catch (error) {
      console.error('Error getting Gifted API response:', error.message);
      await m.reply('Error getting response from Gifted API.');
      await m.React('❌');
    }
  }
};

export default weatherCommand;
