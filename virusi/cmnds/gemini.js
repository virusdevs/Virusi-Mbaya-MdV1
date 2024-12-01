import axios from 'axios';
import pkg, { prepareWAMessageMedia } from 'gifted-baileys';
const { generateWAMessageFromContent, proto } = pkg;

const geminiResponse = async (m, Matrix) => {
 // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);  
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const BaseUrl = 'https://api.giftedtech.us.kg';
  const giftedapikey = '_0x5aff35,_0x187643kkr';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['gemini', 'geminiai'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply(`Hello *_${m.pushName}_,*\n Gifted Gemini Ai Here.\n Please Ask Me a Question.`);

    try {
      await m.React('🕘');
      await m.reply('A moment, Generating Your Gemini Request...');
      let R = giftedapikey;

      const apiUrl = `${BaseUrl}/api/ai/geminiai?q=${encodeURIComponent(text)}&apikey=${R}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result && result.result) {
        const answer = result.result;
        const getsess = `${answer}\n\n`;
        
        // Check if the answer contains code
        const codeMatch = answer.match(/```([\s\S]*?)```/);
        
        let buttons = [];
        if (codeMatch) {
          const code = codeMatch[1];
          buttons.push({
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📋 ᴄᴏᴘʏ ɢᴇɴᴇʀᴀᴛᴇᴅ ᴄᴏᴅᴇ",
              id: "copy_code",
              copy_code: code
            })
          });
        }

        // Add the URL button in both cases
        buttons.push({
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📋 ᴄᴏᴘʏ ᴡʜᴏʟᴇ ᴛᴇxᴛ",
              id: "copy_code",
              copy_code: getsess
            })
          },
          {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: "ᴍᴀɪɴ ᴍᴇɴᴜ",
            id: ".menu"
          })
        });

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
                  buttons: buttons
                })
              })
            }
          }
        }, {});

        await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
          messageId: msg.key.id
        });

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

export default geminiResponse;
