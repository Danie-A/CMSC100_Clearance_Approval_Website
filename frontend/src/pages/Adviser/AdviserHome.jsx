// import React, { useState,useEffect } from "react";
// import ButtonComponent from "./SortFunction";
import * as React from 'react';

export default function ApproverHome() {

    const App = () => {
        const [open, setOpen] = React.useState(false);

        const handleOpen = () => {
            setOpen(!open);
        };

        const handleMenuOne = () => {
            // do something
            setOpen(false);
        };

        const handleMenuTwo = () => {
            // do something
            setOpen(false);
        };

        return (
            <>
                <Dropdown
                    open={open}
                    trigger={<button onClick={handleOpen}>Dropdown</button>}
                    menu={[
                        <button onClick={handleMenuOne}>Menu 1</button>,
                        <button onClick={handleMenuTwo}>Menu 2</button>,
                    ]}
                />

            </>

        );
    };

    const Dropdown = ({ open, trigger, menu }) => {
        return (<>
            <h2>{"Welcome Adviser"}</h2>
            {App}
            <div className="dropdown">
                {trigger}
                {open ? (
                    <ul className="menu">
                        {menu.map((menuItem, index) => (
                            <li key={index} className="menu-item">{menuItem}</li>

                        ))}
                    </ul>
                ) : null}
            </div>
        </>
        );
    };

    return (
        <>
            <h2 className="my-2">{"Welcome Adviser!"}</h2>
            <p className="mx-3">Click on the other tabs to start.</p>
            <img id="image" src="https://i.pinimg.com/originals/1b/0f/b0/1b0fb0ed95b7ee77ac662af8adcc29e7.png" alt="admin-home"></img>
        </>
    )
}



