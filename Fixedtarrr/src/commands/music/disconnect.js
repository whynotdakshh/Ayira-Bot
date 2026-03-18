const embedBuilder = require('../../utils/embedBuilder');

module.exports = {
    name: 'disconnect',
    aliases: ['dc', 'leave'],
    description: 'Disconnect the bot from voice channel',
    usage: '!disconnect',
    category: 'Music',

    async execute(message, args, client) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply(
                embedBuilder.errorEmbed('Error', 'You need to be in a voice channel to use this command!')
            );
        }

        const player = client.lavalink.players.get(message.guild.id);

        if (!player || !player.connected) {
            return message.reply(
                embedBuilder.errorEmbed('Error', 'I am not connected to any voice channel!')
            );
        }

        if (player.voiceChannelId !== voiceChannel.id) {
            return message.reply(
                embedBuilder.errorEmbed('Error', 'You need to be in the same voice channel as me!')
            );
        }

        // 🔥 IMPORTANT PART
        player.stop();      // stop current track
        player.destroy();   // destroy player & disconnect VC

        return message.reply(
            embedBuilder.successEmbed(
                'Disconnected',
                'Successfully disconnected from the voice channel and cleared the queue 🎧'
            )
        );
    }
};
