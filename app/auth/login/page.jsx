"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const LoginPage = () => {

    const ref = useRef();

    const router = useRouter();

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(userInfo)
        if (!userInfo.email || !userInfo.password) {
            setError("Must provide all the Credentials!");
        }
        try {
            setPending(true);


            const res = await signIn('credentials', {
                email: userInfo.email,
                password: userInfo.password,
                redirect: false,
                callbackUrl: process.env.NEXTAUTH_URL
            });

            if (!res.ok) {
                setError("Problem signing in!");
            }

            if (res.error) {
                setError('Invalid credentials')
                setPending(false);
                return
            }

            setPending(false);

            router.replace('/')


        } catch (error) {
            setPending(false);
            setError('Something went wrong');
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form ref={ref} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="********"
                        name="password"
                        value={userInfo.password}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    {error && <span className="text-red-600 mx-2 px-2">{error}</span>}
                    <button
                        disabled={pending === true}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {pending ? 'Loggin in...' : 'Log In'}
                    </button>

                    <Link href={'/auth/register'}><span className="bg-green-600 mx-2 px-2 py-1 rounded-lg">Register</span></Link>
                </div>
            </form>
        </div>
    )
}

export default LoginPage