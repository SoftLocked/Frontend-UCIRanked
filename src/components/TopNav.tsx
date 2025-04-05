import Link from "next/link";
import React, { useState } from "react";

import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';

const items = [
    { text: "Add Take", href: "/take" },
    { text: "Vote", href: "/" },
    { text: "Leaderboard", href: "/leaderboard" }
];

const TopNav = () => {

    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);

    async function handleLogout() {
        try {
            await signOut(auth);
            console.log("User signed out");
            router.push('/login');
          } catch (error) {
            console.error("Logout failed", error);
          }
    }

    return (
        <nav className="dark:text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">Hottake Ranked</Link>
                <ul className="hidden md:flex space-x-6">
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className="hover:text-blue-400">{item.text}</Link>
                        </li>
                        
                    ))}
                    <li>
                        <a href="" className="hover:text-blue-400" onClick={handleLogout}>Logout</a>
                    </li>
                </ul>
                <button
                    className="md:hidden focus:outline-none cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            {menuOpen && (
                <ul className="md:hidden mt-2 space-y-2">
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className="block py-2 rounded hover:text-blue-400 text-right">{item.text}</Link>
                        </li>
                    ))}
                    <li>
                        <span className="block py-2 rounded hover:text-blue-400 text-right" onClick={handleLogout}>Logout</span>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default TopNav;