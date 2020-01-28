const Discord = require('discord.js');
const { prefix, links_channel_id, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('linksbot ready!');
})

client.on('message', message => {
    const content = message.content;
    console.log(`${message.channel.id}, ${message.author.id}: ${content}`);
    const urlRegrex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    const match = urlRegrex.test(content);
    console.log(`Match Regexp: ${match}`);

    if (match && message.channel.id != links_channel_id) {
        // link detected, send to businsess-links
        console.log('Link detected, send to links channel');
        const linksMessage = `<@${message.author.id}>\n${content}`;
        const linksChannel = client.channels.get(links_channel_id);
        linksChannel.send(linksMessage);
    } else {
        // not a link
        console.log('Not a link!')
    }
})

client.login(token);