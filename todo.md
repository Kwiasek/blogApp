## blogApp todo
1. Make a corresponding paths for 
	1.1   "/" Home page
	1.2  "/login" pseudo login
	1.3  "/posts" Posts where all posts are listed
	1.4  "/create" for creating posts
	1.5  "/posts/{post-id}" dynamic route for posts with given id
	1.6   "/posts/{post-id}/edit" editing posts when username == author name
	1.7   "/posts/{post-id}/delete" page to confirm deletion of given post, only when author name == username
2. Make a middleware to save posts to session-storage
3. Create index.ejs, views/header.ejs, views/footer.ejs, create.ejs(use npm package like tinyMCE, CKEditor, or Draft.js), delete.ejs
4. Style app using bootstrap to easily make it responsive