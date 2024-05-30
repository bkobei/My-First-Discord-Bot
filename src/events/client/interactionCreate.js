const Discord = require('discord.js');
const { Interaction } = Discord;

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client, message) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return
        
    try
    {
      await command.execute(interaction, client);
    }
    catch (error)
    {
      console.log(error);
      await interaction.reply({
        content: 'There was an error while executing this command!', 
        ephemeral: true
      });
    } 
  },
};
