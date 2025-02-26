import { Link } from 'react-router-dom';

function ResultPage({ result }) {
  return (
    <div className="result-page">
      <div className="result-header">
        <h2>Analysis Results</h2>
        <p className="result-subtitle">
          The AI determined that the animal is <strong>{result.result}</strong>.
        </p>
      </div>
      
      <div className="result-container">
        <div className="result-card image-result">
          {/* Append data URI prefix to the Base64 string */}
          <img 
            src={`data:image/jpeg;base64,${result.image}`} 
            alt="Analyzed" 
            className="analyzed-image" 
          />
        </div>
        <div className="result-card status-result">
          <h3>Status: {result.result}</h3>
        </div>
      </div>
      
      <div className="result-actions">
        <Link to="/" className="back-button">Analyze Another Image</Link>
        <button className="download-button">Download Report</button>
      </div>
    </div>
  );
}

export default ResultPage;
