import React, { useState } from 'react';
import LetterHover from '../components/LetterHover';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, subject, message } = formData;
    const body = `Name: ${name}%0D%0AMessage: ${message}`;
    window.location.href = `mailto:nononsencesmit@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact-page fade-in">
      <div className="contact-container">
        {/* LEFT SIDE: Content */}
        <div className="contact-info">
          <h1 className="contact-heading">
            <LetterHover text="Contact Me!" />
          </h1>
          <p className="contact-text">
            Thank you for your interest in getting in touch! 
          </p>
          <p className="contact-text">
            I value open communication and welcome any inquiries, feedback, or collaboration opportunities. Please don't hesitate to get in touch with me by filling out the contact form, especially if you find any errors!
          </p>
          
          <div className="contact-icons">
            <div className="contact-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mail-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <input 
                type="text" 
                name="subject" 
                placeholder="Subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <textarea 
                name="message" 
                placeholder="Message" 
                rows="8"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-primary" id="contact-send-btn">
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
