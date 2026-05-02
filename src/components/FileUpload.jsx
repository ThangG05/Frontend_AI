export default function FileUpload({ onUpload }) {
    return (
        <div className="flex justify-center mt-6">
            <label className="bg-blue-500 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-600 shadow">
                .mp3
                <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => onUpload(e.target.files[0])}
                />
            </label>
        </div>
    );
}