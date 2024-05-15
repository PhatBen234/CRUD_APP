const Userdb = require("../model/model.js");

const createUser = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const user = new Userdb({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      status: req.body.status,
    });

    const data = await user.save();
    res.redirect("/add-user");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

const findUser = async (req, res) => {
  try {
    if (req.query.id) {
      const id = req.query.id;
      const data = await Userdb.findById(id);
      if (!data) {
        res.status(404).send({ message: "Not found with id " + id });
      } else {
        res.send(data);
      }
    } else {
      const users = await Userdb.find();
      res.send(users);
    }
  } catch (err) {
    res.status(500).send({ message: "Error occurred while retrieving users" });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Data to update can not be empty" });
    }

    const id = req.params.id;
    const data = await Userdb.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot update User with ${id}. Maybe User was not found!`,
      });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating user information" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Userdb.findByIdAndDelete(id);
    if (!data) {
      res.status(404).send({ message: `Can not Delete ${id}` });
    } else {
      res.send({ message: "Delete completely" });
    }
  } catch (err) {
    res.status(500).send({ message: "Could not delete User with id=" + id });
  }
};

module.exports = {
  createUser,
  updateUser,
  findUser,
  deleteUser
}
