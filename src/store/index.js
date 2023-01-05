import { configureStore } from "@reduxjs/toolkit";
import trainer from "./slices/trainner.slice"


export default configureStore({
    reducer:{
        trainer
    }
})