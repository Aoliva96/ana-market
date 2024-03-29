// TODO: Change all instances of 'project' to 'item' (keep same pluralization & capitalization)

const User = require('./User');
const Item = require('./Item');

User.hasMany(Item, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Item.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Item };
