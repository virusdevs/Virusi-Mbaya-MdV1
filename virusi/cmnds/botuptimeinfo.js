import pkg, { prepareWAMessageMedia } from 'gifted-baileys';
const { generateWAMessageFromContent, proto } = pkg;

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

const alive = async (m, Matrix) => {
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
    const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    if (['uptime', 'alive'].includes(cmd)) {

  const uptimeMessage = `
*Hello _${m.pushName}_*\n
*VIRUSI MD IS RUNNING!!*
*BOT UPTIME INFO:* ${readmore}
*╭═════════════════⊷*
*┃❍ ${days} Day(s)*
*┃❍ ${hours} Hour(s)*
*┃❍ ${minutes} Minute(s)*
*┃❍ ${seconds} Second(s)*
*╰═════════════════⊷*
`;

  const buttons = [
       {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "ʙᴏᴛ sᴄʀɪᴘᴛ",
            id: `.repo`
          })
        },
       {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "ᴍᴀɪɴ ᴍᴇɴᴜ",
            id: `.menu`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "ᴛᴇsᴛ ᴍᴇssᴀɢᴇ",
            id: `.test`
          })
        }
        ];

  const msg = generateWAMessageFromContent(m.from, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: uptimeMessage
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "> *VIRUSI-MD 2*"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "",
            gifPlayback: true,
            subtitle: "",
            hasMediaAttachment: false 
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons
          }),
          contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: false,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Gifted-MD",
                  serverMessageId: 143
                }
              }
        }),
      },
    },
  }, {});

  await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  });
    }
};

export default alive;
