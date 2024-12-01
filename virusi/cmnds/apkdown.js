import fetch from 'node-fetch';
import pkg, { prepareWAMessageMedia } from 'gifted-baileys';
const { generateWAMessageFromContent, proto } = pkg;
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

const apkMap = new Map();
let apkIndex = 1; 

const searchAPK = async (m, Matrix) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;

  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
    }
  }

  const selectedId = selectedListId || selectedButtonId;

  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['apk', 'searchapk', 'apkdl', 'app'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a search query for APKs');

    try {
      await m.React("🕘");
      const response = await fetch(`https://web-api-cache.aptoide.com/search?query=${encodeURIComponent(text)}`);
      const searchResult = await response.json();
      const topAPKs = searchResult?.datalist?.list.slice(0, 10); // Get the top 20 APKs

      if (topAPKs.length === 0) {
        m.reply('No APKs found.');
        await m.React("❌");
        return;
      }
      const apkButtons = topAPKs.map((apk, index) => {
        const uniqueId = `apk_${apkIndex + index}`;
        apkMap.set(uniqueId, apk);
        const lastUpdate = new Date(apk.updated).toLocaleDateString(); 
        const sizeMB = (apk.size / 1048576).toFixed(2) + ' MB';
        const rating = apk.stats?.rating?.avg && apk.stats.rating.avg > 0
          ? apk.stats.rating.avg.toFixed(1) 
          : 'No rating';

        return {
          header: "",
          title: `📥 ${index + 1}. ${apk.name}`,
          description: `Developer: ${apk.developer.name}\nVersion: ${apk.file.vername}\nSize: ${sizeMB}\nDownloads: ${apk.stats.downloads}\nRating: ${rating} ★\nLast Update: ${lastUpdate}`,
          id: uniqueId
        };
      });
      const firstAPK = topAPKs[0];
      const messageBody = topAPKs.map((apk, index) => {
        const lastUpdate = new Date(apk.updated).toLocaleDateString();
        const sizeMB = (apk.size / 1048576).toFixed(2) + ' MB';
        const rating = apk.stats?.rating?.avg && apk.stats.rating.avg > 0
          ? apk.stats.rating.avg.toFixed(1)
          : 'No rating';
      }).join('');

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: messageBody 
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> *VIRUSI-MD V2*"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: firstAPK.icon } }, { upload: Matrix.waUploadToServer })), // Replace the image with the first APK's icon
                title: `VIRUSI-MD APK DOWNLOADER\n\nUse Below Buttons`,
                gifPlayback: true,
                subtitle: `Select An App`,
                hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "🔖 Select an App",
                      sections: [
                        {
                          title: "😎 Top 10 APK Results",
                          highlight_label: "🤩 Top 10",
                          rows: apkButtons
                        },
                      ]
                    })
                  }
                ],
              }),
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: false,
              }
            }),
          },
        },
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }, { quoted: m });
      await m.React("✅");

      apkIndex += topAPKs.length;
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) { 
    const selectedAPK = apkMap.get(selectedId);

    if (selectedAPK) {
      try {
        const url = selectedAPK.file.path || selectedAPK.file.path_alt;
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const sizeMB = (selectedAPK.size / 1048576).toFixed(2) + ' MB';
        const lastUpdate = new Date(selectedAPK.updated).toLocaleDateString();
        const rating = selectedAPK.stats?.rating?.avg && selectedAPK.stats.rating.avg > 0
          ? selectedAPK.stats.rating.avg.toFixed(1) 
          : 'No rating';
        await Matrix.sendMessage(m.from, { 
          document: buffer, 
          mimetype: 'application/vnd.android.package-archive', 
          fileName: `${selectedAPK.name}.apk`, 
          caption: `Name: ${selectedAPK.name}\nPackage: ${selectedAPK.package}\nVersion: ${selectedAPK.file.vername}\nSize: ${sizeMB}\nDownloads: ${selectedAPK.stats.downloads}\nRating: ${rating} ★\nDeveloper: ${selectedAPK.developer.name}\nLast Update: ${lastUpdate}\n\n> *VIRUSI-MD V2*`
        }, { quoted: m });

      } catch (error) {
        console.error("Error downloading APK:", error);
        m.reply('Error downloading APK.');
      }
    } 
  }
};

export default searchAPK;
