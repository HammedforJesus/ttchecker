import { useEffect, useState } from 'react'
import ClassCard from './components/ClassCard'
import { getProgrammes, getSchedule } from './helpers'

function App() {

  const programmes = getProgrammes()

  const [selectedCourse, setSelectedCourse] = useState(programmes[0])

  const [filteredCourses, setFilteredCourses] = useState([])


  useEffect(() => {
    setFilteredCourses(getSchedule(selectedCourse))
  }, [selectedCourse])


  return (
    <div className='w-full max-w-[1000px] mx-auto h-dvh flex flex-col gap-6'>
      <header className='w-full p-4 flex items-center justify-center'>
        <h1 className='text-3xl'>TTChecker</h1>
      </header>

      <div className='flex w-full items-center justify-center'>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="select select-primary">
          <option disabled={true}>Select a programme</option>
          {programmes.map((p, i) => (
            <option key={i}>{p.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <section className='flex-1 flex flex-col items-center gap-4 overflow-y-auto py-4 px-4'>
        {filteredCourses.map((c, i) => (
          <ClassCard key={i} level={`${c.level} LEVEL`} courseCode={c.courseCode} startTime={c.dayAndTime[0].startTime} endTime={c.dayAndTime[0].endTime} active={c.dayAndTime[0].classActive} />
        ))}
      </section>
    </div>
  )
}

export default App