import { createFileRoute, Link } from '@tanstack/react-router'
import { courses, courses_fcas } from '../data'
import { useEffect, useState } from 'react'
import { getLecturers, getProgrammes, timetableDayLayoutAlgorithm } from '../helpers'

export const Route = createFileRoute('/timetable')({
  component: RouteComponent,
})

function RouteComponent() {

  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const programmes = ['all programmes', ...getProgrammes()]
  const lecturers = ['all lecturers', ...getLecturers()]
  const [structured, setStructured] = useState({})
  const [level, setLevel] = useState('all levels')
  const [lecturer, setLecturer] = useState(lecturers[0])
  const [programme, setProgramme] = useState(programmes[0])

  const rebuildLayout = (programme, level , lecturer) => {
    const structured = {}

    Array.from({ length: 7 }).forEach((_, i) => {

      //Exempt Sunday and Saturday
      if (i !== 0 && i !== 6)
        structured[i] = timetableDayLayoutAlgorithm(
          courses
            .filter(c => c.dayAndTime.some(d => d.day == i))
            .filter(c => programme != 'all programmes' ? c.programme.includes(programme) : true)
            .filter(c => level != 'all levels' ? c.level == level : true)
            .filter(c => lecturer != 'all lecturers' ? c.lecturer.toLowerCase() == lecturer : true)
          , i)
    })

    return structured
  }

  useEffect(() => {
    setStructured(rebuildLayout(programme, level , lecturer))
  }, [programme, level , lecturer])

  return (
    <main className='size-full flex flex-col'>
      <div className='p-4 w-full flex flex-col items-center gap-4'>
        <h1 className='text-3xl'>TTChecker - Timetable</h1>
        <Link className='btn btn-primary mx-auto w-full md:w-100' to="/">
          Go Back
        </Link>
        <select value={programme} onChange={(e) => setProgramme(e.target.value)} className="select-lg select select-primary not-md:flex-1">
          <option disabled={true}>Select a programme</option>
          {programmes.map((p, i) => (
            <option key={i} value={p.toLowerCase()}>{p.toUpperCase()}</option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)} className="select-lg select select-primary not-md:flex-1"
        >
          <option disabled={true}>Select a level</option>
          {['all levels', '100', '200', '300', '400'].map((p, i) => (
            <option key={i} value={p}>{p.toUpperCase()}</option>
          ))}
        </select>

        <select
          value={lecturer}
          onChange={(e) => setLecturer(e.target.value)} className="select-lg select select-primary not-md:flex-1"
        >
          <option disabled={true}>Select a level</option>
          {lecturers.map((p, i) => (
            <option key={i} value={p}>{p.toUpperCase()}</option>
          ))}
        </select>

      </div>
      <div className='flex-1 w-full overflow-auto'>
        <section className={`w-full min-w-500 flex flex-col gap-2`}>
          <header className='w-full grid grid-cols-11 gap-1'>
            <div className='grid place-items-center'>
              Day/Time
            </div>
            <div className='grid place-items-center'>
              8:15 - 9:15 AM
            </div>
            <div className='grid place-items-center'>
              9:15 - 10:15 AM
            </div>
            <div className='grid place-items-center'>
              10:15 - 11:15 AM
            </div>
            <div className='grid place-items-center'>
              11:15 - 12:15 PM
            </div>
            <div className='grid place-items-center'>
              12:15 - 1:00 PM
            </div>
            <div className='grid place-items-center'>
              1:00 - 2:00 PM
            </div>
            <div className='grid place-items-center'>
              2:00 - 3:00 PM
            </div>
            <div className='grid place-items-center'>
              3:00 - 4:00 PM
            </div>
            <div className='grid place-items-center'>
              4:00 - 5:00 PM
            </div>
            <div className='grid place-items-center'>
              5:00 - 6:00 PM
            </div>
          </header>
          <div className='w-full grid grid-cols-11 gap-1'>
            {Object.keys(structured).map((d, i) => (
              <>
                <div key={i} className='flex flex-col items-center bg-base-300 p-4'>
                  <h1>{DAYS[d]}</h1>
                </div>
                <div className='grid grid-cols-10 col-span-10 gap-1'>
                  {structured[d].map((c, j) => (
                    c == null ?
                      <div className='bg-base-300 p-4 grid place-items-center text-xs'></div>
                      :
                      <div
                        key={j}
                        className={`
                    bg-base-300 p-4 flex flex-col items-center gap-2 text-xs 
                    ${c.span == 4 ? 'col-span-4' : c.span == 3 ? 'col-span-3' : c.span == 2 ? 'col-span-2' : 'col-span-1'}`
                        }>
                        <p className='text-center'>{c.courseCode}</p>
                        <p className='text-center'>({c.venue})</p>
                        <p className='text-center'>[{c.lecturer}]</p>
                        <p className='text-center'>{c.startTime} - {c.endTime}</p>
                      </div>
                  ))}
                </div>
              </>
            ))
            }
          </div>
        </section>
      </div>
    </main>
  )
}
