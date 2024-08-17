import express from "express";

const app = express();
const port = 3000;

let username = undefined;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.send("Login page");
});

app.post("/login", (req, res) => {
  res.send("Login submitted");
});

app.get("/posts", (req, res) => {
  res.send("Posts page");
});

app.get("/create", (req, res) => {
  res.send("Create page");
});

app.get("/posts/:id", (req, res) => {
  res.send(`Post #${req.params.id}`);
});

app.put("/posts/:id/edit", (req, res) => {
  res.send(`Post #${req.params.id} edit page`);
});

app.post("/posts/:id", (req, res) => {
  res.send(`Post #${req.params.id} has been edited`);
});

app.get("/posts/:id/delete", (req, res) => {
  res.send(`Do you want to delete post #${req.params.id}?`);
});

app.post("/posts/:id/delete", (req, res) => {
  alert("Post deleted");
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Server open on port ${port}`);
});
