import React, { useState } from 'react';
import axios from 'axios';

const SymptomChecker = () => {
  // ... (previous code)

  const [diagnosis, setDiagnosis] = useState([]);
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);

  const API_ENDPOINT = 'https://sandbox-healthservice.priaid.ch/diagnosis';
  // ... (previous code)

  const fetchDiagnosis = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}?token=${API_TOKEN}&language=en-gb&symptoms=${JSON.stringify(symptoms)}&gender=${gender}&year_of_birth=${yearOfBirth}`);

      const newDiagnosis = response.data;

      setDiagnosis(newDiagnosis);

      // Add the new diagnosis to the history
      setDiagnosisHistory([...diagnosisHistory, newDiagnosis]);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleCheckSymptoms = () => {
    fetchDiagnosis();
  };

  return (
    <div style={containerStyle}>
      {/* ... (previous code) */}
      <div>
        <h2>Diagnosis:</h2>
        <ul>
          {diagnosis.map((issue, index) => (
            <li key={index}>
              {issue.Issue.Name} (Accuracy: {issue.Issue.Accuracy}%)
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Diagnosis History:</h2>
        {diagnosisHistory.map((history, index) => (
          <div key={index}>
            <h3>Diagnosis {index + 1}:</h3>
            <ul>
              {history.map((issue, i) => (
                <li key={i}>
                  {issue.Issue.Name} (Accuracy: {issue.Issue.Accuracy}%)
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomChecker;
