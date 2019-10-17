module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'created_by', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
    });
  },

  down: queryInterface => {
    return queryInterface.dropColumn('students', 'created_by');
  },
};
