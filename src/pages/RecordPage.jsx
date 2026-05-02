import { useState } from "react";
import Recorder from "../components/Recorder";
import Waveform from "../components/Waveform";
import ResultCard from "../components/ResultCard";
import { predictAudio } from "../api/api";

export default function RecordPage() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleRecord = async (blob) => {
        setFile(blob);
        setIsAnalyzing(true);
        setResult(null);

        try {
            const res = await predictAudio(blob);
            setResult(res);
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen px-4 py-6 pb-28 flex items-center">
            
            <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* LEFT */}
                <div className="bg-white/90 backdrop-blur border border-gray-100 shadow-md rounded-2xl p-6 flex flex-col items-center">
                    
                    <div className="text-center mb-4">
                        <h1 className="text-lg font-semibold text-gray-900">
                            Ghi âm
                        </h1>
                        <p className="text-sm text-gray-500">
                            Nhấn để bắt đầu
                        </p>
                    </div>

                    <Recorder onRecord={handleRecord} />

                    <div className="w-full mt-4">
                        <Waveform file={file} />

                        {!file && (
                            <p className="text-center text-xs text-gray-400 mt-2">
                                Chưa có audio
                            </p>
                        )}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col">
                    {isAnalyzing ? (
                        <div className="flex-1 bg-white/90 backdrop-blur border border-gray-100 shadow-md rounded-2xl flex flex-col items-center justify-center">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <p className="mt-3 text-sm text-gray-500">
                                Đang phân tích...
                            </p>
                        </div>
                    ) : result ? (
                        <ResultCard result={result} />
                    ) : (
                        <div className="flex-1 bg-white/60 backdrop-blur border border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-sm text-gray-400">
                            Kết quả sẽ hiển thị tại đây
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
}