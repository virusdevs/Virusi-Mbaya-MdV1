const report = async (m, gss) => {
  try {
    // const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['calculate', 'calc', 'math', 'maths', 'calculator', 'cal'];
    
    if (validCommands.includes(cmd)) {
      let id = m.from;
      gss.math = gss.math ? gss.math : {};

      if (id in gss.math) {
        clearTimeout(gss.math[id][3]);
        delete gss.math[id];
        return m.reply('...');
      }

      let val = text
        .replace(/[^0-9\-\/+*×÷πEe()piPI.]/g, '') // Allow decimal point '.'
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π|pi/gi, 'Math.PI')
        .replace(/e/gi, 'Math.E')
        .replace(/\/+/g, '/')
        .replace(/\++/g, '+')
        .replace(/-+/g, '-');

      let format = val
        .replace(/Math\.PI/g, 'π')
        .replace(/Math\.E/g, 'e')
        .replace(/\//g, '÷')
        .replace(/\*/g, '×');

      let result = (new Function('return ' + val))();

      if (isNaN(result)) throw new Error('example: .calc 500+500');

      m.reply(`*${format}* = _${result}_`);
    }
  } catch (error) {
    // Handle specific error messages
    if (error instanceof SyntaxError) {
      return m.reply('Invalid syntax. Please check your expression.');
    } else if (error instanceof Error) {
      return m.reply(error.message);
    } else {
    }
  }
};

export default report;
