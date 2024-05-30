const Discord = require('discord.js');
const { Events, SlashCommandBuilder, EmbedBuilder } = Discord;

require('dotenv').config();
const ENV = process.env;
const {
  role_assign_token,
  test_commands_token,
  G_game_id,
  H_game_id,
  tof_id,
  weeb_id,
  G_game_emoji,
  HI_game_emoji,
  ToF_game_emoji,
  Weeb_emoji,
  G_game_emoji_id,
  HI_game_emoji_id,
  ToF_game_emoji_id,
  Weeb_emoji_id
} = ENV; // test_commands_token to test role assigning

const fs = require('fs');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('roles')
    .setDescription("Commands related to roles."),
  name: "roles",
  async execute(interaction, client)
  {
    let roleAssignEmbed = new Discord.EmbedBuilder()
        .setColor(0x2b7cad)
        .setTitle('Role Assign')
        .setDescription("Greet. Welcome Newcomer.\n\n" +
                        "Here you can assign roles for yourself.\n\n" +
                        "1.) React to the message below to get the corresponding role.\n\n" +
                        "2.) Request. Please update your **nickname** for this server so we know who you are.\n\n" +
                        "**__Roles__**\n\n" +
                        `${G_game_emoji} Genshin Impact\n\n` +
                        `${HI_game_emoji} Honkai Impact\n\n` +
                        `${ToF_game_emoji} Tower of Fantasy\n\n` +
                        `${Weeb_emoji} Weeb Stuff`
                       );
    let messageEmbed = await client.channels.cache
        .get(role_assign_token).send({
          embeds: [ roleAssignEmbed ]
        });
    
    messageEmbed.react(G_game_emoji);
    messageEmbed.react(HI_game_emoji);
    messageEmbed.react(ToF_game_emoji);
    messageEmbed.react(Weeb_emoji);
  }
}

/*
function reactToEmbed(interaction, client, messageEmbed)
{
  const has_G_game_role = interaction.guild.roles.cache.has(G_game_id);
  const has_H_game_role = interaction.guild.roles.cache.has(H_game_id);
  const has_tof_role = interaction.guild.roles.cache.has(tof_id);
  const has_weeb_role = interaction.guild.roles.cache.has(weeb_id);

  const G_game_role = interaction.guild.roles.cache.find(r => r.id === G_game_id);
  const H_game_role = interaction.guild.roles.cache.find(r => r.id === H_game_id);
  const tof_role = interaction.guild.roles.cache.find(r => r.id === tof_id);
  const weeb_role = interaction.guild.roles.cache.find(r => r.id === weeb_id);
  
  const filter = (reaction, user) => {
    return (reaction.emoji.id === G_game_emoji_id ||
            reaction.emoji.id === HI_game_emoji_id ||
            reaction.emoji.id === ToF_game_emoji_id ||
            reaction.emoji.id === Weeb_emoji_id
           ) && user.id === interaction.user.id;
  };
  
  const collector = messageEmbed.createReactionCollector({ filter });
  
  collector.on('collect', (reaction, user) => {
	  console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
  });

  collector.on('end', collected => {
	  console.log(`Collected ${collected.size} items`);
  }); 

  // Add roles depending on the reaction given to the message
  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.partial)
    {
      try
      {
        await reaction.message.fetch();
      }
      catch (err)
      {
        console.error('Something went wrong', err);
        return;
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
        console.error('Something went wrong', err);
        return;
      }
    }

    if (reaction.emoji.id === G_game_emoji_id)
    {
      await reaction.message.guild.members.cache.get(user.id).roles.add(G_game_role);
    }
    if (reaction.emoji.id === HI_game_emoji_id)
    {
      await reaction.message.guild.members.cache.get(user.id).roles.add(H_game_role);
    }
    if (reaction.emoji.id === ToF_game_emoji_id)
    {
      await reaction.message.guild.members.cache.get(user.id).roles.add(tof_role);
    }
    if (reaction.emoji.id === Weeb_emoji_id)
    {
      await reaction.message.guild.members.cache.get(user.id).roles.add(weeb_role);
    }
  });

  // Remove role depending on reaction removed
  client.on(Events.MessageReactionRemove, async (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.partial)
    {
      try
      {
        await reaction.message.fetch();
      }
      catch (err)
      {
        console.error('Something went wrong', err);
        return;
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
        console.error('Something went wrong', err);
        return;
      }
    }

    if (reaction.emoji.id === G_game_emoji_id && has_G_game_role)
    {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(G_game_role);
    }
    if (reaction.emoji.id === HI_game_emoji_id && has_H_game_role)
    {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(H_game_role);
    }
    if (reaction.emoji.id === ToF_game_emoji_id && has_tof_role)
    {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(tof_role);
    }
    if (reaction.emoji.id === Weeb_emoji_id && has_weeb_role)
    {
      await reaction.message.guild.members.cache.get(user.id).roles.remove(weeb_role);
    }
  });
}*/
