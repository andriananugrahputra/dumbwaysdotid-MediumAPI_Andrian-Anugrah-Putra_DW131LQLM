const jwt = require("jsonwebtoken");
const Users = require("../models").users;
const SecretKey = "thisismysecretkey"

//login
exports.login = (req, res) => {
  const { username, password } = req.body;
  Users.findOne({
    //check username and password from database
    where: {
      username: username,
      password: password
    },
    //select data from table users exclude createAt, updateAt, is_published, is_archived, is_active and password 
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "is_published",
        "is_archived",
        "is_active",
        "password"
      ]
    }
  })
    .then(user => {
      if (user) {
        //if username and password valid
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username
          },
          SecretKey
        );
        res.status(200).json({
          username: user.username,
          token: token
        });
      } else {
        //if username and password invalid
        res.send({
          message: "invalid login!"
        });
      }
    })
    .catch(err => {
      res.send(err);
    });
};

//register
exports.register = (req, res) => {
  const token = jwt.sign({ username: req.body.username }, SecretKey);
  Users.create(req.body).then(data =>
    res.status(200).json({
      username: data.username,
      token: token
    })
  );
};