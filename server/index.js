import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import env from "dotenv"
import jwt from "jsonwebtoken"
import { verifyUser, createNewUser, addProductToDB, getProducts, getProductInfo } from "./services/dbQueries.js";
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

app.post("/api/product/add", async (req, res) => {
  console.log(req.body);
  const product = await genProductUrls(req.body);
  const img_urls = await addProductToDB(product);
  console.log("Sending image urls");
  res.json({img_urls: img_urls});
});

app.post("/api/products", async (req, res) => {
  const product = req.body;
  const products = await getProducts(product.type);
  console.log(products)
  res.json(products);
})

app.post("/api/product", async (req, res) => {
  console.log(req.body.id);
  const product = await getProductInfo(req.body.id);
  console.log(product)
  res.json(product);
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
