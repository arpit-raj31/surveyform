export const fetchAdditionalQuestions = async (surveyTopic) => {
    try {
      const response = await fetch(`https://api.example.com/=${surveyTopic}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch additional questions');
      }
  
      const data = await response.json();
      return data.questions;
    } catch (error) {
      throw new Error('Failed to fetch additional questions');
    }
  };
  