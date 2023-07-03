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
    if (
      interaction.customId === "slash-command-apply" ||
      interaction.customId === "channel-message-apply"
    ) {
      const user = interaction.user;

      console.log({
        discordId: user.id,
        username: user.username,
        type: "USER_ACTION",
        userAction: {
          type: "APPLICATION_MODAL_POPUP",
          origin: interaction.customId,
        },
      });

      const modal = new ModalBuilder()
        .setCustomId("application-modal")
        .setTitle(`Enveus Community Application`);

      // games - short form
      //
      //
      const games = new TextInputBuilder()
        .setCustomId("games")
        .setLabel("Which game(s) are you primarily applying for?")
        .setPlaceholder(
          "E.g. Ashes of Creation, World of Warcraft, Hello Kitty Online, etc."
        )
        .setStyle(TextInputStyle.Short);

      // background - paragraph
      //
      //
      const access = new TextInputBuilder()
        .setCustomId("access")
        .setLabel("If AoC, do you plan to/have Alpha 2 access?")
        .setPlaceholder("Yes, I have A2; Yes, I plan to get A2; No")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);
      // timezone - short form
      //
      //
      const timezone = new TextInputBuilder()
        .setCustomId("timezone")
        .setLabel("What is your Timezone?")
        .setPlaceholder("E.g. PST, EST, CST, GMT, etc.")
        .setStyle(TextInputStyle.Short);

      // game time - short form
      //
      //
      const playtime = new TextInputBuilder()
        .setCustomId("playtime")
        .setLabel("How many hours a week do you game?")
        .setStyle(TextInputStyle.Short);

      // why you - paragraph
      //
      //
      const why = new TextInputBuilder()
        .setCustomId("why")
        .setLabel("List key gaming achievements and why Enveus?")
        .setPlaceholder(
          "Include specifics like game and guild names; links to videos & screenshots preferred"
        )
        .setMinLength(200)
        .setStyle(TextInputStyle.Paragraph);

      const firstActionRow = new ActionRowBuilder().addComponents(games);
      const secondActionRow = new ActionRowBuilder().addComponents(access);
      const thirdActionRow = new ActionRowBuilder().addComponents(timezone);
      const fourthActionRow = new ActionRowBuilder().addComponents(playtime);
      const fifthActionRow = new ActionRowBuilder().addComponents(why);

      modal.addComponents(
        firstActionRow,
        secondActionRow,
        thirdActionRow,
        fourthActionRow,
        fifthActionRow
      );

      await interaction.showModal(modal);
    }
  },
};
