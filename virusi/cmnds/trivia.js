
import fetch from 'node-fetch';
const Trivia = async (m, Gifted) => {
  // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['trivia', 'triviaquiz'];

  if (validCommands.includes(cmd)) {
    try {
      await m.React('🕘');
      await m.reply('Fetching...');
      
      const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    
    if (response.status !== 200) {
      return m.reply(`Invalid response from the trivia API. Status code: ${response.status}`);
    }

    const result = await response.json();

    if (result && result.results && result.results[0]) {
      const trivia = result.results[0];
      const question = trivia.question;
      const correctAnswer = trivia.correct_answer;
      const allAnswers = [...trivia.incorrect_answers, correctAnswer].sort();

      const answers = allAnswers.map((answer, index) => `${index + 1}. ${answer}`).join('\n');
      
      await Gifted.sendMessage(m.from, { text: `Here's a trivia question for you: \n\n${question}\n\n${answers}\n\nI will send the correct answer in 10 seconds...` }, { quoted: m });
      
      setTimeout(async () => {
        await Gifted.sendMessage(m.from, { text: `The correct answer is: ${correctAnswer}` }, { quoted: m });
      }, 10000); // 10000 ms = 10 seconds
    } else {
      throw new Error('Invalid response format from the trivia API.');
    }
      await m.React('✅');
    } catch (error) {
      console.error('Error from Gifted API:', error);
      await Gifted.sendMessage(m.from, { text: "Failed with error from Gifted API. Please try again later." });
    }
  }
};

export default Trivia;
