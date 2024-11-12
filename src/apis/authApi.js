import { axiosInstance } from "./axiosInstance";


export const signup = async (data) => {
    try {
        const response = await axiosInstance.post('/user/signup', data)
        return response
    } catch (error) {
        console.log(error)
        throw error
        // return error.response
    }
}

export const signin = async (data) => {
    try {
        const response = await axiosInstance.post('/user/signin', data)
        return response
    } catch (error) {
        console.log(error)
        throw error
        // return error.response
    }
}