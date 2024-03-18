import React, { FunctionComponent } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

interface DrawerProps {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void;
    handleCategorySelect: (category: string) => void; // Add this prop
}

const Drawer: FunctionComponent<DrawerProps> = ({ open, onClose, onOpen, handleCategorySelect }) => {
    return (
        <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            sx={{
                width: '100%',
                '& .MuiDrawer-paper': {
                    width: '100%'
                }
            }}
        >
            <div role="presentation">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ width: '100%' }} onClick={onClose}>
                            <ListItemIcon>
                                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Close" />
                        </ListItemButton>
                    </ListItem>
                    {['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => handleCategorySelect(text)}> {/* ajustar to Uppercase */}
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </div>
        </SwipeableDrawer>
    );
};

export default Drawer;



// import React, { FunctionComponent } from 'react';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// interface DrawerProps {
//     open: boolean;
//     onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
//     onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void;
// }

// const Drawer: FunctionComponent<DrawerProps> = ({ open, onClose, onOpen }) => {
//     return (
//         <SwipeableDrawer
//             anchor="left"
//             open={open}
//             onClose={onClose}
//             onOpen={onOpen}
//             sx={{
//                 width: '100%',
//                 '& .MuiDrawer-paper': {
//                     width: '100%'
//                 }
//             }}
//         >
//             <div role="presentation">
//                 <List>
//                     <ListItem disablePadding>
//                         <ListItemButton sx={{ width: '100%' }} onClick={onClose}>
//                             <ListItemIcon>
//                                 <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
//                                     <CloseIcon />
//                                 </IconButton>
//                             </ListItemIcon>
//                             <ListItemText primary="Close" />
//                         </ListItemButton>
//                     </ListItem>
//                     {['Home', 'Electronics', 'Jewelry', "Men's Clothing", "Women's Clothing"].map((text, index) => (
//                         <ListItem key={text} disablePadding>
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                                 </ListItemIcon>
//                                 <ListItemText primary={text} />
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//                 <Divider />
//             </div>
//         </SwipeableDrawer>
//     );
// };

// export default Drawer;