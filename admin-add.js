
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin-add')
        .setDescription('Add admin role to a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to make admin')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: '❌ Only admins can use this command.', ephemeral: true });
        }

        const member = interaction.options.getMember('user');
        if (!member) {
            return interaction.reply({ content: '❌ User not found.', ephemeral: true });
        }

        let adminRole = interaction.guild.roles.cache.find(r => r.name === 'Admin');
        if (!adminRole) {
            adminRole = await interaction.guild.roles.create({
                name: 'Admin',
                permissions: [PermissionFlagsBits.Administrator],
                reason: 'Admin role created by /admin-add'
            });
        }

        await member.roles.add(adminRole);
        return interaction.reply({ content: `✅ ${member.user.tag} is now an Admin.` });
    }
};
