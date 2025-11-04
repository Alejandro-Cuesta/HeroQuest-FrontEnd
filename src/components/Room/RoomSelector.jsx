import React from 'react';
import RoomModal from './RoomModal';

const RoomSelector = () => {
const [open, setOpen] = React.useState(false);
    return (
    <div>
        <button onClick={() => setOpen(true)}>Entrar a una Room</button>
        {open && <RoomModal onClose={() => setOpen(false)} />}
    </div>
    );
};

export default RoomSelector;