import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className='sidebar'>

    <div className='sidebar__header'>
    <Avatar src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"/>
      <div className='sidebar__headerRight'>
      
        <IconButton>
        <DonutLargeIcon/>
        </IconButton>

        
        <IconButton>
        <ChatIcon/>
        </IconButton>

        
        <IconButton>
        <MoreVertIcon/>
        </IconButton>
        </div>
        </div>

        <div className='sidebar__search'>
        <div className='sidebar_searchContainer'>

          <SearchOutlined/>
          <input placeholder='Search or start new chat' type="text"/>
        </div>
          
        </div>

        <div className='sidebar__chats'>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>


        </div>
    </div>
  )
}

export default Sidebar