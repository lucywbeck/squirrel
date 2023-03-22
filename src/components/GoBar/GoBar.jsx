import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './GoBar.css'


export default function GoBar() {
    const navigate = useNavigate();

    const handleGoClick = () => {
        navigate("/go");
    }

    return (
        <div className="gobar-footer">
            <Button  
                onClick={handleGoClick} 
                size="sm"
                style={{width: "100%", height: "50px"}}
                className="start-button"
            >
                GO TO MY ADVENTURE &rarr;
            </Button>
        </div>
    )
}