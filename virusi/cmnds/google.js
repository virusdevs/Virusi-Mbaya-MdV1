import axios from 'axios';

const BaseUrl = 'https://api.giftedtech.us.kg'; // Base API URL
const giftedapikey = '_0x5aff35,_0x187643kkr'; // Your API key

const GoogleSearch = async (m, Gifted) => {
 // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['google', 'ggle'];

  if (validCommands.includes(cmd)) {
    try {
      if (!text) {
        return m.reply(`Hello _*${m.pushName}*_ Please insert a keyword or text for Google Search!`);
      }
      await m.reply('A moment, Generating your Google search request...');
      let M = giftedapikey;

      // Set the params for the API call
      const params = {
        query: text,
        apikey: M
      };

      // Make the axios request with params
      const apiResponse = await axios.get(`${BaseUrl}/api/search/google`, { params });

      const data = apiResponse.data;

      // Check if the API request was successful
      if (data && data.success) {
        const results = data.results;
        let msg = `Google Search Results For : *${text}*\n\n`;

        for (let result of results) {
          msg += `➣ Title : ${result.title}\n`;
          msg += `➣ Description : ${result.description}\n`;
          msg += `➣ Link : ${result.url}\n\n────────────────────────\n\n`;
        }

        m.reply(msg);
      } else {
        throw new Error('Failed to retrieve search results');
      }

    } catch (error) {
      console.error('Error from Gifted API:', error);
      await Gifted.sendMessage(m.from, { text: "Error from Gifted API. Please try again later." }, { quoted: m });
    }
  }
};

export default GoogleSearch;
