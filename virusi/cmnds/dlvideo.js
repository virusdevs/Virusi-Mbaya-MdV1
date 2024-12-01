 import fetch from 'node-fetch';
import yts from 'yt-search';

const VideoDl = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['video', 'ytmp4'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      await m.reply(`Hello _*${m.pushName}*_,\nPlease provide the video name or YouTube URL,\nEg *.video Spectre by Alan Walker* or\n.video https://youtube.com/watch?v=wdJrTQJh1ZQ`);
      return;
    }

    try {
      await m.React('🕘');
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

      // Dynamically import the gifted package
      const gifted = await import('gifted-dls');

      // Use the desired function from gifted-dls
      const data = await gifted.default.ytv(videoUrl); // For MP4

      if (data) {
        const videoDownloadUrl = data.download_url;
        // const videoResponse = await fetch(videoDownloadUrl);
        // const videoBuffer = await videoResponse.buffer();

        let infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*VIRUSI-MD VIDEO DOWNLOADER*\n
╭───────────────◆
│⿻ *Title:* ${videos[0].title}
│⿻ *Quality:* mp4(720p-HD)
${!isUrl ? `│⿻ *Duration:* ${videos[0].timestamp}` : ''}
${!isUrl ? `│⿻ *Viewers:* ${videos[0].views}` : ''}
${!isUrl ? `│⿻ *Uploaded:* ${videos[0].ago}` : ''}
${!isUrl ? `│⿻ *Artist:* ${videos[0].author.name}` : ''}
╰────────────────◆
⦿ *Direct Yt Link:* ${videoUrl}

╭────────────────◆
│ *VIRUSI-MD V2*
╰─────────────────◆`
        };

        await Gifted.sendMessage(m.from, infoMess, { quoted: m });

        // Send the normal video file with additional caption and metadata
        await Gifted.sendMessage(m.from, {
          video: { url: videoDownloadUrl },
          mimetype: 'video/mp4',
          caption: `NORMAL VIDEO FORMAT\n\n> *VIRUSI-MD V2*`,
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

        await m.React('✅');
      } else {
        await m.reply('Failed to download video. Please try again later.');
      }
    } catch (error) {
      console.error('Error from Gifted API:', error);
      await Gifted.sendMessage(m.from, { text: "Failed with error from Gifted API. Please try again later." });
    }
  }
};

export default VideoDl;
