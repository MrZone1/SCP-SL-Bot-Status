require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const TOKEN = process.env.TOKEN;
const SERVER_ID = '75666';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
    updateStatus();
    setInterval(updateStatus, 5 * 60 * 1000);
});

async function updateStatus() {
    try {
        const url = `https://api.scplist.kr/api/servers/${SERVER_ID}`;
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.status === 200) {
            const serverData = response.data;

            const playersCount = serverData.players;

            if (playersCount) {
                await client.user.setPresence({ activities: [{ name: `${playersCount}` }] });
            } else {
                await client.user.setPresence({ activities: [{ name: 'Hors Ligne' }] });
            }
        } else {
            console.error(`Erreur ${response.status} lors de la récupération des données: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des données : ${error}`);
    }
}

client.login(TOKEN);
