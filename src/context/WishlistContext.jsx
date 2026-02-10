import React, { createContext, useContext, useEffect, useState } from "react";


//creo il contesto
const WishlistContext = createContext();


//creo il provider
function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("my_wishlist")
        return savedWishlist ? JSON.parse(savedWishlist) : []
    });


    //se cambia la wishlist riscrivila
    useEffect(() => {
        localStorage.setItem("my_wishlist", JSON.stringify(wishlist))
    }, [wishlist]
    )

    //creo la funzione che mi verifica se il prodotto è  presente nella wishlist
    function isInWishlist(slug) {
        const found = wishlist.find((item) => item.slug === slug)
        if (found) { return true }
        else { return false }
    }


    //funzione per aggiungere alla wishlist
    function addToWishlist(product) {
        setWishlist((prevWishlist) => {
            //se ho un oggetto vuoto non aggiungere niente alla prevWishlist
            if (!product || !product.slug) return prevWishlist;

            if (isInWishlist(product.slug)){
                return prevWishlist;
            }
            else{
                return [...prevWishlist, product]

            }

        
        })
    }


    //funzione per rimuovere dalla wishlist
    function removeFromWishlist(slug) {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.slug !== slug))
    }

    //funzione per svuotare wishlist
    function clearWishlist() {
        setWishlist([])
    }

    //valore condiviso
    const contextValue = {
        wishlist,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist
    }




    return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>
}

//creo l'hook per il consumer
function useWishlist() {
    const value = useContext(WishlistContext)
    return value;
}

export { WishlistProvider, useWishlist }


