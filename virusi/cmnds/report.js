const report = async (m, gss) => {
  const reportedMessages = {};
  const devlopernumber = '254748721079';
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['report', 'request']; 
  
  if (validCommands.includes(cmd)) {
    
  if (!text) return m.reply(`*Hello _${m.pushName}_*\nUsage Example: ${prefix + cmd} hi Virusi 🦠 Mbaya play command is not working`);

    const messageId = m.key.id;

    if (reportedMessages[messageId]) {
        return m.reply("This report has already been forwarded to the owner. Please wait for a response.");
    }

    reportedMessages[messageId] = true;

    const textt = `*| REQUEST/BUG |*`;
    const teks1 = `\n\n*User*: @${m.sender.split("@")[0]}\n*Request/Bug*: ${text}`;
    const teks2 = `\n\n*Hi ${m.pushName}, your request has been forwarded to my Owners.*\n*Please wait...*`;

    // Send the message to the first owner in the `owner` array
    gss.sendMessage(devlopernumber + "@s.whatsapp.net", {
        text: textt + teks1,
        mentions: [m.sender],
    }, {
        quoted: m,
    });

    // Send a reply to the user
    m.reply(`*Hello _${m.pushName}_*\nTʜᴀɴᴋ ʏᴏᴜ ꜰᴏʀ ʏᴏᴜʀ ʀᴇᴘᴏʀᴛ.\nIᴛ ʜᴀs ʙᴇᴇɴ ꜰᴏʀᴡᴀʀᴅᴇᴅ ᴛᴏ ᴛʜᴇ ᴏᴡɴᴇʀ.\nPʟᴇᴀsᴇ ᴡᴀɪᴛ ꜰᴏʀ ᴀ ʀᴇsᴘᴏɴsᴇ.`);
   }
};

export default report;
