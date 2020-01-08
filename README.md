# Discord Music Bot (Naga) 
Naga is a music bot developed using discord.js which is a powerful node.js module which allows users to interact with the Discord API. Naga is a music bot which play an audio stream from YouTube. Users can create their own playlist which is stored in a MongoDB database. 

---
## Setup
To setup the bot, all you need to do is create a config.json and run 'npm install' to install the dependencies.
```
{
    "yt_api_key": "",
    "bot_token": "",
    "prefix": "",
    "op": "",
    "weather_api": ""
}
```
yt_api_key - [YouTube](https://developers.google.com/youtube/v3/getting-started) Api Key

bot_token - Your [Discord Bot](https://discordapp.com/login?redirect_to=%2Fdevelopers%2Fapplications%2F) Token

prefix - Desired prefix

op - your Discord ID 

weather_api - [OpenWeatherMap](https://openweathermap.org/api) api key.

---
## Commands
If the prefix set is '.' the commands are given as: 
### Play a Music from YouTube
    .play <YouTube URL || song name> 

### List all songs in the current queue
    .queue 
### Skip the current song
    .skip
### Stop the music bot. Clear the current queue.
    .stop
### Create a new Playlist
    .newplaylist <PlayList Name>
### Play a Saved Playlist
    .ppl <Saved PlayList Name>
### Check Weather
    .weather <City> <Country>
### Remind
    .remind <Reminder Name> <Timer (seconds)>
