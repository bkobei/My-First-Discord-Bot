const Discord = require('discord.js');
const { Events, SlashCommandBuilder, EmbedBuilder } = Discord;

require('dotenv').config();
const ENV = process.env;
const {
  // Channel IDs
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

  // Mongo token
  mongo_token
} = ENV;

const fs = require('fs');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('embed-create')
    .setDescription("Send a message embed to a specified channel.")
  // Add a title to the new embed (required)
    .addStringOption(option =>
                     option
                     .setName("title")
                     .setDescription("Set the title of the message embed.")
                     .setRequired(true))
  // Add description to the new embed (required)
    .addStringOption(option =>
                     option
                     .setName("description")
                     .setDescription("Add description to message embed.")
                     .setRequired(true))
  // Allow user to send new embed to channel specified
  // Sends embed in the current channel by default
    .addChannelOption(option =>
                      option
                      .setName('send-to')
                      .setDescription("Enter channel to send embed to.")),
  name: "createMessageEmbed",
  async execute(interaction, client)
  {
    const messageTitle = interaction.options.getString('title');
    const messageDesc = interaction.options.getString('description');
    // Create the message embed
    const messageEmbed = new Discord.EmbedBuilder()
          .setColor(0x2b7cad)
          .setTitle(`${messageTitle}`)
          .setDescription(`${messageDesc}`)
          .setTimestamp();
  }
}
                  
    
