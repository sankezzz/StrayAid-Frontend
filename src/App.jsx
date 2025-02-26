import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ResultPage from './components/ResultPage';
import './styles/App.css';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<ImageUpload setAnalysisResult={setAnalysisResult} />} />
            <Route 
              path="/result" 
              element={
                analysisResult ? (
                  <ResultPage result={analysisResult} />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Animal Welfare Image Analyzer. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;