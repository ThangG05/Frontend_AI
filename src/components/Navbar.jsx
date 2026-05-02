import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const links = [
        { path: "/", label: "Tải lên", icon: "☁️" },
        { path: "/record", label: "Ghi âm", icon: "🎤" },
        { path: "/history", label: "Lịch sử", icon: "🕒" }
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-full px-2 py-2">
                {links.map((link) => {
                    const active = location.pathname === link.path;

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                            ${
                                active
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                            }`}
                        >
                            <span className="text-base">{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}