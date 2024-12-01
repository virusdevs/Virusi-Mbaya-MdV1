import { eBinary } from '../../lib/virusi2.cjs';

const ebinary = async (m, gss) => {
// const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);  
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['encode', 'ebinary'];

   if (validCommands.includes(cmd)) {
         if (!text) return m.reply('Please provide a text to encode');
         let db = await eBinary(text)
         m.reply(db)
   }
};

export default ebinary;
