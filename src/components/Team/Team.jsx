import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function Team() {
  return (
    <Box sx={{  marginTop: 8,
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              Hello
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      <Divider />
      </nav>
    </Box>
  );
}