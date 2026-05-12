import { useEffect } from "react";
import { getUserData } from "../https/index";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useLoadData = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {

        const fetchUser = async () => {
            try {
                
                const { data } = await getUserData();
                console.log(data);
                const { _id, name, email, phone, role } = data.data;
                dispatch(setUser({ _id, name, email, phone, role }));
            } catch (error) {
                dispatch(removeUser());
                navigate("/auth", { replace: true });
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();

    }, [ dispatch, navigate ]);

    return { isLoading };
    
}

export default useLoadData;