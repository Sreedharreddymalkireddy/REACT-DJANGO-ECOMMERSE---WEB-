
import { createContext, useContext, useEffect, useState } from "react";


const CartContext = createContext();


function CartProvider({ children }) {

    function clearCart() {

    setCart([]);

}

    const [cart, setCart] = useState(() => {

        const savedCart = localStorage.getItem("cart");

        if (savedCart) {

            return JSON.parse(savedCart);

        }

        return [];

    });


    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }, [cart]);


    function addToCart(product) {

        const existingProduct = cart.find(
            item => item.id === product.id
        );


        if (existingProduct) {

            const newCart = cart.map(item => {

                if (item.id === product.id) {

                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };

                }

                return item;

            });

            setCart(newCart);

        } else {

            const newProduct = {
                ...product,
                quantity: 1
            };

            setCart([...cart, newProduct]);

        }
    }


    function removeFromCart(id) {

        const newCart = cart.filter(
            product => product.id !== id
        );

        setCart(newCart);
    }


    function increaseQuantity(id) {

        const newCart = cart.map(product => {

            if (product.id === id) {

                return {
                    ...product,
                    quantity: product.quantity + 1
                };

            }

            return product;

        });

        setCart(newCart);
    }


    function decreaseQuantity(id) {

        const newCart = cart.map(product => {

            if (
                product.id === id &&
                product.quantity > 1
            ) {

                return {
                    ...product,
                    quantity: product.quantity - 1
                };

            }

            return product;

        });

        setCart(newCart);
    }


    return (

        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
            }}
        >

            {children}

        </CartContext.Provider>

    );
}


export function useCart() {

    return useContext(CartContext);

}


export default CartProvider;

