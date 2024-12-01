
import axios from 'axios';
import pkg, { prepareWAMessageMedia } from 'gifted-baileys';
const { generateWAMessageFromContent, proto } = pkg;

const npmstalk = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['npm', 'npmstalk'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply(`Hello *_${m.pushName}_,*\n Please provide an npm package name after the command ie *.npm axios*`);

    try {
      await m.React('🕘');
      await m.reply('A moment, Generating Your NpmStalk Request...');


      const apiUrl = `https://api.prabath-md.tech/api/npmsearch?q=${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result && result.data && result.data.data) {
        const {
          name,
          description,
          version,
          packageLink: plink,
          downloadLink: dlink,
          publishedDate: pub,
          owner,
          homepage,
          license,
          readme,
        } = result.data.data;

        // Construct the response message
        const messageText = `Hello *_${m.pushName}_,*\nHere is your NPM Stalk Results:\n\n`
                          + `*Name:* ${name}\n*Owner:* ${owner}\n*Version:* ${version}\n`
                          + `*Published:* ${pub}\n*Description:* ${description}\n`
                          + `*Package Link:* ${plink}\n*Download Link:* ${dlink}\n`
                          + `*Homepage:* ${homepage}\n*License:* ${license}\n`
                          + `*Readme:* ${readme || 'N/A'}\n\n> VIRUSI-MD V2`;

        await Gifted.sendMessage(m.from, { text: messageText }, { quoted: m });
        await m.React('✅');
      } else {
        throw new Error('Invalid response from the Gifted API.');
      }
    } catch (error) {
      console.error('Error getting Gifted API response:', error.message);
      m.reply('Error getting response from Gifted API.');
      await m.React('❌');
    }
  }
};

export default npmstalk;
