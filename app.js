// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var mongoose = require("mongoose");
// let User = require("./models/registe");
// let Image = require("./models/image"); //collection

// const bcrypt = require("bcrypt");
// var jwt = require("jsonwebtoken");
// const multer = require("multer");
// const checkauth = require("./middleware/auth");

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });
// let upload = multer({ storage: storage });
// var app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// const PORT = 3000;

// mongoose.set("useCreateIndex", true);

// ////////////////////////////// mongoose connection  /////////////////////

// mongoose.connect(
//   "mongodb+srv://hanzalaarfat:hanzala94%23%2A@cluster0.bsfy0.mongodb.net/imgur",
//   { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
//   (err) => {
//     if (err) {
//       console.log("Error in connecting mongoose", err);
//       return;
//     }
//     console.log("MongoDB Connected");
//   }
// );

// app.get("/", function (req, res) {
//   //console.log(` cookies value :${req.cookies.jwt}`);
//   console.log(req.userData);
//   res.send("Home Page");
// });

// app.get("/login", (req, res) => {
//   res.render("login", { title: "Login Page" });
// });
// ////////////////////////////////////////// login /////////////////////////
// app.post("/postlogin", checkauth, async (req, res) => {
//   let { email, password } = req.body;
//   let user = await User.find({ email });

//   if (user.length != 0) {
//     // first  decript password from user collecton then user enterd password mactch
//     bcrypt.compare(password, user[0].password, function (err, result) {
//       if (err) {
//         res.send("email or password  worng");
//       }
//       if (result) {
//         // genrate token
//         let token = jwt.sign(
//           {
//             email: user[0].email,
//             id: user[0]._id,
//           },
//           "credentials",
//           {
//             expiresIn: "1h",
//           }
//         );
//         /////////////////////////////  token set on cookies //////
//         res.cookie("jwt", token, {
//           expires: new Date(Date.now() + 1000 * 60 * 15), // would expire after 15 minutes
//           httpOnly: true,
//         });
//         res.json({
//           message: "Token genrated",
//           token: token,
//         });
//       } else {
//         res.send("email or password  worng");
//       }
//     });
//   } else {
//     //not found mail
//     res.send("email or password  worng");
//   }
// });

// // sigup route get form
// app.get("/signup", (req, res) => {
//   res.render("signup", { title: "Signup Page" });
// });
// /////////////////////////post sign up route /////////////////
// app.post("/postsignup", checkauth, async (req, res) => {
//   let { name, email, password } = req.body;

//   bcrypt.hash(password, 10, async function (err, hash) {
//     if (err) {
//       return res.json({ message: err });
//     } else {
//       const user = new User({
//         name,
//         email,
//         password: hash,
//       });
//       console.log("password : ", hash);
//       let userResult = await user
//         .save()
//         .then((doc) => {
//           return res.status(200).send("data sucessfull inserted");
//         })
//         .catch((err) => {
//           res.json(err);
//         });
//     }
//   });
// });
// app.get("/new", checkauth, (req, res) => {
//   res.send("user data input page ");
// });
// //////////////////////////////////////// new post image data   addd ///////////////

// app.post(
//   "/newpost",
//   upload.single("insert_img"),
//   checkauth,
//   async function (req, res) {
//     console.log(req.file);

//     const { img_url, des, comment } = req.body;

//     const imag = new Image({
//       img_url: req.file.originalname,
//       des,
//       comment,
//     });

//     let imageResult = await imag
//       .save()
//       .then((doc) => {
//         return res.status(200).send(" image data sucessfull inserted");
//       })
//       .catch((err) => {
//         res.json(err);
//       });
//   }
// );
// /////////////////////////////////// get all image data  or view //////////////////

// app.get("/getall", checkauth, async function (req, res) {
//   let get_all_img = await Image.find({}, (err, img_data) => {
//     let imag_map = {};
//   });
//   console.log(get_all_img);
//   res.send(get_all_img);
// });
// //////////////////////  get single data ///////////////////////////////////////////
// app.get("/getsingle/:id", checkauth, async (req, res) => {
//   let id = req.params.id;
//   try {
//     let single_data = await Image.findOne({ _id: req.params.id });
//     res.send(single_data);
//   } catch (err) {
//     res.status(500).send(`error message :${err}`);
//   }
// });

// //////////////////////////////////// delet ////////////////////////////////////

// app.get("/delete/:id", checkauth, async (req, res) => {
//   let id = req.params.id;
//   try {
//     let deleted_data = await Image.deleteOne({
//       _id: id,
//     });
//     res.send(deleted_data);
//   } catch (err) {
//     res.status(500).send(`error message :${err}`);
//   }
// });

// ////////////////////////// Edit  or uptate//////////////////////

// //// its throw same error

// app.put("/edit/:id", checkauth, async (req, res) => {
//   let id = req.params.id;
//   try {
//     let updated_data = await Image.findOneAndUpdate(
//       {
//         _id: id,
//       },
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     res.send(updated_data);
//   } catch (err) {
//     res.status(500).send(`error message :${err}`);
//   }
// });
// /////////////////////////// like image    ////////////////////////////////////

// app.post("/onLiked/:id", checkauth, async (req, res) => {
//   let id = req.params.id;
//   console.log(id);
//   try {
//     let likedImage = await Image.findById({ _id: id });
//     likedImage.like = likedImage.like + 1;
//     console.log(likedImage.like);
//     await likedImage.save();
//     res.status(200).send("Image liked by ", likedImage.like);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// /////////////////////// comment /////////////
// app.post("/onComment/:id", async (req, res) => {
//   try {
//     let comment_data = req.body;
//     let id = req.params.id;
//     console.log(comment_data.comment);
//     console.log(id);

//     let commentedImage = await Image.findById({ _id: id });
//     commentedImage.push({ comment: comment_data });
//     // let commentLength = commentedImage.comment.length;
//     // console.log("length", commentLength);
//     // let allcom = commentedImage.comment.push(comment_data);
//     // console.log("all", allcom);
//     // commentedImage.commentCount = commentedImage.commentCount + 1;
//     // commentedImage.comment[commentCount] = comment;
//     await commentedImage.save();
//     res.status(200).send(commentedImage);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.listen(PORT, () => {
//   console.log("App listining at port : ", PORT);
// });
