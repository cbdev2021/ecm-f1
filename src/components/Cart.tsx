import React, { FunctionComponent, useState, useEffect } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { InputAdornment, TextField } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; 

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

const handleBuy = () => {
    // Aquí puedes manejar la acción de comprar
    console.log("Buy button clicked!");
};


const Cart: FunctionComponent<CartProps> = ({ open, onClose, onOpen, cartItems }) => { 
    // State para el array de cartItems consolidados
    const [consolidatedCartItems, setConsolidatedCartItems] = useState<any[]>([]);

    // Efecto para actualizar consolidatedCartItems cuando cambien cartItems
    useEffect(() => {
        if (cartItems) {
            const newConsolidatedCartItems = consolidateCartItems(cartItems);
            setConsolidatedCartItems(newConsolidatedCartItems);
        }
    }, [cartItems]);

    // Función para manejar el incremento de cantidad
    const handleIncrement = (index: number) => {
        const updatedItems = [...consolidatedCartItems];
        updatedItems[index].quantity += 1;
        setConsolidatedCartItems(updatedItems);
    };
    
    // Función para manejar el decremento de cantidad
    const handleDecrement = (index: number) => {
        const updatedItems = [...consolidatedCartItems];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity -= 1;
            setConsolidatedCartItems(updatedItems);
        }
    };

    // Función para obtener el total del carrito
    const getTotalAmount = (): number => {
        return consolidatedCartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

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
                    {/* Lista de items */}
                    {consolidatedCartItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {index !== 0 && <Divider />}
                            <ListItem style={{ display: 'flex', alignItems: 'center' }}>
                            {/* TextField */}
                            <div style={{ flex: 1 }}>
                                <TextField
                                    id={`quantity-${index}`} // Agregar un ID único para cada TextField
                                    type="number"
                                    value={item.quantity}
                                    InputProps={{
                                        inputProps: { min: 1 },
                                        style: { width: '123px' }, // Ancho del campo de entrada
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginLeft: '-10px' }}>
                                                <IconButton onClick={() => handleDecrement(index)}>
                                                    <ArrowBackIcon />
                                                </IconButton>
                                                <div style={{ width: '35px', textAlign: 'center' }}>{item.quantity}</div>
                                                <IconButton onClick={() => handleIncrement(index)}>
                                                    <ArrowForwardIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    style={{ margin: '10px 0', width: '50%', minWidth: '150px' }} // Ajustar el ancho del TextField
                                />
                            </div>
                            {/* ListItemIcon y ListItemText */}
                            <ListItemIcon>
                                <img src={item.image} alt="Product" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.title} 
                                secondary={`Price: $${item.price}`} 
                                style={{ marginRight: '20px' }} // Espacio entre el texto y el TextField
                            />
                        </ListItem>
                        </React.Fragment>
                    ))}
                </List>
                <Divider />
                {/* Resumen del carrito */}
                <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <div className="cart-summary" style={{ marginBottom: '16px', padding: '16px'  }}>
                        <div className="cart-summary-row">
                            <div className="label">Subtotal</div>
                            <div className="value">${getTotalAmount().toFixed(2)}</div>
                        </div>
                        <hr style={{ margin: '8px 0' }} />
                        <div className="cart-summary-row cart-total">
                            <div className="label">Total</div>
                            <div className="value">${getTotalAmount().toFixed(2)}</div>
                        </div>
                    </div>
                    {/* Botones para cerrar y comprar */}
                    <div style={{ padding: '16px' }}>
                        <Button variant="contained" onClick={onClose} color="primary" fullWidth>
                            Close
                        </Button>
                        <div style={{ marginTop: '8px' }}>
                            <Button variant="contained" onClick={handleBuy} color="secondary" fullWidth>
                                Buy
                            </Button>
                        </div>
                    </div>
                </div>
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
//     cartItems?: any[]; // Make it optional
// }

// const consolidateCartItems = (cartItems: any[]): any[] => {
//     const consolidatedItemsMap = new Map<number, any>();

//     // Consolidate cart items based on their IDs
//     cartItems.forEach((item) => {
//         if (consolidatedItemsMap.has(item.id)) {
//             const existingItem = consolidatedItemsMap.get(item.id);
//             if (existingItem) {
//                 existingItem.quantity += item.quantity;
//             }
//         } else {
//             consolidatedItemsMap.set(item.id, { ...item });
//         }
//     });

//     // Convert consolidated items map to array
//     const consolidatedItemsArray = Array.from(consolidatedItemsMap.values());

//     return consolidatedItemsArray;
// };

// const Cart: FunctionComponent<CartProps> = ({ open, onClose, onOpen, cartItems }) => { 
//     console.log(cartItems);

//     // Consolidate cart items
//     const consolidatedCartItems = consolidateCartItems(cartItems || []);

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
//                     <Divider />
//                     {/* {consolidatedCartItems.length === 0 ? (
//                         <ListItem>
//                             <ListItemText primary="Your cart is empty" />
//                         </ListItem>
//                     ) : (
//                         consolidatedCartItems.map((item, index) => (
//                             <ListItem key={index}>
//                                 <ListItemIcon>
//                                     <img src={item.image} alt="Product" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
//                                 </ListItemIcon>
//                                 <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}  />
//                             </ListItem>
//                         ))
//                     )} */}
//                     {consolidatedCartItems.map((item, index) => (
//                         <React.Fragment key={index}>
//                             {index !== 0 && <Divider />} {/* Agrega Divider entre elementos, pero no antes del primero */}
//                             <ListItem>
//                                 <ListItemIcon>
//                                     <img src={item.image} alt="Product" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
//                                 </ListItemIcon>
//                                 <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}  />
//                             </ListItem>
//                         </React.Fragment>
//                     ))}
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
