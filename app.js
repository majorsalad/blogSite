
//setting up packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const port = 3000;

const defaultContent = "Default blog content. This is the default blog that appears on the home page at all times to fill in the otherwise unused space. This blog will always remain upon refresh and upon uploading new data. The remaining of the text will be Lorem Ipsum Dolor. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

//initializing express
const app = express();

//Initialize ejs
app.set('view engine', 'ejs');

//setup bodyParser and access to static files
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost:27017/blogDB",{ useUnifiedTopology: true, useNewUrlParser: true });

const postSchema = new mongoose.Schema ({
    title: String,
    content: String
});

const userSchema = new mongoose.Schema ({
    username: String,
    password: String
});

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req,res){
    Post.find({}, function(err, posts){
      res.render("homepage", {
        startingContent: defaultContent,
        posts: posts
        });
    });
});


app.route("/users")
.get(function(req,res){
    User.find({}, function(err, posts){
      res.json();
    });
})
.post(function(req,res){
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
});

app.route("/users/:user_id")
.get(function(req,res){
    const userID = req.params.user_id;
    User.find({_id: userID}, function(err, posts){
      res.json();
    });
})
.put(function(req,res){
    const userID = req.params.user_id;
    User.update(
      {_id: userID},
      {username: req.body.username, password: req.body.password},
      {overwrite: true},
      function(err){
        if(!err){
          console.log("Successfully updated entry.");
          res.json();
        } else {
          console.log(err);
        }
      }
    );
})
.delete(function(req,res){
    const userID = req.params.user_id;
    User.deleteOne(
      {_id: userID},
      function(err){
        if (!err){
          res.json();
        } else {
          res.send(err);
        }
      }
    );
});

app.route("/create").
  get(function(req,res){
    res.render("add_post");
  })
  .post(function(req,res){
      const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
      });


      post.save(function(err){
        if (!err){
            res.redirect("/");
        }
      });
  });

  app.route("/posts/:postId")
  .get(function(req,res){
      const postId =  req.params.postId;

      Post.findOne({_id: postId}, function(err, post){

         res.render("post", {

           title: post.title,

           content: post.content

         });

     });
  });



app.get("/list", function(req,res){
    Post.find({}, function(err, posts){
      res.render("list_posts", {
        posts: posts
        });
    });
});

app.get("/edit/:postId", function(req,res){
    global.editedArticleId = req.params.postId;
    console.log(editedArticleId);
    res.render("update_post", {editedPostId: editedArticleId});
});

app.post("/edit", function(req,res){

  console.log(editedArticleId);

  Post.update(
    {_id: editedArticleId},
    {title: req.body.postTitle, content: req.body.postBody},
    {overwrite: true},
    function(err){
      if(!err){
        console.log("Successfully updated entry.");
        res.redirect("/");
      } else {
        console.log(err);
      }
    }
  );

});

app.get("/delete/:postId", function(req,res){

    Post.deleteOne(
      {_id: req.params.postId},
      function(err){
        if (!err){
          res.redirect("/");
        } else {
          res.send(err);
        }
      }
    );

})


app.listen(port, function(){
    console.log("Port started on port " + port);
})
