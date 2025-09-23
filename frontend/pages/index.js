import Head from "next/head";
import Link from "next/link";
import Services from "@/components/Services";
import Additionalinfo from "@/components/Additionalinfo";
import Pricing from "@/components/Pricing";
// import Advisor from "@/components/Advisor";
import Image from "next/image";
import Typed from 'typed.js';
import { useEffect, useRef } from "react";

export default function Home() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Problem Solving', 'Exploring science', 'Innovation'],
      loop: true,
      loopCount: Infinity,
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Arionys - Software Solution Company</title>
        <meta name="description" content="Arionys is a leading software solution company specializing in custom software development, digital transformation, and innovative IT solutions for businesses worldwide." />
        <meta name="keywords" content="Arionys, software solution company, software development, digital transformation, IT solutions, web development, app development, enterprise software, SaaS, Bangladesh, technology partner, business automation, cloud solutions, AI, machine learning, robotics, innovation" />
        <meta name="author" content="Arionys Software Solutions" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="rating" content="General" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Arionys - Software Solution Company" />
        <meta property="og:description" content="Arionys delivers world-class software solutions, digital transformation, and IT consulting for businesses of all sizes. Partner with us to accelerate your growth." />
        <meta property="og:image" content="/img/Coder.png" />
        <meta property="og:url" content={process.env.SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Arionys" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arionys - Software Solution Company" />
        <meta name="twitter:description" content="Transform your business with Arionys: custom software, web & app development, and digital innovation." />
        <meta name="twitter:image" content="/img/Coder.png" />
        <meta name="twitter:image:alt" content="Arionys logo" />
        <meta name="twitter:site" content="@Arionys" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="overflow-hidden header_data_section bg-white dark:bg-[#2d3748] transition-colors duration-500">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info" data-aos="fade-right">
            <h1>Hi, This is <span>Arionys</span>.<br /> Your Software Solution Partner</h1>
            <h3 className="text-left md:text-center">We empower businesses with <br className='hidden max-[680px]:block'/> <span ref={el} /></h3>
            <div className="flex gap-2">
              <Link href='/contact'><button>Contact Us</button></Link>
              <Link href='/about'><button>About Us</button></Link>
              <Link href='/members'><button>Employees</button></Link>
              {/* <Link href='/members'><button>Donate</button></Link>
              <Link href='/members'><button>Join Arionys</button></Link> */}
            </div>
            
          </div>
          <div className="rightheader_img" data-aos="zoom-in">
            {/* <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div> */}
            {/* <Image src="/img/Coder.png" alt="Coder working on a project" height="100" width="100" /> */}
          </div>
        </div>
        <Additionalinfo />
        <Services />
        {/* <Pricing /> */}
        {/* <Advisor /> */}
      </section>
    </>
  );
}
