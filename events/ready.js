const { ActivityType } = require('discord.js');
const colors = require('../UI/colors/colors');
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
  
        const activities = [
            { name: 'Netflix', type: ActivityType.Watching },
            { name: 'GTA VI', type: ActivityType.Playing },
            { name: 'on YouTube', type: ActivityType.Streaming },
            { name: 'Spotify', type: ActivityType.Listening },
        ];

     
        const statuses = ['online', 'idle', 'dnd'];

     
        let currentActivityIndex = 0;
        let currentStatusIndex = 0;

 
        function setActivityAndStatus() {
        
            const activity = activities[currentActivityIndex];
            const status = statuses[currentStatusIndex];

          
            client.user.setPresence({
                activities: [activity],
                status: status,
            });

            
            currentActivityIndex = (currentActivityIndex + 1) % activities.length;
            currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
        }

            async function updateStatus() {
 
        const activePlayers = Array.from(client.riffy.players.values()).filter(player => player.playing);

        if (!activePlayers.length) {
            //console.log("⏹️ No song is currently playing. Setting default status.");
            client.user.setActivity(defaultActivity);
            return;
        }

        const player = activePlayers[0];

        if (!player.current || !player.current.info || !player.current.info.title) {
            //console.log("⚠️ Current track info is missing. Keeping default status.");
            return;
        }

        const trackName = player.current.info.title;
        //console.log(`🎵 Now Playing: ${trackName}`);

        client.user.setActivity({
            name: `😎 ${trackName}`,
            type: ActivityType.Playing
        });
    }
        setTimeout(() => {
            setActivityAndStatus();
            console.log('\n' + '─'.repeat(40));
            console.log(`${colors.magenta}${colors.bright}🔗  ACTIVITY STATUS${colors.reset}`);
            console.log('─'.repeat(40));
            console.log('\x1b[31m[ CORE ]\x1b[0m \x1b[32m%s\x1b[0m', 'Bot Activity Set Successful ✅');
        }, 2000);

        setInterval(() => {
            setActivityAndStatus();
        }, 6000);
    },
};
