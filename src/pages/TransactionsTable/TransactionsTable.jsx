import styles from './TransactionsTable.module.css'
import propTypes from 'prop-types'
const TransactionsTable = ({analyticsData}) => {
    const options={ year: 'numeric', month: 'long', day: 'numeric'}

    return (
        <div style={{marginTop: '20px'}}>
            <h2>Transactions</h2>
            <div className={styles.table_div}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Milk Quantity</th>
                            <th>Curd Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analyticsData.purchases.map((purchase) => (
                            <tr key={purchase._id}>
                                <td>{new Date(purchase.purchaseDate).toLocaleString('en-US', options)}</td>
                                <td>{purchase.milk.quantity}</td>
                                <td>{purchase.curd ? purchase.curd.quantity : 0}</td>
                                <td>{purchase.totalPriceOfPurchase}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

TransactionsTable.propTypes = {
    analyticsData: propTypes.object
}
export default TransactionsTable