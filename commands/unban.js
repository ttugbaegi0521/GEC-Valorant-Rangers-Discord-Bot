import { SlashCommandBuilder } from "discord.js";

const unbanCommand = new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unbans a specified discord id")
    .addStringOption(option =>
        option
            .setName("user")
            .setDescription("The user to be unbanned")
            .setRequired(true))
    
    .addStringOption(option =>
        option
            .setName("reason")
            .setDescription("The reason for unbanning")
            .setRequired(false));


export default unbanCommand.toJSON();