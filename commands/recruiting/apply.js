const {
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription("Apply to Enveus"),
  async execute(interaction) {
    const user = interaction.user;

    console.log({
      discordId: user.id,
      username: user.username,
      type: "USER_ACTION",
      userAction: {
        type: "APPLICATION_SLASHCOMMAND",
        origin: null,
      },
    });

    const welcomeAsset = new AttachmentBuilder("assets/3HydraNoRingWhite.png");

    const applicationEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Enveus")
      .setDescription(
        `Enveus is a dedicated PvX Guild aiming to solidify its position as the dominant force in Ashes of Creation, while maintaining our unrivaled activity throughout the game's development.\n\nWe are actively seeking passionate players with Alpha 2 access, who are committed to extensively testing and actively participating in future testing phases of Ashes of Creation.`
      )
      .setThumbnail("attachment://3HydraNoRingWhite.png")
      .setTimestamp()
      .setFooter({
        text: "We're looking forward to your application!",
        iconURL: "attachment://3HydraNoRingWhite.png",
      });

    const apply = new ButtonBuilder()
      .setCustomId("slash-command-apply")
      .setLabel("Apply")
      .setStyle(ButtonStyle.Success);

    const forumLink = new ButtonBuilder()
      .setLabel("Learn More")
      .setStyle(ButtonStyle.Link)
      .setURL(
        "https://forums.ashesofcreation.com/discussion/41835/na-eu-oce-jp-enveus-hardcore-pvp-pve-economic-crafting-guild#latest"
      );

    const buttons = new ActionRowBuilder({ type: ComponentType }).addComponents(
      apply,
      forumLink
    );

    interaction.reply({
      embeds: [applicationEmbed],
      components: [buttons],
      files: [welcomeAsset],
      ephemeral: true,
    });
  },
};
