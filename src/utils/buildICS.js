export function buildICS(exams) {
  let icsString = "BEGIN:VCALENDAR\n";
  icsString += "VERSION:2.0\n";
  icsString += "PRODID:-//NWMSU Scheduler//EN\n";

  exams.forEach(exam => {
    // start: [2026, 5, 4, 8, 0]
    // Month in this array is 1-indexed (5 = May), so we pad it directly
    const year = exam.start[0];
    const month = String(exam.start[1]).padStart(2, '0');
    const day = String(exam.start[2]).padStart(2, '0');
    
    const startHour = String(exam.start[3]).padStart(2, '0');
    const startMinute = String(exam.start[4]).padStart(2, '0');
    
    // Add duration to calculate end time
    let endHourNum = exam.start[3] + (exam.duration?.hours || 0);
    let endMinuteNum = exam.start[4] + (exam.duration?.minutes || 0);
    if (endMinuteNum >= 60) {
      endHourNum += Math.floor(endMinuteNum / 60);
      endMinuteNum = endMinuteNum % 60;
    }
    const endHour = String(endHourNum).padStart(2, '0');
    const endMinute = String(endMinuteNum).padStart(2, '0');

    const dtStart = `${year}${month}${day}T${startHour}${startMinute}00`;
    const dtEnd = `${year}${month}${day}T${endHour}${endMinute}00`;

    // UID generation: mwf-0900-spring2026@nwmsu-scheduler
    const sanitizedDay = exam.day.toLowerCase().replace(/[^a-z]/g, '');
    const sanitizedTime = exam.time.replace(/[^a-z0-9]/gi, '');
    const sanitizedTerm = exam.term.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const uid = `${sanitizedDay}-${sanitizedTime}-${sanitizedTerm}@nwmsu-scheduler`;

    icsString += "BEGIN:VEVENT\n";
    icsString += `UID:${uid}\n`;
    icsString += `SUMMARY:${exam.title}\n`;
    icsString += `DTSTART:${dtStart}\n`;
    icsString += `DTEND:${dtEnd}\n`;
    icsString += `DESCRIPTION:${exam.description}\n`;
    icsString += `LOCATION:${exam.location || 'TBD'}\n`;
    icsString += "STATUS:CONFIRMED\n";
    icsString += "END:VEVENT\n";
  });

  icsString += "END:VCALENDAR";
  return icsString;
}
