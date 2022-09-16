const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js")
const langFile = require('../../Language/lang.json')
const profileModel = require('../../Database/schema/profileSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('actionlog')
        .setDescription('Set Server Aciton Log')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Mention The Channel')
                .setRequired(true)),
    async execute(interaction) {

        const server =  await profileModel.findOne({
            serverId: interaction.guild.id,
        });
        var logs = interaction.options.getChannel('channel')

        if (server.cownerusers.includes(interaction.user.id)) { 
            if (logs.type === 'GUILD_TEXT') {
                logs.createWebhook(' Logger', {
                    avatar: 'https://media.discordapp.net/attachments/944630667017330728/944630741889859594/logo.png',
                }).then(webhook => 
                 profileModel.findOneAndUpdate(
                    {
                        serverId: interaction.guild.id,
                    },
                    {
                        acitonslogs: webhook.url,
                    }
                  )
                  ).catch(console.error);
                let done = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`${langFile[interaction.lang]['actionlogs']}` +`<#${logs.id}>`)
                    .setFooter(" Logger")
                    .setTimestamp()
                return interaction.reply({
                    embeds: [done] ,  ephemeral: true
                });
            } else {
                let err = new MessageEmbed()
                    .setColor('RED')
                    .setTitle(`${langFile[interaction.lang]['actiologserr']}`)
                    .setFooter(" Logger")
                    .setTimestamp()
                return interaction.reply({
                    embeds: [err] ,  ephemeral: true
                });
            }
        } else 
       if (interaction.user.id === interaction.guild.ownerId ) {
            if (logs.type === 'GUILD_TEXT') {
                logs.createWebhook(' Logger', {
                    avatar: 'https://media.discordapp.net/attachments/944630667017330728/944630741889859594/logo.png',
                }).then(webhook => 
                 profileModel.findOneAndUpdate(
                    {
                        serverId: interaction.guild.id,
                    },
                    {
                        acitonslogs: webhook.url,
                    }
                  )
                  ).catch(console.error);
                let done = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`${langFile[interaction.lang]['actionlogs']}` +`<#${logs.id}>`)
                    .setFooter(" Logger")
                    .setTimestamp()
                return interaction.reply({
                    embeds: [done] ,  ephemeral: true
                });
            } else {
                let err = new MessageEmbed()
                    .setColor('RED')
                    .setTitle(`${langFile[interaction.lang]['actiologserr']}`)
                    .setFooter(" Logger")
                    .setTimestamp()
                return interaction.reply({
                    embeds: [err]  ,  ephemeral: true
                });
            }
        }


       
        let owneronly = new MessageEmbed()
            .setTitle(`You Can't Use This Command!`)
            .setDescription(`${langFile[interaction.lang]['permerr']}`)
            .setColor('RED')
            .setTimestamp()
        return interaction.reply({
            embeds: [owneronly] ,  ephemeral: true
        });
    }
}