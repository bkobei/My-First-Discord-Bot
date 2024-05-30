const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = Discord;

require('dotenv').config();
const ENV = process.env;
const { bro_id, test_commands_token } = ENV;

const fs = require('fs');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('annoy')
    .setDescription("Display a random word/phrase that Barry fibbed.")
    // Subcommand lists words/phrases that Barry is annoyed by
    .addSubcommand(subcommand =>
                   subcommand
                   .setName('list')
                   .setDescription("Display a list of words/phrases that Barry is annoyed by."))
    // Subcommand displays a random word/phrase that Barry is annoyed by
    // Has a option to display it in specific channel
    .addSubcommand(subcommand =>
                   subcommand
                   .setName('random')
                   .setDescription("Randomly display a word/phrase to annoy Barry.")
                   // Option to input channel to display random word/phrase
                   .addChannelOption(option =>
                                     option
                                     .setName('channel')
                                     .setDescription("Enter the channel to send to.")
                   )),
  name: "annoy",
  list: ["OMH!",
         "Turn off the Eyedrops.",
         "Numa Numa Iei",
         "Let it go",
         "It's joke"],
  async execute(interaction, client)
  {
    // Check if command caller has the Bro role
    const hasRole = interaction.member.roles.cache.some(r => r.name === "Bro");

    // Get the inputted channel option
    let channel = interaction.options.getChannel('channel');
    if (!hasRole)
    {
      return interaction.reply({ content: "**Notice. You do not have access to that command.**"});
    }

    // If the subcommand is list, return an embed that lists words/phrases
    // that Barry is annoyed by
    if (interaction.options.getSubcommand() === 'list')
    {
      
      var annoyEmbedDesc = "Inform. Here is a list of words/phrases that Barry fibbed.\n\n";
      
      const annoyEmbed = new Discord.EmbedBuilder()
            .setColor(0x2b7cad)
            .setTitle('Annoy List')
            .setTimestamp();

      var tempList = [];

      // Read the directory of command files, only showing js files and
      // store them in commandFiles
      const commandFiles = fs.readdirSync('./src/commands/misc/').filter(file => file.endsWith('.js'));

      for (const file of commandFiles)
      {
        let commandFile = require(`./${file}`);
        if (commandFile.data.name === 'annoy')
        {
          // Iterate through entries of commandFile until it reaches list
          for (const [key,value] of Object.entries(commandFile))
          {
            if (key === 'list')
            {
              var i = 1;
              // Iterate through the list and store elements in description as list
              for (const item of value)
              {
                annoyEmbedDesc = `${annoyEmbedDesc}${i}) ${item}\n`;
                ++i;
              }
            }
          }
        }
      }

                 
      annoyEmbed.setDescription(annoyEmbedDesc); // Not sure if this will work

      // Should reply to user 
      await interaction.reply({ embeds: [ annoyEmbed ] }).catch(console.error); 
    }
    // Display a random word/phrase that Barry messed up
    else if (interaction.options.getSubcommand() === 'random')
    {
      
      // Similar to code in list subcommand
      const commandFiles = fs.readdirSync('./src/commands/misc/').filter(file => file.endsWith('.js'));

      let annoyFile = require(`./annoy.js`);

      for (const [key,value] of Object.entries(annoyFile))
      {
        if (key === 'list')
        {
          // Choose a random index
          var randomAnnoyListIndex = Math.floor(Math.random() * value.length);

          // If channelOption is not null, send word/phrase to specific channel
          if (channel != null)
          {
            await client.channels.cache.get(channel.id).send(value[randomAnnoyListIndex]);
          }
          // Otherwise send to channel the command was called from
          else
          {
            await interaction.channel.send(value[randomAnnoyListIndex]);
          }
        }
      }
      
      await interaction.channel.send("Successfully executed annoy command!");
    }   
  }
}
