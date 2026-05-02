import { useState, useRef } from "react";

export default function Recorder({ onRecord }) {
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);

    const start = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        let chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/wav" });
            onRecord(blob);
        };

        recorder.start();
        setRecording(true);

        setTimeout(() => {
            if (recorder.state !== "inactive") {
                recorder.stop();
                setRecording(false);
            }
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <button
                onClick={!recording ? start : null}
                disabled={recording}
                className={`w-20 h-20 rounded-full flex items-center justify-center 
                transition-all duration-200 shadow-md
                ${
                    recording
                        ? "bg-red-500"
                        : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {recording ? (
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                ) : (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
                    </svg>
                )}
            </button>

            <p className="text-sm text-gray-500">
                {recording ? "Đang ghi âm..." : "Nhấn để ghi âm"}
            </p>
        </div>
    );
}