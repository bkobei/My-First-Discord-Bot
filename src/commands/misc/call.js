const Discord = require('discord.js');
const { SlashCommandBuilder } = Discord;

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('call')
    .setDescription("Send a message saying 'hifu'.")
    .addIntegerOption(option =>
                      option
                      .setName('amount')
                      .setDescription("Enter number of times hifu is called")
                     )
    .addChannelOption(option =>
                      option
                      .setName('channel')
                      .setDescription("Enter the channel you want to send this to.")
                     ),
  name: "call",
  async execute(interaction, client)
  {
    // First, check to see if command caller is of Bro role
    const hasRole = interaction.member.roles.cache.some(r => r.name === "Bro");
    if (!hasRole)
    {
      return interaction.reply({ content: "**You do not have access to that command**"});
    }
    
    let channel = interaction.options.getChannel('channel'); // Get inputted channel data
    let amount = interaction.options.getInteger('amount'); // Get inputted amount

    var string = "";
    // if channel is null, check if amount is null
    if (channel === null)
    {
      // If amount is null, send is defaulted to 1 
      if (amount === null)
      {
        await interaction.channel.send("Greet, hello Hifumi!");

        amount = 1;
      }
      // If amount is not null, send that amount of grettings
      else
      {
        for (var i=0; i<amount; ++i)
          await interaction.channel.send("Greet, hello Hifumi!");
      }

    }
    else
    {
      // If amount is null, send is defaulted to 1 
      if (amount === null)
      {
        await client.channels.cache.get(`${channel.id}`).send("Greet, hello Hifumi!");

        amount = 1;
      }
      // If amount n is entered, send n number of hifus to inputted channel
      else
      {
        for (var i=0; i<amount; ++i)
          await client.channels.cache.get(`${channel.id}`).send("Greet, hello Hifumi!");
      }

      string = `to ${channel.name}`;
    }

    // Confirm that n hifus were sent to inputted channel (if any)
    await interaction.channel.send({ content: `**Successfully sent ${amount} hifus ${string}**`, ephermal: true});
  }
}
