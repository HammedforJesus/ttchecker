import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { isClassHolding } from '../helpers'
import MainView from '../views/MainView'
import ResultView from '../views/ResultView'
import { courses } from '../data'

export const Route = createFileRoute('/matric-check')({
    component: RouteComponent,
})

function RouteComponent() {
    const [matricNumber, setMatricNumber] = useState("")
    const [selectedCourses, setSelectedCourses] = useState([])

    const onSubmit = (offered_courses, matricNumber) => {

        const course_codes = offered_courses.map(c => c.courseCode)

        let todaysSchedule = courses.filter(c => course_codes.includes(c.courseCode))

        const currentDayOfWeek = new Date().getDay();

        todaysSchedule = todaysSchedule.filter(c =>
            c.dayAndTime.some(dt => dt.day == currentDayOfWeek)
        );

        const result = todaysSchedule.map(c => {
            const b = c.dayAndTime
                .filter(dt => dt.day == currentDayOfWeek)
                .map(dt => ({
                    ...dt,
                    classActive: isClassHolding(dt.startTime, dt.endTime)
                }));

            return { ...c, dayAndTime: b };
        });

        setMatricNumber(matricNumber)
        setSelectedCourses(result)
    }

    const handleBack = () => {
        setMatricNumber("")
        setSelectedCourses([])
    }

    return (
        <>

            {!matricNumber && <MainView onSubmit={onSubmit} />}

            {
                matricNumber && (
                    <ResultView matricNumber={matricNumber} courses={selectedCourses} onBack={handleBack} />
                )
            }
        </ >
    )
}
