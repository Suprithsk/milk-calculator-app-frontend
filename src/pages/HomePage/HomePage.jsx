import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"
import { Toaster, toast } from 'react-hot-toast';
import styles from './HomePage.module.css'

import Header from "../../components/Header/Header"
import MilkForm from "../MilkForm/MilkForm"
import { buyMilkOrCurd } from "../../apis/milkApi"
import Analytics from "../Analytics/Analytics"
import TransactionsTable from "../TransactionsTable/TransactionsTable"
import MissedDates from "../MissedDates/MissedDates"
import { getAnalyticsData } from "../../apis/milkApi"
import { getMissedDates } from "../../apis/milkApi";
import Loader from "../../components/Loader/Loader";

function HomePage() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            console.log('token not found')
            navigate('/signup')
        }
    }, [navigate])
    useEffect(() => {
        refreshAnalyticsData();
        refreshMissedDates();
    }, [])
    const [analyticsData, setAnalyticsData] = useState({ loading: true, data: null, error: null });
    const [missedDates, setMissedDates] = useState({ loading: true, data: null, error: null });
    const refreshAnalyticsData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await getAnalyticsData(token);
            setAnalyticsData({ loading: false, data: response, error: null });
        } catch (e) {
            console.error('Error in refreshAnalyticsData:', e);
            setAnalyticsData({ loading: false, data: null, error: e });
        }
    }
    const refreshMissedDates = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await getMissedDates(token);
            setMissedDates({ loading: false, data: response, error: null });
        } catch (e) {
            console.error('Error in refreshMissedDates:', e);
            setMissedDates({ loading: false, data: null, error: e });
        }
    }
    const handleAsyncOperation = async (milk, clearForm) => {
        try {
            await toast.promise(
                buyMilkOrCurdFunc(milk, clearForm),
                {
                    loading: 'Submitting your request...',
                    success: 'Milk and curd purchased successfully!',
                    error: (e) => {
                        if(e?.response?.data?.msg){
                            return e.response.data.msg
                        }
                        return 'An error occurred. Please try again.'
                    },
                }
            );
        } catch (e) {
            console.error('Error caught in handleAsyncOperation:', e);
        }
    };

    const buyMilkOrCurdFunc = async (milk, clearForm) => {
        console.log('func called', milk);
        let curd = milk.curdQuantity === '' ? null : { quantity: Number(milk.curdQuantity) };
        let token = localStorage.getItem('token');
        try {
            const response = await buyMilkOrCurd(
                {
                    milk: {
                        quantity: Number(milk.milkQuantity),
                    },
                    purchasedDate: new Date(milk.milkDate).setUTCHours(0, 0, 0, 0),
                    curd: curd,
                },
                token
            );

            console.log('API response:', response);
            clearForm();
            refreshAnalyticsData();
            refreshMissedDates();
            return response; 
        } catch (e) {
            console.error('Error in buyMilkOrCurdFunc:', e);
            throw e; 
        }
    };

    return (
        <div>
            <Toaster />
            <Header />
            <MilkForm propsBuyMilkOrCurd={handleAsyncOperation} />
            <div className={styles.second_div}>
                {analyticsData.loading && !analyticsData.error && <Loader />}
                {analyticsData.error && <div>Error: {`Error displaying results`}</div>}
                {!analyticsData.loading && analyticsData.data && 
                    <>
                        <Analytics analyticsData={analyticsData.data}/>
                        <TransactionsTable analyticsData={analyticsData.data}/>
                    </>
                }
            </div>
            <div className={styles.second_div}>
                {missedDates.loading && !missedDates.error && <Loader />}
                {missedDates.error && <div>Error: {`Error displaying results`}</div>}
                {!missedDates.loading && missedDates.data && 
                    <>
                        <MissedDates missedDates={missedDates.data}/>
                    </>
                }
                {/* <MissedDates missedDates={missedDates}/> */}
            </div>
        </div>
    )
}

export default HomePage