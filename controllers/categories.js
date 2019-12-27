const Model = require('../models');
const Articles = Model.articles;
const Categories = Model.categories;

exports.index = (req, res) => {
    Categories.findAll().then(data => res.send(data));
};

exports.show = (req, res) => {
  const { id } = req.params;

  Categories.findOne({
    where: {
      id
    }
  }).then(data => res.send(data));
};

exports.create = (req, res) => {
    Categories.create(req.body).then(data =>
    res.send({
      message: "Success create",
      data
    })
  );
};

exports.update = (req, res) => {
  const { id } = req.params;

  Categories.update(req.body, {
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

  Categories.destroy({
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

//get article details by id category
exports.articleDetails = (req, res) => {
  //get id category
  const { id } = req.params;
  //get data from table categories
  Categories.findOne({
    attributes: {
      exclude: [ 'is_published', 'is_archived', 'createdAt', 'updatedAt' ]
    },
    include: [
      {
        //get data from table article
        model: Articles,
        as: 'articles',
        attributes: {
          exclude: [ 'is_published', 'category_id', 'category_name' ]
        }
      }
    ],
    //check where id category == id article
    where: {
      id: id
    }
  }).then((data) => res.send(data));
};

// exports.detail = (req, res) => {
//   const { id } = req.params;
//   Articles.findOne({
    
      
//           model: Categories,
//           where: {
//             id: id
//           }
      
    
//   }).then(data => res.send(data));
// };

// exports.showArticlesByCategory = (req, res) => {
//   const { id } = req.params;
//   Articles.findAll({
//     attributes: {
//       exclude: [ 'author_id', 'category_id' ]
//     },
//     include: {
//       where: {
//         id
//       },
//       model: Categories,
//       as: 'categories',
//       attributes: {
//         exclude: [ 'createdAt', 'updatedAt' ]
//       }
//     }
//   }).then((data) => res.send(data));
// };

// exports.ArticleByCategory = (req, res) => {
//     Articles.findAll({
//       attributes: {
//         exclude: [ 'updatedAt' ]
//       },
//       include: [
//         {
//           model: Categories,
//           as: 'categories',
//           attributes: {
//             exclude: [ 'createdAt', 'updatedAt' ]
//           }
//         }
//       ],
//       order: [ [ 'createdAt', 'DESC' ] ],
//       limit: 10
//     }).then((data) => res.send(data));
//   };