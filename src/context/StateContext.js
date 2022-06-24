import React, { useState } from 'react';

export const StateContext = React.createContext();

const StateProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState(1);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('#ff0000');

    const userId = localStorage.getItem('userId');
    
    return (
        <StateContext.Provider value={{ activeTab, setActiveTab, open, setOpen, message, setMessage, severity, setSeverity, userId }}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider