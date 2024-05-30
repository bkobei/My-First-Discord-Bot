const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = Discord;

require('dotenv').config();
const ENV = process.env;

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('clear')
    .setDescription("Clear n number of messages from channel (inclusive).")
    .addIntegerOption(option => // Create an integer option
                     option
                     .setName('nums')
                     .setDescription("Input number of messages to delete")
                     
                     )
    .addChannelOption(option => // Create a channel option
                      option
                      .setName('from')
                      .setDescription("Enter the channel you want to clear messages from")),
  name: "clear",
  async execute(interaction, client)
  {
    /* Want specific roles to have access to this command
     * Do check on their role.
     *
     * IDEA: clear n messages from channel. 
     * Afterward, send a message stating operation was successful.
     * Then, delete said message after m secs.
     */

    
    let amount = interaction.options.getInteger('nums');

    // Also, figure out a way to check if user has proper role
    const hasRole = interaction.member.roles.cache.some(r => r.name === "Bro");
    if (!hasRole)
    {
      return interaction.reply({ content: "**You do not have access to that command**" });
    }

    // Check if amount is not a number
    // (I do not think this is neccessary since discord slash commands checks for this)
    if (isNaN(amount))
    {
      return interaction.reply({ content: "**Please specify a valid amount between 1 - 100**"});
      
    }
    // If amount > 99, explain they can only put amount between 1 
    // to 99 (inclusive)
    if (parseInt(amount) > 99)
    {
      return interaction.reply({ content: "**99 messages can only be deleted at once!**"});
    }
    else if (parseInt(amount) < 1)
    {
      return interaction.reply({ content: "**A minimum of 1 message can be deleted at a time**"});
    }
    
    
    // If amount is not inputted, default the value to one
    if (amount === null)
    {
      amount = 1;
    }

    // Create a sleep function which pauses bot activity
    let sleep = async (ms) => await new Promise(r => setTimeout(r,ms));

    //let { size } = await interaction.channel.bulkDelete(amount);
    await interaction.reply({
      content: `Awaiting deletion of ${amount} messages.`
    });

    let channel = "";
    let messageManager = "";
    const channelOption = interaction.options.getChannel('from');

    let resultChannelMessage = "";

    // Determine where to delete messages based on channelOption input
    if (channelOption != null)
    {
      channel = client.channels.cache.get(`${channelOption.id}`);
      messageManager = channel.messages;
    }
    else
    {
      channel = interaction.channel;
      messageManager = channel.messages;
      ++amount;
    }

    // Pause bot activity for 5 seconds
    await sleep(5_000);

    if (channelOption != null)
    {
      // Delete the message notifying you of deletion of messages
      interaction.channel.messages.fetch({ limit : 1}).then((messages) => {
        messages.forEach((message) => { message.delete(); });
      });

      resultChannelMessage = ` from **__${channelOption.name}__**`;
    }

    var count = 0;
    // In a linear fashion, delete n+1 messages from channel
    messageManager.fetch({ limit: amount }).then((messages) => {
      messages.forEach((message) => {
        ++count;
        message.delete();
        console.log(count);
      });
    });

    if (channelOption === null)
    {
      --amount;
    }
    
    // Pause bot activity for 5 seconds
    await sleep(5_000);

    // Confirm that the messages were deleted
    await interaction.followUp({ content: `Successfully deleted ${amount} messages and deletion notification${resultChannelMessage}.`, ephermal: true});
    
    
    
    
  }
}
