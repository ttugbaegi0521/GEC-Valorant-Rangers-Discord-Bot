import { SlashCommandBuilder } from "discord.js";

const orders = new SlashCommandBuilder()
        .setName('orders')
        .setDescription('Get a list of orders')
        .addStringOption(option =>
            option.setName('food')
                .setDescription('The type of food')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Burger',
                        value: 'burger'
                    },
                    {
                        name: 'Hotdog',
                        value: 'hotdog'
                    },
                    {
                        name: 'Pizza',
                        value: 'pizza'
                    }
                )
                
        );


export default orders.toJSON();