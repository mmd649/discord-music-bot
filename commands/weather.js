const { RichEmbed } = require("discord.js");
const request = require("request");
const api_key = "c7df28fc5cf7daf5ad23b883b2513cef";

module.exports = {
  name: "weather",
  description: "Check the temperature and humidity in the area specified.",
  execute(message, args) {
    const city = args[0],
      country = args[1];

    try {
      request.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${api_key}`,
        (error, response, body) => {
          if (response.statusCode == 200) {
            let bodyJson = JSON.parse(body);

            const cityName = bodyJson.name,
              countryName = bodyJson.sys.country,
              minTemp = Math.round(bodyJson.main.temp_min - 273.15),
              maxTemp = Math.round(bodyJson.main.temp_max - 273.15),
              airHumidity = bodyJson.main.humidity;

            let messageEmbed = new RichEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL)
              .setTitle(
                `The weather forecast for ${cityName} in ${countryName}`
              )
              .setColor("#3fb0ac")
              .addField(
                `Temperature`,
                `Min temperature is ${minTemp}°C while the max temperature is ${maxTemp}°C`,
                true
              )
              .addField(`Humidity`, `Humidity is ${airHumidity}%`, false);

            message.channel.send(messageEmbed);
          } else {
            message.channel.send(
              `<@${message.author.id}>Please type in a valid city and country.`
            );
          }
        }
      );
    } catch (error) {
      console.error("Error Encountered" + error);
    }
  }
};
