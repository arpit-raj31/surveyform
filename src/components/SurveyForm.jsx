import React, { useState, useContext, useEffect } from 'react';
import { Container, Paper, Button, Typography, TextField, MenuItem, Grid } from '@mui/material';
import useFormValidation from '../hooks/useFormValidation';
import { fetchAdditionalQuestions } from '../services/api';
import { SurveyContext } from '../contexts/SurveyContext';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    technologySection: {
      favoriteLanguage: '',
      yearsOfExperience: ''
    },
    healthSection: {
      exerciseFrequency: '',
      dietPreference: ''
    },
    educationSection: {
      highestQualification: '',
      fieldOfStudy: ''
    },
    feedback: ''
  });

  const [showSummary, setShowSummary] = useState(false);
  const { errors, validateForm } = useFormValidation();
  const { additionalQuestions, setAdditionalQuestions } = useContext(SurveyContext);

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic)
        .then(questions => {
          setAdditionalQuestions(questions);
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
        });
    }
  }, [formData.surveyTopic, setAdditionalQuestions]);

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prevState => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [field]: value
      }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const isValid = validateForm(formData);

    if (isValid) {
      setShowSummary(true);
    } else {
      console.error('Form validation failed. Please check errors.');
    }
  };

  return (
    <div
      style={{
        borderLeft: "20rem",
        // backgroundImage: `url("bgimage.png")`
      }}
    >
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={3}
          sx={{
            padding: 4,
            width: "100%",
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography variant="h5">Advanced Survey Form</Typography>
          <form 
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  value={formData.fullName}
                  onChange={e => handleInputChange('', 'fullName', e.target.value)}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('', 'email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Survey Topic"
                  select
                  value={formData.surveyTopic}
                  onChange={e => handleInputChange('', 'surveyTopic', e.target.value)}
                  error={!!errors.surveyTopic}
                  helperText={errors.surveyTopic}
                  fullWidth
                  required
                >
                  <MenuItem value="">Select Survey Topic</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                </TextField>
              </Grid>

              {formData.surveyTopic === 'Technology' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6">Technology Section</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Favorite Programming Language"
                      select
                      value={formData.technologySection.favoriteLanguage}
                      onChange={e => handleInputChange('technologySection', 'favoriteLanguage', e.target.value)}
                      error={!!errors.technologySection}
                      helperText={errors.technologySection}
                      fullWidth
                      required
                    >
                      <MenuItem value="">Select Language</MenuItem>
                      <MenuItem value="JavaScript">JavaScript</MenuItem>
                      <MenuItem value="Python">Python</MenuItem>
                      <MenuItem value="Java">Java</MenuItem>
                      <MenuItem value="C#">C#</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Years of Experience"
                      type="number"
                      value={formData.technologySection.yearsOfExperience}
                      onChange={e => handleInputChange('technologySection', 'yearsOfExperience', e.target.value)}
                      error={!!errors.technologySection}
                      helperText={errors.technologySection}
                      fullWidth
                      required
                    />
                  </Grid>
                </>
              )}

              {formData.surveyTopic === 'Health' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6">Health Section</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Exercise Frequency"
                      select
                      value={formData.healthSection.exerciseFrequency}
                      onChange={e => handleInputChange('healthSection', 'exerciseFrequency', e.target.value)}
                      error={!!errors.healthSection}
                      helperText={errors.healthSection}
                      fullWidth
                      required
                    >
                      <MenuItem value="">Select Frequency</MenuItem>
                      <MenuItem value="Daily">Daily</MenuItem>
                      <MenuItem value="Weekly">Weekly</MenuItem>
                      <MenuItem value="Monthly">Monthly</MenuItem>
                      <MenuItem value="Rarely">Rarely</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Diet Preference"
                      select
                      value={formData.healthSection.dietPreference}
                      onChange={e => handleInputChange('healthSection', 'dietPreference', e.target.value)}
                      error={!!errors.healthSection}
                      helperText={errors.healthSection}
                      fullWidth
                      required
                    >
                      <MenuItem value="">Select Diet</MenuItem>
                      <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                      <MenuItem value="Vegan">Vegan</MenuItem>
                      <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                    </TextField>
                  </Grid>
                </>
              )}

              {formData.surveyTopic === 'Education' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6">Education Section</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Highest Qualification"
                      select
                      value={formData.educationSection.highestQualification}
                      onChange={e => handleInputChange('educationSection', 'highestQualification', e.target.value)}
                      error={!!errors.educationSection}
                      helperText={errors.educationSection}
                      fullWidth
                      required
                    >
                      <MenuItem value="">Select Qualification</MenuItem>
                      <MenuItem value="High School">High School</MenuItem>
                      <MenuItem value="Bachelor's">Bachelor's</MenuItem>
                      <MenuItem value="Master's">Master's</MenuItem>
                      <MenuItem value="PhD">PhD</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Field of Study"
                      value={formData.educationSection.fieldOfStudy}
                      onChange={e => handleInputChange('educationSection', 'fieldOfStudy', e.target.value)}
                      error={!!errors.educationSection}
                      helperText={errors.educationSection}
                      fullWidth
                      required
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  label="Feedback"
                  multiline
                  rows={4}
                  value={formData.feedback}
                  onChange={e => handleInputChange('', 'feedback', e.target.value)}
                  error={!!errors.feedback}
                  helperText={errors.feedback}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Button
              sx={{
                marginTop: "1rem",
              }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </form>

          {showSummary && (
            <div
              style={{
                marginTop: '2rem',
                width: '100%'
              }}
            >
              <Typography variant="h6">Summary</Typography>
              <Typography><strong>Full Name:</strong> {formData.fullName}</Typography>
              <Typography><strong>Email:</strong> {formData.email}</Typography>
              <Typography><strong>Survey Topic:</strong> {formData.surveyTopic}</Typography>
              {formData.surveyTopic === 'Technology' && (
                <>
                  <Typography><strong>Favorite Programming Language:</strong> {formData.technologySection.favoriteLanguage}</Typography>
                  <Typography><strong>Years of Experience:</strong> {formData.technologySection.yearsOfExperience}</Typography>
                </>
              )}
              {formData.surveyTopic === 'Health' && (
                <>
                  <Typography><strong>Exercise Frequency:</strong> {formData.healthSection.exerciseFrequency}</Typography>
                  <Typography><strong>Diet Preference:</strong> {formData.healthSection.dietPreference}</Typography>
                </>
              )}
              {formData.surveyTopic === 'Education' && (
                <>
                  <Typography><strong>Highest Qualification:</strong> {formData.educationSection.highestQualification}</Typography>
                  <Typography><strong>Field of Study:</strong> {formData.educationSection.fieldOfStudy}</Typography>
                </>
              )}
              <Typography><strong>Feedback:</strong> {formData.feedback}</Typography>

              <Typography variant="h6" style={{ marginTop: '1rem' }}>Additional Questions:</Typography>
              {additionalQuestions.map((question, index) => (
                <Typography key={index}>{question}</Typography>
              ))}
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default SurveyForm;
