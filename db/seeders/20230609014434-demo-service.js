'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Services', [
      {
        paket: 'cuci',
        harga: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        paket: 'cuci_setrika',
        harga: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
