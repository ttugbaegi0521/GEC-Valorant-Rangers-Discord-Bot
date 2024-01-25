import { SlashCommandBuilder } from "discord.js";

const removeRolesCommand = new SlashCommandBuilder()
    .setName('removerole')
    .setDescription('removes a role')
    .addUserOption(option => 
        option
            .setName('target')
            .setDescription('The user to remove the role to')
            .setRequired(true)
    )
    .addRoleOption(option => 
        option
            .setName('new_role')
            .setDescription('The role to remove')
            .setRequired(true)
    );


export default removeRolesCommand.toJSON();