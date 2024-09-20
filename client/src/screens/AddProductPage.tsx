import { useState } from "react";
import "./Account.css"
import "./AddProduct.css"

export function AddProductPage() {
    const [images, setImages] = useState([]);

    const [img1, setImg1] = useState([]);
    const [img2, setImg2] = useState([]);
    const [img3, setImg3] = useState([]);
    const [img4, setImg4] = useState([]);
    
    const [isMultiple, setIsMultiple] = useState(false);

    function handleAddProduct() {

    }

    function handleImagesUpload(e : any) {
        console.log(e.target.id);
        if(e.target.id == "mul-images") {
            if (e.target.files && e.target.files[0]) {
                setImages(e.target.files);
                setIsMultiple(true);
            }
        }else if(e.target.id == "img-1"){
            if (e.target.files[0]) {
                setImg1(e.target.files);
            }
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
                    <input className="input-field" placeholder="Example: Stainless Steel Smooth Double Ball Beads Rings" type="email" required />
                </div>

                <div className="form-group">
                    <p className="input-label">Product Type</p>
                    {/* <input className="input-field" placeholder="Example: Ring" type="email" required /> */}
                    <select className="select-box" name="cars" id="cars">
                        <option value="ring">RING</option>
                        <option value="necklace">NECKLACE</option>
                        <option value="bracelet">BRACELET</option>
                        <option value="earrings">EARRING</option>
                        <option value="giftbox">GIFTBOX</option>
                    </select>
                </div>

                <div className="form-group">
                    <p className="input-label">Brand Name</p>
                    <input className="input-field" placeholder="Example: Zara" type="email" required />
                </div>

                <div className="form-group">
                    <p className="input-label">Product Description</p>
                    <textarea className="input-field description" placeholder="Example: Stainless Steel Smooth Double Ball Beads Rings For Woman Open Gold Color Geometric Wedding Couple Rings Aesthetic Jewelry Gift." required />
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

