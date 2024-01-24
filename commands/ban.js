import { SlashCommandBuilder } from "discord.js";

const banCommand = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user')
    .addSubcommand(subcommand =>
        subcommand
            .setName('temp')
            .setDescription('temporarily ban a user')
            .addUserOption(option =>
                option
                    .setName('target')
                    .setDescription('The user to ban')
                    .setRequired(true)
            )
            .addStringOption(option =>
                option
                    .setName('reason')
                    .setDescription('The reason for banning')
                    .setRequired(false)
            )
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('perm')
            .setDescription('permanently ban a user')
            .addUserOption(option =>
                option
                    .setName('target')
                    .setDescription('The user to ban')
                    .setRequired(true)
            )
            .addStringOption(option =>
                option
                    .setName('reason')
                    .setDescription('The reason for banning')
                    .setRequired(false)
            )
    );


export default banCommand.toJSON();