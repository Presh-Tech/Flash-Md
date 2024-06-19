const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0F0VG9hNnhqdWd3cUpIZThQZnVjNms4WERieUphZWJjVkh6eENtQkVWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEVFZURHN0V1aDRObFp3eGV4ZG9aSjFuWnhua0RFTGxIc3hCbExnM0QzQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtRE1FbHE5bld2ZjREN0tUSVJUNFBPZTZyTlBad0owcE1VbEdKOEVaWFhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1cXpQdE9Kd2FWTTVXZng5a0VTN0Q3WUdFN1orTUpEbjlBMUdtTDNaNG1JPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZPeWhvNm1wblFiMVMvQWwrbzBCeGJDWElNa3lCbE1na3dRVG9WL2NJSGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ing1QTZHSU5WQWRRNDByWGdCeFZJeENVY0xjY0YxK0FhRnFQZXE2ZUVSdzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNklKUWpTbnVHdUt4eUJOOTJET1ZNMmVUbC96dWtiRG1EWVJHc2Z5NlZucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoienVyTkNuRDVGVURvcW9RZC9SYTJLNEtHU3ZoNVBTdUNBVVVQYjRXbWhGVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFzRkpwN2gzVFB1VHJ6Z0xEbGptazJkMFBsb0hJeVRma1VGengzMTNZZ2FKZWQySEg1b3VUcytxL2ZtUDdIT3EzNy8wd2NKeXdZa0pyU3B0U1Rjd0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTczLCJhZHZTZWNyZXRLZXkiOiJXaHZ0NEZnc1UyUkRDK3FzT1JlaVRrcUpKQmZGaVQ3TWZ4RzNtSFpBU213PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJSZENmV0dBbFRLZUxXVUMwbVUzREhBIiwicGhvbmVJZCI6IjNmMDBiNWQzLWU3OTgtNDlhZi04YzM2LWUxZDMxYTZiYmE2MSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2SVkxcVZ4N2FoZ1N4YlZZVlViUEZRTUJPMzg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVXFOMHdqeFNaaVg5eWc1UEdPa25oVkJpSVFRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkdMRDY5UENZIiwibWUiOnsiaWQiOiIyMzQ5MTUyNTk3MTcxOjQ1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOS3d1c1FDRU1hT3c3TUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJSOHVMK1RYdWpFYTR0bDV5d3dLb3pHaUtFWUZxLy9nNjYxOEtORVFyVUh3PSIsImFjY291bnRTaWduYXR1cmUiOiJZL24ybjMvTlFOMzdRWmhraXRkZ2NlVXBjU0JVWDM5c21GK2lNQ1AwYzBYMSt1dGVVdUZhNDN3YkFYakRJaW05QmpUMVBud2dqck41aGZtN2dYbHpBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicHBra29GMEh2L0hQVnFNckUxWk9kZ3BYU3pET3Rhc1lBY3F6YmdlTWhmeTV2SUdrVmFOd0M1aEhoQjVxVngvaVRPakZhL1dLSjBKdTZvbzd3RDQ3QXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTUyNTk3MTcxOjQ1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVmTGkvazE3b3hHdUxaZWNzTUNxTXhvaWhHQmF2LzRPdXRmQ2pSRUsxQjgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTg2NjcwOTJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2349152597171", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
