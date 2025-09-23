import Head from "next/head";
import Link from "next/link";
import GalleryView from "@/components/GalleryView";
import { useState } from "react";
import Image from "next/image";

function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
        return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
}

export default function Product({ products }) {
    const LogoImage = `https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/37b0a981-7d1e-4c79-ae16-47d31e4be6fa.png`;
    const [displayedProducts, setDisplayedProducts] = useState(products.slice(0, 5));
    const [currentCount, setCurrentCount] = useState(5);
    const perPage = 5;

    const loadMoreProducts = () => {
        const nextCount = currentCount + perPage;
        setDisplayedProducts((prev) => [...prev, ...products.slice(currentCount, nextCount)]);
        setCurrentCount(nextCount);
    };

    return (
        <>
            <Head>
                <title>Our Products | Arionys - Robotics & Innovation</title>
                <meta
                    name="description"
                    content="Explore Arionys's innovative products, technology milestones, and recent achievements. Learn about our groundbreaking work in education and automation."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Our Products | Arionys" />
                <meta
                    property="og:description"
                    content="Explore Arionys's innovative products and groundbreaking work in robotics, automation, and education. Stay up to date with our latest technological advancements."
                />
                <meta property="og:url" content={`${process.env.SITE_URL}/products`} />
                <meta property="og:image" content='/img/projectthum.png' />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Our Products | Arionys" />
                <meta
                    name="twitter:description"
                    content="Explore Arionys's latest robotics and automation products. Learn how our innovative technologies are shaping the future."
                />
                <meta name="twitter:image" content='/img/projectthum.png' />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Arionys",
                            "url": `${process.env.SITE_URL}/products`,
                            "logo": "/img/logo.png",
                            "description": "Arionys is a leading innovation hub in robotics, education, and automation technology.",
                            "mainEntityOfPage": `${process.env.SITE_URL}/products`,
                            "image": "/img/default-image.png",
                            "author": {
                                "@type": "Organization",
                                "name": "Arionys",
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "Arionys",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "/img/logo.png",
                                },
                            },
                            "datePublished": new Date().toISOString(),
                            "dateModified": new Date().toISOString(),
                        }),
                    }}
                />
            </Head>

            <GalleryView
                img4text=""
                img4url={"https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/bd42147f-7422-4e22-aed3-e776b4bdb41a.jpg"}
                img3text=""
                img3url="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/2649a9c6-650c-43a6-97a5-778f4d2eb311.jpg"
                img2text=""
                img2url="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/3ce0adca-5524-4264-a45e-5faf773f816a.webp"
                img1text=""
                img1url="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/ca2916b5-4164-46e2-aae1-8144c135c976.jpg"
                headline="Our Products"
                description="....."
            />
            <section className="main_blog_section">
                <div className="container flex flex-sb flex-left flex-wrap">
                    <div className="leftblog_sec">
                        <h2>Recently Published</h2>
                        <div className="blogs_sec">
                            {displayedProducts.map((product) => {
                                const firstImageUrl = extractFirstImageUrl(product.description);
                                return (
                                    <div className="blog" key={product._id}>
                                        <div className="blogimg">
                                            <Link href={`/product/${product.slug}`}>
                                                <Image
                                                    src={firstImageUrl || "/img/noimage.jpg"}
                                                    alt={`Image for ${product.title} - Arionys Product`}
                                                    className="transition-transform hover:scale-105 duration-300 ease-in-out"
                                                    width={300}
                                                    height={200}
                                                />
                                            </Link>
                                        </div>
                                        <div className="bloginfo">
                                            <Link href={`/tag/${product.tags[0]}`}>
                                                <div className="blogtag">{product.tags[0]}</div>
                                            </Link>
                                            <Link href={`/product/${product.slug}`}>
                                                <h3>{product.title}</h3>
                                            </Link>
                                            <p>{product.metadescription}</p>
                                            <div className="blogauthor flex gap-1">
                                                <div className="blogaimg">
                                                    <img src={LogoImage} alt="author" />
                                                </div>
                                                <div className="flex flex-col flex-left gap-05">
                                                    <h4>Arionys</h4>
                                                    <span>
                                                        {new Date(product.createdAt).toLocaleDateString("en-US", {
                                                            month: "long",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="blogpagination flex justify-center mt-4">
                            {currentCount < products.length && (
                                <button onClick={loadMoreProducts}>
                                    Load More
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="rightblog_info">
                        {/* Add your Topics and Tags Section */}
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const baseUrl = req ? `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}` : "";

    // Try to fetch products from /api/getproduct, fallback to empty array if not found
    let products = [];
    try {
        const res = await fetch(`${baseUrl}/api/getproduct`);
        if (res.ok) {
            const data = await res.json();
            products = data.filter((product) => product.status === "publish");
        }
    } catch (e) {
        products = [];
    }

    return {
        props: {
            products,
        },
    };
} 