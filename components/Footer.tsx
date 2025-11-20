import Link from "next/link";

export default function Footer() {
    return (
        <footer className='bg-gray-900 text-white mt-16'>
            <div className='max-w-7xl mx-auto px-4 md:px-8 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div>
                        <h3
                            className='text-xl font-bold mb-4'
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            AKIC Payandapur
                        </h3>
                        <p
                            className='text-gray-400 mb-2'
                            style={{ fontFamily: "Nunito, sans-serif" }}
                        >
                            Dilari Road Payandapur, Moradabad - 244602
                        </p>
                        <p
                            className='text-gray-400'
                            style={{ fontFamily: "Nunito, sans-serif" }}
                        >
                            A Goverment Inter College
                        </p>
                        <p className='text-gray-400 mt-2 text-sm'>
                            Established in 1966
                        </p>
                    </div>

                    <div>
                        <h3
                            className='text-lg font-bold mb-4'
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Quick Links
                        </h3>
                        <ul
                            className='space-y-2 text-gray-400'
                            style={{ fontFamily: "Nunito, sans-serif" }}
                        >
                            <li>
                                <Link
                                    href='/'
                                    className='hover:text-white transition'
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a
                                    href='/subjects'
                                    className='hover:text-white transition'
                                >
                                    Subjects
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/notices'
                                    className='hover:text-white transition'
                                >
                                    Notice Board
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/resources'
                                    className='hover:text-white transition'
                                >
                                    Resources
                                </a>
                            </li>
                            <li>
                                <a
                                    href='/gallery'
                                    className='hover:text-white transition'
                                >
                                    Gallery
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3
                            className='text-lg font-bold mb-4'
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Contact Us
                        </h3>
                        <ul
                            className='space-y-2 text-gray-400'
                            style={{ fontFamily: "Nunito, sans-serif" }}
                        >
                            <li>Email: akicpayandapur@gmail.com</li>
                            {/* <li>Email: collegelnd@gmail.com</li> */}
                            <li>Phone: +91 7500188177</li>
                            <li>AKIC Payandapur</li>
                            <li>Uttar Pradesh - 244602</li>
                        </ul>
                    </div>
                </div>

                <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
                    <p>
                        &copy; {new Date().getFullYear()} AKIC Payandapur. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
