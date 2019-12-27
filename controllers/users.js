const Model = require("../models");
const Users = Model.users;
const Articles = Model.articles;
const Categories = Model.categories;

exports.index = (req, res) => {
    Users.findAll().then(data => res.send(data));
};

exports.show = (req, res) => {
  const { id } = req.params;

  Users.findOne({
    where: {
      id
    }
  }).then(data => res.send(data));
};

//get article by id user
exports.articleByUser = (req, res) => {
  const { id } = req.params;
  Articles.findAll({
    // get data from articles table
    attributes: ["id", "title", "content", "image", "createdAt", "updatedAt"],
    include: [
      {
        // get id category and name category data from table categories
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      }
    ],
    // where author id from table article and id from index
    where: { author_id: id }
  }).then(data => res.send(data));
};

exports.create = (req, res) => {
    Users.create(req.body).then(data =>
    res.send({
      message: "Success create",
      data
    })
  );
};

exports.update = (req, res) => {
  const { id } = req.params;

  Users.update(req.body, {
    where: {
      id
    }
  }).then(data => {
    res.send({
      message: "Success update",
      data
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Accounts.destroy({
    where: {
      id
    }
  }).then(data => {
    res.send({
      message: "Success delete",
      data
    });
  });
};
