import env from "dotenv"
import pg from "pg"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

env.config();
const saltRounds = 10;

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

async function createNewUser(user) {

    console.log(user);

    const email = user.email;
    const firstname = user.firstname;
    const lastname = user.lastname;
    const password = user.password;

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);
    
        if (checkResult.rows.length > 0) {
            // if Email already exists
            return ("Email exists");
        } else {
          // create user id
          const user_id = uuidv4();
          // console.log(user_id);

          // create hash the input password 
          try {
            const hash = await bcrypt.hash(password, saltRounds);

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
                return ("Error saving jwt!")
            }
            return (200)
          }catch {
            console.log(err)
            return ("Error hashing password: ");
          }
        }
    } catch (err) {
        return (400);
    }
}

async function verifyUser(profile) {
    const email = profile.email;
    const loginPassword = profile.password;
    
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
    
          // Generate access token from refresh token
          let access_token = await generateAccessToken(user.refresh_token)
          if(access_token == "No Token" || access_token == "Error fetching jwt" || access_token == "Token invalid") {
            return "Token invalid";
          }
          const storedHashedPassword = user.password;
          // compare input login password with stored hash
          try {
            const result = await bcrypt.compare(loginPassword, storedHashedPassword);

            if(result) {
                try {
                    const cart_count = await getCartCount(user.user_id);

                    return {token: access_token, firstname: user.firstname, lastname: user.lastname, cart_count: cart_count};
                }catch{
                    return "Error fetching jwt";
                }
              }else {
                return "Incorrect password"; // incorrect password
              }
          }catch(err) {
            console.log("Error comparing passwords: ", err);
          }
        } else {
          return ("User not found"); // user not found
        }
    } catch (err) {
        console.log(err);
        return ("Error")
    }
}

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

async function getCartCount(user_id) {
    try {
        const response = await db.query("SELECT * FROM carts WHERE user_id = $1", [user_id]);
        return (response.rows.length);
    }catch(err) {
        console.log(err);
        return "Error getting cart count"
    }
}

async function addProductToDB(product) {
    try{
        // add product to database
        await db.query(
            "INSERT INTO products (product_id, name, type, brand, description, price, discount, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [product.id, product.name, product.type, product.brand, product.description, product.price, product.discount, product.img_urls]
        );
        return product.img_urls;
    }catch (err){
        console.log(err);
        return "Error Adding product"
    }
}

async function getProducts(type) {
    try{
        // get products of specified type(e.g necklace) from database
        const response = await db.query("SELECT * FROM products WHERE type = $1", [
            type,
        ]);
        if(response.rows.length > 0) {
            return response.rows;
        }else {
            return "No Products"
        }
    }catch (err){
        console.log(err);
        return "Error Adding product"
    }
}

async function getProductInfo(id) {
    try{
        // get products of specified type(e.g necklace) from database
        const response = await db.query("SELECT * FROM products WHERE product_id = $1", [
            id,
        ]);
        if(response.rows.length > 0) {
            return response.rows[0];
        }else {
            return "No Such Product"
        }
    }catch (err){
        console.log(err);
        return "Error Adding product"
    }
}

async function addItemToCart(user_id, product) {
    try{
        // add product to database
        await db.query(
            "INSERT INTO carts (user_id, product_id, qty) VALUES ($1, $2, $3)",
            [user_id, product.product_id, product.qty]
        );
        return "Item Successfully Added to Cart"
    }catch (err){
        console.log(err);
        return "Error Adding product"
    }   
}

export { verifyUser, createNewUser, addProductToDB, getProducts, getProductInfo, addItemToCart };