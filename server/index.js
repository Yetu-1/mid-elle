import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt"
import cors from "cors"
import env from "dotenv"
import jwt from "jsonwebtoken"

const app = express();
const port = 3000;
const saltRounds = 10;

env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});


db.connect();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("hello");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
        // if Email already exists
        res.send("Email exists");
    } else {
      // create hash the input password 
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if(err) {
            res.send("Error hashing password: ", err);
        }else {
            const result = await db.query(
            "INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING id",
            [email, firstname, lastname, hash]
            );
            // get user id for jwt creation
            const response = result.rows[0] // in the form -> { id: 3 }
            // Create jsonwebtoken
            const jwt_token = jwt.sign(response, process.env.ACCESS_TOKEN_SECRET);
            try{
                const rep = await db.query(
                    "UPDATE users SET jwt = $1 WHERE id = $2",[jwt_token, response.id]
                );
            }catch (err){
                console.log(err);
                res.send("Error saving jwt!")
            }

          res.sendStatus(200);
        }
      });
    }
  } catch (err) {
    res.sendStatus(400);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const loginPassword = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      // compare input login password with stored hash
      bcrypt.compare(loginPassword, storedHashedPassword, (err, result) => {
        if(err) {
          console.log("Error comparing passwords: ", err);
        }else {
          if(result) {
            res.send(200);
          }else {
            res.send("Incorrect password"); // incorrect password
          }
        }
      });
    } else {
      res.send("User not found"); // user not found
    }
  } catch (err) {
    console.log(err);
    res.send("Error")
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
