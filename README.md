# Please follow these steps one by one


## Install the environment
- install [Node.js](https://nodejs.org/dist/v20.13.1/node-v20.13.1-x64.msi)

## Installation
Create a folder named whatever you like, for example 'YourDiscordBot

Download the package.json file from the repository and place it in the folder you created earlier

Install the module, run the following command in the terminal

- `npm install`

Create a file named 'index.js' and copy-paste the following code into it

```js
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const TOKEN = process.env.TOKEN;
const SERVER_ID = 'SERVERID';

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
```

Create a file named .env
- Setup your Bot Token in the .env file
`TOKEN=YOURTOKEN`

## Find your Server ID
- Go to [scpsl.kr](https://scplist.kr)
- Search for your server and click on it
- Take the ID of your server from the page link. For example, in the link you provided: https://scplist.kr/servers/73318, the ID is the number '73318' at the end

## Link your SCP server with your bot
- Replace 'SERVERID' in the line: `const SERVER_ID = 'SERVERID';` with your Server ID

## Run the bot
- Run the bot using the following command: `node index.js`
