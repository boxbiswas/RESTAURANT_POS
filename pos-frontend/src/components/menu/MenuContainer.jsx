import { React, useMemo, useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, upsertCartItem } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(getCartItems);

    const [selected, setSelected] = useState(menus[0]);
    const [draftQuantities, setDraftQuantities] = useState({});

    const liveQuantityMap = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            acc[item.cartId] = Number(item.quantity || 0);
            return acc;
        }, {});
    }, [cartItems]);

    const getCartKey = (menu) => `${selected.id}-${menu.id}`;

    const getVisibleQty = (menu) => {
        const cartKey = getCartKey(menu);
        if (Object.prototype.hasOwnProperty.call(draftQuantities, cartKey)) {
            return draftQuantities[cartKey];
        }
        return liveQuantityMap[cartKey] || 0;
    };

    const setVisibleQty = (menu, updater) => {
        const cartKey = getCartKey(menu);
        const current = getVisibleQty(menu);
        const nextValue = typeof updater === "function" ? updater(current) : updater;
        const next = Math.max(0, Math.min(99, nextValue));
        setDraftQuantities((prev) => ({ ...prev, [cartKey]: next }));
    };

    const increment = (menu) => {
        setVisibleQty(menu, (prev) => prev + 1);
    };

    const decrement = (menu) => {
        setVisibleQty(menu, (prev) => prev - 1);
    };

    const addToCart = (menu) => {
        const quantity = getVisibleQty(menu);
        const cartId = getCartKey(menu);

        if (quantity <= 0) {
            return;
        }

        dispatch(
            upsertCartItem({
                cartId,
                id: menu.id,
                categoryId: selected.id,
                name: menu.name,
                price: Number(menu.price),
                quantity,
            })
        );

        // Reset quantity to zero after adding to cart
        setDraftQuantities((prev) => ({ ...prev, [cartId]: 0 }));
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
                {
                    menus.map((menu) => {
                        return (
                            <div key={menu.id}
                                className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
                                style={{backgroundColor: menu.bgColor}}
                                onClick={() => {setSelected(menu)}}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <h1 className="flex items-center justify-between text-lg text-[#1a1a1a] font-semibold tracking-wide">{menu.icon} {menu.name}</h1>
                                    {selected.id === menu.id && < GrRadialSelected className="text-white size-{20}"/>}               
                                </div>
                                <p className="flex mx-4 text-sm text-[#1a1a1a] font-semibold tracking-wide">{menu.items.length} Items</p>
                            </div>
                        )
                    })
                }
            </div>

            <hr className="w-[98%] border-t-2 mt-4 border-[#2a2a2a] mx-auto" />
            <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full overflow-y-scroll h-[390px] scrollbar-hide">
                {
                    selected?.items.map((menu) => {
                        const selectedQty = getVisibleQty(menu);
                        return (
                            <div key={menu.id}
                                className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-start justify-between w-full">
                                        <h1 className="text-lg text-[#f5f5f5] font-semibold">{menu.name}</h1>
                                        <button
                                            onClick={() => addToCart(menu)}
                                            className="bg-[#2e4a40] text-[#02ca3a] cursor-pointer p-2 rounded-lg"
                                        >
                                            <FaShoppingCart size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <p className="text-xl text-[#f5f5f5] font-semibold">₹{menu.price}</p>
                                    <div className="flex items-center justify-between bg-[#1f1f1f] py-3 px-4 rounded-lg gap-6 z-20">
                                        <button
                                            onClick={() => decrement(menu)}
                                            className='text-yellow-500 text-2xl'
                                        >
                                            &minus;
                                        </button>
                                        <span className="text-white">{selectedQty}</span>
                                        <button
                                            onClick={() => increment(menu)}
                                            className='text-yellow-500 text-2xl'
                                        >
                                            &#43;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

        </>
    );
};

export default MenuContainer;