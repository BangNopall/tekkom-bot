const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Daftar command TEKKOM'24 discord bot yang tersedia"),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle("Commmand Bot - Teknik Komputer '24")
        .setDescription("> Gunakan aplication command atau prefix dengan ``slash atau (/)`` untuk memulai perintah.\n\n> **General Command**\n> - ``/help`` : Daftar seluruh perintah\n> - ``/info`` : Informasi TEKKOM'24 bot discord\n> - ``/tekkom`` :  coba aja wkwkw\n\n> **Moderator Command**\n> - ``/clear`` : Membersihkan pesan - pesan pada channel\n\n> **Music Player Command**\n> - ``/play`` : Menggunakan musik player untuk memutar lagu\n> - ``/resume`` : Melanjutkan lagu yang sedang di pause\n> - ``/pause`` : Menghentikan lagu yang sedang di putar\n> - ``/skip`` : Melewati lagu yang sedang di putar\n> - ``/queue`` : Melihat daftar 10 antrian lagu\n> - ``/exit`` : Menghapus semua antrian lagu dan keluar dari voice")
        .setColor("f18a05")
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: "https://raw.githubusercontent.com/BangNopall/whitetiger-discordbot/refs/heads/main/src/schemas/logo_tekkom.jpeg",
            text: "Teknik Komputer '24"
        })

        // reply
        return interaction.reply({
            embeds: [embed]
        })
    }
}