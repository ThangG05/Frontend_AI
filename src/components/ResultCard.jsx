import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

export default function ResultCard({ result }) {
    if (!result) return null;

    const isMale = result.gender === "Male";

    const data = {
        labels: ["Nam", "Nữ"],
        datasets: [
            {
                data: isMale
                    ? [result.confidence, 1 - result.confidence]
                    : [1 - result.confidence, result.confidence],
                backgroundColor: ["#2563eb", "#e5e7eb"],
                borderWidth: 0
            }
        ]
    };

    const options = {
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        maintainAspectRatio: false,
        cutout: "75%"
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col items-center">
            
            <p className="text-sm text-gray-500 mb-4">
                Kết quả phân tích
            </p>

            <div className="relative w-40 h-40 flex items-center justify-center">
                <Pie data={data} options={options} />

                <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-semibold text-gray-900">
                        {(result.confidence * 100).toFixed(0)}%
                    </span>
                    <span className="text-xs text-gray-400">
                        độ tin cậy
                    </span>
                </div>
            </div>

            <div className="mt-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                    {isMale ? "Nam" : "Nữ"}
                </h2>
            </div>

        </div>
    );
}