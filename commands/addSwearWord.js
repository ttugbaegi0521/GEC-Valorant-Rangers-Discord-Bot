import { SlashCommandBuilder } from "discord.js";

const addSwearWordCommand = new SlashCommandBuilder()
    .setName('addswearword')
    .setDescription('add a swear word')
    .addStringOption(option =>
        option
            .setName('swear_word')
            .setDescription('The swear word to add')
            .setRequired(true)
    );


export default addSwearWordCommand.toJSON();