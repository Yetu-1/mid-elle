import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import env from "dotenv"
import jwt from "jsonwebtoken"
import { verifyUser, createNewUser, addProductToDB, getProducts, getProductInfo, addItemToCart, fetchCart, removeProductsFromCart, addOrderToTable } from "./services/dbQueries.js";
import { genProductUrls } from "./services/cloudStorage.js";

const app = express();
const port = 3000;
env.config();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("hello");
});

app.get("/api/url", async (req, res) => {
  const url = await getPresignedObjectUrl('14895986893', 'product-3.jpg');
  res.send(url);
});

app.get("/api/cart/fetch", authenticate, async (req, res) => {
  const cart = await fetchCart(req.user.user_id); //returns cart count
  res.json(cart);
})

app.post("/api/product/add", authenticate, async (req, res) => {
  const product = await genProductUrls(req.body);
  const img_urls = await addProductToDB(product);
  console.log("Sending image urls");
  res.json({img_urls: img_urls});
});

app.post("/api/orders/add", authenticate, async (req, res) => {
  // console.log(req.body);
  // remove products from cart
  let response = await removeProductsFromCart(req.body.products, req.body.user_id);
  console.log(response);
  response = await addOrderToTable(req.body);
  console.log(response);
  res.sendStatus(200);
});

app.post("/api/products", async (req, res) => {
  const product = req.body;
  const products = await getProducts(product.type);
  // console.log(products)
  res.json(products);
})

app.post("/api/product", async (req, res) => {
  // console.log(req.body.id);
  const product = await getProductInfo(req.body.id);
  // console.log(product)
  res.json(product);
})

app.post("/api/cart/add", authenticate, async (req, res) => {
  const product = req.body;
  // console.log(product);
  const cart_count = await addItemToCart(req.user.user_id, product); //returns cart count
  res.json(cart_count);
})

app.post("/register", async (req, res) => {
  const response = await createNewUser(req.body);
  res.send(response);
});

app.post("/login", async (req, res) => {
  const response = await verifyUser(req.body);
  console.log(response);
  res.send(response);
});

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    // Bearer Token
    const token = authHeader && authHeader.split(' ')[1]; // this makes sure if authHeader is undefined, this will safely return undefined
    if(token == 'null') {
      return res.send("Unauthorized request");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.send("Invalid token");
        req.user = user;
        next();
    })
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
