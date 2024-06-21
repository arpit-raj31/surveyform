import React, { createContext, useState } from 'react';

export const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  return (
    <SurveyContext.Provider value={{ additionalQuestions, setAdditionalQuestions }}>
      {children}
    </SurveyContext.Provider>
  );
};
