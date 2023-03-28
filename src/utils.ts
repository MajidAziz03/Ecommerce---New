import axios from "axios";
import { BASE_URL } from "./globalconfig";



const instance = axios.create({
    baseURL: BASE_URL
})


export const products = async () => {
    try {
        const res = await instance.get('products')
        return res.data.products

    } catch (error) {
        console.log("error occurred")
    }
}