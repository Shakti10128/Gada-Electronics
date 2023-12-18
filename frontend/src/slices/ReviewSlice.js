import { createSlice } from "@reduxjs/toolkit";
const reviews = [];

const reviewSlice = createSlice({
    name:"review",
    initialState:{reviews},
    reducers:{
        addAllReviews:(state,action)=>{
            // console.log("slice",action.payload);
            state.reviews = action.payload
        },
        deleteReviews:(state,action)=>{
            const newReviews = state.reviews.filter((review)=>{
                return review._id !== action.payload;
            })
            state.reviews = newReviews;
        }
    }
})

export const {addAllReviews,deleteReviews} = reviewSlice.actions;
export default reviewSlice.reducer