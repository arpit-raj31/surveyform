import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = formData => {
    let valid = true;
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.surveyTopic) {
      newErrors.surveyTopic = 'Survey Topic is required';
      valid = false;
    }

    if (formData.surveyTopic === 'Technology') {
      if (!formData.technologySection.favoriteLanguage) {
        newErrors.technologySection = 'Favorite Language is required';
        valid = false;
      }
      if (!formData.technologySection.yearsOfExperience) {
        newErrors.technologySection = 'Years of Experience is required';
        valid = false;
      }
    } else if (formData.surveyTopic === 'Health') {
      if (!formData.healthSection.exerciseFrequency) {
        newErrors.healthSection = 'Exercise Frequency is required';
        valid = false;
      }
      if (!formData.healthSection.dietPreference) {
        newErrors.healthSection = 'Diet Preference is required';
        valid = false;
      }
    } else if (formData.surveyTopic === 'Education') {
      if (!formData.educationSection.highestQualification) {
        newErrors.educationSection = 'Highest Qualification is required';
        valid = false;
      }
      if (!formData.educationSection.fieldOfStudy.trim()) {
        newErrors.educationSection = 'Field of Study is required';
        valid = false;
      }
    }

    if (!formData.feedback.trim() || formData.feedback.length < 50) {
      newErrors.feedback = 'Feedback is required (minimum 50 characters)';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return { errors, validateForm };
};

export default useFormValidation;
