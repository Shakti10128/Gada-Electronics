import React from 'react'
import './Review.css'
import logo from "../../../images/logo.png"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReactStars from 'react-rating-stars-component'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deleteReviews } from '../../../slices/ReviewSlice';

const Review = ({review,productId}) => {

  const dispatch = useDispatch();
  // for rating options
  const options = {
    edit:false,
    color1:"white",
    color2:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size: 25,
    isHalf:true,
  }


  const delteReviewHandler = async()=>{
      try {
        await fetch(`http://localhost:4000/api/v1/reviews?productId=${productId}&id=${review._id}`,{
            method:"DELETE",
            credentials:'include',  // to access the cookie at backend
        })
        dispatch(deleteReviews(review._id))
        toast.success("Review deleted successfully")
    } catch (error) {
        toast.error("Something went wrong");
        return;
    }
  }








  const UserId = JSON.parse(localStorage.getItem("UserId"));
  // console.log(UserId,review.user);
  return (
    <div className='review'>
      <div className="logoAndAction">
        <img src={logo} alt="userImage" className='userLogo' />
        {UserId === review.user && <div className="actions">
          {/* <FaEdit className='update'/> */}
          <MdDelete className='delete' onClick={delteReviewHandler}/>
        </div>}
      </div>
      <h3 className='userName'>{review.name}</h3>

      <ReactStars {...options} value={review?.rating} classNames="reviewRatings"/>
      <p className="comment">
        {review.comment}
      </p>
    </div>
  )
}

export default Review