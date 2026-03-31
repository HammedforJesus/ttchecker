import { useState } from 'react'
import { isClassHolding } from './helpers'
import ResultView from './views/ResultView'
import MainView from './views/MainView'
import { courses } from './data'

function App() {

  const [ matricNumber , setMatricNumber ] = useState("")
  const [ selectedCourses , setSelectedCourses ] = useState([])

  const onSubmit = (offered_courses , matricNumber) => {

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
    <div className='w-full max-w-[1000px] mx-auto h-dvh flex flex-col gap-6'>
      <header className='w-full p-4 flex items-center justify-center'>
        <h1 className='text-3xl'>TTChecker</h1>
      </header>

      {!matricNumber && <MainView onSubmit={onSubmit} />}

      {
        matricNumber && (
          <ResultView matricNumber={matricNumber} courses={selectedCourses} onBack={handleBack}/>
        )
      }
    </div>
  )
}

export default App