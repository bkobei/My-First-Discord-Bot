const Discord = require('discord.js');
const { Events, SlashCommandBuilder, EmbedBuilder } = Discord;

require('dotenv').config();
const ENV = process.env;
const {
  //Channel IDs
  role_assign_token,
  test_commands_token,
  welcome_token,
  fav_chars_token,
  
  // Role IDs
  G_game_id,
  H_game_id,
  tof_id,
  weeb_id,
  member_id,

  // Emojis
  G_game_emoji,
  HI_game_emoji,
  ToF_game_emoji,
  Weeb_emoji,
  checkmark_emoji,

  // Emoji IDs
  G_game_emoji_id,
  HI_game_emoji_id,
  ToF_game_emoji_id,
  Weeb_emoji_id,
  checkmark_emoji_id,

  // mongo_token for database
  mongo_token
} = ENV;

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('react-to')
    .setDescription("React to a message.")
    /*.addStringOption(option =>
                     option
                     .setName("message-id")
                     .setDescription("Enter message id of message bot should react to.")
                     .setRequired(true))*/
  // Bot will react to messages from a specific channel
    .addChannelOption(option =>
                      option
                      .setName("channel")
                      .setDescription("Enter the channel where the message was sent.")
                      .setRequired(true)),
  name: "reactTo",
  async execute(interaction, client)
  {
    // Find roles corresponding to their role id
    const G_game_role = interaction.guild.roles.cache.find(r => r.id === G_game_id);
    const H_game_role = interaction.guild.roles.cache.find(r => r.id === H_game_id);
    const tof_role = interaction.guild.roles.cache.find(r => r.id === tof_id);
    const weeb_role = interaction.guild.roles.cache.find(r => r.id === weeb_id);
    const member_role = interaction.guild.roles.cache.find(r => r.id === member_id);
    
    let channelID = interaction.options.getChannel('channel').id;
    let channel = client.channels.cache.get(channelID);
    let messageID = interaction.options.getString('message-id');
    var messages = await channel.messages;
    
    // React to a reaction added
    client.on(Events.MessageReactionAdd, async (reaction, user) => {
      // Do nothing if the user is a bot
      if (user.bot) return;
      if (reaction.message.partial)
      {
        try
        {
          await reaction.message.fetch();
        }
        catch (err)
        {
          return console.error('Something went wrong', err);
        }
      }
      if (reaction.partial)
      {
        try
        {
          await reaction.fetch();
        }
        catch (err)
        {
          return console.error('Something went wrong', err);
        }
      }

      // If statement to prevent multiple lines of reactions in console log
      if (messages.channel.id === reaction.message.channel.id)
      {
        if (reaction.message.channel.id === test_commands_token)
        {
          console.log(reaction.emoji.name);
          // Add role corresponding to reaction
          if (reaction.emoji.name === checkmark_emoji)
          {
            await reaction.message.guild.members.cache.get(user.id).roles.add(member_role);
            console.log(`Added ${user.username} as a member`);
          }
        }
        if (reaction.message.channel.id === role_assign_token)
        {
          // Add role(s) corresponding to reaction(s)
        }
        
        return console.log(`${user.username} added their "${reaction.emoji.name}" reaction` +
                           ` in ${messages.channel.name}.`
                          );
      }
    });

    // React to a reaction removed
    client.on(Events.MessageReactionRemove, async (reaction, user) => {
      // Do nothing if user is a bot
      if (user.bot) return;
      if (reaction.message.partial)
      {
        try
        {
          await reaction.message.fetch();
        }
        catch (err)
        {
          return console.error('Something went wrong', err);
        }
      }
      if (reaction.partial)
      {
        try
        {
          await reaction.fetch();
        }
        catch (err)
        {
          return console.error('Something went wrong', err);
        }
      }

      // If statement to prevent multiple lines of reactions in console log
      if (messages.channel.id === reaction.message.channel.id)
      {
        if (reaction.message.channel.id === test_commands_token)
        {
          if (reaction.emoji.name === checkmark_emoji)
          {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(member_role);
            console.log(`Removed ${user.username} from member of server`);
          }
          // Remove role corresponding to reaction
        }
        if (reaction.message.channel.id === role_assign_token)
        {
          // Remove role(s) corresponding to reaction(s)
        }
        
        console.log(`${user.username} removed their "${reaction.emoji.name}" reaction` +
                    ` in ${messages.channel.name}.`);
      }
    });

    
    
  }
}
