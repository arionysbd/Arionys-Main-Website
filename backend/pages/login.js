import Loading from "@/components/Loading";
import ManualLogin from "@/components/ManualLogin";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push('/');
        }
    }, [session, router]);

    if (status === "loading") {
        return (
            <div className="lodingdata flex flex-col items-center justify-center h-screen px-4">
                <Loading />
                <h1 className="mt-1 text-lg">Loading...</h1>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="loginfront flex items-center justify-center flex-col w-full min-h-screen px-4 text-center">
                <div className="max-w-sm w-full">
                    <div className="flex justify-center">
                        <Image
                            src="https://files.edgestore.dev/58ak0uq249vmf7cf/publicFiles/_public/8bfea0a4-8fa0-4623-8fed-eb262f79ab6d.ico"
                            alt="Arionys Icon"
                            width={200}
                            height={200}
                            className="rounded-full"
                        />
                    </div>
                    <h1 className="text-xl font-semibold mt-4">Welcome to the Admin Panel of Arionys.</h1>
                    <h2 className="text-base mt-2">Login with your Github account</h2>
                    <button
                        onClick={() => signIn('github')}
                        className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
                    >
                        Login with Github
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default Login;
