import { useState } from "react";
import FileUpload from "../components/FileUpload";
import Waveform from "../components/Waveform";
import ResultCard from "../components/ResultCard";
import { predictAudio } from "../api/api";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (selectedFile) => {
        if (!selectedFile) return;
        setFile(selectedFile);
        setResult(null);
        setLoading(true);

        try {
            const res = await predictAudio(selectedFile);
            if (res?.gender) setResult(res);
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setLoading(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setResult(null);
    };

    return (
        <div className="min-h-screen px-4 py-6 pb-28 flex items-center">
            
            <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* LEFT */}
                <div className="bg-white/90 backdrop-blur border border-gray-100 shadow-md rounded-2xl p-6">
                    
                    <div className="mb-4">
                        <h1 className="text-lg font-semibold text-gray-900">
                            Phân tích bằng file .mp3
                        </h1>
                        <p className="text-sm text-gray-500">
                            Tải file để phân tích
                        </p>
                    </div>

                    {!file ? (
                        <div className="flex justify-center">
                            <FileUpload onUpload={handleUpload} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium text-gray-800 truncate">
                                    {file.name}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {(file.size / 1024).toFixed(1)} KB
                                </span>
                            </div>

                            <button
                                onClick={clearFile}
                                className="text-gray-400 hover:text-red-500 text-sm"
                            >
                                Xóa
                            </button>
                        </div>
                    )}

                    <div className="mt-4">
                        <Waveform file={file} />
                        {!file && (
                            <p className="text-xs text-gray-400 text-center mt-2">
                                Chưa có dữ liệu
                            </p>
                        )}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col">
                    {loading ? (
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