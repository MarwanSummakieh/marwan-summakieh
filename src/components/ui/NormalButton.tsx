import React from 'react'

const MagicButton = (
    {
        title, icon, position, handleClick, otherClasses
    }:
        {
            title: string;
            icon: React.ReactNode;
            position: string;
            handleClick?: () => void;
            otherClasses?: string;
        }
) => {
    return (
        <button className="px-8 py-2 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
            {title}
        </button>

    )
}

export default MagicButton