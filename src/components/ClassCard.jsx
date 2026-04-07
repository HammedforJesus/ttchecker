import { BookIcon, Clock10Icon, GroupIcon, MapPinIcon, UserIcon } from "lucide-react"



export default function ClassCard({ courseCode , level , dayAndTime , lecturer , venue }) {


    return (
        <div className="card bg-base-200 w-full md:w-[350px] shadow-sm h-max">
            <div className="card-body flex flex-col gap-4">
                <div className="flex justify-between flex-col gap-2">
                    <h2 className="flex gap-2"> <BookIcon /> {courseCode}</h2>
                    <h2 className="flex gap-2"><GroupIcon /> {level} LEVEL</h2>
                    <h2 className="flex gap-2"><UserIcon /> {lecturer}</h2>
                    <h2 className="flex gap-2"><MapPinIcon /> {venue}</h2>
                </div>
                <div className="flex items-center justify-between">

                    <div className='flex items-center gap-2'>
                        <Clock10Icon className='size-5' />
                        <p>{dayAndTime[0].startTime} - {dayAndTime[0].endTime}</p>
                    </div>

                    <div className={`badge ${ dayAndTime[0].classActive ? 'badge-primary animate-pulse' : 'badge-error' }`}>{ dayAndTime[0].classActive ? "Class Holding" : "Not in session" }</div>
                </div>
            </div>
        </div>
    )
}