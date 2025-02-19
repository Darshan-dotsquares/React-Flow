"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { registerUser } from "../../app/api/Actions/user.action";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Background Styling
const Background = styled("div")({
  backgroundImage: "linear-gradient(to right, #8f3f95, #f77958)",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  padding: "0 40px",
  color: "white",
});

// Logo Styling
const LogoContainer = styled("div")({
  position: "absolute",
  top: "20px",
  left: "40px",
  fontSize: "32px",
  fontWeight: "bold",
  color: "#fff",
  fontFamily: "Arial, sans-serif",
  letterSpacing: "1px",
  textTransform: "uppercase",
});

// Left Side Text Styling
const TextContent = styled("div")({
  maxWidth: "500px",
  paddingRight: "20px",
  color: "white",
  fontFamily: "Arial, sans-serif",
});

// Form Styling
const FormContainer = styled(Paper)({
  padding: "30px",
  maxWidth: "450px",
  width: "100%",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
});

const StyledHeading = styled(Typography)({
  fontWeight: "bold",
  fontSize: "36px",
  marginBottom: "20px",
});

const StyledSubHeading = styled(Typography)({
  fontSize: "18px",
  marginBottom: "15px",
});

const StyledListItem = styled(Typography)({
  fontSize: "16px",
  marginBottom: "10px",
  fontWeight: "bold",
});

// Styled Submit Button
const StyledButton = styled("button")({
  backgroundColor: "#4e5df0", // Default blue color
  color: "#fff", // White text color
  fontWeight: "bold",
  textTransform: "uppercase",
  border: "none",
  borderRadius: "30px", // Rounded edges
  padding: "10px 0",
  fontSize: "14px",
  cursor: "pointer",
  width: "100%", // Full width
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#000", // Changes to black on hover
    color: "#fff",
  },
});

const SignUp = () => {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    jobTitle: "",
    phoneNumber: "",
    country: "",
    password: "",
  });

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data
          .map((country) => ({
            value: country.cca2,
            label: country.name.common,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryList);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side Validation
    const validationErrors = {};

    // Check if required fields are filled
    Object.keys(formData).forEach((key) => {
      // Check required fields for all fields, including companyName, jobTitle, and phoneNumber
      if (
        !formData[key] &&
        (key === "firstName" ||
          key === "lastName" ||
          key === "email" ||
          key === "phoneNumber" ||
          key === "companyName" ||
          key === "jobTitle" ||
          key === "password" ||
          key === "country")
      ) {
        validationErrors[key] = `This field is required`;
      }
    });
    // Validate Email Format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    // Validate Phone Number (basic validation)
    const phoneRegex = /^[0-9]{10}$/; // Adjust according to your country's phone format
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Invalid phone number format";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!formData.password) {
      validationErrors.password = "This field is required";
    } else if (!passwordRegex.test(formData.password)) {
      validationErrors.password =
        "Password must have at least 6 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    // Check if country is selected
    if (!formData.country) {
      validationErrors.country = "This field is required";
    }

    // If there are validation errors, do not submit the form
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log('formdata', formData);
      if (response.status) {
        toast.success("SignUp successful!");
        setTimeout(() => {
          router.push("/login");
        }, 4000); // Delay to allow toast to be visible
      } else {
        if (response.error) {
          toast.error("SignUp Failed!");
          console.log('error', response)
        }
      }
    } catch (err) {
      toast.error("Registration error:", err);
    } finally {
      setLoading(false); // Stop spinner after the operation
    }
  };

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear specific error when the user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <Background>
      {/* Logo at the Top Left */}
      <LogoContainer>React Flow</LogoContainer>

      {/* Left Side Text Content */}
      <TextContent>
        <StyledHeading>Try React Flow free for 30 days</StyledHeading>
        <StyledSubHeading>
          Learn why over 20,000 of the world’s leading organizations trust React
          Flow’s intelligent integration and automation platform for their
          digital transformation journey.
        </StyledSubHeading>
        <StyledListItem>
          &#x2022; Ease-of-use and crowd-sourced intelligence
        </StyledListItem>
        <StyledListItem>
          &#x2022; Scalable and secure cloud-native architecture
        </StyledListItem>
        <StyledListItem>
          &#x2022; Industry-leading innovation delivered through continuous
          updates
        </StyledListItem>
        <StyledListItem>
          &#x2022; 10X Leader in the Gartner® Magic Quadrant™ for Integration
          Platform
        </StyledListItem>
        <StyledListItem>
          &#x2022; Best-in-class customer satisfaction rating and direct renewal
          rate
        </StyledListItem>
      </TextContent>

      {/* Right Side Form */}
      <FormContainer elevation={3}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
          Sign Up
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <StyledTextField
            label="First Name *"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
          />

          <StyledTextField
            label="Last Name *"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
          />

          <StyledTextField
            label="Business Email Address *"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />

          <StyledTextField
            label="Company Name *"
            fullWidth
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            error={!!formErrors.companyName}
            helperText={formErrors.companyName}
          />

          <StyledTextField
            label="Job Title"
            fullWidth
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            error={!!formErrors.jobTitle}
            helperText={formErrors.jobTitle}
          />

          <StyledTextField
            label="Phone Number *"
            fullWidth
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!formErrors.phoneNumber}
            helperText={formErrors.phoneNumber}
          />

          <StyledTextField
            select
            label="Country *"
            fullWidth
            name="country"
            value={formData.country}
            onChange={handleChange}
            error={!!formErrors.country}
            helperText={formErrors.country}
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </StyledTextField>

          <StyledTextField
            type="password"
            label="Password *"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          <FormControlLabel
            control={<Checkbox color="primary" />}
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <a
                  href="#"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                >
                  React Flow Master Services Agreement terms and conditions
                </a>
              </Typography>
            }
          />
          <Box mt={1}>
            <StyledButton
              type="submit"
              disabled={loading} // Disable the button when loading
              style={{
                display: "flex", // Use flex to align spinner and text inline
                alignItems: "center", // Center items vertically
                justifyContent: "center", // Center items horizontally
              }}
            >
              {loading && (
                <div
                  style={{
                    border: "3px solid #f3f3f3", // Light grey background
                    borderTop: "3px solid #fff", // White spinner
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    animation: "spin 1s linear infinite",
                    marginRight: "10px", // Space between spinner and text
                  }}
                ></div>
              )}
              {!loading && "Submit"} {/* Show Submit text when not loading */}
            </StyledButton>
          </Box>
        </form>
      </FormContainer>
      <ToastContainer />
    </Background>
  );
};

export default SignUp;