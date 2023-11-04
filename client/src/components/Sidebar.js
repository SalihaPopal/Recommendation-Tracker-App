import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import BookIcon from '@mui/icons-material/Book';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Movies from '../pages/Movies';


const drawerWidth = 240;

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = React.useState('Home Page');

  const handleItemClick = (movies, text) => {
    setSelectedItem(movies, text);
    console.log("hi")
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Recommendation Tracker App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {[
              { text: 'Home Page', icon: <HomeIcon /> },
              { text: 'Movie', icon: <MovieIcon /> },
              { text: 'Book', icon: <BookIcon /> },
              { text: 'Music', icon: <LibraryMusicIcon /> }
            ].map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                onClick={() => handleItemClick(item.text)}
                selected={item.text === selectedItem}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {selectedItem === 'Home Page' && (
          <Typography paragraph>
            Content for the Home Page goes here.
          </Typography>
        )}
        {selectedItem === 'Movie' && (
          <div>
            {/* <Typography paragraph>
               Content for the Movie Page goes here.
            </Typography> */}
            <Movies onHandleItemClick={handleItemClick} />
          </div>
        )}
        {selectedItem === 'Book' && (
          <Typography paragraph>
            Content for the Book Page goes here.
          </Typography>
        )}
        {selectedItem === 'Music' && (
          <Typography paragraph>
            Content for the Music Page goes here.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

