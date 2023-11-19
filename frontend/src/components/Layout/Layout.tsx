import { Sidebar } from "../Sidebar";
import { Outlet } from "react-router-dom";
import { Box} from "@mantine/core";
import classes from './Layout.module.css';


export const Layout = () => {
    return (
      <Box className={classes.layout} >
        <Box className={classes.left}>
          <Sidebar />
        </Box>
        <Box className={classes.right}>
          <Outlet />
        </Box>
      </Box>
    );
  };
  
  export default Layout;