// config/db.js
const mongoose = require('mongoose');
const {
    Permission:Permission,
    Role:Role,
    User:User
} = require("../Models/user.js")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOSE);
    console.log('Connexion à la base de données MongoDB établie.');
    const permissions = [
        { name: 'manage_projects', description: 'Manage projects' },
        { name: 'view_projects', description: 'View projects' },
        { name: 'create_projects', description: 'Create projects' }
      ];
  
      const savedPermissions = await Permission.insertMany(permissions);
  
      // Créer des rôles
      const managerRole = new Role({
        name: 'manager',
        permissions: savedPermissions.map(permission => permission._id)
      });
  
      const membreRole = new Role({
        name: 'membre',
        permissions: [savedPermissions.find(permission => permission.name === 'view_projects')._id]
      });
  
      const clientRole = new Role({
        name: 'client',
        permissions: []
      });
  
      await managerRole.save();
      await membreRole.save();
      await clientRole.save();
  
      console.log('Roles and permissions created successfully');
  } catch (error) {

    console.error('Erreur de connexion à la base de données:', error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
