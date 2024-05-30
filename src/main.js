require('dotenv').config();
const ENV = process.env;
const { test_commands_token, token, mongo_token } = ENV;
const { connect } = require('mongoose');

const Discord = require(`discord.js`);

const { Client, Events, Collection, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, SlashCommandBuilder, MessageManager, Partials } = Discord;

const client = new Discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const fs = require('fs');

client.commands = new Discord.Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFolders = fs.readdirSync("./src/events");
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
  for (file of functions)
  {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFolders, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(token);
  
  try
  {
    await connect(mongo_token)
  }
  catch (err)
  {
    console.log(err.stack);
  }

  // Greet the owner of the server upon start up
  client.channels.cache.get(`${test_commands_token}`).send("Greet. Hello bkobeei");

  console.log(`=========================================================\n` +
              `Console Log\n` +
              `=========================================================\n`);
})();
