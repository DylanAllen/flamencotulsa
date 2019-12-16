import React from "react";
import "./AdminMenu.css";
import { Box, Anchor } from 'grommet';

export default function AdminMenu(props) {

  const { menuItems } = props;

  return (
    <Box className="adminMenu">
      {
        menuItems.map((item) => {
            return (
                <Anchor
                  key={item.title}
                  onClick={item.onClick}
                  label={item.label}
                  className="mobileLink"
                  to={item.to}
                  a11yTitle={item.title}
                  tooltip={item.title}
                />
            )
          })
      }
    </Box>
  )
}
