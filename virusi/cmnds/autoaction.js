import config from '../../set.cjs';

async function handleCommand(m, bot) {
    // const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefixMatch = m.body.match(/^[+×÷=/_<>[\]!@#.£%^&*()\-"'1234567890?,°€£^:;?¿‽】〕」』【〔「『<>_${}\|`《○♡○¡☆《●●■◇¡¤▪︎•°~♡●♧₩$€○》☆¡Abcdefghijklmonpqrstuvwxyz]/i);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    if (!m.body.startsWith(prefix)) {
        return;
    }

    if (config.AUTO_TYPING && m.from) {
        bot.sendPresenceUpdate("composing", m.from);
    }

    if (config.AUTO_RECORDING && m.from) {
        bot.sendPresenceUpdate("recording", m.from);
    }

    if (m.from) {
        bot.sendPresenceUpdate(config.ALWAYS_ONLINE ? 'available' : 'unavailable', m.from);
    }

    if (config.AUTO_READ) {
        await bot.readMessages([m.key]);
    }

    if (config.AUTO_BLOCK && m.sender.startsWith('212')) {
        await bot.updateBlockStatus(m.sender, 'block');
    }
}

export default handleCommand;


    
