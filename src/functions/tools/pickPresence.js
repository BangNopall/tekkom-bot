const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: "TEKNIK KOMPUTER '24",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: "your command",
        status: "online",
      },
      {
        type: ActivityType.Playing,
        text: "/help",
        status: "online",
      },
    ];
    const option = Math.floor(Math.random() * options.length);

    client.user.setPresence({
        activities: [
          {
            name: options[option].text,
            type: options[option].type,
          },
        ],
        status: options[option].status,
    });
  };
};
