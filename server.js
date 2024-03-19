const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const port = process.env.PORT || 3001;
const app = express();
const dbConfig = require("./app/config/db.config");
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
      name: "bezkoder-session",
      keys: ["COOKIE_SECRET"], // should use as secret environment variable
      httpOnly: true
    })
  );



  const db = require("./app/models");
  const Role = db.role;


  db.mongoose
  .connect(`mongodb+srv://rpineda:vmZWbyG1oaZ29Lc3@cluster0.tya8ibb.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


app.get("/",(req,res)=>{
    res.send("Hola");
})


  // set port, listen for requests
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
          new Role({
            name: "user"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
    
            console.log("added 'user' to roles collection");
          });
    
          new Role({
            name: "moderator"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
    
            console.log("added 'moderator' to roles collection");
          });
    
          new Role({
            name: "admin"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
    
            console.log("added 'admin' to roles collection");
          });
        }
      });
}