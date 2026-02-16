import React, { useEffect, useState } from 'react'
import Link from 'next/link'


const Services = () => {
    const [darkMode, setDarkMode] = useState(true);
    useEffect(() => {
        // Check local storage for dark mode preference on initial load
        const isDarkMode = localStorage.getItem('darkMode');
        setDarkMode(isDarkMode);
    }, [darkMode]);

    return (
        <div className="!my-9 container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 m">
            <h2 className={`mb-1 text-3xl font-extrabold leading-tight dark:text-gray-300 text-gray-900`}>Services</h2>
            <p className="mb-12 text-lg text-gray-500">Here are few of the awesome Services we provide.</p>
            <div className="w-full">
                <div className="flex flex-col w-full mb-10 sm:flex-row">
                    <div data-aos="fade-right" className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white dark:bg-gray-700 border-2 border-indigo-500 rounded-lg">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-700 dark:text-gray-100">Web Development</h3>
                                </div>
                                <p className="mt-3 mb-1 text-sm font-semibold text-indigo-500">Build Fast, Scalable & Stunning Websites</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We design and develop responsive, high-performance websites that elevate your brand, engage users, and drive business growth across all devices.</p>
                                <div className="mt-4">
                                    <Link href="/contact?subject=Web Development" className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 transition-colors">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="w-full sm:w-1/2">
                        <div className="relative h-full ml-0 md:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">App Development</h3>
                                </div>
                                <p className="mt-3 mb-1 text-sm font-semibold text-purple-500">Smart Mobile Apps for Modern Businesses</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We create intuitive, secure, and scalable Android & iOS applications tailored to your business goals and optimized for performance and user experience.</p>
                                <div className="mt-4">
                                    <Link href="/contact?subject=App Development" className="inline-block px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded hover:bg-purple-600 transition-colors">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-aos="zoom-in-right" className="flex flex-col w-full mb-5 sm:flex-row">
                    <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Custom Software Development</h3>
                                </div>
                                <p className="mt-3 mb-1 text-sm font-semibold text-blue-400">Software Built Exactly for Your Business</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We develop custom software solutions designed to solve complex challenges, streamline operations, and scale seamlessly with your organization.</p>
                                <div className="mt-4">
                                    <Link href="/contact?subject=Custom Software Development" className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded hover:bg-blue-500 transition-colors">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-aos="zoom-in-up" className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Business Automation</h3>
                                </div>
                                <p className="mt-3 mb-1 text-sm font-semibold text-yellow-400">Automate Smarter. Work Faster. Grow Bigger.</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We help businesses automate workflows, reduce manual effort, and increase productivity through intelligent automation, system integration, and data-driven process optimization.</p>
                                <div className="mt-4">
                                    <Link href="/contact?subject=Business Automation" className="inline-block px-4 py-2 text-sm font-medium text-white bg-yellow-400 rounded hover:bg-yellow-500 transition-colors">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-400 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-green-400 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">3D Services – VisionForge 3D</h3>
                                </div>
                                <p className="mt-3 mb-1 text-sm font-semibold text-green-500">From Digital Concepts to Physical Reality</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">VisionForge 3D delivers end-to-end 3D design, modeling, and high-quality 3D printing services—turning ideas into precise, tangible results with exceptional accuracy and detail.</p>
                                <div className="mt-4">
                                    <Link href="/contact?subject=3D Services – VisionForge 3D" className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-400 rounded hover:bg-green-500 transition-colors">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div data-aos="zoom-in-up" className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-red-400 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-red-400 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Sticker Printing</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-red-400 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We now offer high-quality sticker printing services! Whether you need custom designs for business, events, or personal use, our expert team ensures vibrant, durable stickers that make your message stick. Get your ideas printed with precision and style!</p>
                                
                                <div className="mt-5">
                                    <a href="https://forms.gle/UQDj7ox39X7jqGHQ7" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-block">
                                        Submit Your Sticker Designs
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div> */}




                </div>
            </div>
        </div>
    )
}

export default Services