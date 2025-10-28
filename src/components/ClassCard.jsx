import { Clock10Icon } from "lucide-react"



export default function ClassCard({ courseCode , level , startTime , endTime , active }) {


    return (
        <div className="card bg-base-200 w-full md:w-[350px] shadow-sm h-max">
            <div className="card-body flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="card-title">{courseCode}</h2>
                    <h2 className="card-title">{level}</h2>
                </div>
                <div className="flex items-center justify-between">

                    <div className='flex items-center gap-2'>
                        <Clock10Icon className='size-5' />
                        <p>{startTime} - {endTime}</p>
                    </div>

                    <div className={`badge ${ active ? 'badge-primary animate-pulse' : 'badge-error' }`}>{ active ? "Class Holding" : "Not in session" }</div>
                </div>
            </div>
        </div>
    )
}