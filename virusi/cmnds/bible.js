import fetch from 'node-fetch'; // Import node-fetch
import { translate } from '@vitalets/google-translate-api';

const Bible = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['bible', 'bibble', 'bble', 'ble', 'christian'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      await m.reply(`Hello _*${m.pushName}*_ , Please provide book name, chapter, and verse eg *.bible John 3:16*`);
      return;
    }

    try {
      await m.React('🕘');
      await m.reply(`A moment, Getting Your Bible Verse...`);

let VerseRes = await fetch(`https://bible-api.com/${text}`);

if (!VerseRes.ok) return repondre(`Please specify the chapter number or name. Example: bible john 3:16`);

let verseData = await VerseRes.json();
      
// Translate the chapter content
 const translatedChapterHindi = await translate(verseData.text, { to: 'hi' });
 const translatedChapterEnglish = await translate(verseData.text, { to: 'en' });
 const translatedChapterSwahili = await translate(verseData.text, { to: 'sw' });

let bibleChapter = `📖 *THE VIRUSI BIBLE*\n
📜 *_Bible Chapter:_* ${verseData.reference}\n
🔢 *_Number of Verses:_* ${verseData.verses.length}\n
🔮 *_Chapter Content (English):_*
${translatedChapterEnglish.text}\n\n
🔮 *_Chapter Content (Swahili):_*
${translatedChapterSwahili.text}\n\n
🔮 *_Chapter Content (Hindi):_*
${translatedChapterHindi.text}\n\n> *VIRUSI-MD V2*`;

      await Gifted.sendMessage(m.from, {text: bibleChapter}, {quoted: m});
      await m.React('✅');
        } catch (error) {
      console.error('Error fetching verse:', error);
      await Gifted.sendMessage(m.from, { text: "Failed to retrieve verse. Please try again later." });
    }
  }
};

export default Bible;
