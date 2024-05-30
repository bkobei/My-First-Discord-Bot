const Discord = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder } = Discord;

// Get tokens from dotenv file
require('dotenv').config();
const ENV = process.env;
const { role_assign_token, mongo_token } = ENV;

// Get mongodb database client
const Mongo = require('mongodb');
const { MongoClient } = Mongo;
const dbClient = new Mongo.MongoClient(mongo_token);

const fs = require('fs');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('game')
    .setDescription("Returns a list of games from games database.")
    // Add option to input game name 
    .addStringOption(option =>
                     option
                     .setName('name')
                     .setDescription("Input the game to see a list of activities"))
    // Add option to input activity name from list of activities of inputted game
    .addStringOption(option =>
                     option
                     .setName('activity')
                     .setDescription("Input the activity to see list of options")),
  name: "raids",
  async execute(interaction, client)
  {
    // await interaction.reply("Command is under construction!");

    // Store db.myDatabase1.games in variables
    const database = dbClient.db("myDatabase1");
    const games = database.collection("games");

    // Initialize gameEmbed description and title
    var gameEmbedDesc = "";
    var gameEmbedTitle = "";

    // Create a gameEmbed for displaying list of items
    const gameEmbed = new Discord.EmbedBuilder()
            .setColor(0x2b7cad)
            .setTimestamp();

    let i = 1;

    // Get the options inputted
    // Note: Order does matter with the options inputted
    const nameOption = interaction.options.getString('name');
    const activityOption = interaction.options.getString('activity');

    // Display an error if game nameOption is null but not activityOption
    if ((nameOption == null) && (activityOption != null))
    {
      return interaction.reply({ content: "**ERROR: CANNOT display list of specific activity while __name__ is empty**"});
    }
    // Check if nameOption is not null
    else if (nameOption != null)
    {
      // Collect document that has matching game name
      const gameNameDoc = await games.findOne({ gameName: `${nameOption}`}, { projection: { activities: 1 } });
      
      

      // If activityOption is not null, display options
      if (activityOption != null)
      {
        // Store activity list as Title of embed
        gameEmbedTitle = `${activityOption} List`;
        
        gameEmbedDesc = `Here is a list of ${activityOption} of ${nameOption}\n\n`;

        // Iterate through the key,value pairs of the activities map
        for (const [key,value] of Object.entries(gameNameDoc.activities))
        {
          if (key.toLowerCase() === activityOption.toLowerCase())
          {
            if (value.length > 0)
            {
              // Iterate through list of key and add items to the embed description
              for (const item of value)
              {
                gameEmbedDesc = `${gameEmbedDesc}${i}) ${item}\n`;
                ++i;
              }
            }
            // Notify to command caller that activity list is empty
            else
            {
              
              let message = await interaction.reply(`**${key} is empty**`);
              return message;
            }
          }
        }
      }
      // If activityOption is null, display each activity of nameOption
      else
      {
        // Store game Activites List as Title of embed
        gameEmbedTitle = `${nameOption} Activities List`;

        gameEmbedDesc = `Here is a list of ${nameOption} activities\n\n`;

        // Iterate through the activities map and store keys into
        // gameEmbed
        for (const [key,value] of Object.entries(gameNameDoc.activities))
        {
          gameEmbedDesc = `${gameEmbedDesc}${i}) ${key}\n`;
          ++i;
        }
      }
    }
    // If both nameOption and activityOption is null, return gameEmbed that displays
    // list of games that are played by owner of server
    else
    {
      // Store Game List as Title of embed
      gameEmbedTitle = `Games List`;
      
      gameEmbedDesc = "Here is a list of games we play:\n\n";

      // Store a list of game documents in gameList from games collection
      const gameList = await games.find({}, { projection: { gameName: 1 } } );

      // Loop through the database and add each document to the gameEmbedDesc
      await gameList.forEach(doc => {
        gameEmbedDesc = `${gameEmbedDesc}${i}) ${doc.gameName}\n`;
        ++i;
      });
    }

    // Set the title and description of the gameEmbed depending on arguments
    gameEmbed.setTitle(gameEmbedTitle);
    gameEmbed.setDescription(gameEmbedDesc);

    // Reply to command caller with gameEmbed according to their arguments inputted
    await interaction.reply({ embeds: [ gameEmbed ] });
  }
}

