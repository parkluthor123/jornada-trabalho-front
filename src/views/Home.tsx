import { Container } from "@mui/system";
import { Box, Typography, Checkbox, Select, MenuItem, Button, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import Weeks from "../mocks/Week";
import WeeksInterface from "../interfaces/Weeks";
import DaysButton from "../components/DaysButton";
import TimeInputs from "../components/TimeInputs";
import api from "../services/Api";
import toCapitalize from "../Utils/ToCapitalize";

const Home: React.FC = () => {
    const [daysOfWeek, setDaysOfWeek] = useState<Array<WeeksInterface>>([]);
    const [selectWorkDay, setSelectWorkDay] = useState<string>("2");
    const [activeWorkDay, setActiveWorkDay] = useState<boolean>(false);

    const sendData = async () => {
         const data = {
             workDayIsActive: activeWorkDay,
             workDay: selectWorkDay,
             days: daysOfWeek
         }

        try {
            const res = await api.put('/config', data);
            console.log(res.data);
        } catch (e: any) {
            
        }
    }

    const getData = async () => {
        try {
            const res = await api.get('/config');
            if(res.status === 200)
            {
                const data = res.data[0];
                
                const { DaysWeek, next_workday, is_active } = data;
                if(is_active && next_workday)
                {
                    setSelectWorkDay(next_workday);
                    setActiveWorkDay(is_active);
                }


                if(DaysWeek.length > 0)
                {
                    const days = DaysWeek.map((day: any) => {
                        return {
                            day: day.day,
                            date: {
                                initialDate: new Date(day.initial_date),
                                finalDate: new Date(day.final_date)
                            }
                        }
                    })

                    setDaysOfWeek(days);
                }
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const handleSelectWorkDay = (e: SelectChangeEvent<string>) => {
        setSelectWorkDay(e.target.value);
    }

    const handleActiveWorkDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setActiveWorkDay(checked);
    }  

    const handleChangeInitialDate = (date: Date, day: string) => {
        setDaysOfWeek(daysOfWeek.map((week: any) => {
            if(week.day === day.toLocaleLowerCase())
            {
                week.date.initialDate = date.toISOString();
            }
            return week;
        }))
    };

    const handleChangeFinalDate = (date: Date, day: string) => {
        setDaysOfWeek(daysOfWeek.map((week: any) => {
            if(week.day === day.toLocaleLowerCase())
            {
                week.date.finalDate = date.toISOString();;
            }
            return week;
        }))
    };

    const handleChangeDaysOfWeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if(!checked)
        {
            // verify if exists inside array, if exists, remove!
            const index = daysOfWeek.findIndex((week: any) => week.day === name);
            if(index !== -1)
            {
                daysOfWeek.splice(index, 1);
                setDaysOfWeek([...daysOfWeek]);
            }
        }else{
            // verify if exists inside array, if not exists, add!
            const index = daysOfWeek.findIndex((week: any) => week.name === name);
            if(index === -1)
            {
                const newItem = {
                    day: name,
                    date:{
                        initialDate: new Date(),
                        finalDate: new Date()
                    }
                }
                const arrItems = [...daysOfWeek, newItem];
                setDaysOfWeek(arrItems);
            }
        }
    };

    useEffect(() => {
        getData();
    }, [])

    // useEffect(()=>{
    //     console.log(daysOfWeek)
    // }, [daysOfWeek])
    
    return(
        <>
            <Container maxWidth="xl">
                <Box component="main" height="100vh" display="flex" alignItems="center">
                    <Box component="div" display="flex" padding="50px 0" alignItems="center" flexDirection="column" width="100%">

                        <Box width="fit-content" padding="0 15px" paddingTop="50px">
                            <Typography variant="h5" component="h5" color="#000">
                                Configuração jornada de trabalho
                            </Typography>
                            <Box display="flex" alignItems="center" marginTop="10px">
                                <Checkbox name="check_horario_trabalho" checked={activeWorkDay} onChange={handleActiveWorkDay} id="check_horario_trabalho"/> 
                                <Typography component="label" htmlFor="check_horario_trabalho" color="#000">
                                    Ativar jornada de trabalho
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Box width="fit-content" padding="0 15px" marginTop="20px">
                            <Typography variant="h5" component="h5" color="#000">
                                Configuração jornada de trabalho
                            </Typography>
                            <Box display="flex" flexDirection="column" marginTop="10px">
                                <Select name="select_horario_trabalho" onChange={handleSelectWorkDay} value={selectWorkDay} id="select_horario_trabalho">
                                    <MenuItem value="1">Abort</MenuItem>
                                    <MenuItem value="2">Enviar no próximo expediente</MenuItem>
                                </Select>
                            </Box>
                        </Box>
                        
                        <Box width="fit-content" display="flex" gap="40px" padding="0 15px" marginTop="40px">
                           {Weeks && Weeks.map((week, index) => (
                                <DaysButton key={index} name={week.name} code={week.code} selected={daysOfWeek.find((item: any) => item.day === week.name) ? true : false} change={handleChangeDaysOfWeek}/>
                           ))}
                        </Box>
                        
                        {daysOfWeek && daysOfWeek.map((week: WeeksInterface, index) => (
                            <TimeInputs 
                                key={index}
                                day={toCapitalize(week.day)}
                                changeFinalValue={handleChangeFinalDate}
                                changeInitialValue={handleChangeInitialDate}
                                currentInitialValue={week.date.initialDate}
                                currentFinalValue={week.date.finalDate}
                               
                            />
                        ))}

                        <Box width="100%" margin="50px 0">
                            <Button variant="contained" color="primary" type="submit" onClick={sendData}>
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Home;