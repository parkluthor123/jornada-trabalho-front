import React, { useCallback, useEffect, useState } from "react";
import { Box, Alert, Stack, AlertColor } from "@mui/material";

type MessageProps = {
    message: string;
    type: "success" | "error" | "warning" | "info" | AlertColor;

}

const Message: React.FC<MessageProps> = ({message, type}: MessageProps) => {
    const [show, setShow] = useState<boolean>(false);

    const hideMessage = useCallback(() => {
        setShow(false);
    }, [])

    useEffect(() => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);
    }, [])

    return(
        <>
            {show && 
                <Box component="div"  
                    position="fixed" 
                    bottom="20px"
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    padding="0 15px"
                >
                    <Stack 
                        sx={{ width: '100%' }} 
                        spacing={2}
                        maxWidth="1300px"
                    >
                        
                        <Alert onClose={hideMessage} severity={type}>{message}</Alert>
                    </Stack>
                </Box>
            }  
        </>
    )
};

export default Message;