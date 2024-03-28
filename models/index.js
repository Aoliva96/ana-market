// TODO: Change all instances of 'project' to 'item' (keep same pluralization & capitalization)

const User = require('./User');
const Project = require('./Project');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Project.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Project };
