const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');

require('dotenv').config();
const ENV = process.env;
const { client_id, guild_id, token } = ENV;

const clientId = client_id; 
const guildId = guild_id; 

module.exports = (client) => {
  client.handleCommands = async (commandFolders, path) => {
    client.commandArray = [];
    for (folder of commandFolders)
    {
      const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles)
      {
        
        const command = require(`../commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
        console.log(`Command: ${command.data.name} has been registered!`);
      }
    }

    const rest = new REST({
      version: '10'
    }).setToken(token);

    (async () => {
      try
      {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
          Routes.applicationGuildCommands(clientId, guildId), {
            body: client.commandArray
          },
        );

        console.log('Successfully reloaded application (/) commands.');
      }
      catch (error)
      {
        console.error(error);
      }
    })();
  };
};
