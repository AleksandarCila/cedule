import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
// Components
import { Box, TextField, Button, CircularProgress, Typography } from "@mui/material";

const inputStyle = {
  my: 1,
};

const RegisterForm = ({ isOnline }: { isOnline: boolean }) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    formErrors: { email: "", password: "" },
    emailValid: true,
    passwordValid: false,
  });
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  // Hooks
  const router = useRouter();
  useEffect(() => {
    setFormValid(formState.emailValid && formState.passwordValid);
  }, [formState.emailValid, formState.passwordValid]);

  // Functions
  const handleUserInput = (e: any, inputName = "", inpuValue = "") => {
    const name = e ? e.target.name : inputName;
    const value = e ? e.target.value : inpuValue;
    validateField(name, value);
  };
  const validateField = (fieldName: string, value: any) => {
    let fieldValidationErrors = formState.formErrors;
    let emailValid = formState.emailValid;
    let passwordValid = formState.passwordValid;

    switch (fieldName) {
      case "email":
        let re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(value)) {
          emailValid = true;
          fieldValidationErrors.email = "";
        } else {
          emailValid = false;
          fieldValidationErrors.email = "E-mail is not correct";
        }
        break;
      case "password":
        let errorArray = [];
        let matching = false;
        let length = false;
        if (value !== formState.confirmPassword) {
          matching = false;
          errorArray.push("Passwords do not match");
        } else {
          matching = true;
        }
        if (value.length < 8) {
          length = false;
          errorArray.push("Password must be longer than 8 characters");
        } else {
          length = true;
        }
        fieldValidationErrors.password = errorArray.join(" | ");
        passwordValid = matching && length;
        break;
      case "confirmPassword":
        errorArray = [];
        matching = false;
        length = false;
        if (value !== formState.password) {
          matching = false;
          errorArray.push("Passwords do not match");
        } else {
          matching = true;
        }
        if (value.length < 8) {
          length = false;
          errorArray.push("Password must be longer than 8 characters");
        } else {
          length = true;
        }
        fieldValidationErrors.password = errorArray.join(" | ");
        passwordValid = matching && length;
        break;
      default:
        break;
    }
    setFormState({
      ...formState,
      [fieldName]: value,
      emailValid,
      passwordValid,
      formErrors: fieldValidationErrors,
    });
  };

  const onSubmit = async () => {
    setLoading(true);
    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formState.email,
        password: formState.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const res = await response.json();
      if (res.error) {
        setFormState({
          ...formState,
          emailValid: false,
          formErrors: { ...formState.formErrors, email: res.error.message },
        });
        setLoading(false);
      } else {
        signIn("credentials", {
          username: formState.email,
          password: formState.password,
        });
      }
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
      component="form"
      //   method="POST"
      //   onSubmit={onSubmit}
    >
      <TextField
        required
        onChange={(e) => handleUserInput(e)}
        id="email"
        name="email"
        label="E-mail"
        value={formState.email}
        placeholder="youremail@email.com"
        variant="outlined"
        size="small"
        type="email"
        fullWidth
        helperText={formState.emailValid ? "" : formState.formErrors.email}
        error={!formState.emailValid}
        sx={inputStyle}
        inputProps={{ maxLength: 60 }}
      />
      <TextField
        required
        onChange={(e) => handleUserInput(e)}
        id="password"
        name="password"
        label="Password"
        value={formState.password}
        placeholder=""
        variant="outlined"
        size="small"
        type="password"
        fullWidth
        sx={inputStyle}
        error={!formState.passwordValid}
        inputProps={{ minLength: 8, maxLength: 30 }}
      />
      <TextField
        required
        onChange={(e) => handleUserInput(e)}
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        value={formState.confirmPassword}
        placeholder=""
        variant="outlined"
        size="small"
        type="password"
        fullWidth
        helperText={
          formState.passwordValid ? "" : formState.formErrors.password
        }
        sx={inputStyle}
        error={!formState.passwordValid}
        inputProps={{ minLength: 8, maxLength: 30 }}
      />
      {!isOnline ? (
        <Typography variant="body1" textAlign="center">
          No Internet connection. Please reconnect in order to continue.
        </Typography>
      ) : loading ? (
        <CircularProgress color="primary" sx={{ mt: 3 }} size={30} />
      ) : (
        <Button
          // type="submit"
          onClick={onSubmit}
          size="large"
          color="primary"
          variant="contained"
          disabled={!formValid}
          sx={{ mt: 3 }}
        >
          Register
        </Button>
      )}
    </Box>
  );
};

export default RegisterForm;
