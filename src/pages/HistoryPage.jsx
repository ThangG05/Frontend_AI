import { useEffect, useState } from "react";
import { getHistory } from "../api/api";

export default function HistoryPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getHistory().then(res => {
            if (res) setData(res);
        });
    }, []);

    return (
        <div className="min-h-screen px-4 py-6 pb-28 flex items-center">

            <div className="max-w-md w-full mx-auto">

                <h1 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Lịch sử phân tích
                </h1>

                {data.length === 0 ? (
                    <div className="bg-white/70 backdrop-blur border border-gray-100 shadow-sm rounded-2xl text-center text-gray-400 text-sm py-10">
                        Chưa có dữ liệu
                    </div>
                ) : (
                    <div className="space-y-2">
                        {data.map((item) => {
                            const isMale = item.gender === "Male";

                            return (
                                <div
                                    key={item.id}
                                    className="bg-white/90 backdrop-blur border border-gray-100 shadow-sm rounded-xl px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition"
                                >
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-medium text-gray-800 truncate">
                                            {item.file_name}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            ID: {item.id}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`text-xs px-2 py-1 rounded-md font-medium ${
                                                isMale
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-pink-100 text-pink-600"
                                            }`}
                                        >
                                            {isMale ? "Nam" : "Nữ"}
                                        </span>

                                        <span className="text-sm text-gray-600 font-medium">
                                            {(item.confidence * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}