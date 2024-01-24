import { SlashCommandBuilder } from "discord.js";

const rolesCommand = new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('add a role')
    .addRoleOption(option => 
        option
            .setName('new_role')
            .setDescription('The role to add')
            .setRequired(true)
    );


export default rolesCommand.toJSON();