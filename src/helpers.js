import { courses } from "./data";

export function getSchedule(programme) {
    const currentDayOfWeek = new Date().getDay();

    // Filter by programme
    let filtered = courses.filter(c => c.programme.map(p => p.toLowerCase()).includes(programme.toLowerCase()));

    // Keep only today's courses
    filtered = filtered.filter(c =>
        c.dayAndTime.some(dt => dt.day == currentDayOfWeek)
    );

    // Add classActive to each
    const result = filtered.map(c => {
        const b = c.dayAndTime
            .filter(dt => dt.day == currentDayOfWeek)
            .map(dt => ({
                ...dt,
                classActive: isClassHolding(dt.startTime, dt.endTime)
            }));

        return { ...c, dayAndTime: b };
    });

    return result.sort((a, b) => a.level - b.level);
}

export function getProgrammes() {

    const all = courses.map(c => c.programme).flat().map(c => c.toLowerCase())

    const cleaned = [...new Set(all)]

    return cleaned
}


// Get current time (in 24-hour format)

export function isClassHolding(startTime, endTime) {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ":" +
        now.getMinutes().toString().padStart(2, '0');

    return isTimeInRange(currentTime, startTime, endTime)
}

// export Function to check if current time is within range
export function isTimeInRange(current, start, end) {
    //console.log(current , start , end)
    const currentMinutes = convertToMinutes(current);
    const startMinutes = convertToMinutes(start);
    const endMinutes = convertToMinutes(end);

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}

// Helper export function: converts "HH:MM" to total minutes
export function convertToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}


export function timetableDayLayoutAlgorithm(courses, day) {

    const endHourInMinutes = 17 * 60

    const startHourInMinutes = 8 * 60 + 15

    const breakHourInMinutes = 12 * 60 + 15

    const increment = 60

    let currentHourInMinutes = startHourInMinutes

    let filteredCourses = courses.map(c => {
        const dayAndTime = c.dayAndTime.find(dt => dt.day == day)

        if (!dayAndTime) return null

        return {
            ...c,
            day,
            startTime: dayAndTime.startTime,
            endTime: dayAndTime.endTime,
            startTimeInMinutes: convertToMinutes(dayAndTime.startTime),
            endTimeInMinutes: convertToMinutes(dayAndTime.endTime),
        }
    }).filter(c => c != null).sort((a, b) => a.startTimeInMinutes - b.startTimeInMinutes)

    filteredCourses = filteredCourses.map(c => {
        const span = Math.floor((c.endTimeInMinutes - c.startTimeInMinutes) / increment)

        return {
            ...c,
            span
        }
    })

    const layout = []

    while (filteredCourses.length) {
        const nextCourse = filteredCourses.find(course => course.startTimeInMinutes == currentHourInMinutes)

        if(currentHourInMinutes >= breakHourInMinutes && currentHourInMinutes < breakHourInMinutes + 45){
            //This is break time
            layout.push(null)
            currentHourInMinutes = breakHourInMinutes + 45
        }else if (nextCourse) {
            //Insert course
            layout.push(nextCourse)
            currentHourInMinutes += increment * nextCourse.span
            filteredCourses = filteredCourses.filter(c => c !== nextCourse)
        }else {
            layout.push(null) // No course at this time slot
            currentHourInMinutes += increment
        }


        if (currentHourInMinutes > endHourInMinutes) currentHourInMinutes = startHourInMinutes
    }

    // console.log(layout)

    return layout
}