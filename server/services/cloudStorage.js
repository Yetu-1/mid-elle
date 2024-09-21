import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import env from "dotenv"
import { v4 as uuidv4 } from 'uuid';

env.config();

const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.BUCKET_REGION,
});
  
const bucketName = process.env.BUCKET_NAME;

async function getPresignedObjectUrl(product, file) {
    const params = {
        Bucket: bucketName,
        Key: `${product}/${file}`, // create "folder" for the product
        // ContentType: 'image/jpeg'
    };
    const url = await getSignedUrl(s3, new PutObjectCommand(params));
    return url;
}
  
async function getImgUrls(img_count, product_id) {
    let urls = []
    // generate urls based on the number of images
    for(let i = 0; i < img_count; i++) {
        const url = await getPresignedObjectUrl(product_id, `image-${i}`);
        urls.push(url);
    }
    return urls;
}

async function genProductUrls(product) {
    // generate product uuid
    const product_id = uuidv4();
    try{
        const urls = await getImgUrls(product.no_of_images, product_id)

        const product_details = {
            id: product_id,
            name: product.name,
            type: product.type,
            brand: product.brand,
            description: product.description,
            price: product.price,
            img_urls: urls,
        }
        return product_details;
    }catch (err){
        console.log(err);
        return "Error generating presigned urls"
    }
}

export {genProductUrls}