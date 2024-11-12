import { TriangleAlert } from 'lucide-react';

import propTypes from 'prop-types'
import styles from './MissedDates.module.css'

const MissedDates = ({missedDates}) => {
    const options={ year: 'numeric', month: 'long', day: 'numeric'}

    return (
        <div className={styles.missed_dates_div}>
            <div className={styles.first_div}>
                <TriangleAlert />
                <h2>Missed Dates</h2>
            </div>
            <div className={styles.elements_div}>
                {missedDates.map((date) => (
                    <div key={date} className={styles.element}>
                        <p>{new Date(date).toLocaleDateString('en-US',options)}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

MissedDates.propTypes = {
    missedDates: propTypes.array
}
export default MissedDates