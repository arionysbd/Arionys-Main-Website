import Head from 'next/head'
import React, { useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

// import '../styles/tailwind.css'

const contact = () => {
    const router = useRouter();

    const [redirect, setRedirect] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")

    React.useEffect(() => {
        if (router.query.subject) {
            setSubject(router.query.subject);
        }
    }, [router.query.subject]);

    async function sendEmail(ev) {
        ev.preventDefault();
        const data = { message, subject, name, phone, email };
        await axios.post('/api/sendEmail', data)

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Mail Sent successfully"
        });
        setRedirect(true);
    };

    if (redirect) {
        router.push('/')
        return null;
    }

    return (
        <>
            <Head>
                <title>Contact Us | Arionys</title>
                <meta name="description" content="Get in touch with Arionys to learn more about our robotics, mechatronics, and electrical project management initiatives. Fill out the form and we will get back to you promptly." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Contact Us | Arionys" />
                <meta property="og:description" content="Reach out to Arionys for inquiries about our robotics and mechatronics programs. We are here to answer your questions and explore new opportunities together." />
                <meta property="og:image" content="/img/contact.png" />
                <meta property="og:url" content={`${process.env.SITE_URL}/contact`} />
                <meta property="og:type" content="website" />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us | Arionys" />
                <meta name="twitter:description" content="Get in touch with Arionys to learn more about our robotics and mechatronics initiatives. We are ready to assist you with your inquiries." />
                <meta name="twitter:image" content="/img/contact.png" />
                <meta name="twitter:site" content="@yourtwitterhandle" />
            </Head>

            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#2d3748] py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-[#232946] rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-blue-100 dark:border-blue-900">
                {/* Left: Info & Social */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-300 mb-4">Contact Arionys</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-200 mb-6">We'd love to hear from you! Whether you have a question about our software solutions, want to discuss a project, or just want to connect, our team is ready to help.</p>
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                    <svg className="w-6 h-7 text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z" />
</svg>

                      <span className="text-gray-700 dark:text-gray-200">info@arionys.com</span>
                    </div>
                    <div className="flex items-center mb-2">
                    <svg className="w-6 h-7 text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h1a2 2 0 012 1.72c.1.58.3 1.14.59 1.65a2 2 0 01-.45 2.45l-.54.44a16.016 16.016 0 006.28 6.28l.44-.54a2 2 0 012.45-.45c.51.29 1.07.49 1.65.59A2 2 0 0019 18v1a2 2 0 01-2 2h-.5A17.5 17.5 0 013 5.5V5z" />
</svg>

                      <span className="text-gray-700 dark:text-gray-200">+880 1571 337059</span>
                    </div>
                    <div className="flex items-center">
                    <svg className="w-6 h-7 text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-6.5 8-13a8 8 0 10-16 0c0 6.5 8 13 8 13z" />
</svg>



                      <span className="text-gray-700 dark:text-gray-200">Dhaka, Bangladesh</span>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4">
  <a href="https://facebook.com/arionysbd" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.019 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.019 22 12z" />
    </svg>
  </a>

  <a href="https://linkedin.com/company/arionys" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
    </svg>
  </a>

  <a href="https://x.com/arionys" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.422.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.062c0 2.385 1.693 4.374 4.188 4.827-.693.188-1.452.232-2.224.084.627 1.956 2.444 3.377 4.6 3.417-2.07 1.623-4.678 2.348-7.29 2.034 2.179 1.397 4.768 2.213 7.557 2.213 9.142 0 14.307-7.721 13.995-14.646.962-.689 1.797-1.56 2.457-2.549z" />
    </svg>
  </a>

  <a href="https://instagram.com/arionys" target="_blank" rel="noopener" className="text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-500">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.5 2A5.5 5.5 0 002 7.5v9A5.5 5.5 0 007.5 22h9a5.5 5.5 0 005.5-5.5v-9A5.5 5.5 0 0016.5 2h-9zm0 2h9A3.5 3.5 0 0120 7.5v9a3.5 3.5 0 01-3.5 3.5h-9A3.5 3.5 0 014 16.5v-9A3.5 3.5 0 017.5 4zm4.5 3a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm0 2a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm5.25-.75a.75.75 0 100 1.5.75.75 0 000-1.5z" />
    </svg>
  </a>

  <a href="https://youtube.com/@arionys" target="_blank" rel="noopener" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500">
  <svg className="w-6 h-6" viewBox="0 0 576 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M549.7 124.1c-6.3-23.7-24.9-42.3-48.6-48.6C456.5 64 288 64 288 64s-168.5 0-213.1 11.5c-23.7 6.3-42.3 24.9-48.6 48.6C16 168.7 16 256 16 256s0 87.3 10.3 131.9c6.3 23.7 24.9 42.3 48.6 48.6C119.5 448 288 448 288 448s168.5 0 213.1-11.5c23.7-6.3 42.3-24.9 48.6-48.6 10.3-44.6 10.3-131.9 10.3-131.9s0-87.3-10.3-131.9zM232 334.7V177.3L345 256l-113 78.7z"/>
  </svg>
</a>


  <a href="https://github.com/arionys" target="_blank" rel="noopener" className="text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577 0-.285-.01-1.04-.015-2.042-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.466-1.332-5.466-5.932 0-1.31.467-2.382 1.235-3.222-.124-.304-.536-1.528.117-3.183 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 013.003-.403c1.018.005 2.044.137 3.003.403 2.29-1.552 3.297-1.23 3.297-1.23.655 1.655.243 2.879.12 3.183.77.84 1.233 1.912 1.233 3.222 0 4.61-2.804 5.624-5.475 5.921.43.37.814 1.102.814 2.222 0 1.604-.015 2.896-.015 3.286 0 .319.192.694.8.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" clipRule="evenodd" />
    </svg>
  </a>
</div>

                </div>
                {/* Right: Contact Form */}
                <div className="flex flex-col justify-center">
                  <form onSubmit={sendEmail} className="bg-white dark:bg-[#232946] rounded-2xl shadow-lg p-8 space-y-5 border-2 border-blue-100 dark:border-blue-900">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required value={name} onChange={ev => setName(ev.target.value)} type='text' placeholder='Full Name'
                        className="w-full rounded-lg h-12 px-5 bg-blue-50 dark:bg-[#1a2236] text-gray-800 dark:text-gray-100 text-base outline-none border border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-400" />
                      <input required value={email} onChange={ev => setEmail(ev.target.value)} type='email' placeholder='Email Address'
                        className="w-full rounded-lg h-12 px-5 bg-blue-50 dark:bg-[#1a2236] text-gray-800 dark:text-gray-100 text-base outline-none border border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <input required value={subject} onChange={ev => setSubject(ev.target.value)} type='text' placeholder='Subject'
                      className="w-full rounded-lg h-12 px-5 bg-blue-50 dark:bg-[#1a2236] text-gray-800 dark:text-gray-100 text-base outline-none border border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-400" />
                    <input required value={phone} onChange={ev => setPhone(ev.target.value)} type='tel' placeholder='Phone Number'
                      className="w-full rounded-lg h-12 px-5 bg-blue-50 dark:bg-[#1a2236] text-gray-800 dark:text-gray-100 text-base outline-none border border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-400" />
                    <textarea required value={message} onChange={ev => setMessage(ev.target.value)} placeholder='Your Message' rows="5"
                      className="w-full rounded-lg px-5 py-3 bg-blue-50 dark:bg-[#1a2236] text-gray-800 dark:text-gray-100 text-base outline-none border border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-400"></textarea>
                    <button type='submit'
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-md hover:from-blue-600 hover:to-pink-600 transition-all duration-200">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
        </>
    )
}

export default contact
