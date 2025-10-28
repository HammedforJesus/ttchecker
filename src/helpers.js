import { courses } from "./data";

export function getSchedule(programme) {
    const currentDayOfWeek = new Date().getDay();

    // Filter by programme
    let filtered = courses.filter(c => c.programme.includes(programme.toLowerCase()));

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

    // Group courses by level (string-safe)
    // const groupedByLevel = {};
    // result.forEach(course => {
    //     const levelKey = String(course.level); // ensure string
    //     if (!groupedByLevel[levelKey]) groupedByLevel[levelKey] = [];
    //     groupedByLevel[levelKey].push(course);
    // });

    return result.sort((a , b) => a.level - b.level);
}

export function getProgrammes(){

    const all = courses.map(c => c.programme).flat().map(c => c.toLowerCase())

    const cleaned = [...new Set(all)]

    return cleaned
}


// Get current time (in 24-hour format)

export function isClassHolding(startTime , endTime){
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