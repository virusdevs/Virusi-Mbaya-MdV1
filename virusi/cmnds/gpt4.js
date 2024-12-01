import { GiftedGpt } from 'gifted-gpt';
const gpt4 = new GiftedGpt();
import pkg, { prepareWAMessageMedia } from 'gifted-baileys';
const { generateWAMessageFromContent, proto } = pkg;

const gptResponse = async (m, Matrix) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['chatgpt4', 'chatgptv2', 'chatgpt4v2', 'gptv2', 'gpt4v2', 'gpt', 'chatgpt', 'gpt4', 'gpt4ai'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply(`Hello *_${m.pushName}_,*\n I am Premium ChatGpt4.\n Please Ask a Question.`);
    }

    try {
      await m.React('🕘');
      await m.reply('A moment, Generating Your GPT4 Request...');

    const messages = [
        { role: "system", content: "You're a WhatsApp bot called Gifted-Md that processes users text and accepts commands. You work courtesy of Bing from Microsoft." },
        { role: "user", content: text }
      ];
      
      const options = {
        provider: gpt4.providers.GPT,
        model: "gpt-4",
        debug: true,
        proxy: ""
      };

      const result = await gpt4.chatCompletion(messages, options);
      const response = result; // Assuming result is already the desired response string
      
      // Check if the answer contains code
        const codeMatch = response.match(/```([\s\S]*?)```/);

    let buttons = [];

      // Manage button creation based on the presence of code
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

          // Always add the URL button and text copy button
      buttons.push({
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "📋 ᴄᴏᴘʏ ᴡʜᴏʟᴇ ᴛᴇxᴛ",
            id: "copy_code",
            copy_code: response
          })
        },
                   {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: "ᴍᴀɪɴ ᴍᴇɴᴜ",
            id: ".menu"
          })
        }
      );

      // Generate the WhatsApp message
    let msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: response // Changed from `answer` to `response`
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
    } catch (error) {
      console.error('Error getting GPT response:', error.message);
      m.reply('Error getting response from GPT.');
      await m.React('❌');
    }
  }
};

export default gptResponse;
