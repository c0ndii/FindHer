import {  Text,Box , Chip, Container } from '@mantine/core';
import classes from './InterestsView.module.css';

export const InterestsView = () => {

    return (
        <Container my='xl' style={{padding:0,margin:0, display:'flex',flexDirection:'column'}}>
            <Box>
                <Text fz={90} fw={500} className={classes.name} style={{textAlign:'center'}}>
                    Zainteresowania
                </Text>
            </Box>
            <Box display='flex' style={{gap:'20px', flexWrap:'wrap',justifyContent:'center'}}>
                <Box>
                    <Text fz={20} fw={400} className={classes.name}>
                        Kulinaria
                    </Text>
                    <Box className={classes.chipcontainer}>
                    <Chip  color="red" variant="light" size="xs">Sushi</Chip>
                    <Chip  color="red" variant="light" size="xs">Pizza</Chip>

                    </Box>
                </Box>

                <Box>
                    <Text fz={20} fw={400} className={classes.name}>
                        Sport
                    </Text>
                    <Box className={classes.chipcontainer}>
                            
                    </Box>
                </Box>

                <Box>
                    <Text fz={20} fw={400} className={classes.name}>
                        Kultura
                    </Text>
                    <Box className={classes.chipcontainer}>
                            
                    </Box>
                </Box>

                <Box>
                    <Text fz={20} fw={400} className={classes.name}>
                        Rozrywka
                    </Text>
                    <Box className={classes.chipcontainer}>
                            
                    </Box>
                </Box>
                
                <Box>
                    <Text fz={20} fw={400} className={classes.name}>
                        Osobiste
                    </Text>
                    <Box className={classes.chipcontainer}>
                            
                    </Box>
                </Box>
            </Box>
        
        </Container>
    );
};