import React, { useState } from 'react';

const ButtonComponent = () => {
    const [showButtons, setShowButtons] = useState(false);

    const handleClick = () => {
        setShowButtons(!showButtons);
    };

    return (
        <div>
            <button onClick={handleClick}>Toggle Buttons</button>
            {showButtons && (
                <div>
                    <button>Button 1</button>
                    <button>Button 2</button>
                    <button>Button 3</button>
                </div>
            )}
        </div>
    );
};

export default ButtonComponent;