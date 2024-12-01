import { dBinary } from '../../lib/virusi2.cjs';

const dbinary = async (m, gss) => {
   // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['decode', 'dbinary'];

   if (validCommands.includes(cmd)) {
         if (!text) return m.reply('Please provide a text to decode.');
         let db = await dBinary(text)
         m.reply(db)
   }
};

export default dbinary;
