import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../slices/Product.js'
import userReducer from '../slices/UserSlice.js'


const store = configureStore({
    reducer:{
        product:productReducer,
        user:userReducer
    }
});

export default store;