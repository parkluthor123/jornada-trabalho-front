import { Checkbox, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react"

type DaysButtonProps = {
    name: string;
    code: string;
    selected: boolean;
    change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DaysButton: React.FC<DaysButtonProps> = ({name, code, selected, change}: DaysButtonProps) => {
    return(
        <Box>
            <Checkbox onChange={change} name={name} id={name} style={{ display: "none" }} checked={selected}/> 
            <Typography 
                component="label" 
                htmlFor={name} 
                borderRadius="50px" 
                width="50px" 
                height="50px" 
                padding="5px" 
                bgcolor={selected ? "primary.main" : "text.disabled"} 
                color="#fff" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                style={{cursor: "pointer"}}
                >
                {code}
            </Typography>
        </Box>
    )
}

export default DaysButton;