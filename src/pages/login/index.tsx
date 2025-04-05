import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../lib/firebase';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("User signed in:", result.user);
            router.push('/'); // Redirect after login
        } catch (err) {
            console.error("Google Sign-In Error:", err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={signInWithGoogle}
            >
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;