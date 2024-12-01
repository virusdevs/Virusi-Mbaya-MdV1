import fetch from 'node-fetch'; // Ensure you have this import statement if using node-fetch

const Element = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);  
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['element', 'elements', 'ele'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      await m.reply(`Hello _*${m.pushName}*_ , Please use the example:\n*.element Sodium* or\n*.element Na*`);
      return;
    }

    try {
      await m.React('🕘');
      await m.reply(`A moment, Connecting With Api...`);

      const apiUrl = `https://api.popcat.xyz/periodic-table?element=${encodeURIComponent(text)}`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (result && !result.error) {
        const elementInfo = `
Element Name: ${result.name}
Element Symbol: ${result.symbol}
Atomic Number: ${result.atomic_number}
Atomic Mass: ${result.atomic_mass}
Period: ${result.period}
Phase: ${result.phase}
Discovered By: ${result.discovered_by}
        `.trim();

        // Send the image with element information as caption if available
        if (result.image) {
          await Gifted.sendMessage(m.from, { image: { url: result.image }, caption: elementInfo }, { quoted: m });
        } else {
          await Gifted.sendMessage(m.from, { text: elementInfo }, { quoted: m });
        }

        await m.React('✅');
      } else {
        await m.React('❌');
        await Gifted.sendMessage(m.from, { text: "Could not find the element. Please check your input and try again." }, { quoted: m });
      }
    } catch (error) {
      console.error('Error from Gifted API:', error);
      await m.React('❌');
      await Gifted.sendMessage(m.from, { text: "Failed with an error from Gifted API. Please try again later." }, { quoted: m });
    }
  }
};

export default Element;
