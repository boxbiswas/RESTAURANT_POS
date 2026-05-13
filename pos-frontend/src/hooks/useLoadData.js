import { useEffect, useState } from "react";
import { getUserData, getSettings } from "../https/index";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { updateSettings } from "../redux/slices/settingsSlice";
import { setMenu } from "../redux/slices/menuSlice";
import { useNavigate } from "react-router-dom";

const useLoadData = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {

        const loadInitialData = async () => {
            try {
                const { data } = await getUserData();
                const { _id, name, email, phone, role } = data.data;
                dispatch(setUser({ _id, name, email, phone, role }));

                try {
                    const settingsRes = await getSettings();
                    if (settingsRes?.data?.data) {
                        const s = settingsRes.data.data;
                        dispatch(updateSettings({
                            currency: s.currency,
                            taxPercent: s.taxPercent,
                            serviceCharge: s.serviceCharge,
                            allowDiscounts: s.allowDiscounts,
                            discountPercent: s.discountPercent,
                            receiptFooter: s.receiptFooter,
                            restaurantName: s.restaurantName,
                            logo: s.logo || '',
                        }));
                        if (s.categories && s.categories.length > 0) {
                            dispatch(setMenu({ categories: s.categories, dishes: s.dishes || [] }));
                        }
                    }
                } catch (settingsErr) {
                    console.error("Failed to load settings:", settingsErr);
                }

            } catch (error) {
                dispatch(removeUser());
                navigate("/auth", { replace: true });
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadInitialData();

    }, [ dispatch, navigate ]);

    return { isLoading };
    
}

export default useLoadData;