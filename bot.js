import { Client, GatewayIntentBits, Guild, Routes, PermissionFlagsBits } from 'discord.js';
import { REST } from '@discordjs/rest';
import dotenv from "dotenv";

import orders from './commands/order.js';
import rolesCommand from './commands/roles.js';
import banCommand from './commands/ban.js';
import unbanCommand from './commands/unban.js';
import inviteCommand from './commands/invite.js';

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages
    ] 
});

const rest = new REST({ version: '10' }).setToken(TOKEN);


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return; // If the interaction isn't a command, return

    if(interaction.isChatInputCommand()){
        switch(interaction.commandName){
            case 'orders':
                await interaction.reply('You ordered a ' + interaction.options.getString('food'));
                break;
            case 'addrole':
                const role = interaction.options.getRole('new_role');
                await interaction.member.roles.add(role);
                await interaction.reply('You have been given the role ' + role.name);
                break;
                
            case 'ban':
                if(interaction.member && !interaction.member.permissions.has(PermissionFlagsBits.BanMembers)){
                    await interaction.reply("You don't have permission to use this command.");
                    return;
                }

                if(interaction.options.getSubcommand() === 'temp'){
                    const target = interaction.options.getUser('target');
                    const reason = interaction.options.getString('reason') || 'No reason provided';

                    await interaction.guild.members.ban(target, { reason: reason, days: 7 });
                    await interaction.reply(`${target} has been banned for ${reason}`);
                }
                else if(interaction.options.getSubcommand() === 'perm'){
                    const target = interaction.options.getUser('target');
                    const reason = interaction.options.getString('reason') || 'No reason provided';

                    await interaction.guild.members.ban(target, { reason: reason });
                    await interaction.reply(`${target} has been banned for ${reason}`);
                }
                break;

            case 'unban':
                if(interaction.member && !interaction.member.permissions.has(PermissionFlagsBits.BanMembers)){
                    await interaction.reply("You don't have permission to use this command.");
                    return;
                }

                const userMention = interaction.options.getString("user");
                const userId = userMention.replace(/[<@!>]/g, ''); // Extract the user ID from the mention
                const reason = interaction.options.getString("reason") || "No reason provided";
                try {
                    // Fetch the banned users to find the correct ID
                    const bans = await interaction.guild.bans.fetch();
                    const bannedUser = bans.find(ban => ban.user.id === userId);
                    if (bannedUser) {
                        await interaction.guild.members.unban(bannedUser.user.id, { reason: reason });
                        await interaction.reply(`${bannedUser.user.tag} has been unbanned for ${reason}`);
                    } else {
                        await interaction.reply(`User with ID ${userId} is not banned.`);
                    }
                } catch (error) {
                    console.error(error);
                    await interaction.reply('An error occurred while trying to unban the user.');
                }
                
                break;
            case 'invite':
                //give invite link
                const invite = await interaction.channel.createInvite({
                    maxAge: 0, // 0 = infinite expiration
                    maxUses: 0 // 0 = infinite uses
                });
                await interaction.reply(`Here is your invite link:\n${invite}`);
                break;
            default:
                await interaction.reply(`The command doesn\'t exist`);
                break;
        }
    }

});

async function main(){

    const commands = [orders, rolesCommand, banCommand, unbanCommand, inviteCommand];
    
    try{
        console.log(`Started refreshing application (/) commands.`);

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { 
            body: commands
        });

        client.login(TOKEN);
    }
    catch(error){
        console.log(error);
    }
}



main();