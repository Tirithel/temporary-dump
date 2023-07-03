const {
  Events,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  roleMention,
  userMention,
  time,
} = require("discord.js");

require("dotenv").config();

const recruiterId = process.env.RECRUITER_ROLL_ID;
const channelId = process.env.APPLICATION_CHANNEL_ID;

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "application-modal") {
      const user = interaction.user;

      const response = interaction.fields;

      const games = response.getTextInputValue("games");
      const timezone = response.getTextInputValue("timezone");
      const playtime = response.getTextInputValue("playtime");
      const access = response.getTextInputValue("access");
      const why = response.getTextInputValue("why");

      console.log({
        discordId: user.id,
        username: user.username,
        type: "USER_ACTION",
        userAction: {
          type: "APPLICATION_MODAL_SUBMIT",
          origin: interaction.customId,
          response: {
            games: games,
            timezone: timezone,
            playtime: playtime,
            access: access,
            why: why,
          },
        },
      });

      await interaction.reply({
        content: "Your submission was received successfully!",
        ephemeral: true,
      });

      const channel = interaction.client.channels.cache.get(channelId);

      const applicationEmbed = new EmbedBuilder()
        .setColor(0xf1c40f)
        .setTitle(`New Application`)
        .setThumbnail(user.displayAvatarURL({ extension: "jpg" }))
        .setDescription(
          `**User:** ${user}\n**Interested in:** ${games}\n**Access level:** ${access}`
        )
        .addFields({
          name: "Timezone",
          value: timezone,
          inline: true,
        })
        .addFields({
          name: "Aprox. Playtime",
          value: playtime,
          inline: true,
        })
        .addFields({
          name: "Joined Server",
          value: time(new Date(interaction.member.joinedTimestamp), "R"),
          inline: true,
        });

      const whyEmbed = new EmbedBuilder()
        .setColor(0xf1c40f)
        .setTitle("Why Them")
        .setDescription(why)
        .setTimestamp()
        .setFooter({
          text: "Not yet scheduled.",
        });

      const schedule = new ButtonBuilder()
        .setCustomId("application-schedule")
        .setLabel("Schedule")
        .setStyle(ButtonStyle.Success);

      const addNote = new ButtonBuilder()
        .setCustomId("application-add-note")
        .setLabel("Add Note")
        .setStyle(ButtonStyle.Secondary);

      const decline = new ButtonBuilder()
        .setCustomId("application-decline")
        .setLabel("Decline")
        .setStyle(ButtonStyle.Danger);

      const view = new ButtonBuilder()
        .setLabel("View")
        .setURL("http://www.google.com")
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder().addComponents(
        schedule,
        addNote,
        view,
        decline
      );

      const recruitmentMessage = await channel.send({
        content: `${roleMention(recruiterId)} - ${user}`,
        embeds: [applicationEmbed, whyEmbed],
        components: [row],
      });

      console.log({
        discordId: recruitmentMessage.id,
        type: "RECRUITMENT_MESSAGE",
        message: recruitmentMessage,
        userId: user.id,
        recruiter: null,
      });
    }
  },
};
