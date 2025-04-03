import { Typography } from "@mui/material";
import React from "react";

const TopNav = () => {

    const items = [
        {text: "Add Take", href:"#"},
        {text: "Vote", href:"#"},
        {text: "Leaderboard", href:"#"}
    ];

    return (
        <nav className="text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="#" className="text-xl font-bold">Hot Takes Ranked</a>
                <ul className="hidden md:flex space-x-6">
                    {items.map((item, index) => (<li key={index} className="rounded-xl hover:text-blue-400 p-2"><a href={item.href}>{item.text}</a></li>))}
                </ul>
                <button className="md:hidden focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default TopNav;