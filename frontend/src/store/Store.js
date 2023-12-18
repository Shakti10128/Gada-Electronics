import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../slices/Product.js'
import userReducer from '../slices/UserSlice.js'
import cartReducer from '../slices/CartSlice.js'
import reviewReducer from '../slices/ReviewSlice.js'


const store = configureStore({
    reducer:{
        review:reviewReducer,
        product:productReducer,
        user:userReducer,
        cart:cartReducer,
    }
});

export default store;