import { FormEvent, useState } from "react";
import axios from 'axios';
import FormData from "form-data";
import "./Account.css"
import "./AddProduct.css"

const exampleDescription = "Example: Stainless Steel Smooth Double Ball Beads Rings For Woman Open Gold Color Geometric Wedding Couple Rings Aesthetic Jewelry Gift.";
export function AddProductPage() {
    const [images, setImages] = useState([]);

    const [img1, setImg1] = useState([]);
    const [img2, setImg2] = useState([]);
    const [img3, setImg3] = useState([]);
    const [img4, setImg4] = useState([]);
    
    const [isMultiple, setIsMultiple] = useState(false);

    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("ring");
    const [brandName, setBrandName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    async function handleAddProduct(e: FormEvent) {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const payload = {
            name: productName,
            type: productType,
            brand: brandName,
            description: description,
            price: price,
            no_of_images: images.length,
        }
        try {
            // send a post request to the server with a payload that includes product details
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/product/add`, payload, config);
            console.log(response.data);

            const urls = response.data.img_urls;
            await uploadImages(urls);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // if(isMultiple) {
        //     console.log(images.length);
        // }
    }

    async function uploadImages(urls: any) {
        console.log("uploading Images");
        for(let i = 0; i < urls.length; i++) {
            try {
                const file = images[i];
                const { type, name } = file;
                // 2. Upload at URL
                await axios.put(urls[i], file, {
                    headers: { "Content-Type": type },
                });
            }catch(error) {
                console.error('Error uploading image:', error);
            }
        }
    }

    async function handleImagesUpload(e : any) {
        if(e.target.id == "mul-images") {
            if (e.target.files && e.target.files[0]) {
                setImages(e.target.files);
                setIsMultiple(true);
            }
        }else if(e.target.id == "img-1"){
            if (e.target.files[0]) {
                setImg1(e.target.files);

                console.log("in here");
                try {
                    // send a post request to the server with a payload that includes firstname, lastname, email and password
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/url`);
                    console.log(response.data);
                      const file = e.target.files[0];
                      const { type, name } = file;
            
                      console.log("in here");
                      console.log(type)
                      // 2. Upload at URL
                      const resp = await axios.put(response.data, file, {
                        headers: { "Content-Type": type },});
                    console.log(resp);
            }catch(error) {
                console.error('Error uploading image:', error);
            }}
        }else if(e.target.id == "img-2"){
            if (e.target.files[0]) {
                setImg2(e.target.files);
            }
        }else if(e.target.id == "img-3"){
            if (e.target.files[0]) {
                setImg3(e.target.files);
            }
        }else if(e.target.id == "img-4"){
            if (e.target.files[0]) {
                setImg4(e.target.files);
            }
        }
    }
    
    return (
        <div className="form-container">
            <h1>Add New Product</h1>
            <form id="add-product-form" onSubmit={handleAddProduct}>
                <div className="form-group">
                    <p className="input-label">Product Name</p>
                    <input className="input-field" placeholder="Example: Stainless Steel Smooth Double Ball Beads Rings" required onChange={(e) => {setProductName(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <p className="input-label">Product Type</p>
                    <select className="select-box" onChange={(e) => {setProductType(e.target.value)}}>
                        <option value="ring">RING</option>
                        <option value="necklace">NECKLACE</option>
                        <option value="bracelet">BRACELET</option>
                        <option value="earrings">EARRING</option>
                        <option value="giftbox">GIFTBOX</option>
                    </select>
                </div>
                <div className="form-group">
                    <p className="input-label">Brand Name</p>
                    <input className="input-field" placeholder="Example: Zara" required onChange={(e) => {setBrandName(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <p className="input-label">Price</p>
                    <input className="input-field" placeholder="Example: 10000" type="number" required onChange={(e) => {setPrice(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <p className="input-label">Product Description</p>
                    <textarea className="input-field description" placeholder={exampleDescription} required onChange={(e) => {setDescription(e.target.value)}}/>
                </div>

                <div>
                    <div className="form-group">
                        <p className="input-label">Images</p>
                        <div className="images-card">
                        <p><input type="file" className="input-file" id="mul-images"  onChange={handleImagesUpload} multiple/>
                                <label style={{color: "blue"}} htmlFor="mul-images">Upload multiple files at once </label>
                                or Upload 1 or more files at a time below. Maximum of 4 images is allowed. Upload the main image first.</p>

                            <div className="images" style={{marginTop: "20px"}}>
                                <input type="file" className="input-file" id="img-1" onChange={handleImagesUpload}/>
                                <label className="upload-image" htmlFor="img-1">
                                    <img src={images[0]? URL.createObjectURL(images[0]): (img1[0]? URL.createObjectURL(img1[0]): "icon-camera.svg" )} className="upload-image"/>
                                </label>

                                <input type="file" className="input-file" id="img-2" onChange={handleImagesUpload}/>
                                <label className="upload-image" htmlFor="img-2">
                                    <img src={images[1]? URL.createObjectURL(images[1]): (img2[0]? URL.createObjectURL(img2[0]): "icon-camera.svg" )}  className="upload-image"/>
                                </label>


                                <input type="file" className="input-file" id="img-3" onChange={handleImagesUpload}/>
                                <label className="upload-image" htmlFor="img-3">
                                    <img src={images[2]? URL.createObjectURL(images[2]): (img3[0]? URL.createObjectURL(img3[0]): "icon-camera.svg" )}  className="upload-image"/>
                                </label>


                                <input type="file" className="input-file" id="img-4" onChange={handleImagesUpload}/>
                                <label className="upload-image" htmlFor="img-4">
                                    <img src={images[3]? URL.createObjectURL(images[3]): (img4[0]? URL.createObjectURL(img4[0]): "icon-camera.svg" )} className="upload-image"/>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="submit-button" type="submit" style={{alignSelf: "flex-end", marginRight: "6px"}}>ADD PRODUCT</button>
            </form>
        </div>
    )
}

