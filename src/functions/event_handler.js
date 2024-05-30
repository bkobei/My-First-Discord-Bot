const fs = require('fs');

const { connection } = require('mongoose');

module.exports = (client) => {
  client.handleEvents = async (eventFolders, path) => {
    for (folder of eventFolders)
    {
      const eventFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
      if (folder === 'mongo')
      {
        for (const file of eventFiles)
        {
          const event = require(`../events/${folder}/${file}`);
          if (event.once)
          {
            connection.once(event.name, (...args) => event.execute(...args, client));
          }
          else
          {
            connection.on(event.name, (...args) => event.execute(...args, client));
          }
        }
      }
      else
      {
        for (const file of eventFiles)
        {
          const event = require(`../events/${folder}/${file}`);
          if (event.once)
          {
            console.log("Event once");
            client.once(event.name, (...args) => event.execute(...args, client));
          }
          else
          {
            console.log("Event on");
            client.on(event.name, (...args) => event.execute(...args, client));
          }
        }
      }
    }
  };
}
