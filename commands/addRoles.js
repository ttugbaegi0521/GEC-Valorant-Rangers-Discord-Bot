import { SlashCommandBuilder } from "discord.js";

const addRolesCommand = new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('add a role')
    .addUserOption(option => 
        option
            .setName('target')
            .setDescription('The user to add the role to')
            .setRequired(true)
    )
    .addRoleOption(option => 
        option
            .setName('new_role')
            .setDescription('The role to add')
            .setRequired(true)
    );


export default addRolesCommand.toJSON();