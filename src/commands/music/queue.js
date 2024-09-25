const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryType, useMainPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Daftar 10 antrian lagu"),

  async execute(interaction, client) {
    const player = useMainPlayer();
    // Get the current queue
    const queue = player.nodes.get(interaction.guild.id);

    if (!queue || !queue.node.isPlaying) {
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

    const queueString = queue.tracks
      .toArray()
      .slice(0, 10)
      .map((song, i) => {
        return (
          `> ${i}.) \`[${song.duration}]` +
          "`" +
          ` ${song.title} - <@${song.requestedBy.id}>`
        );
      })
      .join("\n");

    const currentSong = queue.currentTrack;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Musik Player - Teknik Komputer '24")
          .setDescription(
            `> **Sedang diputar**\n` +
              (currentSong
                ? `> \`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>`
                : "Tidak ada") +
              `\n\n
                > **Daftar Antrian**\n ${queueString}`
          )
          .setTimestamp(Date.now())
          .setColor("f18a05")
          .setFooter({
            iconURL:
              "https://raw.githubusercontent.com/BangNopall/whitetiger-discordbot/refs/heads/main/src/schemas/logo_tekkom.jpeg",
            text: "Teknik Komputer '24",
          }),
      ],
    });
  },
};
