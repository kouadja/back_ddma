const mongoose = require('mongoose');
const Permission = require('../Models/permission');
const Role = require('../Models/role');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOSE);
    console.log('Connexion à la base de données MongoDB établie.');

  
    const permissions = [
      { name: 'manage_team', description: 'Manage team' },
      { name: 'upload', description: 'upload file' },
      { name: 'manage_projects', description: 'Manage project' },
      { name: 'view_projects', description: 'Viewp rojects' },
      { name: 'manage_users', description: 'Manage users' },
  
      { name: 'View users', description: 'View users' },
      { name: 'give_role', description: 'Give role' },
    

    ];
    const exclude = [
    
      { name: 'upload', description: 'upload file' },
      { name: 'manage_projects', description: 'Manage project' },
      { name: 'view_projects', description: 'Viewp rojects' },
 
      { name: 'upload', description: 'upload file' },
      { name: 'View users', description: 'View users' },
  
    

    ]
    

   /*  const savedPermissions = await Permission.insertMany(permissions);
    const managerRole = new Role({
      name: 'manager',
      permissions: savedPermissions.map(permission => permission._id) // Utilisation de map pour extraire les identifiants de permission
    });


    const membreRole = new Role({
      name: 'membre',
      permissions: [savedPermissions.find(permission => permission.name === 'upload')._id,]
    });

    const clientRole = new Role({
      name: 'client',
      permissions: [savedPermissions.find(permission => permission.name === 'view_projects')._id],
    
    });

    await managerRole.save();
    await membreRole.save();
    await clientRole.save(); */
      
  } catch (error) {

    console.error('Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};
module.exports = connectDB;


