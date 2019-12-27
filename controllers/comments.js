const Model = require("../models")
const Comments = Model.comments;
const Articles = Model.articles;

// create comment
exports.create = (req, res) => {
    Articles.findOne({
      where: {
        id: req.body.article_id
      }
    }).then(article => {
      Comments.create({
        article_id: req.body.article_id,
        user_id: req.user_id,
        comment: req.body.comment
      }).then(data =>
        res.status(200).json({
          id: data.id,
          comment: data.comment,
          article: {
            id: article.id,
            title: article.title
          }
        })
      );
    });
  };

//update comment
exports.update = (req, res) => {
    Comments.findOne({
      where: {
        id: req.params.id
      }
    }).then(comment => {
      if (comment.user_id != req.user_id) {
        return res.status(403).json({
          message: "you are forbidden to update this comment"
        });
      } else {
        Comments.update(
          {
            article_id: comment.article_id,
            user_id: req.user_id,
            comment: req.body.comment
          },
          {
            where: {
              id: req.params.id
            }
          }
        ).then(data => {
          Articles.findOne({
            where: {
                id: req.params.id
            }
          }).then(article => {
            res.status(200).json({
              id: comment.id,
              data: req.body.comment,
              article: {
                id: article.id,
                title: article.title
              }
            });
          });
        });
      }
    });
  };
  
//delete comment
exports.delete = (req, res) => {
  Comments.findOne({
    where: {
        id: req.params.id
    }
  }).then(respon => {
    if (respon) {
      Comments.destroy({
        where: { id: req.params.id }
      }).then(() => {
        res.send({
          message: "success delete",
          id: respon.id
        });
      });
    } else {
      res.send({ message: "Not your Comment" });
    }
  });
};

//show comment where id article
exports.showComment = (req, res) => {
  Comments.findAll({
    where: { articleId: req.params.id },
    attributes: ["id", "comment", "createdAt", "updatedAt"],
    include: [
      {
        model: Articles,
        as: "articles",
        attributes: ["id", "title"]
      }
    ]
  }).then(data => res.send(data));
};