import WaveSurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";

export default function Waveform({ file }) {
    const ref = useRef();
    const wsRef = useRef();
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (!file) return;

        const ws = WaveSurfer.create({
            container: ref.current,
            waveColor: "#cbd5f5",
            progressColor: "#2563eb",
            cursorColor: "#2563eb",
            height: 64,
            barWidth: 3,
            barGap: 2,
            barRadius: 4,
        });

        ws.load(URL.createObjectURL(file));
        wsRef.current = ws;

        ws.on("finish", () => setPlaying(false));

        return () => ws.destroy();
    }, [file]);

    const togglePlay = () => {
        if (!wsRef.current) return;
        wsRef.current.playPause();
        setPlaying(!playing);
    };

    return (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div ref={ref} />

            <div className="mt-4 flex justify-center">
                <button
                    onClick={togglePlay}
                    className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    {playing ? "Pause" : "Play"}
                </button>
            </div>
        </div>
    );
}