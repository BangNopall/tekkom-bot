const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryType, useMainPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Mainkan musik dari YouTube")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        .setDescription("Cari lagu dan mainkan")
        .addStringOption((option) =>
          option
            .setName("keywords")
            .setDescription("Ketik keywords atau link musik.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("playlist")
        .setDescription("Mainkan playlist dari Youtube")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("Link playlist youtube")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    const player = useMainPlayer();
    // Make sure the user is inside a voice channel
    if (!interaction.member.voice.channel)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            "Anda harus berada di voice channel untuk memutar musik"
          ),
        ],
        ephemeral: true,
      });

    // Create a play queue for the server, get guild id
    const queue = player.nodes.create(interaction.guild.id);

    // Wait until you are connected to the channel
    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    let embed = new EmbedBuilder();

    if (interaction.options.getSubcommand() === "playlist") {
      // Search for the playlist using the discord-player
      let url = interaction.options.getString("url");
      const result = await player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_PLAYLIST,
      });

      if (result.tracks.length === 0) {
        return interaction.reply({
          content: `Tidak ada hasil yang ditemukan dengan link tersebut`,
          ephemeral: true,
        });
      }

      // Add the tracks to the queue
      const playlist = result.playlist;
      queue.addTrack(result.tracks);
      embed
        .setTitle("Musik Player - Teknik Komputer '24")
        .setDescription(
          `> **${result.tracks.length} lagu** berhasil ditambahkan ke dalam antrian dari playlist\n\n> Playlist : [${playlist.title}](${playlist.url})\n> Creator ${playlist.author.name}`
        )
        .setThumbnail(`${playlist.thumbnail}`)
        .setColor("f18a05")
        .setTimestamp(Date.now())
        .setFooter({
          iconURL:
            "https://raw.githubusercontent.com/BangNopall/whitetiger-discordbot/refs/heads/main/src/schemas/logo_tekkom.jpeg",
          text: "Teknik Komputer '24",
        });
    } else if (interaction.options.getSubcommand() === "search") {
      // Search for the song using the discord-player
      let url = interaction.options.getString("keywords");
      const result = await player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });

      // console.log(result.tracks[0]);

      // finish if no tracks were found
      if (result.tracks.length === 0) {
        return interaction.reply({
          content: `Tidak ada hasil yang ditemukan`,
          ephemeral: true,
        });
      }
      // Add the track to the queue
      const song = result.tracks[0];
      queue.addTrack(song);

      embed
        .setTitle("Musik Player - Teknik Komputer '24")
        .setDescription(
          `> Lagu berhasil ditambahkan ke dalam antrian\n\n> Judul : [${song.title}](${song.url})\n> Artist : ${song.author}\n> Durasi : ${song.duration}\n> Requested By : <@${song.requestedBy.id}>`
        )
        .setThumbnail(`${song.thumbnail}`)
        .setColor("f18a05")
        .setTimestamp(Date.now())
        .setFooter({
          iconURL:
            "https://raw.githubusercontent.com/BangNopall/whitetiger-discordbot/refs/heads/main/src/schemas/logo_tekkom.jpeg",
          text: "Teknik Komputer '24",
        });
    }

    return queue.node.play();

    // mainkan musik
    // return queue.isPlaying() ? interaction.reply({ embeds: [embed] }) : queue.node.play();

    if (!queue.isPlaying()) {
      queue.node.play();
    }

    await interaction.reply({
      embeds: [embed],
    });
  },
};
