import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadPage from "./pages/UploadPage";
import RecordPage from "./pages/RecordPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen relative overflow-hidden bg-gray-100">

                {/* BACKGROUND */}
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-300 rounded-full blur-2xl opacity-60"></div>
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-purple-300 rounded-full blur-2xl opacity-60"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle,_#d1d5db_1px,_transparent_1px)] bg-[size:24px_24px] opacity-30"></div>

                {/* CONTENT */}
                <div className="relative z-10">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<UploadPage />} />
                        <Route path="/record" element={<RecordPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                    </Routes>
                </div>

            </div>
        </BrowserRouter>
    );
}