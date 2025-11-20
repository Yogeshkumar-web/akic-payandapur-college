import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Card from "@/components/ui/Card";

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main
                className='min-h-screen py-16'
                style={{ backgroundColor: "#F8FAFC" }}
            >
                <div className='max-w-7xl mx-auto px-4 md:px-8'>
                    <div className='mb-8'>
                        <h1
                            className='text-4xl md:text-5xl font-bold mb-4'
                            style={{
                                fontFamily: "Inter, sans-serif",
                                color: "#0F172A",
                            }}
                        >
                            Contact Us
                        </h1>
                        <p
                            className='text-lg text-gray-700'
                            style={{ fontFamily: "Nunito, sans-serif" }}
                        >
                            Get in touch with us for any queries or information
                            about our institution.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* Contact Information */}
                        <div className='space-y-6'>
                            <Card>
                                <h2
                                    className='text-2xl font-bold mb-6'
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        color: "#0F172A",
                                    }}
                                >
                                    Get in Touch
                                </h2>
                                <div className='space-y-4'>
                                    <div className='flex items-start space-x-4'>
                                        <div
                                            className='w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0'
                                            style={{
                                                backgroundColor: "#0B5FFF",
                                            }}
                                        >
                                            <svg
                                                className='w-6 h-6 text-white'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                                                />
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3
                                                className='font-bold text-gray-900 mb-1'
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                Address
                                            </h3>
                                            <p
                                                className='text-gray-700'
                                                style={{
                                                    fontFamily:
                                                        "Nunito, sans-serif",
                                                }}
                                            >
                                                AKIC Payandapur, Moradabad
                                                <br />
                                                Uttar Pradesh - 244602
                                                <br />
                                                India
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-start space-x-4'>
                                        <div
                                            className='w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0'
                                            style={{
                                                backgroundColor: "#0B5FFF",
                                            }}
                                        >
                                            <svg
                                                className='w-6 h-6 text-white'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3
                                                className='font-bold text-gray-900 mb-1'
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                Phone
                                            </h3>
                                            <p
                                                className='text-gray-700'
                                                style={{
                                                    fontFamily:
                                                        "Nunito, sans-serif",
                                                }}
                                            >
                                                +91 7500188177
                                                <br />
                                                +91 6395446776
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-start space-x-4'>
                                        <div
                                            className='w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0'
                                            style={{
                                                backgroundColor: "#0B5FFF",
                                            }}
                                        >
                                            <svg
                                                className='w-6 h-6 text-white'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3
                                                className='font-bold text-gray-900 mb-1'
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                Email
                                            </h3>
                                            <p
                                                className='text-gray-700'
                                                style={{
                                                    fontFamily:
                                                        "Nunito, sans-serif",
                                                }}
                                            >
                                                akicpayandapur@gmail.com
                                                <br />
                                                collegeakic@gmail.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-start space-x-4'>
                                        <div
                                            className='w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0'
                                            style={{
                                                backgroundColor: "#0B5FFF",
                                            }}
                                        >
                                            <svg
                                                className='w-6 h-6 text-white'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3
                                                className='font-bold text-gray-900 mb-1'
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                Office Hours
                                            </h3>
                                            <p
                                                className='text-gray-700'
                                                style={{
                                                    fontFamily:
                                                        "Nunito, sans-serif",
                                                }}
                                            >
                                                Monday - Saturday: 8:00 AM -
                                                4:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Map */}
                            {/* <Card>
                                <h2
                                    className='text-2xl font-bold mb-4'
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        color: "#0F172A",
                                    }}
                                >
                                    Location
                                </h2>
                                <div className='aspect-video bg-gray-200 rounded-lg overflow-hidden'>
                                    <iframe
                                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531665!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1542093748247'
                                        width='100%'
                                        height='100%'
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading='lazy'
                                        referrerPolicy='no-referrer-when-downgrade'
                                    ></iframe>
                                </div>
                            </Card> */}
                        </div>

                        {/* Contact Form */}
                        <div>
                            <Card>
                                <h2
                                    className='text-2xl font-bold mb-6'
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        color: "#0F172A",
                                    }}
                                >
                                    Send us a Message
                                </h2>
                                <ContactForm />
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
