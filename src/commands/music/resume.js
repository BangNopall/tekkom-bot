const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryType, useMainPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Melanjutkan lagu yang sedang diputar"),

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

    queue.node.resume();

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Musik Player - Teknik Komputer '24")
          .setDescription(
            `> Lagu dilanjutkan kembali.\n> Requested By <@${interaction.user.id}>`
          )
          .setColor("f18a05")
          .setTimestamp(Date.now())
          .setFooter({
            iconURL:
              "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
            text: "Teknik Komputer '24",
          }),
      ],
    });
  },
};
