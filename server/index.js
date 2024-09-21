import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt"
import cors from "cors"
import env from "dotenv"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import { S3Client, GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { verifyUser, createNewUser } from "./services/dbQueries.js";

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

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.BUCKET_REGION,
});

const bucketName = process.env.BUCKET_NAME;


db.connect();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

async function getPresignedObjectUrl(product, file) {
  const params = {
    Bucket: bucketName,
    Key: `${product}/${file}`,
    // ContentType: 'image/jpeg'
  };

  const url = await getSignedUrl(s3, new PutObjectCommand(params));
  return url;
}

async function getImgUrls(img_count, product_id) {
  let urls = []
  for(let i = 0; i < img_count; i++) {
    const url = await getPresignedObjectUrl(product_id, `image-${i}`);
    urls.push(url);
  }
  return urls;
}

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
  const product_id = '54895986894';
  const img_count = req.body.no_of_images;

  const img_urls = await getImgUrls(img_count, product_id);
  res.json({img_urls: img_urls});
});

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
