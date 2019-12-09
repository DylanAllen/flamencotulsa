import "./MainMenu.css";
import React, { useState } from "react";
import { Menu as MenuIcon, Home as HomeIcon, Shop, Logout, Login, Article, StatusGood } from 'grommet-icons';
import { Box, DropButton, Anchor } from 'grommet';

export default function MainMenu(props) {

  const { size, handleLogout, state, history } = props;

  const menuList = (props) => {
    const menuItems = [
      { label: 'Home', icon: HomeIcon, to: '/', onClick: () => {history.push('/'); setMenuOpen(false)}, title: 'Home' },
      { label: 'Classes', icon: StatusGood, to: '/classes', onClick: () => {history.push('/classes'); setMenuOpen(false)}, title: 'Classes' },
      { label: 'Blog', icon: Article, to: '/blog', onClick: () => {history.push('/blog'); setMenuOpen(false)}, title: 'Blog' },
      { label: 'Shop', icon: Shop, to: '/store', onClick: () => {history.push('/store'); setMenuOpen(false)}, title: 'Store' },
      { label: 'Login', icon: Login, onClick: () => {history.push('/login'); setMenuOpen(false)}, disabled: state.isAuthenticated, to: '/login', title: 'Login' },
      { label: 'Logout', icon: Logout, onClick: () => { handleLogout(); setMenuOpen(false); }, disabled: !state.isAuthenticated, to: '/logout', title: 'Logout' }
    ]
    let menu = [];
    menuItems.map((item) => {
      if (!item.disabled) {
        menu.push(item);
      }
      return item
    })

    return menu.map((item) => {
      const Icon = item.icon
        return (
            <Anchor
              key={item.title}
              onClick={item.onClick}
              label={item.label}
              className="mobileLink"
              to={item.to}
              a11yTitle={item.title}
              tooltip={item.title}
              icon={<Icon />}
            />
        )
      });
  }

  const [menuOpen, setMenuOpen] = useState(false);

  return (
      (size === 'small') ? <DropButton
        label=""
        icon={<MenuIcon />}
        onOpen={() => {setMenuOpen(true)}}
        onClose={() => {setMenuOpen(false)}}
        open={menuOpen}
        className={'hamburgerMenu'}
        dropAlign={{ top: 'bottom', right: 'right' }}
        dropContent={
          <Box pad="medium" background="light-2">
              { menuList(props) }
          </Box>
        }
      /> : <Box className="mainMenu">
        <ul className="mainMenu">
          { menuList(props) }
        </ul>
      </Box>
  )
}
