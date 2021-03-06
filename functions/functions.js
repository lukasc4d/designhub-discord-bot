module.exports = (client) => {
  
    client.permlevel = (message) => {
      let permlvl = 0;
      // Bot Owner gets 10
      if (client.config.ownerID.includes(message.author.id)) return 10;
      // Guild Owner gets 10
      if (message.author.id === message.guild.owner.id) return 9;

      const ranks = require("../configs/permlevel.json")
      for (let rank in ranks) {
        if (ranks.hasOwnProperty(rank)) {
          const role = message.guild.roles.find(r => r.name.toLowerCase() === rank.toLowerCase());
          if (role && message.member.roles.has(role.id)) permlvl = ranks[rank];
          return permlvl;
        }
      }

      if (!message.guild || !message.member) return 0;
    };
  
    client.log = (type, message, title) => {
      if (!title) title = 'Log';
      client.guilds.get(client.config.mainGuildID).channels.get(client.config.logChannel).send("**["+type+"]** ["+title+"] `"+message+"`")
      console.log(`[${type}] [${title}] ${message}`);
    };

    client.MStoTime = (time) => {
      let d, h, m, s;
      s = time
      m = Math.floor(s / 60);
      s = s % 60;
      h = Math.floor(m / 60);
      m = m % 60;
      d = Math.floor(h / 24);
      h = h % 24;
      return { d: d, h: h, m: m, s: s };
 }
  
  
    /*
    SINGLE-LINE AWAITMESSAGE
    A simple way to grab a single reply, from the user that initiated
    the command. Useful to get 'precisions' on certain things...
    USAGE
    const response = await client.awaitReply(message, 'Favourite Color?');
    message.reply(`Oh, I really love ${response} too!`);
    */
    client.awaitReply = async (message, question, limit = 60000) => {
      const filter = m=>m.author.id = message.author.id;
      await message.channel.send(question);
      try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
        return collected.first().content;
      } catch (e) {
        return false;
      }
    };
  
    // client.answer = (message, contents, options = {}) => {
    //   options.delay =  (options.delay || 2000);
    //   if (message.flags.includes('delme')) options.deleteAfter = true;
    //   options.deleteAfter = (options.deleteAfter || false);
    //   message.edit(contents);
    //   if (options.deleteAfter) message.delete({timeout: options.delay});
    // };
  
    client.clean = async (client, text) => {
      if (text && text.constructor.name == 'Promise')
        text = await text;
      if (typeof evaled !== 'string')
        text = require('util').inspect(text, {depth: 0});
  
      text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(client.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0');
  
      return text;
    };
  
  
    /* MISCELANEOUS NON-CRITICAL FUNCTIONS */
  
    String.prototype.toProperCase = function() {
      return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  
    Array.prototype.remove = function() {
      let value, a = arguments, L = a.length, ax;
      while (L && this.length) {
        value = a[--L];
        while ((ax = this.indexOf(value)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };

    // `await client.wait(1000);` to "pause" for 1 second.
    client.wait = require("util").promisify(setTimeout);

    /*
    // `client.wait(1000);` to "pause" for 1 second.
    client.wait = (ms) => {
      let start = new Date().getTime();
      let end = start;
      while(end < start + ms) {
        end = new Date().getTime();
     }
   }
  */
    process.on('uncaughtException', (err) => {
      const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
      console.error('Uncaught Exception: ', errorMsg);
    });
  
    process.on('unhandledRejection', err => {
      console.error('Uncaught Promise Error: ', err);
    });
  };