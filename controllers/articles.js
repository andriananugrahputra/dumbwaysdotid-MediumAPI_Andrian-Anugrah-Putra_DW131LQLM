const Model = require('../models');
const Articles = Model.articles;
const Categories = Model.categories;
const Users = Model.users;
const Comments = Model.comments;

// show all article with data id category and name category from table categories
exports.index = (req, res) => {
  Articles.findAll({
    // get all data article except updateAt, category_id and category_name
    attributes: {
      exclude: [ 'updatedAt', 'category_id', 'category_name' ]
    },
    include: [
      {
        // get data from table categories except createdAt, updatedAt, is_published and is_archived
        model: Categories,
        as: 'categories',
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'is_published', 'is_archived' ]
        }
      }
    ],
    // get all articles sort by desc article created, with limit 10 data
    order: [ [ 'createdAt', 'DESC' ] ],
    limit: 10
  }).then((data) => res.send(data));
};

// show article detail with comments and category by id article
exports.show = (req, res) => {
  const { id } = req.params;
  Articles.findOne({
    attributes: ["id", "title", "content", "image", "createdAt", "updatedAt"],
    include: [
      {
        // get id category and name category from table categories
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      },
      {
        // get id comment, comment, createAt and updateAt from table comments
        model: Comments,
        as: "comments",
        attributes: ["id", "comment", "createdAt", "updatedAt"]
      }
    ],
    // where id from index == id article
    where: { id: id}
  }).then(data => res.send(data));
};

// create new article 
exports.create = (req, res) => {
  // console.log(req.user_id);
  Articles.findOne().then(article => {
    //check title articles
    if (req.body.title == article.title) {
      //if title article already exist
      return res.status(403).json({
        message: "title already exist"
      });
    } else {
      Articles.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        category_id: req.body.category_id,
        author_id: req.user_id,
        is_published: true,
        is_archived: false
      }).then(data => {
        res.status(200).json({
          message: "success add article",
          data: data
        });
      });
    }
  });
};

// update article
exports.update = (req, res) => {
  // get data article_id from index
  let article_id = req.params.id;
  Articles.findOne({
    // check user id and author id
    // *data req.user_id from from middleware
    where: { id: article_id, author_id: req.user_id }
  }).then(response => {
    if (response) {
      let request = {
        title: req.body.title,
        category_id: req.body.category,
        content: req.body.content,
        image: req.body.img,
        author_id: req.user_id
      };
      Articles.update(request, {
        where: { id: article_id }
      }).then(() => {
        Articles.findOne({
          attributes: [ "id", "title", "content", "image", "createdAt", "updatedAt"],
          include: [
            {
              // get data id and name from table categories
              model: Categories,
              as: "categories",
              attributes: ["id", "name"]
            },
            {
              // get data id and fullname from table users
              model: Users,
              as: "users",
              attributes: ["id", "fullname"]
            }
          ],
          where: { id: article_id }
        }).then(response => {
          res.send(response);
        });
      });
    } else {
      // if user id != author id
      res.send({ message: "you are forbidden to update this article, because not your article" });
    }
  });
};

// delete article
exports.delete = (req, res) => {
  // get data article_id from index
  let article_id = req.params.id;
  Articles.findOne({
    // check user id and author id
    // *data req.user_id from from middleware
    where: { id: article_id, author_id: req.user_id }
  }).then(response => {
    if (response) {
      Articles.destroy(request, {
        where: { id: article_id }
      }).then(data => {res.send({ message: "data has been deleted successfully", data});});
    } else {
      // if user id != author id
      res.send({ message: "you are forbidden to delete this article, because not your article" });
    }
  });
};