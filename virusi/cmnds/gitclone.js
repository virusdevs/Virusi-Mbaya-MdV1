import fetch from 'node-fetch';

const gitclone = async (m, Gifted) => {
 // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);  
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['gitclone', 'git-clone', 'repodl', 'repoclone', 'repo-clone', 'repo-dl'];

  if (validCommands.includes(cmd)) {
    try {
      await m.React('🕘');
      await m.reply('A moment, Downloading your Repo Clone Request...');
if (!text.includes('github.com')) {
      return m.reply(`Null!!!!!!\nHello _*${m.pushName}*_\nPlease provide a valid GitHub repo link, e.g\n *Usage:* .gitclone https://github.com/Vurusian/virusi-md`);
 
      }

      const regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
      const match = text.match(regex1);
      if (!match) {
        return m.reply('Failed to parse GitHub repo link. Please provide a valid link.');
      }

      let [, user3, repo] = match;
      repo = repo.replace(/.git$/, '');
      const url = `https://api.github.com/repos/${user3}/${repo}/zipball`;
      const response = await fetch(url, { method: 'HEAD' });

      if (!response.ok) {
        throw new Error('Failed to fetch repo.');
      }

      const filename = response.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
      await Gifted.sendMessage(m.from, { document: { url: url }, fileName: `${filename}`, mimetype: 'application/zip' }, { quoted: m });
      await m.React('✅');
      await m.reply('*Download Success...*');

    } catch (error) {
      console.error('Error fetching repo:', error);
      await Gifted.sendMessage(m.from, { text: "Failed to retrieve the repo. Please try again later." }, { quoted: m });
    }
  }
};

export default gitclone;
