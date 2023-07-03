const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Add Note")
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    console.log(`${interaction}`);

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

    const fifthActionRow = new ActionRowBuilder().addComponents(why);

    modal.addComponents(
      firstActionRow,
      secondActionRow,
      thirdActionRow,
      fourthActionRow,
      fifthActionRow
    );
  },
};
