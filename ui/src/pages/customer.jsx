import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/navbar";

function Customers() {
    const [customers, setCustomers] = useState([]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] =
        useState("");

    useEffect(() => {
        fetchCustomers();
    }, [search,filter]);

  const fetchCustomers =
  async () => {

    const { data } =
      await API.get(
        `/customers?search=${search}&filter=${filter}`
      );

    setCustomers(data);
  };

    const addCustomer = async () => {
        try {
            if (!name || !phone) {
                return alert(
                    "Please fill all fields"
                );
            }

            await API.post("/customers", {
                name,
                phone,
            });

            setName("");
            setPhone("");

            fetchCustomers();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCustomer = async (id) => {
        try {
            const confirmDelete =
                window.confirm(
                    "Delete Customer?"
                );

            if (!confirmDelete) return;

            await API.delete(
                `/customers/${id}`
            );

            fetchCustomers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="page">
                <h1>Customers</h1>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search Customer"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                    <button
                        className="btn btn-primary"
                        onClick={fetchCustomers}
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
                        All Customers
                    </option>

                    <option value="9">
                        Starts With 9
                    </option>

                    <option value="8">
                        Starts With 8
                    </option>
                </select>

                <div className="form-section">
                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(
                                e.target.value
                            )
                        }
                    />

                    <button
                        className="btn btn-success"
                        onClick={addCustomer}
                    >
                        Add Customer
                    </button>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {customers.length > 0 ? (
                                customers.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>

                                        <td>{item.phone}</td>

                                        <td>
                                            <button className="btn btn-primary">
                                                Edit
                                            </button>

                                            {" "}

                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    deleteCustomer(
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
                                        colSpan="3"
                                        style={{
                                            textAlign:
                                                "center",
                                        }}
                                    >
                                        No Customers Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Customers;