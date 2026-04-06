import React from 'react';
import { Link } from 'react-router-dom';
import { buildICS } from '../utils/buildICS';
import LetterHover from '../components/LetterHover';

export default function CalendarPage({ exams, setExams }) {
  const handleExport = () => {
    if (exams.length === 0) return;
    const icsString = buildICS(exams);
    
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      alert("Note: If you are on a mobile device and want to download the calendar, make sure to open this page in a standard browser (like Safari or Chrome), not an in-app browser like Instagram or Snapchat.");
    }

    const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'nwmsu-final-exams.ics';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const removeExam = (id) => {
    setExams(exams.filter(ex => ex.id !== id));
  };

  return (
    <section className="search-page fade-in">
      <h1 className="search-heading">
        <LetterHover text="Calendar" />
      </h1>
      
      {exams.length === 0 ? (
        <p className="search-text" style={{ marginTop: '20px' }}>No exams in your schedule.</p>
      ) : (
        <div className="exam-queue fade-in" style={{ marginTop: '20px' }}>
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

          <button onClick={handleExport} className="btn-secondary" style={{ marginTop: 24, padding: '18px 30px', fontSize: '15px', color: 'white', border: '1px solid rgba(255,255,255,0.8)', borderRadius: '12px' }}>
            Export Cal
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, marginLeft: '8px' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
