import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import SimpleImageSlider from "react-simple-image-slider";
import { addToCartItem } from '../../../slices/CartSlice';
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast';
import {Rate, Space} from 'antd'

import './ProductDetails.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Loader from '../../../utils/loader/Loader';
import Review from '../review/Review';
import { addAllReviews } from '../../../slices/ReviewSlice';


const ProductDetails = () => {
    const [laoding,setLoading] = useState(false);
    const {productId} = useParams();
    const [productDetails,setProductDetails] = useState();
    const [isReviewed,setIsReviewed] = useState(false);
    const [rating, setRating] = useState(0)
    const [description,setDescription] = useState("");
    const dispatch = useDispatch();


    // review slider settings
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };


    const allreviews = useSelector((state)=>state.review.reviews);
    // console.log(allreviews)



    // Catch Rating value
  const handleRating = (rate) => {
    setRating(Number(rate));
  }


//   get all review of the product

  const allReivew = async()=>{
    try {    
        const response = await fetch(`http://localhost:4000/api/v1/reviews?id=${productId}`);
        const productReviews = await response.json();
        dispatch(addAllReviews(productReviews.reviews));
    } catch (error) {
        toast.error("Something went wrong");     
    }
  }

    //review handler
    const submitReview = async()=>{
        try {
            const data = {
                productId:productId,
                comment:description,
                rating:rating
            }
            // console.log(data);
            const reponse = await fetch("http://localhost:4000/api/v1/review",{
                method:"PUT",
                // mode:'cors',
                credentials:'include',  // to access the cookie at backend
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            setDescription("");
            const res = await reponse.json();
            // console.log(res);
            res.success === false ? toast.error(res.message) : toast.success(res.message);
        } catch (error) {
            toast.error("Something went wrong");
            return;
        }
        // for hiding the review component
        setIsReviewed(!isReviewed);
    }
    
    
    // for rating options
    const options = {
        edit:false,
        color1:"white",
        color2:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: 25,
        isHalf:true,
    }
    
    
    const getProductDetails = async()=>{
        try {
            setLoading(true);     
            const response = await fetch(`http://localhost:4000/api/v1/product/${productId}`);
            const productDetails = await response.json();
            setProductDetails(productDetails.product);
            setLoading(false);     
        } catch (error) {
            toast.error("Something went wrong");
            setLoading(false);     
        }
    }
    
    // handling add to cart actions
    const addToCartHandler = ()=>{
        if(productDetails?.stock <= 0){
            toast.error("Item is out of stock")
            return;
        }
        dispatch(addToCartItem(productDetails));
    }

    useEffect(()=>{
        getProductDetails();
        allReivew();
    },[])




  return (
    <>
    {!laoding ? 
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
    <div className={`${isReviewed ? "submitReview" : "hideReviewContainer"}`}>
        <div className='heading_close'>
        <h2 className='reviewHanding'>Write Review</h2>
        <p onClick={()=>setIsReviewed(!isReviewed)}>X</p>
        </div>
        <div className="starsReview">
        <Space>
            <Rate 
                tooltips={["Bad","Normal","Good","Super","Awesome"]}
                onChange={handleRating}
                value={rating}
                style={{color:"orange",fontSize:"30px"}}
                defaultValue={1}
                className='stars'
             />
        </Space>
        </div>
        <textarea type="text" placeholder='write your review' className='description' required
        onChange={(e)=>setDescription(e.target.value)}
        />
        <button onClick={submitReview} className='reviewButton'>Submit Review</button>
    </div>
    <div className="rightProductDetails">
        <div className="productNameId">
            <h2>{productDetails?.name}</h2>
            <p>ProductId:<span>{` ${productDetails?._id}`}</span></p>
        </div>
        <div className="productRatings">
        <ReactStars {...options} value={productDetails?.ratings}/> <span>({productDetails?.numOfReviews} Reviews) </span>
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
        <button onClick={()=>setIsReviewed(!isReviewed)}>Submit Review</button>
        
    </div>
</div>}
</div> : <Loader/>}

        <div className="ProductReviews">
            {allreviews.length !== 0 && <h1>Reviews</h1>}
            {allreviews.length !== 0 && <div className="reviews">
                {allreviews&& allreviews.map((review)=>{
                    return <Slider>
                        <Review review={review} key={review._id} productId={productId}/>
                    </Slider>
                })}
            </div>}
            
        </div>

    </>
  )
}

export default ProductDetails