import { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  getProviders,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import {
  Typography,
  Box,
} from "@mui/material";

import RegisterComponent from "../components/Auth/RegisterComponent";
import LoginComponent from "../components/Auth/LoginComponent";

/* @ts-ignore */
const Login: NextPage = ({ csrfToken }) => {
  const { data: session } = useSession();
  const [login, setLogin] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  // if (session)
  //     return (<>"You are already logged in"</>)

  useEffect(() => {
    setLoading(false);
    const setClientIsOnline = () => {
      setIsOnline(true);
    };
    const setClientIsOffline = () => {
      setIsOnline(false);
    };
    setIsOnline(window.navigator.onLine);
    window.addEventListener("online", setClientIsOnline);
    window.addEventListener("offline", setClientIsOffline);

    return () => {
      window.removeEventListener("online", setClientIsOnline);
      window.removeEventListener("offline", setClientIsOffline);
    };
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Box sx={{ width: { xs: "90%", md: "50%" } }}>
        <Box sx={{ my: 3 }}>
          {login ? (
            <LoginComponent csrfToken={csrfToken} isOnline={isOnline} />
          ) : (
            <RegisterComponent isOnline={isOnline} />
          )}
        </Box>
        {login ? (
          <Typography variant="body1" textAlign="center">
            You don&apos;t have an account?
            <Typography
              color="primary"
              /* @ts-ignore */
              variant="span"
              onClick={() => setLogin(false)}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              Register
            </Typography>
          </Typography>
        ) : (
          <Typography variant="body1" textAlign="center">
            You already have an account?
            <Typography
              color="primary"
              /* @ts-ignore */
              variant="span"
              onClick={() => setLogin(true)}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              Login
            </Typography>
          </Typography>
        )}
        <Typography variant="body1" textAlign="center">
          beta version
        </Typography>
      </Box>
    </Box>
  );
};

Login.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  // console.log(res)
  if (session && res) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }
  return {
    session: undefined,
    providers: await getProviders(),
    csrfToken: await getCsrfToken(context),
  };
};

export default Login;
