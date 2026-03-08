import chickenBiyani from '../assets/images/Chicken Biryani.jpg';
import { GiSlicedBread, GiNoodles } from "react-icons/gi";
import { BiSolidDrink } from "react-icons/bi";

export const names = [
    {
        id: 1,
        name: "BISWAS",
        numberOfItems: 3,
        progress: "In-Progress",
        color: "#FF8904",
    },
    {
        id: 2,
        name: "ALEX",
        numberOfItems: 5,
        progress: "In-Progress",
        color: "#FF8904",
    },
    {
        id: 3,
        name: "JOHN",
        numberOfItems: 1,
        progress: "Completed",
        color: "#02ca3a",
    },
    {
        id: 4,
        name: "EMMA",
        numberOfItems: 2,
        progress: "Completed",
        color: "#02ca3a",
    },
    {
        id: 5,
        name: "SOPHIA",
        numberOfItems: 4,
        progress: "Completed",
        color: "#02ca3a",
    },
    {
        id: 6,
        name: "MICHAEL",
        numberOfItems: 4,
        progress: "Completed",
        color: "#02ca3a",
    },
    {
        id: 7,
        name: "DAVID",
        numberOfItems: 5,
        progress: "Completed",
        color: "#02ca3a",
    },
    {
        id: 8,
        name: "SARAH",
        numberOfItems: 2,
        progress: "Completed",
        color: "#02ca3a",
    },
    {
        id: 9,
        name: "ROBERT",
        numberOfItems: 3,
        progress: "Completed",
        color: "#02ca3a",
    },
    {
        id: 10,
        name: "CHRIS",
        numberOfItems: 3,
        progress: "Completed",
        color: "#02ca3a",
    },
    {
        id: 11,
        name: "LISA",
        numberOfItems: 5,
        progress: "Completed",
        color: "#02ca3a",

    },
];


export const drinkItem = [
    {
        id: 1,
        name: "Coca Cola",
        price: 50,
        category: "Cold",
    },
    {
        id: 2,
        name: "Pepsi",
        price: 50,
        category: "Cold",
    },
    {
        id: 3,
        name: "Lemon Iced Tea",
        price: 80,
        category: "Cold",
    },
    {
        id: 4,
        name: "Fresh Lime Soda",
        price: 60,
        category: "Cold",
    },
    {
        id: 5,
        name: "Cold Coffee",
        price: 120,
        category: "Cold",
    },
    {
        id: 6,
        name: "Hot Coffee",
        price: 90,
        category: "Hot",
    },
    {
        id: 7,
        name: "Masala Chai",
        price: 40,
        category: "Hot",
    },
    {
        id: 8,
        name: "Green Tea",
        price: 50,
        category: "Hot",
    },
    {
        id: 9,
        name: "Mango Lassi",
        price: 90,
        category: "Cold",
    },
    {
        id: 10,
        name: "Virgin Mojito",
        price: 150,
        category: "Cold",
    }
];

export const chineseItem = [
    {
        id: 1,
        name: "Chilli Chicken",
        price: 50,
        category: "Non-Veg",
    },
    {
        id: 2,
        name: "Fried Rice",
        price: 90,
        category: "Veg",
    },
    {
        id: 3,
        name: "Hakka Noodles",
        price: 80,
        category: "Veg",
    },
    {
        id: 4,
        name: "Manchow Soup",
        price: 60,
        category: "Veg",
    },
    {
        id: 5,
        name: "Chicken Manchurian",
        price: 110,
        category: "Non-Veg",
    },
    {
        id: 6,
        name: "Spring Roll",
        price: 70,
        category: "Veg",
    },
    {
        id: 7,
        name: "Gobi Manchurian",
        price: 80,
        category: "Veg",
    },
    {
        id: 8,
        name: "Veg Sweet Corn Soup",
        price: 50,
        category: "Veg",
    },
    {
        id: 9,
        name: "Chilli Paneer",
        price: 100,
        category: "Veg",
    },
    {
        id: 10,
        name: "Triple Schezwan Rice",
        price: 150,
        category: "Non-Veg",
    },
    {
        id: 11,
        name: "Chicken Lollipop",
        price: 120,
        category: "Non-Veg",
    },
]

export const breadItem = [
    {
        id: 1,
        name: "Laccha Paratha",
        price: 50,
        category: "Veg",
    },
    {
        id: 2,
        name: "Garlic Naan",
        price: 40,
        category: "Veg",
    },
    {
        id: 3,
        name: "Tandoori Roti",
        price: 20,
        category: "Veg",
    },
    {
        id: 4,
        name: "Butter Naan",
        price: 45,
        category: "Veg",
    },
    {
        id: 5,
        name: "Aloo Paratha",
        price: 55,
        category: "Veg",
    },
    {
        id: 6,
        name: "Rumali Roti",
        price: 30,
        category: "Veg",
    },
]


export const menus = [
    {
        id: 1,
        name: "BREADS",
        icon: <button className=" bg-[#f6b100] p-3 rounded-lg text-[#1b1b1b] text-xl"><GiSlicedBread /></button>,
        bgColor: "#f6b100",
        items: breadItem
    },
    {
        id: 2,
        name: "DRINKS",
        icon: <button className=" bg-[#f6b100] p-3 rounded-lg text-[#1b1b1b] text-xl"><BiSolidDrink /></button>,
        bgColor: "#f6b100",
        items: drinkItem
    },
    {
        id: 3,
        name: "CHINESE",
        icon: <button className=" bg-[#f6b100] p-3 rounded-lg text-[#1b1b1b] text-2xl"><GiNoodles /></button>,
        bgColor: "#f6b100",
        items: chineseItem
    }

];
