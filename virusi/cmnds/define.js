import fetch from 'node-fetch';

const DefineCommand = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['define', 'difine', 'defin', 'difin', 'definition', 'defination', 'difinition', 'difination'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply(`Hello *_${m.pushName}_,*\nPlease provide a word for definition after the command, e.g., *.define cow*`);
    }

    try {
      await m.React('🕘');
      await m.reply('A moment, Generating Your Definition Search Request...');

      const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(`An error occurred: ${json.message}`);
      }

      if (!json.list.length) {
        throw new Error('Word not found in the dictionary.');
      }

      const firstEntry = json.list[0];
      const definition = firstEntry.definition;
      const example = firstEntry.example ? `\n*Example:* ${firstEntry.example}` : '';

      const message = `*Word:* ${text}\n*Definition:* ${definition}${example}`;
      await Gifted.sendMessage(m.from, { text: message }, { quoted: m });

      await m.React('✅');
    } catch (error) {
      console.error('Error getting Urban Dictionary response:', error.message);
      await m.reply(`Error getting response: ${error.message}`);
      await m.React('❌');
    }
  }
};

export default DefineCommand;
