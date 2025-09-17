import React, { useEffect, useState } from "react";

const MobileWarning: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        }

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isMobile) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white z-50">
            <div className="p-6 rounded-xl bg-red-600 shadow-lg text-center">
                <h2 className="text-xl font-bold mb-2">Desktop Only</h2>
                <p className="text-sm">This chat app works best on desktop.
                    Please use a larger screen.</p>
            </div>
        </div>
    );
};

export default MobileWarning;