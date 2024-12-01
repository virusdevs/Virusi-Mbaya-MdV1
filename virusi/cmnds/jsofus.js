
import JavaScriptObfuscator from 'javascript-obfuscator';
import pkg, { prepareWAMessageMedia } from 'gifted-baileys';
const { generateWAMessageFromContent, proto } = pkg;

const JsObfuscation = async (m, Gifted) => {
  try {
    // const prefixMatch = m.body.match(/^[\\/!#.]/);
     const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['enc', 'encrypt', 'obfus', 'obfuscate', 'js-confuse', 'confuse', 'jsconfuse', 'jsenc'];

    if (validCommands.includes(cmd)) {
      if (!text) {
        return m.reply(`Hello _*${m.pushName}*_ Please provide a valid js code after the cmd to Encrypt!.\nUsage: .enc console.log("Gifted-Tech");`);
      }
      await m.React('🕘');
  
      const obfuscationResult = JavaScriptObfuscator.obfuscate(text, {
        compact: false,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: false,
        optionsPreset: 'default',
        identifiersPrefix: 'giftedtech',
        deadCodeInjection: true,
        transformObjectKeys: true,
        deadCodeInjectionThreshold: 1,
        selfDefending: true,
        disableConsoleOutput: false,
        debugProtection: true,
        debugProtectionInterval: 200,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 5,
        stringArrayWrappersParametersMaxCount: 5,
        splitStrings: true,
        stringArrayRotate: true,
        stringArrayIndexShift: true,
        stringArrayIndexesType: [ 'hexadecimal-number' ],
        stringArrayWrappersType: 'variable',
        numbersToExpressions: true,
        identifierNamesGenerator: 'hexadecimal',
        stringArrayThreshold: 1
      });

      const obfuscatedCode = obfuscationResult.getObfuscatedCode();

      // Create interactive message with buttons
      const buttons = [
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "📋 ᴄᴏᴘʏ ᴇɴᴄʀʏᴘᴛᴇᴅ ᴄᴏᴅᴇ",
            id: "copy_code",
            copy_code: obfuscatedCode
          })
        },
        {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: "ᴍᴀɪɴ ᴍᴇɴᴜ",
            id: ".menu"
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
                text: obfuscatedCode
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

      await Gifted.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      });

      await m.React('✅');
      await m.reply('Code Successfully Encrypted✅');
    } else {
      console.log('Invalid command');
    }
  } catch (error) {
    console.error('Error from Gifted API:', error);
    await Gifted.sendMessage(m.from, { text: "Failed to Encrypt Your JsCode. Please try again later." }, { quoted: m });
  }
};

export default JsObfuscation;
