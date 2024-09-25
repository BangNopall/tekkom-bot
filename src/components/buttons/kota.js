module.exports = {
    data: {
        name: 'kota',
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `fivem://connect/jklyam`,
        });
    }
}