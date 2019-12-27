require('express-group-routes');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get("/",(req, res)=>{
    res.send("<h1>qwertuip asdfghjl; zxcvbnm,./</h1>");
});

const AuthController = require("./controllers/auth");
const CategoriesController = require('./controllers/categories')
const ArticlesController = require('./controllers/articles')
const UsersController = require('./controllers/users')
const CommentController = require('./controllers/comments')
const { authenticated, authorized } = require('./middleware')

app.group("/api/v1", router => {
    //login
    router.post("/login", AuthController.login);
    router.post("/register", AuthController.register);
    
    //category
    router.get('/categories', CategoriesController.index)
    router.get('/category/:id', CategoriesController.show)
    router.post('/category', CategoriesController.create)
    router.patch('/category/:id', CategoriesController.update)
    router.delete('/category/:id', CategoriesController.delete)
    //--GET Article By Category
    router.get('/category/:id/articles', CategoriesController.articleDetails)
    
    //article
    //--get all articles
    router.get('/articles', ArticlesController.index)
    //--get article by id article
    router.get('/article/:id', ArticlesController.show)
    //--create new article
    router.post('/article', authenticated, ArticlesController.create)
    //--update article
    router.patch('/article/:id', authenticated, ArticlesController.update)
    //--delete article
    router.delete('/article/:id', authenticated, ArticlesController.delete)

    //user
    router.get('/users', UsersController.index)
    router.get('/user/:id', UsersController.show)
    router.post('/user', UsersController.create)
    router.patch('/user/:id', UsersController.update)
    router.delete('/user/:id', UsersController.delete)
    //--get article from id user
    router.get('/user/:id/articles', UsersController.articleByUser)
    
    //comment
    //--add comment
    router.post('/article/:id/comment', authenticated ,CommentController.create);
    //--update comment
    router.patch('/article/:id/comment', authenticated ,CommentController.update);
    //--delete comment
    router.delete('/article/:id/comment', authenticated ,CommentController.delete);
    
    // router.get('/categorydetail/:id', CategoriesController.detail)
    // router.get("/articleDetails/:id", ArticlesController.detail);
    // router.get('/article/:id', ArticlesController.show)
    // router.post('/article', ArticlesController.create)
    // router.patch('/article/:id', ArticlesController.update)
    // router.delete('/article/:id', ArticlesController.delete)
})

app.listen(port, ()=> console.log(`Server is listening port:${port}!`));