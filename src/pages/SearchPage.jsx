import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LetterHover from '../components/LetterHover';
import WheelPicker from '../components/WheelPicker';

const TERMS = ['Spring 2026', 'Fall 2026'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIMES = Array.from({length: 24}, (_, i) => {
  const ampm = i >= 12 ? 'PM' : 'AM';
  const h = i % 12 === 0 ? 12 : i % 12;
  return `${h}:00 ${ampm}`;
});

export default function SearchPage({ exams, setExams }) {
  const [term, setTerm] = useState(TERMS[0]);
  const [day, setDay] = useState(DAYS[0]);
  const [time, setTime] = useState('9:00 AM');

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

      {/* GO TO CALENDAR LINK */}
      <Link to="/calendar" style={{ textDecoration: 'none', display: 'block', marginTop: '40px' }}>
        <button className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)', color: 'white', fontWeight: 600 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
          Go to Calendar {exams.length > 0 ? `(${exams.length})` : ''}
        </button>
      </Link>
    </section>
  );
}
