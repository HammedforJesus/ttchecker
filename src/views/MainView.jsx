import React, { useState } from 'react'
import { course_forms } from '../course-forms'
import { Scanner } from '@yudiel/react-qr-scanner'
import { Link } from '@tanstack/react-router'


const MainView = ({
    onSubmit
}) => {


    const [matricNumber, setMatricNumber] = useState("")

    const handleClick = () => {

        if (matricNumber.length < 1) return

        const offered_courses = course_forms.filter(f => f.matricNumber == matricNumber)

        onSubmit(offered_courses, matricNumber)
    }

    const handleScan = (data) => {
        if (data[0]) {
            const matricNumber = data[0].rawValue

            const offered_courses = course_forms.filter(f => f.matricNumber == matricNumber)

            onSubmit(offered_courses, matricNumber)
        }
    }

    return (
        <div className='flex-1 w-full flex flex-col items-center justify-center gap-4 p-4'>

            <Scanner
                onScan={handleScan}
                formats={['qr_code']}
                styles={{ container: { height: '250px', width: '250px' } }}
            />

            <input
                type="text"
                className='text-center input input-neutral mx-auto w-full md:w-100'
                placeholder='ENTER MATRICULATION NUMBER'
                value={matricNumber}
                onChange={e => setMatricNumber(e.currentTarget.value.trim().toUpperCase())}
            />

            <button className='btn btn-primary mx-auto w-full md:w-100' onClick={handleClick}>Check</button>

            <Link className='btn btn-ghost mx-auto w-full md:w-100' to="/">
                Back to Timetable
            </Link>
        </div>
    )
}

export default MainView