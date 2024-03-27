import React, { useRef } from "react";
import { motion } from "framer-motion";
import Fiscal from "../assets/fiscal.png"

export const ConnectedView = ({disconectMeta, ethBalance}) => {
    const constraintsRefs = [useRef(null), useRef(null), useRef(null)];
    const [currentConstraint, setCurrentConstraint] = React.useState(0);

    const handleDrag = (event, info) => {
        const draggableElement = event.target;
        const dropAreaRef = constraintsRefs[currentConstraint === 0 ? 1 : 0];

        const draggableBounds = draggableElement.getBoundingClientRect();
        const dropAreaBounds = dropAreaRef.current.getBoundingClientRect();

        if (
            draggableBounds.left >= dropAreaBounds.left &&
            draggableBounds.right <= dropAreaBounds.right &&
            draggableBounds.top >= dropAreaBounds.top &&
            draggableBounds.bottom <= dropAreaBounds.bottom
        ) {
            setCurrentConstraint(currentConstraint === 0 ? 1 : 0);
            console.log("Cambiando área de destino.");
        }
    };

    return (
        <section className="flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col">
                <h1 className="text-xl text-center md:text-5xl"> To check your balance,</h1>
                <h2 className="text-xl text-center md:text-5xl">Take Nisman to the bathroom.</h2>
            </div>
            {currentConstraint === 1 ? <p className="absolute">Balance: {ethBalance} eth</p> : null}
            <motion.img src={Fiscal} drag dragConstraints={constraintsRefs[currentConstraint]} className="object-contain  rounded-full md:h-40 h-10 md:w-40 w-10 cursor-pointer" onDrag={handleDrag} />
            <div className="flex justify-around  gap-5 ">
                <motion.div className="drag-area" ref={constraintsRefs[0]} className="md:h-40 h-10 md:w-40 w-20 flex items-center justify-center border border-dashed border-black"> Anywhere</motion.div>
                <motion.div className="drag-area" ref={constraintsRefs[1]} className="md:h-40 h-10 md:w-40 w-20 flex items-center justify-center border border-dashed border-black"> Bathroom</motion.div>
            </div>
            <button onClick={disconectMeta}  className="text-center p-2 w-full bg-black text-white rounded-md shadow-md shadow-red-50">Disconect</button>
        </section>
    );
};