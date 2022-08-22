import { Box } from "@mui/material";
import Image from "next/image";
import RegisterForm from "./RegisterForm";

const RegisterComponent = ({isOnline}:{isOnline:boolean}) => {
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
        <Image src="/assets/logo.png" width="100%" height="20%" layout="responsive" objectFit="contain"/>
      </div>
      <RegisterForm isOnline={isOnline}/>
    </Box>
  );
};

export default RegisterComponent;
