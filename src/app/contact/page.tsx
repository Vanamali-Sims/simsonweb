'use client'

import { useState, FormEvent } from 'react'
import styles from './page.module.css';
import AnimatedBackground from '@/components/AnimatedBackground';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Simon', // Your name
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  return (
    <main className={styles.page}>
      <AnimatedBackground />
      <div className={styles.container}>
        {/* Contact Form Card */}
        <div className={styles.card}>
          <h1 className={styles.title}>Contact Me</h1>
          <div className={styles.underline}></div>
          
          <section className={styles.section}>
            <p className={styles.text}>
              I'm always open to new opportunities and collaborations. Whether you have a question
              or just want to say hi, I'll try my best to get back to you!
            </p>
          </section>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className={styles.input}
                placeholder="Your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className={styles.input}
                placeholder="your@email.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className={styles.textarea}
                placeholder="Your message"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
              <span className={styles.arrow}>→</span>
            </button>

            {status === 'success' && (
              <div className={`${styles.status} ${styles.success}`}>
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div className={`${styles.status} ${styles.error}`}>
                Oops! Something went wrong. Please try again later.
              </div>
            )}
          </form>
        </div>

        {/* Elsewhere Card */}
        <div className={`${styles.card} ${styles.elsewhereCard}`}>
          <h2 className={styles.subtitle}>
            <span className={styles.arrow}>→</span> elsewhere
          </h2>
          <div className={styles.links}>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub <span className={styles.arrow}>→</span>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn <span className={styles.arrow}>→</span>
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Twitter <span className={styles.arrow}>→</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
} 