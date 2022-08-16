import { NextPage } from "next";
import { useSession, signOut, } from "next-auth/react";
import { useEffect, useState } from "react";
import { getProviders, signIn, getSession, getCsrfToken } from 'next-auth/react'
import { TextField, Typography, Box, Stack } from "@mui/material";

import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";


const Login: NextPage = ({ providers, csrfToken }) => {
    const { data: session } = useSession();
    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (session) {
            // router.push('/');
        }
    }, [session])

    // if (session)
    //     return (<>"You are already logged in"</>)
    return (
        <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: { xs: "90%", md: "50%" } }}>
                <Box sx={{ my: 3 }}>
                    {login ? <LoginForm csrfToken={csrfToken} /> : <RegisterForm />}
                </Box>
                {login ?
                    <Typography variant="body1" textAlign="center">You don't have an account? <Typography color="primary" variant="span" onClick={() => setLogin(false)} sx={{ "&:hover": { cursor: "pointer" } }}>Register</Typography></Typography>
                    :
                    <Typography variant="body1" textAlign="center">You already have an account? <Typography color="primary" variant="span" onClick={() => setLogin(true)} sx={{ "&:hover": { cursor: "pointer" } }}>Login</Typography></Typography>
                }
            </Box>
        </Box>

    )
}

Login.getInitialProps = async (context) => {
    const { req, res } = context;
    const session = await getSession({ req });

    // console.log(res)
    if (session && res) {
        res.writeHead(302, {
            Location: "/"
        });
        res.end();
        return;
    }
    return {
        session: undefined,
        providers: await getProviders(context),
        csrfToken: await getCsrfToken(context)
    }
}


export default Login;