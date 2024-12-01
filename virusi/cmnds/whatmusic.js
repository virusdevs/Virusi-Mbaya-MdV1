
import fs from 'fs';
import acrcloud from 'acrcloud';

// Initialize ACRCloud client with your credentials
const acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: '716b4ddfa557144ce0a459344fe0c2c9',
access_secret: 'Lz75UbI8g6AzkLRQgTgHyBlaQq9YT5wonr3xhFkf'
});

const shazam = async (m, gss) => {
  try {
    // const prefixMatch = m.body.match(/^[\\/!#.]/);
     const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['shazam', 'find', 'whatmusic'];
    if (!validCommands.includes(cmd)) return;
    
    const quoted = m.quoted || {}; 

    if (!quoted || (quoted.mtype !== 'audioMessage' && quoted.mtype !== 'videoMessage')) {
      return m.reply('You asked about music. Please provide a quoted audio or video message for identification.');
    }

    const mime = m.quoted.mimetype;
    try {
      const media = await m.quoted.download();
      const filePath = `./${Date.now()}.mp3`;
      fs.writeFileSync(filePath, media);

      m.reply('Identifying the music, please wait...');

      const res = await acr.identify(fs.readFileSync(filePath));
      const { code, msg } = res.status;

      if (code !== 0) {
        throw new Error(msg);
      }

      const { title, artists, album, genres, release_date } = res.metadata.music[0];
      const txt = `𝚁𝙴𝚂𝚄𝙻𝚃 
      • 📌 *TITLE*: ${title}
      • 👨‍🎤 𝙰𝚁𝚃𝙸𝚂𝚃: ${artists ? artists.map(v => v.name).join(', ') : 'NOT FOUND'}
      • 💾 𝙰𝙻𝙱𝚄𝙼: ${album ? album.name : 'NOT FOUND'}
      • 🌐 𝙶𝙴𝙽𝚁𝙴: ${genres ? genres.map(v => v.name).join(', ') : 'NOT FOUND'}
      • 📆 RELEASE DATE: ${release_date || 'NOT FOUND'}
      `.trim();

      fs.unlinkSync(filePath);
      m.reply(txt);
    } catch (error) {
      console.error(error);
      m.reply('An error occurred during music identification.');
    }
  } catch (error) {
    console.error('Error:', error);
    m.reply('An Error Occurred While Processing Your Request.');
  }
};

export default shazam;


        
