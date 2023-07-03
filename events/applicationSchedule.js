const {
  Events,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextInputBuilder,
  TextInputStyle,
  roleMention,
  ModalBuilder,
  userMention,
} = require("discord.js");

require("dotenv").config();

const recruiterId = process.env.RECRUITER_ROLL_ID;
const channelId = process.env.APPLICATION_CHANNEL_ID;

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.customId === "application-schedule") {
      const embeds = interaction.message.embeds.map((embed) =>
        EmbedBuilder.from(embed).setColor(interaction.user.accentColor)
      );

      const buttons = interaction.message.components[0].components;

      buttons[0] = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel("Approve")
        .setCustomId("application-approve");

      const claimButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setLabel("Re-Schedule to Me")
        .setCustomId("application-claim");

      const row = new ActionRowBuilder();
      const row2 = new ActionRowBuilder().addComponents(claimButton);

      buttons.forEach((btn) => row.addComponents(btn));

      embeds.at(0).setTitle(`Scheduled by ${interaction.user.username}`);
      embeds
        .at(-1)
        .setFooter({ text: `Scheduled by: ${interaction.user.username}` })
        .setTimestamp();

      interaction.update({
        content: `Being handled by ${interaction.user}`,
        embeds: embeds,
        components: [row, row2],
      });
    }
  },
};
