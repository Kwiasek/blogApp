import express from "express";
import { v4 as uuidv4 } from "uuid";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

let username = undefined;
let posts = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.get("/", (req, res) => {
  res.render("index.ejs", { username });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { username });
});

app.post("/login", (req, res) => {
  username = req.body.username;
  res.redirect("/");
});

app.get("/posts", (req, res) => {
  res.render("posts.ejs", { posts, username });
});

app.get("/create", (req, res) => {
  const id = uuidv4();
  const date = new Date().toDateString();
  if (!username) {
    res.redirect("/login");
  } else {
    res.render("create.ejs", { username, id, date });
  }
});

app.post("/create", (req, res) => {
  const { id, author, date, title, desc, content } = req.body;
  const post = { id, author, title, desc, content, date };
  posts.unshift(post);
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((elem) => elem.id === req.params.id);
  if (!post) {
    res.redirect("/posts");
  }
  res.render("post.ejs", { post, username });
});

app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((elem) => elem.id === req.params.id);
  if (!post || post.author !== username) res.redirect("/posts");
  res.render("edit.ejs", { post, username });
});

app.post("/posts/:id/edit", (req, res) => {
  console.log(req.body);
  const post = posts.find((post) => post.id === req.params.id);
  if (post) {
    post.title = req.body.title;
    post.desc = req.body.desc;
    post.content = req.body.content;
  }
  res.redirect(`/posts/${req.params.id}`);
});

app.get("/posts/:id/delete", (req, res) => {
  res.send(`Do you want to delete post #${req.params.id}?`);
});

app.post("/posts/:id/delete", (req, res) => {
  posts = posts.filter((post) => post.id !== req.params.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Server open on port ${port}`);
});
