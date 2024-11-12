import {axiosInstanceWithToken} from './axiosInstance'


export const buyMilkOrCurd = async (milk, token) => {
    try {
        if(!token) {
            throw new Error('Token not found')
        }
        const response = await axiosInstanceWithToken(token).post('/milk/purchaseMilkOrCurd', milk)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getAnalyticsDataOfThatMonth = async (token, month, year) => {
    try {
        if(!token) {
            throw new Error('Token not found')
        }
        const response = await axiosInstanceWithToken(token).get(`/milk/getPriceOfThatMonth/${year}/${month}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAnalyticsData = async (token) => {
    try {
        if(!token) {
            throw new Error('Token not found')
        }
        const response = await axiosInstanceWithToken(token).get('/milk/getMilkPurchaseAmountToday')
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getMissedDatesOfThatMonth = async (token, month, year) => {
    try {
        if(!token) {
            throw new Error('Token not found')
        }
        const response = await axiosInstanceWithToken(token).get(`/milk/getMissedDatesOfThatMonth/${year}/${month}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getMissedDates = async (token) => {
    try {
        if(!token) {
            throw new Error('Token not found')
        }
        const response = await axiosInstanceWithToken(token).get('/milk/getAllMissedDates')
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const addMilkRate = async (milkRate, token) => {
    try {
        if(!token) {
            throw new Error('Token not found')
        }
        const response = await axiosInstanceWithToken(token).post('/milk/addMilk', {price: milkRate})
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const addCurdRate = async (curdRate, token) => {
    try {
        if(!token) {
            throw new Error('Token not found')
        }
        const response = await axiosInstanceWithToken(token).post('/milk/addCurd', {price: curdRate})
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getMilkRate = async (token) => {
    try {
        if(!token) {
            throw new Error('Token not found')
        }
        const response = await axiosInstanceWithToken(token).get('/milk/getMilk')
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getCurdRate = async (token) => {
    try {
        if(!token) {
            throw new Error('Token not found')
        }
        const response = await axiosInstanceWithToken(token).get('/milk/getCurd')
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}