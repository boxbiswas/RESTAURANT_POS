import { useEffect, useState } from 'react';
import { getOrders } from '../https';

const DEFAULT_REFRESH_MS = 15000;

const useLiveOrders = (refreshMs = DEFAULT_REFRESH_MS) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchOrders = async () => {
            try {
                const res = await getOrders();
                if (isMounted && res?.data?.data) {
                    setOrders([...res.data.data].reverse());
                }
            } catch (error) {
                console.error('Failed to load orders:', error);
            }
        };

        fetchOrders();
        const timer = setInterval(fetchOrders, refreshMs);

        return () => {
            isMounted = false;
            clearInterval(timer);
        };
    }, [refreshMs]);

    return orders;
};

export default useLiveOrders;