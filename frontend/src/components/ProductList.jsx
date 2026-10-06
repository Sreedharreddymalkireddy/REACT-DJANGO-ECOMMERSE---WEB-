import axios from "axios";
import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";


function ProductList() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    const [maxPrice, setMaxPrice] = useState("");


    useEffect(() => {

        axios.get(
            "http://127.0.0.1:8000/api/products/"
        )
        .then(response => {

            setProducts(response.data);

        })
        .catch(error => {

            console.log(error);

        });

    }, []);


    const categories = [
        "All",
        ...new Set(
            products.map(product => product.category)
        )
    ];


    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());


        const matchesCategory =
            category === "All" ||
            product.category === category;


        const matchesPrice =
            maxPrice === "" ||
            Number(product.price) <= Number(maxPrice);


        return (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        );

    });


    return (

        <main>

            <section className="hero">

                <div>

                    <p className="hero-small">
                        WELCOME TO MYSHOP
                    </p>

                    <h1>
                        Everything you need.
                        <br />
                        All in one place.
                    </h1>

                    <p>
                        Discover quality products at
                        great prices.
                    </p>

                </div>

            </section>


            <section className="shop-section">

                <div className="shop-heading">

                    <div>

                        <p className="section-label">
                            OUR COLLECTION
                        </p>

                        <h2>
                            Shop Products
                        </h2>

                    </div>

                    <p>
                        {filteredProducts.length} products
                    </p>

                </div>


                <div className="filters">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />


                    <input
                        type="number"
                        placeholder="Maximum price"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(e.target.value)
                        }
                    />

                </div>


                <div className="category-buttons">

                    {categories.map(cat => (

                        <button
                            key={cat}
                            className={
                                category === cat
                                    ? "active-category"
                                    : ""
                            }
                            onClick={() =>
                                setCategory(cat)
                            }
                        >
                            {cat}
                        </button>

                    ))}

                </div>


                {filteredProducts.length === 0 ? (

                    <div className="empty-products">

                        <h3>
                            No products found
                        </h3>

                        <p>
                            Try another search or category.
                        </p>

                    </div>

                ) : (

                    <div className="products-container">

                        {filteredProducts.map(product => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))}

                    </div>

                )}

            </section>

        </main>
    );
}


export default ProductList;