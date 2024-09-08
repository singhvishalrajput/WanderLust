const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const sessionOptions =  {
        secret: "mysupersecretstring",
        resave: false, 
        saveUninitialized: true,

};

app.use(session(sessionOptions));

app.get("/register", (req, res)=>{
    let {name = 'anonymous' } = req.query;
    req.session.name = name;
    console.log(req.session);
    res.redirect("/hello");
})

app.get("/hello", (req, res)=>{
    res.send(`hello,  ${req.session.name}`);
})





// app.get("/reqcount", (req, res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1
//     }
//     res.send(`You sent a request ${req.session.count} times`)
// })

// app.get("/test", (req, res)=>{
//     res.send("test successful!");
// })










// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res)=>{

//     res.cookie("made-in", "India", {signed : true});
//     res.send("Signed cookie sent.")
// })

// app.get("/verify", (req, res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies", (req, res)=>{
//     res.cookie("greet", "namaste");
//     res.cookie("madeIn", "India");

//     res.send("sent you some cookies!")
// })

// app.get("/greet", (req,res)=>{
//     let {name = "Anonymous"} = req.cookies;
    
//     res.send(`Hi, ${name}`);

// })

// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hi! I am root!");
// })

// app.use("/users", users);

// app.use("/posts", posts);





app.listen(3000, ()=>{
    console.log("Server is listening to 3000");
})

