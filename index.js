const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const { token, channelId } = require('./config.json');

client.once('ready', () => {
    console.log('Bot is ready');
    // Setiap menit, cek apakah waktu untuk mengirim pengingat
    setInterval(sendReminder, 60 * 1000);

    const activities = ['⏰ Pengingat Sahur', '🔔 Pengingat Puasa', '🍚 Pengingat Berbuka', '💪🏻Yuk Semangat!'];
    let index = 0;
    setInterval(() => {
        if (index >= activities.length) {
            index = 0;
        }
        client.user.setActivity(activities[index], { type: 'WATCHING' });
        index++;
    }, 10 * 1000);
});

function daysUntil(targetDate) {
    const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    const oneDay = 1000 * 60 * 60 * 24;
    const difference = Math.ceil((targetDate - today) / oneDay);
    return difference;
}

function createEmbed(argument, now) {
    let embed;
    if (typeof argument === 'number') {
        if (argument > 0) {
            embed = new Discord.MessageEmbed()
                .setColor('#00C2C4')
                .setThumbnail('https://i.pinimg.com/736x/b1/6a/9a/b16a9a18cacd40820c7e828892740376.jpg')
                .setTitle('🗓 Pengingat Puasa!')
                .setDescription(`🗓 **Puasa Tinggal :** \`${argument} Hari Lagi\`\n✨ **Tanggal Lebaran :** \`31 Maret 2025\`\n💪🏻**Yuk Semangat! Jangan Mokah ya.**`)
                .setFooter('💖Create By Mbelo');
        } else {
            embed = new Discord.MessageEmbed()
                .setColor('#FFA733')
                .setThumbnail('https://i.pinimg.com/564x/d6/aa/88/d6aa885a11286dd680b247e47ecff4f3.jpg')
                .setTitle('🙏🏻 Selamat Hari Raya Idul Fitri 1446H 🙏🏻')
                .setDescription('**Minal Aidin Wal Faizin, Mohon Maaf Lahir Dan Batin**\nMaaf Jika Pembuat Bot Ini Banyak Salahnya Mohon Dimaafkan😭')
                .setFooter('💖Create By Mbelo');
        }
    } else if (typeof argument === 'string') {
        if (argument === 'sahur') {
            embed = new Discord.MessageEmbed()
                .setColor('#089BCC')
                .setTitle('🔊 Pengingat Sahur')
                .setDescription(`**⏰ Jam Saat Ini :** \`${now.toLocaleTimeString('en-US', { hour12: false })}\`\n**Waktunya sahur! 🌍 Untuk Area Surakarta Dan Sekitarnya**`)
                .setThumbnail('https://i.pinimg.com/736x/92/c3/75/92c3756d18b0afd67fa17c38300ed85e.jpg')
                .setFooter('💖Create By Mbelo');
        } else if (argument === 'berbuka') {
            embed = new Discord.MessageEmbed()
                .setColor('#FDECA0')
                .setTitle('🍚 Selamat Berbuka!')
                .setDescription(`**⏰ Jam Saat Ini :** \`${now.toLocaleTimeString('en-US', { hour12: false })}\`\n**Waktunya Berbuka! 🌍 Untuk Area Surakarta Dan Sekitarnya**`)
                .setThumbnail('https://i.pinimg.com/564x/8b/58/0a/8b580a9d4163fb55354b372b2e0fbd68.jpg')
                .setFooter('💖Create By Mbelo');
        } else {
            // Jika argument berupa waktu shalat
            embed = new Discord.MessageEmbed()
                .setColor('#E7C590')
                .setTitle(`🔊 Waktunya Sholat ${argument.charAt(0).toUpperCase() + argument.slice(1)}!`)
                .setDescription(`**⏰ Jam Saat Ini :** \`${now.toLocaleTimeString('en-US', { hour12: false })}\`\n**🕌 Waktunya Sholat :** \`${argument.charAt(0).toUpperCase() + argument.slice(1)}!\`\n 🌍 **Untuk Area Surakarta Dan Sekitarnya**`)
                .setThumbnail('https://i.pinimg.com/564x/18/51/a4/1851a465e945af03847c74a1752600ac.jpg')
                .setFooter('💖Create By Mbelo');
        }
    }
    return embed;
}

client.on('message', async message => {
    if (message.content.toLowerCase() === '!puasa') {
        const today = new Date();
        const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
        const targetDate = new Date(today.getFullYear(), config.lebaranDate.month - 1, config.lebaranDate.day);
        const daysLeft = daysUntil(targetDate);

        const embed = createEmbed(daysLeft);
        // Kirim pesan pengingat
        const sentMessage = await message.channel.send('@everyone', { embed });
        // Hapus pesan yang memicu perintah setelah pesan pengingat dikirim
        //message.delete();
        // Atau gunakan timeout untuk menghapusnya setelah beberapa detik
         setTimeout(() => {
             message.delete();
         }, 2000); // 5000 milidetik = 5 detik
    }
});


client.on('message', message => {
    if (message.content === '!waktu') {
        const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const day = days[now.getDay()];
        const date = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        const formattedDate = `${day}, ${date < 10 ? '0' + date : date}-${month < 10 ? '0' + month : month}-${year}`;
        
        message.channel.send(`⏰ **Waktu lokal saat ini :** \`${formattedDate}\` **Pukul:** \`${formattedTime}\``);
        setTimeout(() => {
            message.delete();
        }, 2000);
    }
});


function sendReminder() {
    const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    // Mendapatkan waktu saat ini

    const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

    // Cek apakah jam saat ini adalah jam 12 malam (00:00)
    if (today.getHours() === config.puasaReminderTime.hour && today.getMinutes() === config.puasaReminderTime.minute) {
        const daysLeft = daysUntil(new Date(today.getFullYear(), config.lebaranDate.month - 1, config.lebaranDate.day));
        if (daysLeft > 0) {
            const puasaContent = '@everyone';
            const puasaEmbed = createEmbed(daysLeft, now); // Menambahkan now sebagai argumen

            const channel = client.channels.cache.get(channelId);
            if (channel) {
                channel.send(puasaContent, { embed: puasaEmbed });
            } else {
                console.log('Channel not found!');
            }
        }
    }

    // Periksa apakah saatnya untuk Sahur
    if (today.getHours() === config.sahurTime.hour && today.getMinutes() === config.sahurTime.minute) {
        const sahurContent = '@everyone';
        const sahurEmbed = createEmbed('sahur', now); // Menambahkan now sebagai argumen

        const channel = client.channels.cache.get(channelId);
        if (channel) {
            channel.send(sahurContent, { embed: sahurEmbed });
        } else {
            console.log('Channel not found!');
        }
    }

    // Periksa apakah saatnya untuk Berbuka
    if (today.getHours() === config.berbukaTime.hour && today.getMinutes() === config.berbukaTime.minute) {
        const berbukaContent = '@everyone';
        const berbukaEmbed = createEmbed('berbuka', now); // Menambahkan now sebagai argumen

        const channel = client.channels.cache.get(channelId);
        if (channel) {
            channel.send(berbukaContent, { embed: berbukaEmbed });
        } else {
            console.log('Channel not found!');
        }
    }

    // Periksa waktu solat
    const prayerTimes = config.prayerTimes;
    const currentTime = today.getHours() * 100 + today.getMinutes();
    for (const prayer in prayerTimes) {
        const time = prayerTimes[prayer];
        const prayerTime = time.hour * 100 + time.minute;
        if (currentTime === prayerTime) {
            const prayerContent = '@everyone';
            const prayerEmbed = createEmbed(prayer, now); // Menambahkan now sebagai argumen

            const channel = client.channels.cache.get(channelId);
            if (channel) {
                channel.send(prayerContent, { embed: prayerEmbed });
            } else {
                console.log('Channel not found!');
            }
        }
    }
}

client.login(token);
