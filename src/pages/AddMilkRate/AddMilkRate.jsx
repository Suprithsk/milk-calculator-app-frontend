import { Toaster,toast } from "react-hot-toast"
import Header from "../../components/Header/Header"
import styles from './AddMilkRate.module.css'
import { useState,useEffect } from "react"
import { getMilkRate, getCurdRate, addCurdRate, addMilkRate } from "../../apis/milkApi"

const AddMilkRate = () => {
  const [milkRate, setMilkRate] = useState('')
  const [curdRate, setCurdRate] = useState('')
  const token = localStorage.getItem('token')
  useEffect(() => {
    
    const fetchData = async (token) => {
      const milkRate = await getMilkRateHandler(token)
      const curdRate = await getCurdRateHandler(token)
      setMilkRate(milkRate[0].price)
      setCurdRate(curdRate[0].price)
    }
    fetchData(token)
  }, [])

  const getMilkRateHandler = async (token) => {
    try {
      const response = await getMilkRate(token)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  const getCurdRateHandler = async (token) => {
    try {
      const response = await getCurdRate(token)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const addMilkRateHandler = async () => {
    try {
      await addMilkRate(Number(milkRate), token)

    } catch (error) {
      console.log(error)
    }
  }
  const addCurdRateHandler = async () => {
    try {
      await addCurdRate(Number(curdRate),token)
    } catch (error) {
      console.log(error)
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    if(milkRate==='' || curdRate==='') {
      toast.error('Please fill all the fields')
      return
    }
    try {
      await addMilkRateHandler()
      await addCurdRateHandler()
      toast.success('Milk/Curd Rate added successfully')
    }catch(error) {
      console.log(error) 
      toast.error('Failed to add Milk/Curd Rate')
    }
  }
  const milkChangeHandler = (e) => {
    setMilkRate(e.target.value)
  }
  const curdChangeHandler = (e) => {
    setCurdRate(e.target.value)
  }
  return (
    <>
        <Toaster />
        <Header />
        <div className={styles.milk_form_div}>
            <div className={styles.milk_form}>
                <h2>Enter Milk Rate</h2>
                <form >
                    <div className={styles.form_group}>
                        <label htmlFor="milk_rate">Milk Rate</label>
                        <input type="number" id="milk_rate" onChange={milkChangeHandler} value={milkRate} />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="curd_rate">Curd Rate</label>
                        <input type="number" id="curd_rate" onChange={curdChangeHandler} value={curdRate} />
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

export default AddMilkRate
