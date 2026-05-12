import React from "react";
import {FaSearch} from "react-icons/fa";
import {FaUserCircle} from "react-icons/fa";
import {IoLogOut} from "react-icons/io5";
import logo from "../../assets/images/logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https/index";
import { removeUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const Navigate = useNavigate();

    const userData = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const logoutMutation = useMutation({
        mutationFn: () => logout(),
        onSuccess: (data) => {
            console.log(data);
           dispatch(removeUser());
           Navigate("/auth");
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    }

    return (
        <header className="flex justify-between items-center by px-8 bg-[#1a1a1a] h-[100px]">
            {/*Logo*/}
            <div className="flex items-center gap-2">
                <img src = {logo} alt="logo" className="h-10 w-10"/>
                <h1 className="text-lg font-semibold text-[#f5f5f5]">Restro</h1>
            </div>

            {/*Search*/}
            {/* <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[20px] px-5 w-[300px] ring-1 ring-[#f5f5f5]">
                <FaSearch className="text-[#f5f5f5]"/>
                <input
                    type="text" 
                    placeholder="Search..." 
                    className="bg-[#1f1f1f] outline-none text-[#f5f5f5] px-2 py-1 rounded-md"
                />                
            </div> */}

            {/*Logged User Details*/}
            <div className="flex item-center gap-4">
                <div className="flex items-center gap-3 cursor-pointer">
                    <FaUserCircle className="text-[#f5f5f5] text-4xl"/> 
                    <div className="flex flex-col items-start">
                        <h1 className="text-md text-[#f5f5f5] font-semibold">{userData.name || 'Test User'}</h1>
                        <p className="text-xs text-[#ababab] font-medium">{userData.role || 'Role'}</p>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] p-3 rounded-[15px] cursor-pointer">
                    <IoLogOut onClick={ handleLogout } className="text-[#f5f5f5] text-3xl"/>
                </div>
            </div>

        </header>
    )
}

export default Header;