import styles from './MilkForm.module.css'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Toaster, toast } from 'react-hot-toast';

const MilkForm = ({propsBuyMilkOrCurd}) => {
    const [curdVisible, setCurdVisible] = useState(false)
    const [milkQuantity, setMilkQuantity] = useState('')
    const [curdQuantity, setCurdQuantity] = useState('')
    const [milkDate, setMilkDate] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(milkQuantity==='' || milkDate==='' || (curdVisible && curdQuantity==='')) {
            toast.error('Please fill all the fields')
            return
        }
        
        propsBuyMilkOrCurd({milkQuantity, curdQuantity, milkDate}, clearForm)
        console.log(milkQuantity, curdQuantity, milkDate)
    }
    const milkChangeHandler = (e) => {
        setMilkQuantity(e.target.value)
    }
    const curdChangeHandler = (e) => {
        setCurdQuantity(e.target.value)
    }
    const milkDateChangeHandler = (e) => {
        setMilkDate(e.target.value)
    }
    const clearForm = () => {
        setMilkQuantity('')
        setCurdQuantity('')
        setMilkDate('')
    }
    return (
    <>
        <Toaster />
        <div className={styles.milk_form_div}>
            <div className={styles.milk_form}>
                <h2>Enter Milk Details</h2>
                <form >
                    <div className={styles.form_group}>
                        <label htmlFor="milk_quantity">Milk Quantity</label>
                        <input type="number" id="milk_quantity" required value={milkQuantity} onChange={milkChangeHandler} />
                    </div>
                    <div className={styles.form_group}>
                        {!curdVisible && <button className={styles.add_curd_btn} onClick={() => setCurdVisible(true)}>Add Curd</button>}
                        {curdVisible && <button className={styles.add_curd_btn} onClick={() => setCurdVisible(false)}>Remove Curd</button>}
                    </div>
                    {curdVisible && <div className={styles.form_group}>
                        <label htmlFor="curd_quantity">Curd Quantity</label>
                        <input type="number" id="curd_quantity" required value={curdQuantity} onChange={curdChangeHandler} />
                    </div>}
                    <div className={styles.form_group}>
                        <label htmlFor="milk_date">Milk Date</label>
                        <input type="date" id="milk_date" required value={milkDate} onChange={milkDateChangeHandler} />
                    </div>
                    <div className={styles.submit_div}>
                        <button onClick={submitHandler}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
MilkForm.propTypes = {
    propsBuyMilkOrCurd: PropTypes.func.isRequired,
}

export default MilkForm

