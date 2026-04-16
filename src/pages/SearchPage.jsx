import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LetterHover from '../components/LetterHover';
import WheelPicker from '../components/WheelPicker';

const TERMS = ['Spring 2026', 'Fall 2026'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIMES = Array.from({length: 48}, (_, i) => {
  const totalMinutes = i * 30;
  const hour = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:${minutes === 0 ? '00' : '30'} ${ampm}`;
});

export default function SearchPage({ exams, setExams }) {
  const [term, setTerm] = useState(TERMS[0]);
  const [day, setDay] = useState(DAYS[0]);
  const [time, setTime] = useState('9:00 AM');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fahhhSound = new Audio('/fahhh.mp3');

  const handleAddClass = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Prevent adding duplicates
    const exists = exams.find(ex => ex.term === term && ex.day === day && ex.time === time);
    if (exists) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({ semester: term, day, time });
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(`${API_URL}/api/lookup?${params}`);
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg('No exam block found for that combination. Try a different time.');
        fahhhSound.play();
        setLoading(false);
        return;
      }

      // Parse exam_date string like "Wednesday April 29 2026" into [year, month, day]
      const dateParts = data.exam_date.trim().split(' ');
      const monthMap = { January:1,February:2,March:3,April:4,May:5,June:6,
                         July:7,August:8,September:9,October:10,November:11,December:12 };
      const examYear = parseInt(dateParts[dateParts.length - 1]);
      const examMonth = monthMap[dateParts[dateParts.length - 2]] || 1;
      const examDay = parseInt(dateParts[dateParts.length - 3]);

      // Parse start time from exam_time string like "8:00 AM - 10:00 AM"
      const startTimePart = data.exam_time.split('-')[0].trim(); // "8:00 AM"
      const [timePart, ampm] = startTimePart.split(' ');
      let [startHour, startMin] = timePart.split(':').map(Number);
      if (ampm === 'PM' && startHour !== 12) startHour += 12;
      if (ampm === 'AM' && startHour === 12) startHour = 0;

      setExams(prev => [...prev, {
        id: Date.now(),
        term,
        day,
        time,
        examDate: data.exam_date,
        examTime: data.exam_time,
        start: [examYear, examMonth, examDay, startHour, startMin],
        duration: { hours: 2, minutes: 0 },
        title: `NWMSU Final Exam: ${term}`,
        description: `Final exam for the class meeting on ${day}s at ${time}.`,
        location: 'TBD'
      }]);
    } catch (err) {
      setErrorMsg('Could not connect to the server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="search-page fade-in">
      <h1 className="search-heading">
        <LetterHover text="Search" />
      </h1>
      
      <div className="search-text" style={{ marginBottom: '16px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px' }}>Class Day Mapping:</p>
        <p style={{ marginBottom: '8px' }}>• <strong>MWF</strong> or <strong>Wednesday-only</strong> classes ➔ Select <strong>Monday</strong></p>
        <p>• <strong>Tues/Thurs</strong> or <strong>Thursday-only</strong> classes ➔ Select <strong>Tuesday</strong></p>
      </div>
      
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

        <button type="submit" className="btn-primary search-submit-btn" aria-label="Add to Schedule" disabled={loading}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {loading ? 'Looking up...' : 'Add to Schedule'}
        </button>

        {errorMsg && (
          <p style={{ color: '#ff6b6b', marginTop: '12px', fontSize: '0.9rem', textAlign: 'center' }}>
            {errorMsg}
          </p>
        )}

      </form>

      {/* GO TO CALENDAR LINK */}
      <Link to="/calendar" style={{ textDecoration: 'none', display: 'block', marginTop: '20px' }}>
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
