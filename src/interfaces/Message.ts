import { AlertColor } from "@mui/material";

export default interface Message {
    text: string,
    type: AlertColor,
    show?: boolean
}