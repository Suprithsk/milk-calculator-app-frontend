import PropTypes from "prop-types"
import styles from './Analytics.module.css'
import { IndianRupee } from 'lucide-react';

// const analyticsData = {
//     "purchases": [
//         {
//             "milk": {
//                 "milkId": {
//                     "_id": "6725da2c3c41b27cfa1c95ed",
//                     "price": 27,
//                     "User": "6723b58dec7981b12dc0a6b0",
//                     "__v": 0
//                 },
//                 "quantity": 2
//             },
//             "curd": {
//                 "curdId": {
//                     "_id": "6725da283c41b27cfa1c95e8",
//                     "price": 27,
//                     "User": "6723b58dec7981b12dc0a6b0",
//                     "__v": 0
//                 },
//                 "quantity": 1
//             },
//             "_id": "672cf8859a0875d04cd2178f",
//             "User": "6723b58dec7981b12dc0a6b0",
//             "purchaseDate": "2024-11-05T00:00:00.000Z",
//             "totalPriceOfPurchase": 81,
//             "__v": 0
//         },
//         {
//             "milk": {
//                 "milkId": {
//                     "_id": "6725da2c3c41b27cfa1c95ed",
//                     "price": 27,
//                     "User": "6723b58dec7981b12dc0a6b0",
//                     "__v": 0
//                 },
//                 "quantity": 2
//             },
//             "curd": {
//                 "curdId": {
//                     "_id": "6725da283c41b27cfa1c95e8",
//                     "price": 27,
//                     "User": "6723b58dec7981b12dc0a6b0",
//                     "__v": 0
//                 },
//                 "quantity": 1
//             },
//             "_id": "672d0bf0915ef3f9484e2736",
//             "User": "6723b58dec7981b12dc0a6b0",
//             "purchaseDate": "2024-11-01T00:00:00.000Z",
//             "totalPriceOfPurchase": 81,
//             "__v": 0
//         },
//         {
//             "milk": {
//                 "milkId": {
//                     "_id": "6725da2c3c41b27cfa1c95ed",
//                     "price": 27,
//                     "User": "6723b58dec7981b12dc0a6b0",
//                     "__v": 0
//                 },
//                 "quantity": 1
//             },
//             "_id": "672f5b0c9b9f401410b65d69",
//             "User": "6723b58dec7981b12dc0a6b0",
//             "purchaseDate": "2024-11-08T00:00:00.000Z",
//             "totalPriceOfPurchase": 27,
//             "__v": 0
//         }
//     ],
//     "totalAmount": 189,
//     "startDate": "2024-11-01T00:00:00.000Z",
//     "endDate": "2024-11-09T00:00:00.000Z"
// }

const Analytics = ({analyticsData}) => {
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    console.log(analyticsData)
    const milkQuantity = analyticsData.purchases.reduce((acc, purchase) => {
        return acc + purchase.milk.quantity
    }, 0)
    const curdQuantity = analyticsData.purchases.reduce((acc, purchase) => {
        return acc + (purchase.curd ? purchase.curd.quantity : 0)
    }, 0)
    return (
        <>
        <div className={styles.analytics_div}>
            <div className={styles.summary_text}>
                <IndianRupee size={20} />
                <h2>Summary</h2>
            </div>
            <div className={styles.elements_div}>
                <div className={styles.element} id={styles.element1}>
                    <h3>Total Amount</h3>
                    <p>{analyticsData.totalAmount} ₹</p>
                </div>
                <div className={styles.element} id={styles.element2}>
                    <h3>Quantities of Milk bought</h3>
                    <p>{milkQuantity}</p>
                </div>
                <div className={styles.element} id={styles.element3}>
                    <h3>Quantities of Curd bought</h3>
                    <p>{curdQuantity}</p>
                </div>
            </div>
        </div>
        </>
    )
}

Analytics.propTypes = {
    analyticsData: PropTypes.object
}

export default Analytics