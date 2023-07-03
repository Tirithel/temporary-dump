const {
  Events,
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

require("dotenv").config();

const recruiterId = process.env.RECRUITER_ROLL_ID;
const channelId = process.env.HOW_TO_CHANNEL_ID;

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const channel = client.channels.cache.get(channelId);

    channel.messages.fetch({ limit: 1 }).then((msg) => {
      // Build welcome message
      //
      //

      const welcomeAsset = new AttachmentBuilder(
        "assets/3HydraNoRingWhite.png"
      );
      const bannerAsset = new AttachmentBuilder(
        "assets/Enveus_Banner_Transparent.png"
      );

      const applicationEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Enveus")
        .setDescription(
          `Enveus is a dedicated PvX Guild aiming to solidify its position as the dominant force in Ashes of Creation, while maintaining our unrivaled activity throughout the game's development.\n\nWe are actively seeking passionate players with Alpha 2 access, who are committed to extensively testing and actively participating in future testing phases of Ashes of Creation.\n\n[Click here to learn more...](https://forums.ashesofcreation.com/discussion/41835/na-eu-oce-jp-enveus-hardcore-pvp-pve-economic-crafting-guild#latest)`
        )
        .setThumbnail("attachment://3HydraNoRingWhite.png")
        .setTimestamp()
        .setFooter({
          text: "We're looking forward to your application!",
          iconURL: "attachment://3HydraNoRingWhite.png",
        });

      // WHO We want
      const desiredPlayerEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Our Ideal Player")
        .addFields({
          name: "The Min-Maxer",
          value:
            "*Top tier players*. You keep up to date with what the metas are, you probably have opinions about the metas and you strive to be the best at your role.",
          inline: true,
        })
        .addFields({
          name: "The Dependable Player",
          value:
            "*You have a caffeine problem*, you show up to events, you have a group you play with, you're interested in large scale pvp and world bossing.",
          inline: true,
        })
        .addFields({ name: "\u200B", value: "\u200B" })
        .addFields({
          name: "The 'Do They Even Sleep' Zombies",
          value:
            "You *manage your own playtime properly*, you can keep up with the group and hopefully aren't sacrificing your job to do so.",
          inline: true,
        })
        .addFields({
          name: "The Fast Brain Refresh Rate Legends",
          value:
            "Do you play on 0ms ping? No need, you have *200 IQ galaxy brain* and don't only just click your buttons in the right order but also respond to changing scenarios in game.",
          inline: true,
        })
        .addFields({ name: "\u200B", value: "\u200B" })
        .addFields({
          name: "The World-first Competitors",
          value:
            "First to max level? Check. First to kill that world boss? Also check.",
          inline: true,
        })
        .addFields({
          name: "The Alpha Testers",
          value:
            "*You bought the alpha package* because you want to get an advantage at launch. You follow all the streams and probably write down everything Steven says in your diary.",
          inline: true,
        })
        .addFields({ name: "\u200B", value: "\u200B" })
        .addFields({
          name: "The Spreadsheet Nerds",
          value:
            "If this is you, you probably know your way around excel and google sheets. You know all of the macros to run quick calculations and you're probably either a professional crafter/gatherer or you're also a min-max player.",
          inline: true,
        })
        .addFields({
          name: "The I-Work-From-Home Bros",
          value: "You know who you are.",
          inline: true,
        });

      // WHY Enveus
      const memberBenefitsEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Why Enveus")
        .addFields({
          name: "Seasoned Leadership",
          value:
            "Our leadership can recite bossing strategy in their sleep. We have many experienced shot callers for all varieties of content. All leadership has A1+ access.",
          inline: true,
        })
        .addFields({
          name: "Organized Player vs. Player Content",
          value:
            "Leadership here is merit-based, we base our selection on VOD reviews, gear checks, skill, and the ability to work with others.",
          inline: true,
        })
        .addFields({ name: "\u200B", value: "\u200B" })
        .addFields({
          name: "Competitive Bossing",
          value:
            "Tiered raid groups based on merit and ability, dedicated PvE branch for downing World & Dungeon bosses. ",
          inline: true,
        })
        .addFields({
          name: "Custom Progression Tools",
          value:
            "From our Tourney bot, Spreadsheets, Gear tracking and Guild rankings.",
          inline: true,
        })
        .addFields({ name: "\u200B", value: "\u200B" })
        .addFields({
          name: "Economic and Crafting Support",
          value:
            "Organized logistics and divisions for crafting and econ trade.",
          inline: true,
        })
        .addFields({
          name: "Access to Large Scale & Competitive Gameplay",
          value:
            "We had the largest & most active roster during Alpha 1 and will continue to grow and build as AoC progresses closer to launch.",
          inline: true,
        })
        // .setImage("attachment://Enveus_Banner_Transparent.png")
        .setTimestamp()
        .setFooter({
          text: "Join today, apply below, message a Recuriter!",
          iconURL: "attachment://3HydraNoRingWhite.png",
        });

      const apply = new ButtonBuilder()
        .setCustomId("channel-message-apply")
        .setLabel("Apply")
        .setStyle(ButtonStyle.Success);

      const forumLink = new ButtonBuilder()
        .setLabel("Learn More")
        .setStyle(ButtonStyle.Link)
        .setURL(
          "https://forums.ashesofcreation.com/discussion/41835/na-eu-oce-jp-enveus-hardcore-pvp-pve-economic-crafting-guild#latest"
        );

      const select = new StringSelectMenuBuilder()
        .setCustomId("starter")
        .setPlaceholder("Apply to...")
        .addOptions(
          new StringSelectMenuOptionBuilder()
            .setLabel("Enveus Community")
            .setDescription(
              "General community application - you want to play games with us!"
            )
            .setValue("community-application"),
          new StringSelectMenuOptionBuilder()
            .setLabel("Ashes of Creation")
            .setDescription("Ashes of Creation specific application.")
            .setValue("aoc-application"),
          new StringSelectMenuOptionBuilder()
            .setLabel("Throne & Liberty")
            .setDescription("Throne & Liberty specific application.")
            .setValue("tnl-application")
        );

      // const row = new ActionRowBuilder().addComponents(select);

      const buttons = new ActionRowBuilder().addComponents(apply, forumLink);

      // Post or Edit welcome message to channel
      //
      //

      if (msg.size == 0) {
        channel.send({
          embeds: [applicationEmbed],
          components: [buttons],
          files: [welcomeAsset],
        });
        console.log(`posted welcome message to channel.`);
      } else {
        msg.first().edit({
          embeds: [applicationEmbed],
          components: [buttons],
          files: [welcomeAsset],
        });

        console.log(`edited welcome message in channel.`);
      }
    });
  },
};
