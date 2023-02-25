import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

type TimeInputsProps = {
    day?: string;
    changeInitialValue: (value: Date, day: string) => void;
    changeFinalValue: (value: Date, day: string) => void;
    currentInitialValue?: Date | null;
    currentFinalValue?: Date | null;
}

const TimeInputs: React.FC<TimeInputsProps> = ({day, changeInitialValue, changeFinalValue, currentInitialValue, currentFinalValue}: TimeInputsProps) => {
    const [initialDate, setInitialDate] = useState<Date | null>(new Date());
    const [finalDate, setFinalDate] = useState<Date | null>(new Date());

    const handleChangeInitialDate = (date: Date | null) => {
        if(date)
        {
            setInitialDate(moment(date).toDate());
        }
    };


    const handleChangeFinalDate = (date: Date | null) => {
        if(date)
        {
            setFinalDate(moment(date).toDate());
        }
    }

    // useEffect(() => {
    //     console.log(initialDate, finalDate)
    // }, [initialDate, finalDate])

    return(
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box width="fit-content" display="flex" gap="20px" padding="0 15px" marginTop="40px">
                <Box display="flex" alignItems="center" gap="20px">
                    <Typography component="label" htmlFor="initial-date" color="#000">
                        {day}
                    </Typography>
                    
                    <TimePicker
                        label="Início"
                        value={currentInitialValue ? currentInitialValue : initialDate}
                        onChange={handleChangeInitialDate}
                        onClose={() => changeInitialValue(initialDate as Date, day as string)}
                        renderInput={(params) => <TextField {...params} size="small" />}
                    />
                </Box>

                <Box display="flex" alignItems="center" gap="20px">
                    <Typography component="label" htmlFor="final-date" color="#000">
                        Até
                    </Typography>
                    
                    <TimePicker
                        label="Fim"
                        value={currentFinalValue ? currentFinalValue : finalDate}
                        onChange={handleChangeFinalDate}
                        onClose={() => changeFinalValue(finalDate as Date, day as string)}
                        renderInput={(params) => <TextField {...params} size="small" />}
                    />
                </Box>
            </Box>
        </LocalizationProvider>
    )
}

export default TimeInputs;