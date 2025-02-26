import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ImageUpload({ setAnalysisResult }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type.includes('image/')) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError(null);
      } else {
        setError('Please select an image file');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image to upload');
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setAnalysisResult(data);
      navigate('/result');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="upload-section">
      <div className="upload-container">
        <h2>Upload an Animal Image for Injury Analysis</h2>
        <p className="upload-description">
          Our AI will analyze your image to determine if the animal is injured.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div 
            className="drop-area"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div className="preview-container">
                <img src={previewUrl} alt="Preview" className="image-preview" />
                <button 
                  className="remove-btn"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  type="button"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className="upload-icon">🖼️</div>
                <p>Drag and drop your image here or</p>
                <label className="file-input-label">
                  Choose File
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="file-input"
                  />
                </label>
              </>
            )}
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button 
            type="submit" 
            className="analyze-btn"
            disabled={!selectedFile || loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </form>
      </div>

      <div className="info-section">
        <div className="info-card">
          <div className="info-icon">🔍</div>
          <h3>How It Works</h3>
          <p>
            Our AI model examines the image and determines if the animal appears injured.
          </p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">📊</div>
          <h3>Accurate Analysis</h3>
          <p>
            Leveraging deep learning, we provide reliable injury detection for animals.
          </p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">🔒</div>
          <h3>Privacy</h3>
          <p>
            Your images are processed securely and are not permanently stored.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
