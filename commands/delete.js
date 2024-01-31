import { SlashCommandBuilder } from "discord.js";

const deleteCommand = new SlashCommandBuilder()
    .setName('delete')
    .setDescription('deletes a number of messages')
    .addIntegerOption(option => 
        option
            .setName('number')
            .setDescription('The number of messages to delete')
            .setRequired(true)
    );




export default deleteCommand.toJSON();