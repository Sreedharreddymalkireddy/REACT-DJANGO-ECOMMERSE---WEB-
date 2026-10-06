import {
    useEffect,
    useState
} from "react";

import api from "../api/axios";


function AdminProducts() {

    const [products, setProducts] = useState([]);

    const [editId, setEditId] = useState(null);

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [price, setPrice] = useState("");

    const [image, setImage] = useState("");

    const [stock, setStock] = useState("");

    const [category, setCategory] = useState("");


    function getProducts() {

        api.get("products/")
            .then(response => {

                setProducts(response.data);

            })
            .catch(error => {

                console.log(error);

            });
    }


    useEffect(() => {

        getProducts();

    }, []);


    function clearForm() {

        setEditId(null);

        setName("");

        setDescription("");

        setPrice("");

        setImage("");

        setStock("");

        setCategory("");

    }


    function saveProduct(e) {

        e.preventDefault();


        const data = {

            name: name,

            description: description,

            price: price,

            image: image,

            stock: stock,

            category: category

        };


        if (editId) {

            api.put(
                `products/${editId}/update/`,
                data
            )
            .then(() => {

                alert("Product updated");

                clearForm();

                getProducts();

            })
            .catch(error => {

                console.log(
                    error.response?.data
                );

            });

        } else {

            api.post(
                "products/create/",
                data
            )
            .then(() => {

                alert("Product added");

                clearForm();

                getProducts();

            })
            .catch(error => {

                console.log(
                    error.response?.data
                );

            });

        }

    }


    function editProduct(product) {

        setEditId(product.id);

        setName(product.name);

        setDescription(product.description);

        setPrice(product.price);

        setImage(product.image);

        setStock(product.stock);

        setCategory(product.category);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    function deleteProduct(id) {

        if (!confirm("Delete this product?")) {

            return;

        }


        api.delete(
            `products/${id}/delete/`
        )
        .then(() => {

            alert("Product deleted");

            getProducts();

        })
        .catch(error => {

            console.log(
                error.response?.data
            );

        });

    }


    return (

        <div>

            <div className="admin-topbar">

                <div>

                    <p className="admin-label">
                        CATALOG
                    </p>

                    <h1>
                        Products
                    </h1>

                </div>

            </div>


            <div className="product-form-card">

                <div className="admin-section-heading">

                    <div>

                        <p className="admin-label">
                            {editId
                                ? "EDIT PRODUCT"
                                : "NEW PRODUCT"
                            }
                        </p>

                        <h2>
                            {editId
                                ? "Update Product"
                                : "Add Product"
                            }
                        </h2>

                    </div>

                </div>


                <form
                    className="admin-product-form"
                    onSubmit={saveProduct}
                >

                    <input
                        type="text"
                        placeholder="Product name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />


                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        required
                    />


                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                        required
                    />


                    <input
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) =>
                            setStock(e.target.value)
                        }
                        required
                    />


                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) =>
                            setImage(e.target.value)
                        }
                        required
                    />


                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                    />


                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="admin-primary-button"
                        >
                            {editId
                                ? "Update Product"
                                : "Add Product"
                            }
                        </button>


                        {editId && (

                            <button
                                type="button"
                                className="admin-cancel-button"
                                onClick={clearForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>


            <div className="admin-section">

                <div className="admin-section-heading">

                    <div>

                        <p className="admin-label">
                            INVENTORY
                        </p>

                        <h2>
                            All Products
                        </h2>

                    </div>

                    <span>
                        {products.length} products
                    </span>

                </div>


                <div className="admin-table-wrapper">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Price
                                </th>

                                <th>
                                    Stock
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {products.map(product => (

                                <tr key={product.id}>

                                    <td>

                                        <div className="admin-product-name">

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                            />

                                            <strong>
                                                {product.name}
                                            </strong>

                                        </div>

                                    </td>


                                    <td>
                                        {product.category}
                                    </td>


                                    <td>
                                        ₹{product.price}
                                    </td>


                                    <td>

                                        <span
                                            className={
                                                product.stock > 0
                                                    ? "stock-good"
                                                    : "stock-empty"
                                            }
                                        >
                                            {product.stock}
                                        </span>

                                    </td>


                                    <td>

                                        <div className="table-actions">

                                            <button
                                                onClick={() =>
                                                    editProduct(product)
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                className="delete-action"
                                                onClick={() =>
                                                    deleteProduct(
                                                        product.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}


export default AdminProducts;