
const MyGrps = async (m, Gifted) => {
 // const prefixMatch = m.body.match(/^[\\/!#.]/);
   const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i); 
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const validCommands = ['groups', 'grps', 'mygroups', 'mygrps', 'my-groups'];

  if (validCommands.includes(cmd)) {
    try {
      await m.React('🕘');
      let getGroupzs = await Gifted.groupFetchAllParticipating();
      if (!getGroupzs) throw new Error('Failed to fetch groups');
      
      let groupzs = Object.entries(getGroupzs)
        .slice(0)
        .map((entry) => entry[1]);
      let anaa = groupzs.map((v) => v.id);
      let jackhuh = `*${m.pushName} GROUPS:*\n\n`;
      await m.reply(`Hello _*${m.pushName},*_ You are currently in ${anaa.length} groups. Virusi Md will send that list in a moment...`);

      for (let i of anaa) {
        try {
          let metadat = await Gifted.groupMetadata(i);
          jackhuh += `*GROUP NAME:*- ${metadat.subject}\n`;
          jackhuh += `*MEMBERS:*- ${metadat.participants.length}\n`;
          jackhuh += `*GROUP ID:*- ${i}\n\n`;
        } catch (metadataError) {
          console.error(`Failed to fetch metadata for group ${i}:`, metadataError);
          jackhuh += `*GROUP ID:*- ${i} (Failed to fetch metadata)\n\n`;
        }
      }

      await m.reply(jackhuh);
      await m.React('✅');
    } catch (error) {
      console.error('Error from Gifted API:', error);
      await Gifted.sendMessage(m.from, { text: "Failed with error from Gifted API. Please try again later." });
    }
  }
};

export default MyGrps;
