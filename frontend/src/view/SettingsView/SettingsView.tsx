import { Text, Container, Box , Button  } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import classes from './SettingsView.module.css';

export const SettingsView = () => {

    return (
        <Container my='xl' style={{padding:0,margin:0, display:'flex',flexDirection:'column',gap:'80px'}}>
            <Box>
                <Text fz={90} fw={500} className={classes.name} style={{textAlign:'center'}}>
                    <IconSettings width={64} height={64}/>
                    Ustawienia
                </Text>
            </Box>
            <Box display='flex' style={{gap:'20px', flexWrap:'wrap',justifyContent:'center',alignContent:'center',flexDirection:'column'}}>
                <Box>
                    <Text fz={24} fw={700} className={classes.name} style={{textAlign:'center'}}>
                        Motyw
                    </Text>
                    <Box className={classes.settingscontainer}>
                        <Button variant="filled" color='red' style={{width:'100px'}}>Jasny</Button>
                        <Button variant="filled" color="indigo" style={{width:'100px'}}>Ciemny</Button>
                    </Box>
                </Box>
                <Box>
                    <Text fz={24} fw={700} className={classes.name} style={{textAlign:'center'}}>
                        Język
                    </Text>
                    <Box className={classes.settingscontainer}>
                        <Button variant="filled" color='red' style={{width:'100px'}}>PL</Button>
                        <Button variant="filled" color="indigo" style={{width:'100px'}}>EN</Button>
                    </Box>
                </Box>
                <Box>
                    <Text fz={24} fw={700} className={classes.name} style={{textAlign:'center'}}>
                        Czcionka
                    </Text>
                    <Box className={classes.settingscontainer}>
                        <Button variant="filled" color='red' style={{width:'100px'}}>Mała</Button>
                        <Button variant="filled" color="indigo" style={{width:'100px'}}>Duża</Button>
                    </Box>
                </Box>
            </Box>
        
        </Container>
    );
};