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
    if (!interaction.isUserContextMenuCommand()) return;
    if (interaction.commandName === "Add Note") {
      interaction.reply({
        content: `Added context notes for ${interaction.targetUser}`,
        ephemeral: true,
      });
    }
  },
};
