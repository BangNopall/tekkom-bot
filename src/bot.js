require("dotenv").config();

// Constants / Variables
const { token } = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
} = require("discord.js");
const { Player } = require("discord-player");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});

// properties
client.commands = new Collection();
client.buttons = new Collection();
client.player = new Player(client);
client.commandArray = [];
client.player.extractors.loadDefault();

// function
const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

// event handle
client.handleEvents();
client.handleComponents();
client.handleCommands();
client.login(token);
