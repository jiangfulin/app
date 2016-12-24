var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
//设置模板引擎 ejs
var users=[];
app.set('view engine','ejs');
app.set('views',path.resolve('views'));
//可以指定多个静态文件根目录
//app.use(express.static(path.join(__dirname,'public')));
//app.use(express.static(path.resolve('../node_modules')));
app.get('/signup',function(req,res){
    res.render('signup',{title:'注册'});
});
app.post('/signup',function (req,res){
    users.push(req.body);

    res.redirect('/signin');
});
app.get('/signin',function (req,res){
    res.render('signin.ejs',{title:'登入'});
});



app.post('/signin',function (req,res){
    console.log(users);

    console.log(1)
    var user=req.body;
    var userl=users.find(function (item){

        return item.name==user.name &&item.password==user.password;

    });
    if(userl){
        res.redirect('/welcome');
    }else{

        res.redirect('/signin');
    }
});
app.get('/welcome',function (req,res){
    res.render('welcome.ejs',{title:'welcome'});
});




app.listen(8080);