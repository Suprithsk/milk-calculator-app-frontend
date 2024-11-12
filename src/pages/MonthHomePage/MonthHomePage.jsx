import styles from './MonthHomePage.module.css'
import Header from '../../components/Header/Header'
import { Toaster, toast } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MonthForm from '../MonthForm/MonthForm'
import { getMissedDatesOfThatMonth, getAnalyticsDataOfThatMonth } from '../../apis/milkApi'
import Analytics from '../Analytics/Analytics'
import TransactionsTable from '../TransactionsTable/TransactionsTable'
import MissedDates from '../MissedDates/MissedDates'
import Loader from '../../components/Loader/Loader'

const MonthHomePage = () => {
    const navigate = useNavigate()
    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))
    const [analyticsData, setAnalyticsData] = useState({ loading: true, data: null, error: null });
    const [missedDates, setMissedDates] = useState({ loading: true, data: null, error: null });
    const monthChangeHandler = (e) => {
        console.log(e.target.value)
        setMonth(e.target.value)
    }
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }
        refreshAnalyticsData(month.split('-')[1], month.split('-')[0]);
        refreshMissedDates(month.split('-')[1], month.split('-')[0]);
    }, [])
    const refreshAnalyticsData = async (month, year) => {
        try {
            const token = localStorage.getItem('token');
            const response = await getAnalyticsDataOfThatMonth(token, month, year);
            console.log(response)
            setAnalyticsData({ loading: false, data: response, error: null });
        } catch (e) {
            console.error('Error in refreshAnalyticsData:', e);
            setAnalyticsData({ loading: false, data: null, error: e });
        }
    }
    const refreshMissedDates = async (month, year) => {
        try {
            const token = localStorage.getItem('token');
            const response = await getMissedDatesOfThatMonth(token, month, year);
            console.log(response)
            setMissedDates({ loading: false, data: response, error: null });
        } catch (e) {
            console.error('Error in refreshMissedDates:', e);
            setMissedDates({ loading: false, data: null, error: e });
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (month === '') {
            toast.error('Please fill the month')
            return
        }
        refreshAnalyticsData(month.split('-')[1], month.split('-')[0]);
        refreshMissedDates(month.split('-')[1], month.split('-')[0]);
    }

    return (
        <>
            <Toaster />
            <Header />
            <div className={styles.month_home_page}>
                <div className={styles.month_analyze_div}>
                    <MonthForm month={month} monthChangeHandler={monthChangeHandler} submitHandler={submitHandler} />
                </div>
                <div className={styles.second_div}>
                    {analyticsData.loading && !analyticsData.error && <Loader />}
                    {analyticsData.error && <div>Error: {`Error displaying results`}</div>}
                    {!analyticsData.loading && analyticsData.data &&
                        <>
                            <Analytics analyticsData={analyticsData.data} />
                            <TransactionsTable analyticsData={analyticsData.data} />
                        </>
                    }
                </div>
                <div className={styles.second_div}>
                    {missedDates.loading && !missedDates.error && <Loader />}
                    {missedDates.error && <div>Error: {`Error displaying results`}</div>}
                    {!missedDates.loading && missedDates.data &&
                        <>
                            <MissedDates missedDates={missedDates.data} />
                        </>
                    }
                    {/* <MissedDates missedDates={missedDates}/> */}
                </div>
            </div>
        </>
    )
}

export default MonthHomePage