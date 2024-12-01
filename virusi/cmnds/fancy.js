import axios from 'axios';

const fancyText = async (m, Matrix) => {
   // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);  
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const BaseUrl = 'https://api.giftedtech.us.kg';
  const giftedapikey = '_0x5aff35,_0x187643kkr';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['fancy', 'fancytext'];

  if (validCommands.includes(cmd.split(/\d+/)[0])) {
    // Extract number from command if present
    const numberMatch = cmd.match(/\d+/);
    const number = numberMatch ? parseInt(numberMatch[0], 10) : null;

    if (!text) {
      await m.reply(`Hello *_${m.pushName}_,*\n Fancy Text Converter Here.\n Please use .fancy *_your_text_* ie .fancy Virusi or .fancy5 *_your_text_* ie .fancy4 Virusi to get a specific style.`);
      return;
    }

    try {
      await m.React('🕘');
      await m.reply('A Moment, Please Wait...');
      let S = giftedapikey;

      const apiUrl = `${BaseUrl}/api/tools/fancy?text=${encodeURIComponent(text)}&apikey=${S}`;
      const response = await axios.get(apiUrl);
      const results = response.data.results;  // Use "results" as per API response structure

      if (results && results.length > 0) {
        if (number !== null) {
          // Specific fancy text style requested
          if (number > 0 && number <= results.length) {
            const selectedResult = results[number - 1].result;
            await Matrix.sendMessage(m.from, { text: `Fancy Text Style ${number}:\n\n${selectedResult}` }, { quoted: m });
          } else {
            await m.reply(`Invalid style number. Please choose a number between 1 and ${results.length}.`);
          }
        } else {
          // All fancy text styles requested
          let formattedResults = 'Fancy Text Styles:\n\n';
          results.forEach((item, index) => {
            if (item.result.trim()) { // Check for non-empty results
              formattedResults += `${index + 1}. ${item.result}\n`;
            }
          });

          if (formattedResults.trim() === 'Fancy Text Styles:') {
            await m.reply('No valid fancy text styles were generated.');
          } else {
            await Matrix.sendMessage(m.from, { text: formattedResults.trim() }, { quoted: m });
          }
        }

        await m.React('✅');
      } else {
        throw new Error('Invalid response from Gifted API.');
      }
    } catch (error) {
      console.error('Error getting Gifted API response:', error.message);
      await m.reply('Error getting response from Gifted API.');
      await m.React('❌');
    }
  }
};

export default fancyText;
