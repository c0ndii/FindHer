import { Grid, Container, UnstyledButton, } from '@mantine/core';
import { Avatar, Text, Stack, Tooltip, ActionIcon, Box  } from '@mantine/core';
import { IconBrandFacebook, IconBrandX, IconBrandSpotify, IconBrandInstagram} from '@tabler/icons-react';
import classes from './AccountView.module.css';
import { NavLink } from "react-router-dom";

export const AccountView = () => {

    return (
        <Container my='xl' style={{padding:0,margin:0}}>
        <Grid>

          <Grid.Col span={{ base: 12, xs: 5 }} style={{display:'flex',alignItems:'center',height:'700px',width:'500px'}}>
            <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
            size={300}
            radius='xl'
            alt='avatar'
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 7 }} style={{display:'flex',flexDirection:'column',justifyContent:'center',height:'700px',width:'500px'}}    >
            <Box>
                <Text fz={96} fw={500} className={classes.name}>
                    Imie
                </Text>
            </Box>

            <Box>
                <Text fz={24} fw={400} className={classes.name}>
                    Wiek:
                </Text>

                <Text fz={24} fw={400} className={classes.name}>
                    Płeć:
                </Text>

                <Text fz={24} fw={400} className={classes.name}>
                    Miasto:
                </Text>
            </Box>

            <Box>
                <Text fz="md" fw={400} className={classes.name} style={{paddingTop:'16px'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat urna eget nibh accumsan, vitae dictum augue euismod. Duis augue tortor, efficitur nec suscipit at, sagittis sed nunc. Curabitur quis ex dui. Donec congue orci risus, ultrices commodo ante gravida ut. Sed volutpat id dui ut dapibus. In varius ante tincidunt, mollis turpis nec, placerat risus. Fusce molestie dui eget justo dictum vestibulum. 
                </Text>
            </Box>
          </Grid.Col>

          <Grid.Col span={{ base: 2, xs: 12 }}>
            <Stack justify="center" gap={180} style={{display:'flex',flexDirection:'row'}}>
            <Tooltip label={"Instagram"} position='top' transitionProps={{ duration: 0 }}>
                <NavLink to={''} style={{textDecoration:'none', color:'inherit'}}>
                    <UnstyledButton className={classes.link} >
                        <ActionIcon  color="rgba(0, 0, 0, 1)"  variant="transparent" size="xl"><IconBrandInstagram/></ActionIcon>
                    </UnstyledButton>
                </NavLink>
            </Tooltip>
            <Tooltip label={"Facebook"} position='top' transitionProps={{ duration: 0 }}>
                <NavLink to={''} style={{textDecoration:'none', color:'inherit'}}>
                    <UnstyledButton className={classes.link} >
                    <ActionIcon  color="rgba(0, 0, 0, 1)"  variant="transparent" size="xl" ><IconBrandFacebook /></ActionIcon>
                    </UnstyledButton>
                </NavLink>
            </Tooltip>
            <Tooltip label={"Twitter"} position='top' transitionProps={{ duration: 0 }}>
                <NavLink to={''} style={{textDecoration:'none', color:'inherit'}}>
                    <UnstyledButton className={classes.link} >
                        <ActionIcon color="rgba(0, 0, 0, 1)"  variant="transparent" size="xl"><IconBrandX/></ActionIcon>
                    </UnstyledButton>
                </NavLink>
            </Tooltip>
            <Tooltip label={"Spotify"} position='top' transitionProps={{ duration: 0 }}>
                <NavLink to={''} style={{textDecoration:'none', color:'inherit'}}>
                    <UnstyledButton className={classes.link} >
                        <ActionIcon color="rgba(0, 0, 0, 1)"  variant="transparent" size="xl"><IconBrandSpotify/></ActionIcon>
                    </UnstyledButton>
                </NavLink>
            </Tooltip>
            </Stack>
          </Grid.Col>

        </Grid>
      </Container>
    );
};