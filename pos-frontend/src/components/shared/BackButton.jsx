import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const BackButton = () => {

    return (
        <a href="/">
            <button className="bg-[#025cca] text-white p-3 text-xl font-bold rounded-full cursor-pointer">
                < IoArrowBackOutline />
            </button>
        </a>
    )

}

export default BackButton;