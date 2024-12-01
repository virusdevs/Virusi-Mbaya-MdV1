import fetch from 'node-fetch';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';
import { writeFile, unlink } from 'fs/promises';

const MAX_FILE_SIZE_MB = 200; // Maximum file size in megabytes

// Function to upload media (image, video, audio, or other file types) using the Catbox API
async function uploadMedia(buffer, filename) {
  try {
    const bodyForm = new FormData();
    bodyForm.append("fileToUpload", buffer, filename);
    bodyForm.append("reqtype", "fileupload");

    const res = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: bodyForm,
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}: ${res.statusText}`);
    }

    const data = await res.text();
    return data; // Returns the uploaded file URL
  } catch (error) {
    console.error("Error during media upload:", error);
    throw new Error('Failed to upload media');
  }
}

const tourl = async (m, bot) => {
//  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);  
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['tourl', 'geturl', 'upload', 'url'];

  if (validCommands.includes(cmd)) {
    if (!m.quoted || !['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage'].includes(m.quoted.mtype)) {
      return m.reply(`Send/Reply/Quote an image, video, audio, or document to upload \n*${prefix + cmd}*`);
    }

    try {
      const loadingMessages = [
        "*「▰▰▰▱▱▱▱▱▱▱」*",
        "*「▰▰▰▰▱▱▱▱▱▱」*",
        "*「▰▰▰▰▰▱▱▱▱▱」*",
        "*「▰▰▰▰▰▰▱▱▱▱」*",
        "*「▰▰▰▰▰▰▰▱▱▱」*",
        "*「▰▰▰▰▰▰▰▰▱▱」*",
        "*「▰▰▰▰▰▰▰▰▰▱」*",
        "*「▰▰▰▰▰▰▰▰▰▰」*",
      ];

      const loadingMessageCount = loadingMessages.length;
      let currentMessageIndex = 0;

      const { key } = await bot.sendMessage(m.from, { text: loadingMessages[currentMessageIndex] }, { quoted: m });

      const loadingInterval = setInterval(() => {
        currentMessageIndex = (currentMessageIndex + 1) % loadingMessageCount;
        bot.sendMessage(m.from, { text: loadingMessages[currentMessageIndex] }, { quoted: m, messageId: key });
      }, 500);

      const media = await m.quoted.download(); // Download the media from the quoted message
      if (!media) throw new Error('Failed to download media.');

      const fileSizeMB = media.length / (1024 * 1024); // Calculate file size in megabytes
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        clearInterval(loadingInterval);
        return m.reply(`File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.`);
      }

      // Get the file extension and create a filename
      const { ext } = await fileTypeFromBuffer(media);
      const filename = `file.${ext}`; // You can customize the filename as needed

      // Upload the media using the Catbox API
      const mediaUrl = await uploadMedia(media, filename);

      clearInterval(loadingInterval);
      await bot.sendMessage(m.from, { text: '✅ Loading complete.' }, { quoted: m });

      // Logic to handle sending back media + URL for images/videos or just URL for audio and other files
      const mediaType = getMediaType(m.quoted.mtype);

      let message;
      if (mediaType === 'audio') {
        // Send only the URL for audio
        message = {
          text: `*Hey ${m.pushName} Here Is Your Audio URL*\n*Url:* ${mediaUrl}\n*File Size:* ${fileSizeMB.toFixed(2)} MB\n*File Expiration:* No Expiry`,
        };
      } else if (mediaType === 'document' || mediaType === 'other') {
        // Send only the URL for documents and other types
        message = {
          text: `*Hey ${m.pushName} Here Is Your Document URL*\n*Url:* ${mediaUrl}\n*File Size:* ${fileSizeMB.toFixed(2)} MB\n*File Expiration:* No Expiry`,
        };
      } else {
        // Send the media file along with the URL, file size, and expiration for images/videos
        message = {
          [mediaType]: { url: mediaUrl },
          caption: `*Hey ${m.pushName} Here Is Your Media*\n*Url:* ${mediaUrl}\n*File Size:* ${fileSizeMB.toFixed(2)} MB\n*File Expiration:* No Expiry`,
        };
      }
      await bot.sendMessage(m.from, message, { quoted: m });

    } catch (error) {
      console.error('Error processing media:', error);
      m.reply('Error processing media.');
    }
  }
};

// Function to get the media type for messaging
const getMediaType = (mtype) => {
  switch (mtype) {
    case 'imageMessage':
      return 'image';
    case 'videoMessage':
      return 'video';
    case 'audioMessage':
      return 'audio';
    case 'documentMessage':
      return 'document';
    default:
      return 'other'; // Handle any other file types as 'other'
  }
};

export default tourl;
