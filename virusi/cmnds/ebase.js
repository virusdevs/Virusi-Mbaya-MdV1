import axios from 'axios';
import pkg, { prepareWAMessageMedia } from 'gifted-baileys';
const { generateWAMessageFromContent, proto } = pkg;

const Ebase = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);  
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const BaseUrl = 'https://api.giftedtech.us.kg';
  const giftedapikey = '_0x5aff35,_0x187643kkr';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['ebase'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply(`Hello *_${m.pushName}_,*\nPlease Provide Me a text to Encrypt.`);

    try {
      await m.React('🕘');
      await m.reply('A moment...');
      let Z = giftedapikey;

      const apiUrl = `${BaseUrl}/api/tools/ebase?query=${encodeURIComponent(text)}&apikey=${Z}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result && result.result) {
        const answer = result.result;
        
        // Check if the answer contains code
        const codeMatch = answer.match(/```([\s\S]*?)```/);
        
        if (codeMatch) {
          const code = codeMatch[1];
          
          let msg = generateWAMessageFromContent(m.from, {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                  body: proto.Message.InteractiveMessage.Body.create({
                    text: answer
                  }),
                  footer: proto.Message.InteractiveMessage.Footer.create({
                    text: "> *VIRUSI-MD V2*"
                  }),
                  header: proto.Message.InteractiveMessage.Header.create({
                    title: "",
                    subtitle: "",
                    hasMediaAttachment: false
                  }),
                  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [
                      {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                          display_text: "Copy Your Code",
                          id: "copy_code",
                          copy_code: code
                        })
                      }
                    ]
                  })
                })
              }
            }
          }, {});

          await Gifted.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
          });
        } else {
          await Gifted.sendMessage(m.from, { text: answer }, { quoted: m });
        }

        await m.React('✅');
      } else {
        throw new Error('Invalid response from the GPT API.');
      }
    } catch (error) {
      console.error('Error getting GPT response:', error.message);
      m.reply('Error getting response from GPT.');
      await m.React('❌');
    }
  }
};

export default Ebase;
