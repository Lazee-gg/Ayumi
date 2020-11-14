const ayumi = require("./ayumi.json");
const Discord = require("discord.js")
const prefix = "#"

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
    console.log(`Bot jest online!`)
    bot.user.setActivity(`Ayumi ・ w trakcie aktualizacji...`, { type:'WATCHING' })
});

bot.on("message", async message => {
    if (message.author.bot) return;
 
    if (message.content.indexOf(prefix) !== 0) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase()


    if(command == `clear`){
        let embed1 = new Discord.MessageEmbed()
        .setTitle(`Błąd`)
        .setDescription("Nie posiadasz permisji!")
        .setColor("RED")
        .setTimestamp()
        .setFooter(`Invoked by ${message.author.username}`)
    
        let embed2 = new Discord.MessageEmbed()
        .setTitle(`Błąd`)
        .setDescription(`Podaj liczbę wiadomości, które chcesz usunąć!`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(`Invoked by ${message.author.username}`)
       
    
        let embed3 = new Discord.MessageEmbed()
        .setTitle(`Błąd`)
        .setDescription(`Coś poszło nie tak...`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(`Invoked by ${message.author.username}`)
    
        let embed = new Discord.MessageEmbed()
        .setTitle("Sukces!")
        .setColor("GREEN") 
        .setDescription("Wiadomości zostały wyczyszczone pomyślnie!") 
        .setTimestamp()
        .setFooter(`Wyczyszczone przez: ${message.author.username}`)
    
        if (message.deletable) {
            message.delete();
        }
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) { 
            return message.channel.send(embed1).then(m => m.delete(5000));
        }
    
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send(embed2).then(m => m.delete(5000));
        }
    
        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
    
        message.channel.bulkDelete(deleteAmount, true)
        .catch(err => message.channel.send(embed3));
        
        message.channel.send(embed);
    
    
    }
    if(command == `awatar`){
        var embed = new Discord.MessageEmbed()

        .setColor(`GREEN`)
        .setTitle(`Awatar użytkownika ${message.member.user.tag}`)
        .setDescription(`Popatrz jak słodko!`)
        .setImage(`${message.member.user.avatarURL()}`)
        .setFooter(message.member.user.tag, message.member.user.avatarURL)

        message.delete();
        message.channel.send(embed);
    }
    if(command == `serwerinfo`){
        var embed = new Discord.MessageEmbed()

        .addField("Nazwa serwera:", `> ${message.guild.name}`)
        .addField("Właściciel serwera:", `> ${message.guild.owner.user.tag}`)
        .addField("Region serwera:", `> ${message.guild.region}`)
        .addField("Liczba użytkowników:", `> ${message.guild.memberCount}`)
        .addField("Weryfikacja:", `> ${message.guild.verificationLevel}`)
        .addField("ID gildii:", `> ${message.guild.id}`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(message.member.user.tag, message.member.user.avatarURL)
        .setAuthor(`Dane o serwerze`)
        .setThumbnail(`${message.guild.iconURL()}`)

        message.channel.send(embed);
    }
    if(command == `pomoc`){
        var embed = new Discord.MessageEmbed()

        .setColor('GREEN')
        .setTitle("Pomoc udzielona!")
        .setDescription("**Ayumi commands**:\n\n``#pomoc``・Komenda pomoc wyświetla wszystkie komendy i ważne informacje z nimi związane.\n``#ping``・Komenda pozwalająca na sprawdzenie pingu bota.\n``#awatar``・Komenda pokazuje Twoją ikonę ustawioną na Discordzie.\n``#serwerinfo``・Komenda ta pokazuje wszystkie dane, które posiadamy o Twoim serwerze Discord.\n\nTwórcą Bota jest ``. Dropsik#0001``")
        .setTimestamp()
        .setFooter(message.member.user.tag, message.member.user.avatarURL)
        .setThumbnail(`${message.guild.iconURL()}`)


        message.delete();
        message.channel.send(embed);
    }
    if (command === "uptime") {

        let msg = await message.channel.send(`Analiza danych...`);

        msg.edit(`**Dane zakutalizowano!**\n\nMój uptime wynosi: **${bot.uptime}** ms`);
    }
    if(command == `profil`){
        var embed = new Discord.MessageEmbed()

        .setColor('GREEN')
        .setTitle("PROFIL UŻYTKOWNIKA")
        .addField("Nazwa Użytkownika:", `> ${message.member.user.tag}`)
        .addField("ID Użytkownika:", `> ${message.guild.owner.user.id}`)
        .addField("Dołączył:", `> ${message.member.user.createdAt}`)
        .addField("Status:", `> ${message.member.user.presence.status}`)
        .setTimestamp()
        .setFooter(message.member.user.tag, message.member.user.avatarURL)
        .setThumbnail(`${message.member.user.avatarURL()}`)


        message.delete();
        message.channel.send(embed);
    }
    if(command == `kotki`){

        var wynik = (Math.floor(Math.random()  * 4) == 0) ? 'https://th.bing.com/th/id/OIP.LWNp1zPizwEBdy7cF7KZLgHaEo?w=294&h=183&c=7&o=5&pid=1.7' : "https://th.bing.com/th/id/OIP.6juDooh6a5f0DVW6YB-inQHaEK?w=288&h=180&c=7&o=5&pid=1.7"
        var embed = new Discord.MessageEmbed()
        .setTitle("Kotek o.o")
        .setImage(wynik)
        .setColor("GREEN")

        message.channel.send(embed);
    }
});     

bot.login(ayumi.token)