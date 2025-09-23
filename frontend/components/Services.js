import React, { useState, useRef } from 'react';
import {
  FaMobileAlt, FaLaptopCode, FaCogs, FaFlask, FaFileAlt,
  FaRobot, FaCube, FaShapes, FaVideo, FaFilm,
  FaPaintBrush, FaIdCard, FaChevronRight, FaTimes
} from 'react-icons/fa';
import { motion, useInView, useAnimation } from 'framer-motion';

const borderColors = [
  'border-purple-500', 'border-indigo-500', 'border-lime-400',
  'border-blue-400', 'border-yellow-400', 'border-green-400',
  'border-teal-400', 'border-fuchsia-400', 'border-cyan-400',
  'border-pink-400', 'border-orange-400', 'border-red-400',
  'border-emerald-500', 'border-amber-500', 'border-sky-500', 'border-rose-500',
];

const services = [
  {
    title: 'App Development',
    icon: <FaMobileAlt className="text-purple-500 text-4xl mb-3" />,
    desc: 'Custom mobile apps for iOS and Android',
    details:
      'We build intuitive and robust mobile applications tailored to your needs, delivering seamless experiences that keep users engaged on their favorite devices.',
  },
  {
    title: 'Web Development',
    icon: <FaLaptopCode className="text-indigo-500 text-4xl mb-3" />,
    desc: 'Responsive and secure websites & apps',
    details:
      'From simple sites to complex web apps, we craft solutions that look great, perform fast, and provide secure experiences across all platforms.',
  },
  {
    title: 'Business Automation',
    icon: <FaCogs className="text-lime-500 text-4xl mb-3" />,
    desc: 'Automate your business workflows',
    details:
      'We develop automation software to simplify and streamline your day-to-day operations, reducing errors and boosting productivity effortlessly.',
  },
  {
    title: 'Project & Prototype Development',
    icon: <FaFlask className="text-blue-400 text-4xl mb-3" />,
    desc: 'Rapid prototypes turning ideas real',
    details:
      'Transform your concepts into working prototypes fast, helping you test, iterate, and validate ideas before full-scale production.',
  },
  {
    title: 'Project Paper',
    icon: <FaFileAlt className="text-yellow-400 text-4xl mb-3" />,
    desc: 'Clear and professional project documentation',
    details:
      'We create detailed, well-structured project papers and documentation that clearly communicate your objectives, plans, and results to stakeholders.',
  },
  {
    title: 'Robotics & Programming Course',
    icon: <FaRobot className="text-teal-400 text-4xl mb-3" />,
    desc: 'Practical robotics and programming training',
    details:
      'Our hands-on courses cover robotics systems and programming languages, empowering learners to build real-world tech solutions confidently.',
  },
  {
    title: '3D Design',
    icon: <FaCube className="text-cyan-400 text-4xl mb-3" />,
    desc: 'Realistic 3D models and visualizations',
    details:
      'Bring your ideas to life with detailed 3D models and visuals designed for presentations, prototyping, and immersive experiences.',
  },
  {
    title: '3D Printing',
    icon: <FaShapes className="text-pink-400 text-4xl mb-3" />,
    desc: 'High-precision 3D printing services',
    details:
      'We transform digital 3D models into physical objects using advanced printing technology, ensuring accuracy and durability every step of the way.',
  },
  {
    title: 'Video Shooting',
    icon: <FaVideo className="text-orange-400 text-4xl mb-3" />,
    desc: 'Professional video production services',
    details:
      'Capture your story with our expert video shooting team, delivering high-quality footage tailored for your audience and goals.',
  },
  {
    title: 'Video Editing',
    icon: <FaFilm className="text-red-400 text-4xl mb-3" />,
    desc: 'Creative video editing and post-production',
    details:
      'From raw footage to polished content, we provide editing services that enhance your videos with style, effects, and clear storytelling.',
  },
  {
    title: 'Graphic Design',
    icon: <FaPaintBrush className="text-fuchsia-400 text-4xl mb-3" />,
    desc: 'Eye-catching graphic and brand design',
    details:
      'We design striking logos, branding materials, and visuals that communicate your message and build lasting connections with your audience.',
  },
  {
    title: 'NFC Card Printing',
    icon: <FaIdCard className="text-green-400 text-4xl mb-3" />,
    desc: 'Custom NFC and smart card printing',
    details:
      'We produce fully customized NFC cards that integrate your brand and technology, perfect for access control, attendance, and interactive marketing.',
  },
];

const Services = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const controls = useAnimation();

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-white dark:bg-[#2d3748] transition-colors duration-500"
    >
      <div className="container mx-auto max-w-6xl px-6 xl:px-0">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Empowering your ideas with technology, creativity, and innovation. Discover how we can
            help.
          </p>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-600 rounded-full mb-2" />
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60, x: idx % 2 === 0 ? -40 : 40 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  transition: { delay: idx * 0.12, duration: 0.7, type: 'spring', stiffness: 60 },
                },
              }}
              className="group relative flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              style={{ zIndex: 1 }}
            >
              {/* Offset Border */}
              <span
                className={`absolute top-2 left-2 w-full h-full rounded-2xl border-4 ${
                  borderColors[idx % borderColors.length]
                }`}
                style={{
                  zIndex: 0,
                  filter: 'blur(0px)',
                  background: 'none',
                  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.04)',
                }}
              />
              {/* Main Card */}
              <div
                className="relative bg-white dark:bg-[#2d3748] rounded-2xl shadow-lg p-7 w-full h-full border-2 border-gray-300 dark:border-gray-700 flex flex-col items-center text-center"
                style={{ zIndex: 1 }}
              >
                <div className="mb-2 group-hover:animate-bounce">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-2 pb-16 pr-4">{service.desc}</p>
                <button
                  aria-label={openIdx === idx ? 'Hide details' : 'Show details'}
                  onClick={() => handleToggle(idx)}
                  className="absolute bottom-5 right-5 flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-gray-700 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md"
                  style={{ zIndex: 2 }}
                >
                  {openIdx === idx ? (
                    <FaTimes className="text-purple-600 text-xl transition-transform duration-300" />
                  ) : (
                    <FaChevronRight className="text-purple-600 text-xl transition-transform duration-300" />
                  )}
                </button>
                {openIdx === idx && (
                  <div className="mt-4 text-gray-800 dark:text-gray-100 text-sm bg-white dark:bg-[#2d3748] rounded-lg p-4 border border-purple-200 dark:border-purple-700 shadow-inner animate-fade-in">
                    {service.details}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {/* CTA Button */}
        <div className="flex justify-center mt-14">
          <a
            href="/contact"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 active:scale-95 active:opacity-90 select-none text-lg"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
