import React, { useState } from 'react';
import * as ics from 'ics';
import LetterHover from '../components/LetterHover';
import WheelPicker from '../components/WheelPicker';

const TERMS = ['Spring 2026', 'Fall 2026'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIMES = Array.from({length: 24}, (_, i) => {
  const ampm = i >= 12 ? 'PM' : 'AM';
  const h = i % 12 === 0 ? 12 : i % 12;
  return `${h}:00 ${ampm}`;
});

export default function SearchPage() {
  const [term, setTerm] = useState(TERMS[0]);
  const [day, setDay] = useState(DAYS[0]);
  const [time, setTime] = useState('9:00 AM');
  const [exams, setExams] = useState([]);

  const handleAddClass = (e) => {
    e.preventDefault();
    
    // Prevent adding duplicates
    const exists = exams.find(ex => ex.term === term && ex.day === day && ex.time === time);
    if (!exists) {
      setExams([...exams, {
        id: Date.now(),
        term,
        day,
        time,
        // Mock data mapping (will be hooked up to DB later)
        examDate: 'Monday, May 4, 2026',
        examTime: '8:00 AM - 10:00 AM',
        
        // Data format required by `ics` library
        start: [2026, 5, 4, 8, 0], 
        duration: { hours: 2, minutes: 0 },
        title: `NWMSU Final Exam: ${term}`,
        description: `Final exam for the class meeting on ${day}s at ${time}.`,
        location: 'TBD'
      }]);
    }
  };

  const handleExport = () => {
    const events = exams.map(ex => ({
      title: ex.title,
      description: ex.description,
      start: ex.start,
      duration: ex.duration,
      location: ex.location,
    }));

    ics.createEvents(events, (error, value) => {
      if (error) {
        console.error(error);
        alert('Failed to generate calendar.');
        return;
      }
      const file = new File([value], 'nwmsu-final-exams.ics', { type: 'text/calendar' });
      const url = URL.createObjectURL(file);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'nwmsu-final-exams.ics';
      anchor.click();
      URL.revokeObjectURL(url);
    });
  };

  const removeExam = (id) => {
    setExams(exams.filter(ex => ex.id !== id));
  };

  return (
    <section className="search-page fade-in">
      <h1 className="search-heading">
        <LetterHover text="Search" />
      </h1>
      
      <p className="search-text">
        Find your exam schedule by entering your regular class meeting time (e.g. MWF 9:00 AM). 
      </p>
      
      <p className="search-text">
        Additionally, you have the option to search for multiple courses simultaneously. Just separate your search queries with a comma, for example: MWF 9:00 AM, TR 2:00 PM.
      </p>
      
      <p className="search-text">
        To add an exam to your calendar, simply click the button. Once you are done, go to the Calendar section and export your personalized schedule!
      </p>

      <form className="search-form" onSubmit={handleAddClass}>
        
        <div className="search-filters-grid">
          <WheelPicker 
            label="Term" 
            items={TERMS} 
            value={term} 
            onChange={setTerm} 
          />
          
          <WheelPicker 
            label="Day" 
            items={DAYS} 
            value={day} 
            onChange={setDay} 
          />
          
          <WheelPicker 
            label="Time" 
            items={TIMES} 
            value={time} 
            onChange={setTime} 
          />
        </div>

        <button type="submit" className="btn-primary search-submit-btn" aria-label="Add to Schedule">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add to Schedule
        </button>

      </form>

      {/* THE SHOPPING CART / EXAM QUEUE */}
      {exams.length > 0 && (
        <div className="exam-queue fade-in">
          <h2 className="queue-heading">Your Custom Schedule</h2>
          <div className="exam-list">
            {exams.map(exam => (
              <div key={exam.id} className="exam-card">
                <div className="exam-class-info">
                  <span className="exam-term">{exam.term}</span>
                  <span className="exam-meeting">{exam.day}s @ {exam.time}</span>
                </div>
                <div className="exam-final-time">
                  <strong>Final Exam:</strong> {exam.examDate} <br/> {exam.examTime}
                </div>
                <button 
                  onClick={() => removeExam(exam.id)} 
                  className="exam-remove-btn" 
                  aria-label="Remove"
                  title="Remove this class"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button onClick={handleExport} className="btn-primary" style={{ marginTop: 24, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '18px', fontSize: '15px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            EXPORT TO CALENDAR
          </button>
        </div>
      )}
    </section>
  );
}
