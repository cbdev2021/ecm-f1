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

interface CartProps {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void;
    handleCategorySelect: (category: string) => void;
    cartItems?: any[]; // Make it optional
}

const consolidateCartItems = (cartItems: any[]): any[] => {
    const consolidatedItemsMap = new Map<number, any>();

    // Consolidate cart items based on their IDs
    cartItems.forEach((item) => {
        if (consolidatedItemsMap.has(item.id)) {
            const existingItem = consolidatedItemsMap.get(item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            }
        } else {
            consolidatedItemsMap.set(item.id, { ...item });
        }
    });

    // Convert consolidated items map to array
    const consolidatedItemsArray = Array.from(consolidatedItemsMap.values());

    return consolidatedItemsArray;
};

const Cart: FunctionComponent<CartProps> = ({ open, onClose, onOpen, cartItems }) => { 
    console.log(cartItems);

    // Consolidate cart items
    const consolidatedCartItems = consolidateCartItems(cartItems || []);

    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            sx={{
                width: '100%',
                '& .MuiDrawer-paper': {
                    width: '35%',
                    '@media (max-width: 960px)': {
                        width: '55%'
                    },
                    '@media (max-width: 600px)': {
                        width: '80%'
                    }
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
                    <Divider />
                    {/* {consolidatedCartItems.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="Your cart is empty" />
                        </ListItem>
                    ) : (
                        consolidatedCartItems.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <img src={item.image} alt="Product" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                </ListItemIcon>
                                <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}  />
                            </ListItem>
                        ))
                    )} */}
                    {consolidatedCartItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {index !== 0 && <Divider />} {/* Agrega Divider entre elementos, pero no antes del primero */}
                            <ListItem>
                                <ListItemIcon>
                                    <img src={item.image} alt="Product" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                </ListItemIcon>
                                <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}  />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
                <Divider />
            </div>
        </SwipeableDrawer>
    );
};

export default Cart;


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

// interface CartProps {
//     open: boolean;
//     onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
//     onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void;
//     handleCategorySelect: (category: string) => void;
//     // cartItems: any[]; // Add this prop
//     cartItems?: any[]; // Make it optional

// }

// const Cart: FunctionComponent<CartProps> = ({ open, onClose, onOpen, cartItems }) => { 
//     console.log(cartItems);

//     return (
//         <SwipeableDrawer
//             anchor="right"
//             open={open}
//             onClose={onClose}
//             onOpen={onOpen}
//             sx={{
//                 width: '100%',
//                 '& .MuiDrawer-paper': {
//                     width: '35%',
//                     '@media (max-width: 960px)': {
//                         width: '55%'
//                     },
//                     '@media (max-width: 600px)': {
//                         width: '80%'
//                     }
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
//                     {cartItems && cartItems.length === 0 ? (
//                         <ListItem>
//                             <ListItemText primary="Your cart is empty" />
//                         </ListItem>
//                     ) : (
//                         cartItems && cartItems.map((item, index) => (
//                             <ListItem key={index}>
//                                 <ListItemIcon>
//                                     <img src={item.image} alt="Product" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
//                                 </ListItemIcon>
//                                 <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}  />
//                             </ListItem>
//                         ))
//                     )}

//                     {/* {cartItems && cartItems.length === 0 ? (
//                     <ListItem>
//                         <ListItemText primary="Your cart is empty" />
//                     </ListItem>
//                     ) : (
//                     cartItems && cartItems.map((item, index) => (
//                         <ListItem key={index}>
//                         <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
//                         </ListItem>
//                     ))
//                     )}  */}
//                 </List>
//                 <Divider />
//             </div>
//         </SwipeableDrawer>
//     );
// };

// export default Cart;


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

// interface CartProps {
//     open: boolean;
//     onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
//     onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void;
//     handleCategorySelect: (category: string) => void; // Add this prop
// }

// const Cart: FunctionComponent<CartProps> = ({ open, onClose, onOpen, handleCategorySelect }) => {
//     return (
//         <SwipeableDrawer
//             anchor="right"
//             open={open}
//             onClose={onClose}
//             onOpen={onOpen}
//             // sx={{
//             //     width: '100%',
//             //     '& .MuiDrawer-paper': {
//             //         width: '28%'
//             //     }
//             // }}

//             sx={{
//                 width: '100%',
//                 '& .MuiDrawer-paper': {
//                     width: '35%',
//                     '@media (max-width: 960px)': {
//                         width: '55%'
//                     },
//                     '@media (max-width: 600px)': {
//                         width: '80%'
//                     }
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
//                     {['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"].map((text, index) => (
//                         <ListItem key={text} disablePadding>
//                             <ListItemButton onClick={() => handleCategorySelect(text)}> {/* ajustar to Uppercase */}
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

// export default Cart;
