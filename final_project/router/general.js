const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a user
public_users.post("/register", (req, res) => {
    // Gather credentials from request body.
    const username = req.body.username;
    const password = req.body.password;
  
    // First, check if there exists a value for the username and password.
    if (username.length > 0 && password.length > 0) {
      // Check if the username already exists.
      if (isValid(username)) {
        users.push({ username: username, password: password });
        return res
          .status(200)
          .json({ message: "User successfully registered!" });
      } else {
        return res.status(406).json({ message: "Unable to register user: User already exists!" });
      }
    }
    return res.status(406).json({ message: "Unable to register user: No username and/or password provided." });
  });

// Get the book list available in the shop
//Task 1
public_users.get("/",(req,res)=>{
    res.send(JSON.stringify(books,null,4))
});
// Task 10 
// Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios.
public_users.get("/async", function (req, res) {
    const getBooks = new Promise(() => {
      res.send(JSON.stringify({ books }));
    });
  
    getBooks.then(() => console.log("Promise is now resolved."))
  });


// Get book details based on ISBN
// task 2
public_users.get('/isbn/:isbn',function (req, res) {
    const ISBN = req.params.isbn;
  
    res.send(books[ISBN])
 });

// Task 11
// Add the code for getting the book details based on ISBN, using Promise callbacks or async-await with Axios.

public_users.get("/async/isbn/:isbn", function (req, res) {
  // Promise to get the book.
  const getBook = new Promise(() => {
    const bookISBN = req.params.isbn;
    res.send(books[bookISBN]);
  });

  getBook.then(() => console.log("Promise is now resolved."))
});

// Get book details based on author
//Task 3
public_users.get('/author/:author',function (req, res) {
    let ans = []
    for(const [key, values] of Object.entries(books)){
        const book = Object.entries(values);
        for(let i = 0; i < book.length ; i++){
            if(book[i][0] == 'author' && book[i][1] == req.params.author){
                ans.push(books[key]);
            }
        }
    }
    if(ans.length == 0){
        return res.status(300).json({message: "Author not found. Search is case sensitive please Check and try again"});
    }
    res.send(ans);
});

// Task 12
// Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.

public_users.get("/async/author/:author", function (req, res) {
    const getAuthorsBooks = new Promise(() => {
      const author = req.params.author;
    
      const allBooksByAuthor = Object.entries(books);
      const finalBooks = [];
    
      for (const [key, value] of allBooksByAuthor) {
        if (value.author === author) {
          finalBooks.push(value);
        }
      }
      res.send(finalBooks);
    })
  
    getAuthorsBooks.then(() => console.log("Promise is now resolved."))
  });
  

// Get all books based on title
// Task 4
public_users.get('/title/:title',function (req, res) {
    let ans = []
    for(const [key, values] of Object.entries(books)){
        const book = Object.entries(values);
        for(let i = 0; i < book.length ; i++){
            if(book[i][0] == 'title' && book[i][1] == req.params.title){
                ans.push(books[key]);
            }
        }
    }
    if(ans.length == 0){
        return res.status(300).json({message: "Title not found.  Search is case sensitive please Check and try again"});
    }
    res.send(ans);
});

  // Task 13
  // Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
  public_users.get("/async/title/:title", function (req, res) {
    const getBookTitles = new Promise(() => {
      const title = req.params.title;
    
      const allBooksByTitle = Object.entries(books);
      const finalBooks = [];
    
      for (const [key, value] of allBooksByTitle) {
        if (value.title === title) {
          finalBooks.push(value);
        }
      }
      res.send(finalBooks);
    });
  
    getBookTitles.then(() => console.log("Promise is now resolved."))
  });
  

//  Get book review
// Task 5
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  res.send(books[ISBN].reviews)
});


  


 
  
 

module.exports.general = public_users;
