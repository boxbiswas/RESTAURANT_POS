import React, { useMemo, useState } from "react";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart, FaFire } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, upsertCartItem } from "../../redux/slices/cartSlice";
import { GiSlicedBread, GiNoodles } from "react-icons/gi";
import { BiSolidDrink } from "react-icons/bi";
import { MdOutlineFastfood } from "react-icons/md";

const getIconForCategory = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('bread')) return <GiSlicedBread />;
    if (lower.includes('drink') || lower.includes('beverage')) return <BiSolidDrink />;
    if (lower.includes('chinese') || lower.includes('noodle')) return <GiNoodles />;
    return <MdOutlineFastfood />;
};

const THEME_COLOR = '#f6b100';

const MenuContainer = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(getCartItems);
    const settings = useSelector((state) => state.settings);
    const currency = settings.currency || "INR";
    const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "₹";

    const categories = useSelector(state => state.menu.categories);
    const dishes = useSelector(state => state.menu.dishes);

    const menus = useMemo(() => {
        return categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            icon: <div className="bg-[#f6b100] p-3 rounded-lg text-[#1b1b1b] text-xl">{getIconForCategory(cat.name)}</div>,
            items: dishes.filter(d => d.category === cat.name),
        }));
    }, [categories, dishes]);

    const [selectedId, setSelectedId] = useState(null);
    
    const activeSelectedId = selectedId && menus.some(m => m.id === selectedId) ? selectedId : (menus[0]?.id || null);
    const selected = useMemo(() => menus.find(m => m.id === activeSelectedId) || menus[0], [menus, activeSelectedId]);

    const [draftQuantities, setDraftQuantities] = useState({});

    const liveQuantityMap = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            acc[item.cartId] = Number(item.quantity || 0);
            return acc;
        }, {});
    }, [cartItems]);

    const getCartKey = (menu) => `${selected?.id}-${menu.id}`;

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

    const increment = (menu) => setVisibleQty(menu, (prev) => prev + 1);
    const decrement = (menu) => setVisibleQty(menu, (prev) => prev - 1);

    const addToCart = (menu) => {
        const quantity = getVisibleQty(menu);
        const cartId = getCartKey(menu);
        if (quantity <= 0) return;
        dispatch(upsertCartItem({
            cartId,
            id: menu.id,
            categoryId: selected.id,
            name: menu.name,
            price: Number(menu.price),
            quantity,
        }));
        setDraftQuantities((prev) => ({ ...prev, [cartId]: 0 }));
    };

    return (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Category Tabs */}
            <div className="flex items-center gap-4 px-10 py-5 overflow-x-auto scrollbar-hide">
                {menus.map((menu) => {
                    const isSelected = activeSelectedId === menu.id;
                    return (
                        <button
                            key={menu.id}
                            onClick={() => setSelectedId(menu.id)}
                            className={`flex items-center gap-3 px-7 py-4 rounded-[16px] font-bold text-base whitespace-nowrap transition-all duration-200 border ${
                                isSelected
                                    ? "text-[#1a1a1a] shadow-xl scale-105 border-transparent"
                                    : "bg-[#1a1a1a] text-[#ababab] border-[#2a2a2a] hover:border-[#f6b100] hover:text-[#f5f5f5]"
                            }`}
                            style={isSelected ? { backgroundColor: THEME_COLOR } : {}}
                        >
                            <span className="text-xl">{menu.icon}</span>
                            <span>{menu.name}</span>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${isSelected ? "bg-black/20 text-[#1a1a1a]" : "bg-[#2a2a2a] text-[#ababab]"}`}>
                                {menu.items.length}
                            </span>
                        </button>
                    );
                })}
            </div>

            <hr className="border-t border-[#2a2a2a] mx-8" />

            {/* Menu Items Grid */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-min gap-3 px-10 py-4 overflow-y-auto scrollbar-hide min-h-0 content-start">
                {selected?.items.map((menu) => {
                    const selectedQty = getVisibleQty(menu);
                    const inCart = (liveQuantityMap[getCartKey(menu)] || 0) > 0;
                    return (
                        <div
                            key={menu.id}
                            className={`relative rounded-[12px] cursor-pointer transition-all duration-200 border overflow-hidden ${
                                inCart
                                    ? "bg-[#1f2e1f] border-[#02ca3a]/50"
                                    : "bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#f6b100]/60 hover:bg-[#202020]"
                            }`}
                        >
                            {/* Card top: name + price + in-cart dot */}
                            <div className="px-3 pt-3 pb-2">
                                <div className="flex items-start justify-between gap-1">
                                    <h1 className="text-[#f5f5f5] text-sm font-semibold leading-snug flex-1">{menu.name}</h1>
                                    {inCart && (
                                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#02ca3a] mt-1" />
                                    )}
                                </div>
                                <p className="text-[#f6b100] text-sm font-bold mt-1">{currencySymbol}{menu.price}</p>
                            </div>

                            {/* Card bottom: qty + add btn */}
                            <div className="flex items-center justify-between px-3 pb-3 gap-2">
                                <div className="flex items-center bg-[#111] rounded-[8px] px-2 py-1 gap-2">
                                    <button
                                        onClick={() => decrement(menu)}
                                        className="text-[#f6b100] font-bold text-sm w-4 h-4 flex items-center justify-center hover:scale-125 transition-transform"
                                    >−</button>
                                    <span className="text-[#f5f5f5] text-xs font-bold w-4 text-center">{selectedQty}</span>
                                    <button
                                        onClick={() => increment(menu)}
                                        className="text-[#f6b100] font-bold text-sm w-4 h-4 flex items-center justify-center hover:scale-125 transition-transform"
                                    >+</button>
                                </div>

                                <button
                                    onClick={() => addToCart(menu)}
                                    disabled={selectedQty === 0}
                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] text-xs font-bold flex-shrink-0 transition-all duration-150 ${
                                        selectedQty > 0
                                            ? "bg-[#02ca3a] text-white hover:bg-[#02a832]"
                                            : "bg-[#252525] text-[#444] cursor-not-allowed"
                                    }`}
                                >
                                    <FaShoppingCart size={10} />
                                    Add
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MenuContainer;