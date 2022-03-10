import React, { Component, useState } from 'react'
import { Menu } from 'semantic-ui-react'

function NavBar() {
  const [activePage, setActivePage] = useState('');

  const handleItemClick = (e, { name }) => setActivePage(name);
    const { activeItem } = activePage;

    return (
        <Menu inverted secondary>
            <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            />
            <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            position='right'
            />
            <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={handleItemClick}
            position='right'
            />
        </Menu>
    )
}

export default NavBar;