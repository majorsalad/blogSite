# blogSite
A customizable blog site capable of creating, viewing, editing and deleting blog-posts using NodeJS, EJS, MongoDB, and a RESTful user API. 

# How it works
**Must have the required node packages installed**
**Must have mongodb running in the terminal**
- After running the app.js using the node command, you must open it up in the browser via (http://localhost:3000/) 


Uses:
1) Clicking on the Style switcher changes the theme on each page (there are a total of 3 themes as of right now)
2) Adding **/create** to the path: **http://localhost:3000/** will take you to the create blog-post page. You can enter in a title and a body of text to go with it. Upon clicking the "Publish" button, you will post your blog-post to the front page. 
3) From the front page, you can click on "View More" to read a specific blog post.
4) Adding **/list** to the path: **http://localhost:3000/** will take you to the blog-post list page. This is where all blog-post entries are listed using the database. From here you have 3 possible interactions with each individual blog-post. You may **View, Edit, or Delete** each post from this page. 


**> The font-resizer link has no action as of yet**
**> The login and admin functionalities have not yet been integrated. While there is an API for creating and managing users, that has not yet been integrated with the website.



# What I learned
- The complications behind integrating systems and trying to mesh to working systems together to cooperate with one another
- Practical Web Design and User usability practices
- Handy tips and tricks with EJS templating

