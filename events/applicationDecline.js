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
    if (interaction.customId === "application-decline") {
      const embeds = interaction.message.embeds.map((embed) =>
        EmbedBuilder.from(embed).setColor(0xed4245)
      );

      const buttons = interaction.message.components[0].components;
      const noteButton = buttons[1];
      const viewButton = buttons[2];

      const actionRow = new ActionRowBuilder().addComponents(
        noteButton,
        viewButton
      );

      const embed1 = embeds.at(0);

      console.log(embed1);

      embed1
        .setTitle(`Application Declined by ${interaction.user.username}`)
        .setFooter({ text: `Declined by ${interaction.user.username}` })
        .setTimestamp();

      await interaction.update({
        content: "",
        embeds: [embed1],
        components: [actionRow],
      });
      // TODO: Notify the user their application was declined
    }
  },
};
