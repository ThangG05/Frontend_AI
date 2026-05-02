import axios from "axios";

// Thêm dòng này để nếu biến môi trường lỗi, nó sẽ lấy giá trị mặc định
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"; 

console.log("Dòng này phải hiện ra http://localhost:8000:", API_URL);

export const predictAudio = async (file) => {
    const formData = new FormData();
    // Gán tên file để Backend nhận diện đúng định dạng[cite: 7, 11]
    if (file instanceof Blob) {
        formData.append("file", file, "recording.wav");
    } else {
        formData.append("file", file);
    }

    const res = await axios.post(`${API_URL}/predict`, formData);
    return res.data;
};

export const getHistory = async () => {
    const res = await axios.get(`${API_URL}/history`);
    return res.data;
};