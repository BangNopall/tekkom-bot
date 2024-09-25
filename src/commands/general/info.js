const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Informasi TEKKOM'24 Discord Bot"),
  async execute(interaction, client) {
    // yang diperbolehkan hanya role dengan id tertentu
    const embed = new EmbedBuilder()
      .setTitle("Informasi - Teknik Komputer '24")
      .setDescription(
        "Discord bot non resmi untuk komunitas teknik komputer '24 yang dikembangkan oleh Nopal <@685664045172654082>"
      )
      .setColor("f18a05")
      .setTimestamp(Date.now())
      .setFooter({
        iconURL:
          "https://raw.githubusercontent.com/BangNopall/whitetiger-discordbot/refs/heads/main/src/schemas/logo_tekkom.jpeg",
        text: "Teknik Komputer '24",
      })
      .addFields(
        {
          name: "> SIAM",
          value: "- [open](https://siam.ub.ac.id/)",
          inline: true,
        },
        {
          name: "> FILKOM APPS",
          value:
            "- [open](https://filkom.ub.ac.id/legacy/apps)",
          inline: true,
        },
        {
          name: "> BRONE",
          value: "- [open](https://brone.ub.ac.id/)",
          inline: true,
        },
        { name: "> Ping", value: `- ${client.ws.ping} ms`, inline: true },
        { name: "> Version", value: "- 1.0.0", inline: true },
        { name: "> Prefix", value: "- /", inline: true }
      );

    // hanya role tertentu yang dapat mengakses
    return interaction.reply({
      embeds: [embed],
    });
  },
};
