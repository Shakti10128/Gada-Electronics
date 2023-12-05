import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../slices/Product.js'
import userReducer from '../slices/UserSlice.js'
import cartReducer from '../slices/CartSlice.js'


const store = configureStore({
    reducer:{
        product:productReducer,
        user:userReducer,
        cart:cartReducer,
    }
});

export default store;