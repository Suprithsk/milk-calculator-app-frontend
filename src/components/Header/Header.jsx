import { useEffect,useState } from 'react'
import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';

function Header() {
    const navigate = useNavigate()
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [isHamClicked, setIsHamClicked] = useState(false)

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/signin')
        }else{
            setIsSignedIn(true)
        }
    }, [navigate])
    const signOutHandler = () => {
        localStorage.removeItem('token')
        navigate('/signin')
    }
    const hamClickHandler = () => {
        setIsHamClicked(!isHamClicked)
    }
    const addMilkHandler = () => {
        navigate('/addmilk')
    }
    const monthWiseAnalyzeHandler = () => {
        navigate('/analytics')
    }
    const homePageClickHandler = () => {
        navigate('/')
    }
    return (
        <>
        <header className={styles.header}>
            <h3 onClick={homePageClickHandler}>Milk Tracker</h3>
            <div className={styles.second_div}>
                {isSignedIn && <button className={styles.signin_btn} onClick={signOutHandler}>Sign Out</button>}

                {!isSignedIn && <button className={styles.signout_btn}>Sign In</button>}
                {!isHamClicked && <Menu size={30} className={styles.menu} onClick={hamClickHandler}/>}
                {isHamClicked && <X size={30} className={styles.menu} onClick={hamClickHandler}/>}
            </div> 
        </header>
        {isHamClicked && <nav className={styles.nav}>
            <ul>
                <li onClick={addMilkHandler}>Add Milk/Curd rate</li>
                <li onClick={monthWiseAnalyzeHandler}>Month Wise Analysis</li>
            </ul>
        </nav>}
        </>

    )
}

export default Header