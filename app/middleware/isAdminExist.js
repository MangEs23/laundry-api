const db = require("../../db/models")

const Admin = db.Admin

const isAdminExist = (req, res, next) => {
  const { email } = req.body; // Assuming the email is sent in the request body

  Admin.findOne({
    where: {
      email: email
    }
  })
    .then(result => {
      if (result) {
        return res.status(400).json({ error: 'Admin email already exists' });
      }
      
      next();
    })
    .catch(error => {
      console.error('Error checking admin email:', error);
      return res.status(500).json({ error: 'Internal server error' });
    });
};


module.exports = isAdminExist