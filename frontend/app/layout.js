export const metadata = {
    title: {
        default: 'Arionys - Leading IT Company in Bangladesh',
        template: '%s | Arionys',
    },
    description: 'Arionys is a leading organization dedicated to advancing robotics, mechatronics and electrical project management in Bangladesh. Join our community of innovators.',
    keywords: ['robotics', 'mechatronics', 'Bangladesh', 'robotics education', 'NASA CONRAD CHALLENGE', 'Team EXO MAX', 'engineering', 'technology'],
    authors: [{ name: 'Arionys Team' }],
    creator: 'Arionys',
    publisher: 'Arionys',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'Arionys - Leading IT Company in Bangladesh',
        description: 'Arionys is a leading organization dedicated to advancing robotics, mechatronics and electrical project management in Bangladesh.',
        url: process.env.SITE_URL,
        siteName: 'Arionys',
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        title: 'Arionys',
        card: 'summary_large_image',
    },
    verification: {
        // Add your Google Search Console verification code here
        google: 'your-google-site-verification-code',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="canonical" href={process.env.SITE_URL} />
            </head>
            <body>{children}</body>
        </html>
    );
}
