import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt"
import cors from "cors"
import env from "dotenv"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';

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
      // create user id
      const user_id = uuidv4();
      // console.log(user_id);
      // create hash the input password 
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if(err) {
            res.send("Error hashing password: ", err);
        }else {
            const result = await db.query(
            "INSERT INTO users (email, user_id, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING user_id",
            [email, user_id, firstname, lastname, hash]
            );
            // get user id for jwt creation
            const response = result.rows[0] // in the form -> { user_id: 94288747-bc70-4c28-9067-4f4519366145 }
            // Create jsonwebtoken
            const refresh_token = jwt.sign(response, process.env.REFRESH_TOKEN_SECRET);
            try{
                // insert token into user table
                await db.query(
                    "UPDATE users SET refresh_token = $1 WHERE user_id = $2",[refresh_token, response.user_id]
                );
                // insert token into valid tokens table
                await db.query(
                  "INSERT INTO tokens (token) VALUES ($1)",
                  [refresh_token]
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

      // Generate access token from refresh token
      let access_token = await generateAccessToken(user.refresh_token)
      if(access_token == "No Token" || access_token == "Error fetching jwt" || access_token == "Token invalid") {
        res.send("Token invalid");
      }
      const storedHashedPassword = user.password;
      // compare input login password with stored hash
      bcrypt.compare(loginPassword, storedHashedPassword, async (err, result) => {
        if(err) {
          console.log("Error comparing passwords: ", err);
        }else {
          if(result) {
            try {
                const response = await db.query("SELECT * FROM users WHERE email = $1", [
                    email,
                ]);
                const user = response.rows[0];
                res.send({token: access_token, firstname: user.firstname, lastname: user.lastname});
            }catch{
                res.send("Error fetching jwt");
            }
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

async function generateAccessToken(refresh_token) {
  let access_token = "";
  if(refresh_token == null) {return "No Token"}
  // console.log(refresh_token);
  // Verify validity of refresh_token (i.e if it is still in the valid_tokens table in the database)
  try {
      const response = await db.query("SELECT * FROM tokens WHERE token = $1", [
          refresh_token,
      ]);
      if(response.rows.length > 0) {
        // verify token
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if(err) return "Token invalid";
          // Generate access token that lasts for 24hrs
          access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h'});
        })
        return access_token;
      }
  }catch{
      return "Error fetching jwt";
  }
}

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    // Bearer Token
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
