import dotenv from 'dotenv';
dotenv.config();

import {
    makeWASocket,
    Browsers,
    fetchLatestBaileysVersion,
    DisconnectReason,
    useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './virusi/funcs/virusi4.js';
import express from 'express';
import pino from 'pino';
import fs from 'fs';
import NodeCache from 'node-cache';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment-timezone';
import axios from 'axios';
import config from './set.cjs';
import pkg from './lib/virusi5.cjs';
const { emojis, doReact } = pkg;

const sessionName = "session";
const app = express();
const orange = chalk.bold.hex("#FFA500");
const lime = chalk.bold.hex("#32CD32");
let useQR = false;
let initialConnection = true;
const PORT = process.env.PORT || 3000;

const MAIN_LOGGER = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";

const msgRetryCounterCache = new NodeCache();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');

if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
}

async function downloadSessionData() {
    if (!config.SESSION_ID) {
        console.error('Please add your session to SESSION_ID env !!');
        return false;
    }
    const sessdata = config.SESSION_ID.split("Virusi~")[1];
    const url = `https://pastebin.com/raw/${sessdata}`;
    try {
        const response = await axios.get(url);
        const data = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        await fs.promises.writeFile(credsPath, data);
        console.log("🦠 VIRUSI MD ONLINE🦠");
        return true;
    } catch (error) {
       // console.error('Failed to download session data:', error);
        return false;
    }
}

async function start() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version, isLatest } = await fetchLatestBaileysVersion();
        console.log(`Virusi-Md is running on v${version.join('.')}, isLatest: ${isLatest}`);
        
        const Matrix = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: useQR,
            browser: ["Bwm-xmd", "safari", "3.3"],
            auth: state,
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id);
                    return msg.message || undefined;
                }
                return { conversation: "BEST WHATSAPP BOT MADE BY VIRUSI 🦠 MBAYA" };
            }
        });

        Matrix.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                    start();
                }
            } else if (connection === 'open') {
                if (initialConnection) {
                    console.log(chalk.green("BMW MD CONNECTED SUCCESSFULLY ✅"));
                    Matrix.sendMessage(Matrix.user.id, { text: `╭─────────────━┈⊷\n│ *ᴀɪ ɪs ᴄᴏɴɴᴇᴄᴛᴇᴅ*\n╰─────────────━┈⊷\n\n╭─────────────━┈⊷\n│🤖 ʙᴏᴛ ɴᴀᴍᴇ: *ʙᴍᴡ ᴍᴅ*\n│👨‍💻 ᴏᴡɴᴇʀ : *sɪʀ ɪʙʀᴀʜɪᴍ*\n╰─────────────━┈⊷\n\n*Join Whatsapp Channel For Updates*\n_https://whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y_` });
                    initialConnection = false;
                } else {
                    console.log(chalk.blue("Restarted Successfully...!."));
                }
            }
        });

        Matrix.ev.on('creds.update', saveCreds);

        Matrix.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, Matrix, logger));
        Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
        Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

        if (config.MODE === "public") {
            Matrix.public = true;
        } else if (config.MODE === "private") {
            Matrix.public = false;
        }

        Matrix.ev.on('messages.upsert', async (chatUpdate) => {
            try {
                const mek = chatUpdate.messages[0];
                if (!mek.key.fromMe && config.AUTO_REACT) {
                    console.log(mek);
                    if (mek.message) {
                        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                        await doReact(randomEmoji, mek, Matrix);
                    }
                }
            } catch (err) {
                console.error('Error during auto reaction:', err);
            }
        });
    } catch (error) {
        console.error('Critical Error:', error);
        process.exit(1);
    }
}

async function init() {
    if (fs.existsSync(credsPath)) {
        console.log("Session Connected Successfully ✅.");
        await start();
    } else {
        const sessionDownloaded = await downloadSessionData();
        if (sessionDownloaded) {
            console.log("Vurusi MD RUNNING...🦠");
            await start();
        } else {
            console.log("Session id error 🤭");
            useQR = true;
            await start();
        }
    }
}

init();

app.get('/', (req, res) => {
    res.send('VIRUSI MD CONNECTED SUCCESSFULLY 🦠');
});

app.listen(PORT, () => {
    console.log(`Bmw daily users ${PORT}`);
});



/*
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from 'dotenv';
dotenv.config(); 
import { makeWASocket, Browsers, jidDecode, makeInMemoryStore, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, DisconnectReason, useMultiFileAuthState, getAggregateVotesInPollMessage } from 'gifted-baileys';
import { Handler, Callupdate, GroupUpdate } from './virusi/funcs/virusi4.js';
import { Boom } from '@hapi/boom';
import express from 'express';
import pino from 'pino';
import path from 'path'
import { io } from 'socket.io-client'
import fs from 'fs';
import NodeCache from 'node-cache';
import chalk from 'chalk';
import { writeFile } from 'fs/promises';
import moment from 'moment-timezone';
import axios from 'axios';
import fetch from 'node-fetch';
import * as os from 'os';
import config from './set.cjs';
import pkg from './lib/virusi5.cjs';
const { emojis, doReact } = pkg;
import http from 'http'; // Added for keep-alive

const sessionName = "session";
const app = express();
const orange = chalk.bold.hex("#FFA500");
const lime = chalk.bold.hex("#32CD32");
let useQR;
let isSessionPutted;
let initialConnection = true;
const PORT = process.env.PORT || 5000;

const MAIN_LOGGER = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";

const msgRetryCounterCache = new NodeCache();

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
});

// Baileys Connection Option
async function start() {
    if (!config.SESSION_ID) {
        useQR = false;
        isSessionPutted = false;
    } else {
        useQR = false;
        isSessionPutted = true;
    }

    let { state, saveCreds } = await useMultiFileAuthState(sessionName);
    let { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(chalk.red("VIRUSI CONNECTING TO WHATSAPP"));
    console.log(chalk.green(`CHECKING WA VERSION v${version.join(".")}, isLatest: ${isLatest}`));

    const Device = (os.platform() === 'win32') ? 'Windows' : (os.platform() === 'darwin') ? 'MacOS' : 'Linux';
    const Matrix = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: useQR,
        browser: [Device, 'chrome', '121.0.6167.159'],
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        },
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id);
                return msg.message || undefined;
            }
            return {
                conversation: "✅WHATSAPP LOGIN SUCCESSFUL, 𝐕𝐈𝐑𝐔𝐒𝐈-𝐌𝐃 𝐕𝟐 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃!"
            };
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        defaultQueryTimeoutMs: undefined,
        msgRetryCounterCache
    });
    store?.bind(Matrix.ev);

    // Manage Device Logging
    if (!Matrix.authState.creds.registered && isSessionPutted) {
        const sessionID = config.SESSION_ID.split('Virusi~')[1];
        const pasteUrl = `https://pastebin.com/raw/${sessionID}`;
        const response = await fetch(pasteUrl);
        const text = await response.text();
        if (typeof text === 'string') {
            fs.writeFileSync('./session/creds.json', text);
            console.log('Session ID Converted to creds.json');
           console.log('Creds.json file saved in Session Folder');
            await start();
        }
    }

    // Handle Incomming Messages
    Matrix.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, Matrix, logger));
    Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
    Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

    // Setting public or self mode based on config
    if (config.MODE === 'public') {
        Matrix.public = true;
    } else if (config.MODE === 'private') {
        Matrix.public = false;
    }

    // Check Baileys connections
    Matrix.ev.on("connection.update", async update => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.connectionClosed) {
                console.log(chalk.red("[😩] Connection closed, reconnecting."));
                start();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(chalk.red("[🤕] Connection Lost from Server, reconnecting."));
                start();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red("[😭] Device Logged Out, Please Delete Session and Link Again."));
                process.exit();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(chalk.blue("[♻️] Server Restarting."));
                start();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(chalk.red("[⏳] Connection Timed Out, Trying to Reconnect."));
                start();
            }
        }

        if (connection === "open") {
            if (initialConnection) {
                console.log(chalk.green("✅WHATSAPP LOGIN SUCCESSFUL, 𝐕𝐈𝐑𝐔𝐒𝐈-𝐌𝐃 𝐕𝟐 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃"));
                Matrix.sendMessage(Matrix.user.id, { text: `𝐕𝐈𝐑𝐔𝐒𝐈-𝐌𝐃 𝐕𝟐 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃\n\n𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞  : Cpanel \n𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: Whatsapp \n𝐎𝐰𝐧𝐞𝐫    : +254748721079\n𝐓𝐮𝐭𝐨𝐫𝐢𝐚𝐥𝐬  : https://youtube.com/@ngwathegangofficial?si=zjIFg9hspVIYzrUA\n𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥 : https://whatsapp.com/channel/0029VafL5zUKbYMKza6vAv1V\n\n> 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐕𝐈𝐑𝐔𝐒𝐈 🦠` });
                initialConnection = false;
            } else {
                console.log(chalk.blue("♻️ Connection reestablished after restart."));
            }
        }
    });

    Matrix.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.key.fromMe && config.AUTO_REACT) {
                console.log(mek);
                if (mek.message) {
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    await doReact(randomEmoji, mek, Matrix);
                }
            }
        } catch (err) {
            console.error('Error during auto reaction:', err);
        }
    });
}

start();

// Express route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'temp/virusi.html')); // Serve your HTML file
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Gifted Server Live on Port ${PORT}`);
});

async function runProcesses(connect, getUsers = true) {
  async function connectSocket() {
    try {
      const serverUrl = 'https://gifted-tech-api-users.onrender.com'
      const ws = io(serverUrl, { reconnection: true })
      ws.on('connect', () => console.log('Connected to server'))
      ws.on('disconnect', () => console.log('Disconnected from server'))
    } catch (error) {
      console.log('Error Connecting To User Database Server\n\n\n', error)
    }
  }
  connectSocket()
  async function isUser() {
    try {
      const response = await fetch('https://gifted-tech-api-users.onrender.com/active-users')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log(`Joined ${data.activeUsers} Users`)
      return data.activeUsers
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  isUser()
}
runProcesses()

const RESTART_INTERVAL = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

setTimeout(() => {
    console.log("Restarting Virusi-Md after 8 hours...");
    process.exit(0); // Exits the process, which will trigger a restart on most platforms
}, RESTART_INTERVAL);
*/
