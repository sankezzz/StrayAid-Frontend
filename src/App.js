import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";

function Home() {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            navigate("/result", { state: { 
                result: response.data.result, 
                image: `data:image/jpeg;base64,${response.data.image}`
            }});
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            <h1>Upload an Image</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

function Result() {
    const location = useLocation();
    const result = location.state?.result || "No result available";
    const image = location.state?.image || "";

    return (
        <div>
            <h1>Model Output</h1>
            {image && <img src={image} alt="Uploaded" style={{ maxWidth: "300px", display: "block" }} />}
            <p>{result}</p>
            <Link to="/">Back to Upload</Link>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    );
}

export default App;
