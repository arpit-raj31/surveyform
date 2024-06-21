import React from 'react';
import { SurveyProvider } from './contexts/SurveyContext';
import SurveyForm from './components/SurveyForm';

function App() {
  return (
    <SurveyProvider>
      <SurveyForm />
    </SurveyProvider>
  );
}

export default App;
