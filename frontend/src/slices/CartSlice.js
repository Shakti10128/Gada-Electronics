import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];


const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems
    },
    reducers:{
        addToCartItem:(state,action)=>{
            // check this product is already added or not into cart
            let isAdded = 0;
            state.cartItems.forEach((product)=>{
                if(product._id === action.payload._id){
                    isAdded = 1;
                    toast.error("Item Already Added");
                    return;
                }
            })
           if(isAdded === 0){
            state.cartItems.push(action.payload);
            localStorage.removeItem("cartItems");
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            toast.success("Item Added")
           }
        },
        deleteCartItem:(state,action)=>{
            const cartData = JSON.parse(localStorage.getItem("cartItems"))
           const newData = cartData.filter((product)=>{
            return product._id !== action.payload;
           })
           localStorage.removeItem("cartItems");
           state.cartItems = newData;
           localStorage.setItem("cartItems",JSON.stringify(newData));
        }
    }
})

export const {addToCartItem,deleteCartItem} = cartSlice.actions;
export default cartSlice.reducer;