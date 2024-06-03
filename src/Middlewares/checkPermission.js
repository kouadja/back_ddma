const User = require('../Models/user.js');

const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate({
        path: 'roles',
        populate: {
          path: 'permissions',
          model: 'Permission'
        }
      });

      const hasPermission = user.roles.some(role =>
        role.permissions.some(permission => permission.name === permissionName)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      console.error('Error checking permissions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

module.exports = checkPermission;
