import yts from 'yt-search';
import pkg, { prepareWAMessageMedia } from 'gifted-baileys';
const { generateWAMessageFromContent, proto } = pkg;

const videoMap = new Map();
let videoIndex = 1;
let audioIndex = 1001;

const song = async (m, Matrix) => {
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

  const validCommands = ['yts', 'ytsearch'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a YouTube URL or search query');

    try {
      await m.React("🕘");
      await m.reply('A moment, *Gifted-Md* is Generating Download Buttons...');

      // Search YouTube for the provided query
      const searchResult = await yts(text);
      const topVideos = searchResult.videos.slice(0, 50);

      if (topVideos.length === 0) {
        m.reply('No results found.');
        await m.React("❌");
        return;
      }

      const videoButtons = topVideos.map((video, index) => {
        const uniqueId = videoIndex + index;
        videoMap.set(uniqueId, { ...video, isAudio: false });
        return {
          header: "",
          title: video.title,
          description: ``,
          id: `🎦video_${uniqueId}`
        };
      });

      const audioButtons = topVideos.map((video, index) => {
        const uniqueId = audioIndex + index;
        videoMap.set(uniqueId, { ...video, isAudio: true });
        return {
          header: "",
          title: video.title,
          description: ``,
          id: `🎵audio_${uniqueId}`
        };
      });

      const firstVideo = topVideos[0];
      const title = firstVideo.title;
      const author = firstVideo.author.name;
      const duration = firstVideo.duration.seconds;
      const views = firstVideo.views;
      const url = `https://www.youtube.com/watch?v=${firstVideo.videoId}`;
      const thumbnailUrl = firstVideo.thumbnail;

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `> *VIRUSI-MD V2*\n\n*Tittle:* _${title}_\n*Artist:* _${author}_\n*Duration:* _${duration}s_\n*Views:* _${views}_\n*Link:* _${url}_`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> *VIRUSI-MD V2*"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: Matrix.waUploadToServer })),
                title: ``,
                gifPlayback: true,
                subtitle: "",
                hasMediaAttachment: false
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "🎥 sᴇʟᴇᴄᴛ ᴀ ᴠɪᴅᴇᴏ",
                      sections: [
                        {
                          title: "😎 Top 50 YouTube Results - Videos",
                          highlight_label: "🤩 Top 50",
                          rows: videoButtons
                        }
                      ]
                    })
                  },
                  {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                      title: "🎧 sᴇʟᴇᴄᴛ ᴀɴ ᴀᴜᴅɪᴏ",
                      sections: [
                        {
                          title: "🎶 Top 50 YouTube Results - Audios",
                          highlight_label: "🤩 Top 50",
                          rows: audioButtons
                        }
                      ]
                    })
                  }
                ]
              }),
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: false
              }
            })
          }
        }
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      });
      await m.React("✅");

      videoIndex += topVideos.length;
      audioIndex += topVideos.length;
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) {
    const isAudio = selectedId.startsWith('🎵audio_');
    const key = parseInt(selectedId.replace(isAudio ? '🎵audio_' : '🎦video_', ''));
    const selectedVideo = videoMap.get(key);

    if (selectedVideo) {
      try {
        const apiUrl = isAudio
          ? `https://www.youtube.com/watch?v=${selectedVideo.videoId}`
          : `https://www.youtube.com/watch?v=${selectedVideo.videoId}`;

        // Dynamically import the gifted package
        const gifted = await import('gifted-dls');

        // Use the desired function from gifted-dls
        const data1 = await gifted.default.yta(apiUrl); // For MP3
        const data2 = await gifted.default.ytv(apiUrl); // For MP4

        // Check if both download URLs are available
        if (data1.download_url && data2.download_url) {
          const audioDownloadUrl = data1.download_url;
          const videoDownloadUrl = data2.download_url;

          await Matrix.sendMessage(m.from,
            isAudio
              ? {
                  audio: { url: audioDownloadUrl },
                  mimetype: 'audio/mp4',
                  fileName: `${selectedVideo.title}.mp3`,
                  ptt: false,
                  contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                      title: selectedVideo.title,
                      body: `Powered by Vurusian`,
                      thumbnailUrl: selectedVideo.thumbnail,
                      sourceUrl: `https://whatsapp.com/channel/0029VafL5zUKbYMKza6vAv1V`,
                      mediaType: 1,
                      renderLargerThumbnail: false
                    }
                  }
                }
              : {
                  video: { url: videoDownloadUrl },
                  mimetype: 'video/mp4',
                  caption: `*Tittle:* ${selectedVideo.title}\n*Artist:* ${selectedVideo.author.name}\n*Duration:* ${selectedVideo.duration.seconds}s\n\n> *VIRUSI-MD V2*`
                },
            { quoted: m }
          );
        } else {
          throw new Error('Invalid response from the API.');
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
        m.reply('Error processing your request.');
        await m.React("❌");
      }
    }
  }
};

export default song;
