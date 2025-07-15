const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "hirucheck",
    alias: ["hirunews","newshiru","hirulk"],
    react: "⭐",
    category: "search hiru news",
    desc: "Fetch the latest news from the SUHAS API in Hiru API.",
    use: "",
    filename: __filename,
},
async (conn, mek, m, { reply }) => {
    try {
        const apiUrl = `https://suhas-bro-apii.vercel.app/hiru`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.newsURL || !data.title || !data.image || !data.text) {
            return reply(`*No News Available At This Moment* ❗`);
        }

        const { newsURL, title, image, text } = data;

        let newsInfo = "WHITESHADOW-MD 𝐇𝐢𝐫𝐮 𝐍𝐞𝐰𝐬 𝐔𝐩𝐝𝐚𝐭𝐞 📰\n\n";
        newsInfo += `✨ *Title*: ${title}\n\n`;
        newsInfo += `📑 *Description*:\n${text}\n\n`;
        newsInfo += `⛓️‍💥 *Url*: www.hirunews.lk\n\n`;
        newsInfo += `> *WHITESHADOW-MD 🌐*\n\n`;

        if (image) {
            await conn.sendMessage(m.chat, {
                image: { url: image },
                caption: newsInfo,
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { text: newsInfo }, { quoted: m });
        }

    } catch (error) {
        console.error(error);
        reply(`*An Error Occurred While Fetching News At This Moment* ❗`);
    }
});
