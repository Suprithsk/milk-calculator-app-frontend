import styles from './MonthForm.module.css'
import propTypes from 'prop-types'
const MonthForm = ({month,monthChangeHandler,submitHandler}) => {

    return (
        <div className={styles.milk_form_div}>
            <div className={styles.milk_form}>
                <h2>Enter Month to get details</h2>
                <form >
                    <div className={styles.form_group}>
                        <label htmlFor="month">Month</label>
                        <input type="month" id="month" required value={month} onChange={monthChangeHandler} />
                    </div>
                    <div className={styles.submit_div}>
                        <button onClick={submitHandler}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

MonthForm.propTypes = {
    month: propTypes.string.isRequired,
    monthChangeHandler: propTypes.func.isRequired,
    submitHandler: propTypes.func.isRequired
}
export default MonthForm