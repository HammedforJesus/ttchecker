import { createFileRoute, Link } from '@tanstack/react-router'
import { getProgrammes, getSchedule } from '../helpers'
import ClassCard from '../components/ClassCard'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})


function RouteComponent() {

    const programmes = getProgrammes()

    const [selectedProgramme, setSelectedProgramme] = useState(programmes[0])

    const [filteredCourses, setFilteredCourses] = useState([])

    const [selectedLevel, setSelectedLevel] = useState('all levels')

    useEffect(() => {
        setFilteredCourses(getSchedule(selectedProgramme).filter(c => selectedLevel == 'all levels' ? c : c.level == selectedLevel))
    }, [selectedLevel, selectedProgramme])

    return (
        <div className='flex-1 flex flex-col p-4 gap-2'>
            <Link className='btn btn-primary mx-auto w-full md:w-100' to="/matric-check">
                Check A Student
            </Link>
            <div className='flex flex-col md:flex-row w-full items-center justify-center gap-2'>
                <select value={selectedProgramme} onChange={(e) => setSelectedProgramme(e.target.value)} className="select select-primary not-md:flex-1">
                    <option disabled={true}>Select a programme</option>
                    {programmes.map((p, i) => (
                        <option key={i} value={p.toLowerCase()}>{p.toUpperCase()}</option>
                    ))}
                </select>

                <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="select select-primary md:w-max not-md:flex-1">
                    <option disabled={true}>Select a level</option>
                    {['all levels', '100', '200', '300', '400'].map((p, i) => (
                        <option key={i} value={p}>{p.toUpperCase()}</option>
                    ))}
                </select>
            </div>

            {
                filteredCourses.length ?
                    <section className='flex-1 flex flex-col items-center gap-4 overflow-y-auto py-4'>
                        {filteredCourses.map((c, i) => (
                            <ClassCard key={i} {...c} />
                        ))}
                    </section>
                    :
                    <section className='flex-1 flex items-center justify-center'>
                        <h1 className='text-xl md:text-3xl text-center'>No classes for {selectedLevel == 'all levels' ? '' : selectedLevel + ' level'} {selectedProgramme} today.</h1>
                    </section>
            }
        </div>
    )
}