exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send("**TopDesign** | Füge den Hashtag `#topdesign` zu deinem Design hinzu, um es für die Bewertung freizugeben. \nNutze `!vote` um einen Post zu liken, `!delete` um ihn zu löschen oder `!posts` für eine Übersicht alles Posts.");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "topdesign",
    category: "Top Design",
    description: "Info.",
    usage: "topdesign"
  };