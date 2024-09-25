const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Menghapus spesifik jumlah pesan.")
    .addIntegerOption((option) =>
      option
        .setName("jumlah")
        .setDescription("Jumlah pesan yang ingin dihapus.")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription(
          "Target pengguna yang ingin dihapus pesannya dari channel"
        )
    ),
  userPermissions: [PermissionFlagsBits.ManageChannels],
  botPermissions: [PermissionFlagsBits.ManageChannels],
  async execute(interaction, client) {
    const { options, channel } = interaction;
    let ammout = options.getInteger("jumlah");
    const target = options.getUser("target");

    if (!ammout || ammout > 100 || ammout < 1) {
      return await interaction.reply({
        content: `Jumlah pesan yang ingin dihapus harus diantara 1 dan 100.`,
        ephemeral: true,
      });
    }

    try {
      const channelMessages = await channel.messages.fetch();
      if (channelMessages.size === 0) {
        return await interaction.reply({
          content: `Tidak ada pesan di dalam channel ini yang dapat dihapus.`,
          ephemeral: true,
        });
      }

      if (ammout > channelMessages.size) ammout = channelMessages.size;
      const clearEmbed = new EmbedBuilder().setColor("White");

      await interaction.deferReply({ ephemeral: true });

      let messagesToDelete = [];

      if (target) {
        let i = 0;
        channelMessages.forEach((m) => {
          if (m.author.id === target.id && messagesToDelete.length < ammout) {
            messagesToDelete.push(m);
            i++;
          }
        });

        clearEmbed.setDescription(`
            \`✅\` Berhasil membersihkan ${messagesToDelete.length} pesan dari ${target} di channel ${channel}.
        `);
      } else {
        messagesToDelete = channelMessages.first(ammout);
        clearEmbed.setDescription(`
            \`✅\` Berhasil membersihkan ${messagesToDelete.length} pesan di channel ${channel}.
        `);
      }

      if (messagesToDelete.length > 0) {
        await channel.bulkDelete(messagesToDelete, true);
      }

      await interaction.editReply({
        embeds: [clearEmbed],
      });
    } catch (error) {
      console.log(error);
      await interaction.followUp({
        content: "Terjadi kesalahan saat membersihkan pesan.",
        ephemeral: true,
      });
    }
  },
};
