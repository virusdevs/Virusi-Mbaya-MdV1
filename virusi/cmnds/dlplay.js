import yts from 'yt-search';

const AudioDl = async (m, Gifted) => {
  // javascript
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['play', 'ytmp3'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      await m.reply(`Hello _*${m.pushName}*_ ,\nPlease provide the video name or YouTube URL, \nEg *.play Spectre by Alan Walker*`);
      return;
    }

    try {
      await m.React('🦠');
      await m.reply(`Downloading, Please Wait...`);

      let videoUrl = text;
      let videos = [];

      // Check if the provided text is a valid YouTube URL
      const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      const isUrl = urlPattern.test(text);

      if (!isUrl) {
        // Perform YouTube search to get the video URL
        const search = await yts(text);
        videos = search.videos;

        if (videos && videos.length > 0 && videos[0]) {
          videoUrl = videos[0].url;
        } else {
          await m.reply('No videos found.');
          return;
        }
      }

      const gifted = await import('gifted-dls');
      // Use the desired function from gifted-dls
      const data = await gifted.default.yta(videoUrl); // For MP3

      if (data) { // Ensure data is not null or undefined
        const audioDownloadUrl = data.download_url;

        let infoMess = {
          image: { url: isUrl ? 'https://telegra.ph/file/c2a4d8d65722553da4c89.jpg' : videos[0].thumbnail },
          caption: `*𝐕𝐈𝐑𝐔𝐒𝐈-𝐌𝐃 𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑*\n
╭───────────────◆
│⿻ *Title:* ${videos[0].title}
│⿻ *Quality:*  mp3(128kbps)
${!isUrl ? `│⿻ *Duration:* ${videos[0].timestamp}` : ''}
${!isUrl ? `│⿻ *Viewers:* ${videos[0].views}` : ''}
${!isUrl ? `│⿻ *Uploaded:* ${videos[0].ago}` : ''}
${!isUrl ? `│⿻ *Artist:* ${videos[0].author.name}` : ''}
╰────────────────◆
⦿ *Direct Yt Link:* ${videoUrl}

╭────────────────◆
│ *©𝟐𝟎𝟐𝟒 𝐕𝐈𝐑𝐔𝐒𝐈 𝐌𝐃 𝐕𝟐*
╰─────────────────◆`
        };

        await Gifted.sendMessage(m.from, infoMess, { quoted: m });

        // Send the normal video file with additional caption and metadata
        await Gifted.sendMessage(m.from, {
          audio: { url: audioDownloadUrl },
          mimetype: 'audio/mp4',
          caption: `NORMAL AUDIO FORMAT\n\n> *©𝟐𝟎𝟐𝟒 𝐕𝐈𝐑𝐔𝐒𝐈 𝐌𝐃 𝐕2*`,
          contextInfo: {
            externalAdReply: {
              showAdAttribution: false,
              title: videos[0].title,
              body: 'Powered by Vurusian',
              thumbnailUrl: videos[0].thumbnail,
              sourceUrl: 'https://whatsapp.com/channel/0029VafL5zUKbYMKza6vAv1V',
              mediaType: 1,
              renderLargerThumbnail: false
            }
          }
        }, { quoted: m });

        await m.React('🦠');
      } else {
        await m.reply('Failed to download audio. Please try again later.');
      }
    } catch (error) {
      console.error('Error from API:', error);
      await Gifted.sendMessage(m.from, { text: "Failed with error from API. Please try again later." });
    }
  }
};

export default AudioDl;
