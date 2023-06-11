const { sequelize } = require('../../db/models');
const { QueryTypes } = require('sequelize')
const db = require('../../db/models');

const Transaction = db.Transaction
const Admin = db.Admin
const Service = db.Service

const createTransaction = async (req, res) => {

    const service = await Service.findOne({
        where: {
            id: req.body.service_id
        }
    })

    const berat = req.body.berat
    const total = berat * service.harga
    const transaction = {
        nama: req.body.nama,
        berat: berat,
        service_id: service.id,
        total: total, 
        tanggal: new Date()
    };
    Transaction.create(transaction)
      .then(transaction => {
        res.status(201).send(transaction);
      })
      .catch(error => {
        console.error('Error creating transaction:', error);
        res.status(500).send({ error: 'Error creating transaction' });
      });
};

const getAllTrasaction = async (req, res) => {
    await sequelize.query("SELECT `Transactions`.`id` AS `id`, `nama`, `berat`, `total`, `tanggal`, `Services`.`paket` AS `nama_paket`, `Services`.`harga` AS `harga` FROM `Transactions` LEFT JOIN `Services` ON `Transactions`.`service_id` = `Services`.`id`; ", {type: QueryTypes.SELECT})
    .then(transaction => {
        res.send(transaction);
    })
    .catch(error => {
        console.error('Error retrieving transaction:', error);
        res.status(500).send({ error: 'Error retrieving transaction' });
    });    
};

const getTransactionById = async (req, res) => {
    await sequelize.query("SELECT `Transactions`.`id` AS `id`, `nama`, `berat`, `total`, `tanggal`, `Services`.`paket` AS `nama_paket`, `Services`.`harga` AS `harga` FROM `Transactions` LEFT JOIN `Services` ON `Transactions`.`service_id` = `Services`.`id` WHERE `Transactions`.`id` = :paramsId ; ", {
        replacements: {
            paramsId: req.params.id
          },
        type: QueryTypes.SELECT
    })
    .then(transaction => {
        res.send(transaction);
    })
    .catch(error => {
        console.error('Error retrieving transaction:', error);
        res.status(500).send({ error: 'Error retrieving transaction' });
    });    
};

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const service = await Service.findOne({
        where: {
            id: req.body.service_id
        }
    })

    const berat = req.body.berat
    const total = berat * service.harga
    const transaction = {
        nama: req.body.nama,
        berat: berat,
        service_id: service.id,
        total: total, 
        tanggal: new Date()
    };
   const theTransaction = await Transaction.findByPk(id)
   theTransaction.update(transaction)
   theTransaction.save()
   .then(transaction => {
    res.send(transaction);
  })
  .catch(error => {
    console.error('Error updating transaction:', error);
    res.status(500).send({ error: 'Error updating transaction' });
  });
};

const deleteTransaction = (req, res) => {
    const { id } = req.params;
    Transaction.findByPk(id)
      .then(transaction => {
        if (transaction) {
          return transaction.destroy();
        } else {
          res.status(404).send({ error: 'transaction not found' });
        }
      })
      .then(() => {
        res.send({ message: 'transaction deleted successfully' });
      })
      .catch(error => {
        console.error('Error deleting transaction:', error);
        res.status(500).send({ error: 'Error deleting transaction' });
      });
};


module.exports = {
    createTransaction,
    getAllTrasaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction
}