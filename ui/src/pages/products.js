import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/navbar";

function Products() {
    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        name: "",
        quantity: "",
        price: "",
    });

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [page, setPage] =
  useState(1);

   useEffect(() => {
    getProducts();
}, [page,filter, search]);

  const getProducts =
  async () => {

    const { data } =
      await API.get(
        `/products?page=${page}&search=${search}&filter=${filter}`
      );

    setProducts(data);
  };

    const addProduct = async () => {
        try {
            if (
                !form.name ||
                !form.quantity ||
                !form.price
            ) {
                return alert(
                    "Please fill all fields"
                );
            }

            await API.post(
                "/products",
                form
            );

            setForm({
                name: "",
                quantity: "",
                price: "",
            });

            getProducts();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const confirmDelete =
                window.confirm(
                    "Delete Product?"
                );

            if (!confirmDelete) return;

            await API.delete(
                `/products/${id}`
            );

            getProducts();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="page">
                <h1>Products</h1>

                <div className="search-box">
                    <input
                        placeholder="Search Product"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                    <button
                        className="btn btn-primary"
                        onClick={getProducts}
                    >
                        Search
                    </button>
                </div>

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                >
                    <option value="">
                        All Products
                    </option>

                    <option value="low">
                        Below ₹1000
                    </option>

                    <option value="high">
                        Above ₹1000
                    </option>
                </select>

                <div className="form-section">
                    <input
                        placeholder="Product Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value,
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Quantity"
                        value={form.quantity}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                quantity:
                                    e.target.value,
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                price:
                                    e.target.value,
                            })
                        }
                    />

                    <button
                        className="btn btn-success"
                        onClick={addProduct}
                    >
                        Add Product
                    </button>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.length > 0 ? (
                                products.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>

                                        <td>
                                            {item.quantity}
                                        </td>

                                        <td>
                                            ₹{item.price}
                                        </td>

                                        <td>
                                            <button className="btn btn-primary">
                                                Edit
                                            </button>

                                            {" "}

                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    deleteProduct(
                                                        item._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        style={{
                                            textAlign:
                                                "center",
                                        }}
                                    >
                                        No Products Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div
  style={{
    marginTop: "20px"
  }}
>

  <button
    className="btn btn-primary"
    disabled={page === 1}
    onClick={() =>
      setPage(page - 1)
    }
  >
    Prev
  </button>

  <span
    style={{
      margin: "0 15px"
    }}
  >
    Page {page}
  </span>

  <button
    className="btn btn-primary"
    onClick={() =>
      setPage(page + 1)
    }
  >
    Next
  </button>

</div>
            </div>
        </>
    );
}

export default Products;