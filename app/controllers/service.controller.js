const db = require('../../db/models');

const Service = db.Service

const createService = (req, res) => {
  const { paket, harga } = req.body;
  Service.create({ paket, harga })
    .then(service => {
      res.status(201).send(service);
    })
    .catch(error => {
      console.error('Error creating service:', error);
      res.status(500).send({ error: 'Error creating service' });
    });
};

const getAllServices = (req, res) => {
  Service.findAll()
    .then(services => {
      res.send(services);
    })
    .catch(error => {
      console.error('Error retrieving services:', error);
      res.status(500).send({ error: 'Error retrieving services' });
    });
};

const getServiceById = (req, res) => {
  const { id } = req.params;
  Service.findByPk(id)
    .then(service => {
      if (service) {
        res.send(service);
      } else {
        res.status(404).send({ error: 'Service not found' });
      }
    })
    .catch(error => {
      console.error('Error retrieving service:', error);
      res.status(500).send({ error: 'Error retrieving service' });
    });
};

const updateService = (req, res) => {
  const { id } = req.params;
  const { paket, harga } = req.body;
  Service.findByPk(id)
    .then(service => {
      if (service) {
        return service.update({ paket, harga });
      } else {
        res.status(404).send({ error: 'Service not found' });
      }
    })
    .then(service => {
      res.send(service);
    })
    .catch(error => {
      console.error('Error updating service:', error);
      res.status(500).send({ error: 'Error updating service' });
    });
};

const deleteService = (req, res) => {
  const { id } = req.params;
  Service.findByPk(id)
    .then(service => {
      if (service) {
        return service.destroy();
      } else {
        res.status(404).send({ error: 'Service not found' });
      }
    })
    .then(() => {
      res.send({ message: 'Service deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting service:', error);
      res.status(500).send({ error: 'Error deleting service' });
    });
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
}