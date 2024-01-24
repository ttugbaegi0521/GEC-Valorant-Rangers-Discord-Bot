import { SlashCommandBuilder } from "discord.js";

const inviteCommand = new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Get an invite link to the server')
    


export default inviteCommand.toJSON();