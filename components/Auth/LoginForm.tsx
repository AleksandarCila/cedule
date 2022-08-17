import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";

const getErrorText = (error: string | string[] | undefined) => {
  switch (error) {
    case "CredentialsSignin": {
      return "E-mail address or Password is incorrect";
    }
    case "Default": {
      return "Error Occured, Try again.";
    }
    default: {
      return "";
    }
  }
};

const inputStyle = {
  my: 1,
};

const LoginForm = ({ csrfToken }: { csrfToken: string }) => {
  const router = useRouter();
  const { error } = router.query;
  let errorMessage = getErrorText(error);
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    formErrors: { email: "", password: "" },
    emailValid: false,
    passwordValid: false,
  });
  const [formValid, setFormValid] = useState(false);

  // Hooks
  const theme = useTheme();
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
      case "username":
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
        if (value.length > 0) {
          passwordValid = true;
          fieldValidationErrors.password = "";
        } else {
          passwordValid = false;
          fieldValidationErrors.password = "";
        }
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
    signIn("credentials", {
      username: formState.username,
      password: formState.password,
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
      // method="POST"
      // action="/api/auth/callback/credentials"
    >
      <Box
        sx={{
          my: 1,
          p: 1,
          width: "100%",
          textAlign: "center",
          bgcolor: theme.palette.primary.light,
          border: `3px solid ${theme.palette.primary.main}`,
          display: error !== undefined ? "block" : "none",
        }}
      >
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      </Box>
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <TextField
        required
        onChange={(e) => handleUserInput(e)}
        id="username"
        name="username"
        label="E-mail"
        value={formState.username}
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
      />
      {loading ? (
        <CircularProgress color="primary" sx={{ mt: 3 }} size={30} />
      ) : (
        <Button
          type="submit"
          size="large"
          color="primary"
          variant="contained"
          disabled={!formValid}
          onClick={onSubmit}
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      )}
    </Box>
  );
};

export default LoginForm;
