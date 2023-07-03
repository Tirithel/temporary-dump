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
    if (interaction.customId === "application-add-note") {
      await interaction.reply({
        content: "Placeholder: <note added> to <user's> community profile.",
        ephemeral: true,
      });
    }
  },
};
