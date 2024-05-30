const Games = require('../../schemas/games.js');
const Discord = require('discord.js');
const { SlashCommandBuilder } = Discord;

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('select')
    .setDescription("Select a record from the database")
    .addStringOption(option =>
                     option
                     .setName('name')
                     .setDescription("Type name of game")
                     .setRequired(true))
    .addStringOption(option =>
                     option
                     .setName('insert')
                     .setDescription("Insert a new document into the database."))
    .addStringOption(option =>
                     option
                     .setName('delete')
                     .setDescription("Delete existing document from games database.")),
  async execute(interaction, client)
  {
    let gameRecord = await Games.findOne({ gameName: interaction.options.getString('name')})
  }
}
