import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4'>
            <div className='max-w-md w-full'>
                <div className='text-center mb-8'>
                    <h1
                        className='text-4xl font-bold text-gray-900 mb-2'
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        AKIC Payandapur
                    </h1>
                    <h2
                        className='text-2xl font-semibold text-gray-800 mb-2'
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Admin Login
                    </h2>
                    <p
                        className='text-gray-600'
                        style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                        Access the administration panel
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}
