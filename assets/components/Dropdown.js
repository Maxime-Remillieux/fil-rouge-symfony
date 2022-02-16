import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowUp } from "react-icons/io"
import { IoIosArrowDown } from "react-icons/io"

const Dropdown = ({children, title}) => {
    const [focus, setFocus] = useState(true);
    const contentRef = useRef();

    useEffect(()=>{
        requestAnimationFrame(()=>{
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
            if(!focus){
                requestAnimationFrame(()=>{
                    contentRef.current.style.height = "0px";
                })
            }
        })
    }, [focus])

    const handleTransitionEnd = ()=>{
        if(focus)
            contentRef.current.style.height = null;
    }

    const toggleFocus = ()=>{
        setFocus(!focus);
    }

    return (
        <div className='dropdown'>
            <div className={"title" + (focus ? " active" : "")} onClick={toggleFocus}><h4>{title}</h4>{focus ? <IoIosArrowDown size="20px" /> : <IoIosArrowUp size="20px" />}</div>
            <div onTransitionEnd={handleTransitionEnd} ref={contentRef} className={"content" + (focus ? " active" : "")}>
                {children}
            </div>
        </div>
    );
};

export default Dropdown;