import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoticeCard from "@/components/NoticeCard";
import Button from "@/components/ui/Button";
import TopStripe from "@/components/TopStripe";
import CollegeBranding from "@/components/CollegeBranding";
import MainImages from "@/components/MainImages";

async function getLatestNotices() {
    try {
        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/notices`, {
            cache: "no-store",
        });
        if (response.ok) {
            const notices = await response.json();
            return notices.slice(0, 3); 
        }
        return [];
    } catch (error) {
        console.error("Error fetching notices:", error);
        return [];
    }
}

export default async function Home() {
    const latestNotices = await getLatestNotices();

    return (
        <>
            <TopStripe />
            <CollegeBranding />
            <Navbar />
            <main
                className='min-h-screen'
                style={{ backgroundColor: "#F8FAFC" }}
            >
                {/* Hero Section with College Image */}
                <section className='relative w-full h-[48vw] md:h-[420px] lg:h-[750px] overflow-hidden'>
                    <MainImages />
                </section>

                {/* Stats Section */}
                <section className='py-16 bg-white'>
                    <div className='max-w-7xl mx-auto px-4 md:px-8'>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 text-center'>
                            <div>
                                <h3
                                    className='text-4xl font-bold mb-2'
                                    style={{
                                        color: "#0B5FFF",
                                        fontFamily: "Inter, sans-serif",
                                    }}
                                >
                                    300+
                                </h3>
                                <p
                                    className='text-gray-600'
                                    style={{ fontFamily: "Nunito, sans-serif" }}
                                >
                                    Students
                                </p>
                            </div>
                            <div>
                                <h3
                                    className='text-4xl font-bold mb-2'
                                    style={{
                                        color: "#0B5FFF",
                                        fontFamily: "Inter, sans-serif",
                                    }}
                                >
                                    16+
                                </h3>
                                <p
                                    className='text-gray-600'
                                    style={{ fontFamily: "Nunito, sans-serif" }}
                                >
                                    Teachers
                                </p>
                            </div>
                            <div>
                                <h3
                                    className='text-4xl font-bold mb-2'
                                    style={{
                                        color: "#0B5FFF",
                                        fontFamily: "Inter, sans-serif",
                                    }}
                                >
                                    95%
                                </h3>
                                <p
                                    className='text-gray-600'
                                    style={{ fontFamily: "Nunito, sans-serif" }}
                                >
                                    Pass Rate
                                </p>
                            </div>
                            <div>
                                <h3
                                    className='text-4xl font-bold mb-2'
                                    style={{
                                        color: "#0B5FFF",
                                        fontFamily: "Inter, sans-serif",
                                    }}
                                >
                                    25+
                                </h3>
                                <p
                                    className='text-gray-600'
                                    style={{ fontFamily: "Nunito, sans-serif" }}
                                >
                                    Years of Excellence
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Latest Notices Section */}
                <section className='py-16'>
                    <div className='max-w-7xl mx-auto px-4 md:px-8'>
                        <div className='flex justify-between items-center mb-8'>
                            <h2
                                className='text-2xl md:text-3xl font-bold'
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    color: "#0F172A",
                                }}
                            >
                                Latest Announcements
                            </h2>
                            <Link
                                href='/notices'
                                className='text-blue-600 hover:text-blue-700 font-medium'
                                style={{ color: "#0B5FFF" }}
                            >
                                View All →
                            </Link>
                        </div>
                        {latestNotices.length > 0 ? (
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                {latestNotices.map(
                                    (notice: {
                                        id: number;
                                        title: string;
                                        content: string;
                                        date: Date;
                                        category: string;
                                        createdAt: Date;
                                        attachmentUrl?: string | null;
                                    }) => (
                                        <NoticeCard
                                            key={notice.id}
                                            notice={notice}
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <div className='bg-white rounded-2xl shadow-md p-8 text-center'>
                                <p
                                    className='text-gray-600'
                                    style={{ fontFamily: "Nunito, sans-serif" }}
                                >
                                    No announcements at the moment. Check back
                                    later!
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* About Section */}
                <section className='py-16 bg-white'>
                    <div className='max-w-7xl mx-auto px-4 md:px-8'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                            <div>
                                <h2
                                    className='text-2xl md:text-3xl font-bold mb-4'
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        color: "#0F172A",
                                    }}
                                >
                                    About Our Institution
                                </h2>
                                <p
                                    className='text-gray-700 leading-relaxed mb-6'
                                    style={{ fontFamily: "Nunito, sans-serif" }}
                                >
                                    AKIC Payandapur was founded in 1994, we are
                                    committed to providing quality education and
                                    fostering holistic development. Our
                                    institution combines traditional values with
                                    modern teaching methodologies to prepare
                                    students for the challenges of tomorrow.
                                </p>
                                <Link href='/contact'>
                                    <Button>Learn More</Button>
                                </Link>
                            </div>
                            <div className='relative h-80 rounded-2xl overflow-hidden shadow-lg'>
                                <Image
                                    src='/college_gate.jpg'
                                    alt='College Gate'
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
