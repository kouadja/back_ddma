const User = require('../Models/user.js');
const jwt = require('jsonwebtoken');

const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email }).populate({
        path: 'roles',
        populate: {
          path: 'permissions',
          model: 'Permission'
        }
      });
      console.log(user)
      const hasPermission = user.roles.some(role =>
        role.permissions.some(permission => permission.name === permissionName)
      );
      console.log(hasPermission)

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      console.error('Error checking permissions:', error);
      res.status(500).json({ message: 'Internal server error 1' });
    }
  };
};


const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const { email } = req.body; // Suppose que l'email est fourni dans le corps de la requête
      const user = await User.findOne({ email }).populate('roles');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const hasRole = user.roles.some(role => role.name === requiredRole);

      if (!hasRole) {
        return res.status(403).json({ message: 'Access denied: You do not have the required role' });
      }

      next();
    } catch (error) {
      console.error('Error checking role:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};






const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    const verified = jwt.verify(token, 'your_secret_key');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};






module.exports = {
  checkPermission:checkPermission,
  verifyToken:verifyToken,
  checkRole:checkRole
};
