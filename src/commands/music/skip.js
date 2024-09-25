const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryType, useMainPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip lagu yang sedang diputar"),

  async execute(interaction, client) {
    const player = useMainPlayer();
    // Get the current queue
    const queue = player.nodes.get(interaction.guild.id);

    if (!queue) {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Musik Player - Teknik Komputer '24")
            .setDescription(`> Tidak ada lagu dalam antrian`)
            .setColor("f18a05")
            .setTimestamp(Date.now())
            .setFooter({
              iconURL:
                "https://raw.githubusercontent.com/BangNopall/whitetiger-discordbot/refs/heads/main/src/schemas/logo_tekkom.jpeg",
              text: "Teknik Komputer '24",
            }),
        ],
      });
      return;
    }

    const currentSong = queue.currentTrack;

    queue.node.skip();

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Musik Player - Teknik Komputer '24")
          .setDescription(
            `> **${currentSong.title}** telah dilewati.\n> Requested By <@${interaction.user.id}>`
          )
          .setColor("f18a05")
          .setTimestamp(Date.now())
          .setFooter({
            iconURL:
              "https://raw.githubusercontent.com/BangNopall/whitetiger-discordbot/refs/heads/main/src/schemas/logo_tekkom.jpeg",
            text: "Teknik Komputer '24",
          }),
      ],
    });
  },
};
