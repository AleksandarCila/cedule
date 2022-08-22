import { Box } from "@mui/material";
import Image from "next/image";
import LoginForm from "./LoginForm";

const LoginComponent = ({ csrfToken, isOnline }: { csrfToken: string, isOnline:boolean }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{width:"100%"}}>
        <Image priority src="/assets/logo.png" width="100%" height="20%" layout="responsive" objectFit="contain"/>
      </div>
      <LoginForm csrfToken={csrfToken} isOnline={isOnline}/>
    </Box>
  );
};

export default LoginComponent;
