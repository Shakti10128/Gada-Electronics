import React,{useEffect,useState} from 'react'
import './ProductDetails.css'
import { useParams } from 'react-router-dom'
import ReactStarts from 'react-rating-stars-component'
import SimpleImageSlider from "react-simple-image-slider";



const ProductDetails = () => {
    const [productDetails,setProductDetails] = useState();

    // for rating options
    const options = {
        edit:false,
        color1:"white",
        color2:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: 25,
        isHalf:true,
    }

    const {productId} = useParams();

    const getProductDetails = async()=>{
        const response = await fetch(`http://localhost:4000/api/v1/product/${productId}`);

        const productDetails = await response.json();
        setProductDetails(productDetails.product);
    }

    // handling add to cart actions
    const addToCartHandler = ()=>{
        if(!localStorage.getItem('cartItems')){
            localStorage.setItem('cartItems',JSON.stringify(Array({productDetails})));
        }
       else{
        let oldProducts = JSON.parse(localStorage.getItem("cartItems"));
        console.log(oldProducts);
        oldProducts.forEach((product)=>{
            if(product.productDetails?._id == productDetails?._id){
                console.log("product already added");
                return;
            }
        })
        oldProducts = [...oldProducts,productDetails];
        localStorage.clear("cartItems")
        localStorage.setItem("cartItems",JSON.stringify(oldProducts));
        oldProducts = [...oldProducts,productDetails];
        console.log(oldProducts);
       }
    }

    useEffect(()=>{
        getProductDetails();
    },[])




  return (
    <div>
        {!productDetails ? <div>Loading....</div> :
        <div className='productDetailsContainer'>
        <div className="leftProductDetails">
        {productDetails && <SimpleImageSlider
                width={320}
                height={480}
                images={productDetails?.images}
                showBullets={true}
                showNavs={true}
                navSize={20}
                loop={true}
                autoPlay={true}
                autoPlayDelay={3}
            />}
        </div>
        <div className="rightProductDetails">
            <div className="productNameId">
                <h2>{productDetails?.name}</h2>
                <p>ProductId:<span>{` ${productDetails?._id}`}</span></p>
            </div>
            <div className="productRatings">
            <ReactStarts {...options} value={productDetails?.ratings}/> <span>(256 reviews)</span>
            </div>
            <div className="priceAddcartBtn">
                <p>{`₹${productDetails?.price}`}</p>
                <div className="addCartBtnDiv">
                   <div className="addCartBtn">
                        <button>-</button>
                        <input type="text" />
                        <button>+</button>
                   </div>
                   <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
            </div>
            <div className="stock">
                <p>Status:<span className={`${productDetails?.stock > 0 ? "InStock" : "OutOfStock"}`}>{` ${productDetails?.stock > 0 ? "InStock" : "Out of Stock"}`}</span></p>
            </div>
            <div className="description">
                <h2>Description</h2>
                <p>{productDetails?.description}</p>
            </div>
            <button>Submit Review</button>
            
        </div>
    </div>}
    </div>
  )
}

export default ProductDetails