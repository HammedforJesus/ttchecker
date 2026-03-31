import { getProgrammes } from '../helpers'
import ClassCard from '../components/ClassCard'

const ResultView = ({ courses , matricNumber , onBack }) => {

    const programmes = getProgrammes()

    // const [selectedProgramme, setSelectedProgramme] = useState(programmes[0])

    // const [filteredCourses, setFilteredCourses] = useState([])

    // const [selectedLevel, setSelectedLevel] = useState('all levels')

    return (
        <div className='flex-1 flex-col p-4'>
            {/* <div className='flex flex-col md:flex-row w-full items-center justify-center gap-2'>
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
            </div> */}

            <button onClick={onBack} className='btn btn-accent w-full'>Go Back</button>

            {
                courses.length ?
                    <section className='flex-1 flex flex-col items-center gap-4 overflow-y-auto py-4'>
                        {courses.map((c, i) => (
                            <ClassCard key={i} level={`${c.level} LEVEL`} courseCode={c.courseCode} startTime={c.dayAndTime[0].startTime} endTime={c.dayAndTime[0].endTime} active={c.dayAndTime[0].classActive} />
                        ))}
                    </section>
                    :
                    <section className='flex-1 flex items-center justify-center'>
                        <h1 className='text-xl md:text-3xl text-center'>No classes for {matricNumber} today.</h1>
                    </section>
            }
        </div>
    )
}

export default ResultView