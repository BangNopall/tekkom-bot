const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("tekkom").setDescription("SISKOMM!"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `SISKOM SISKOM SATU DULUR SISKOM!!!`;
    return interaction.editReply({
      content: newMessage,
    });
  },
};
