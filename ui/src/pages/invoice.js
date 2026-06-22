import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/navbar";
import jsPDF from "jspdf";

function Invoice() {
  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [customerId, setCustomerId] =
    useState("");

  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customerRes =
        await API.get("/customers");

      const productRes =
        await API.get("/products");

      setCustomers(customerRes.data);
      setProducts(productRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createInvoice = async () => {
    try {
      if (
        !customerId ||
        !productId ||
        !quantity
      ) {
        return alert(
          "Please fill all fields"
        );
      }

      await API.post("/invoices", {
        customerId,
        items: [
          {
            productId,
            quantity:
              Number(quantity),
          },
        ],
      });

      alert(
        "Invoice Created Successfully"
      );

      setCustomerId("");
      setProductId("");
      setQuantity(1);
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data
          ?.message ||
          "Something went wrong"
      );
    }
  };

  const downloadPdf = () => {

 const doc =
  new jsPDF();

 doc.text(
  "Billistry Invoice",
  20,
  20
 );

 doc.text(
  `Customer : ${customerId}`,
  20,
  40
 );

 doc.text(
  `Product : ${productId}`,
  20,
  60
 );

 doc.text(
  `Quantity : ${quantity}`,
  20,
  80
 );

 doc.save(
  "invoice.pdf"
 );
};

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Create Invoice</h1>

        <div className="invoice-box">

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(
                e.target.value
              )
            }
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((c) => (
              <option
                key={c._id}
                value={c._id}
              >
                {c.name}
              </option>
            ))}
          </select>

          <br />
          <br />

          <select
            value={productId}
            onChange={(e) =>
              setProductId(
                e.target.value
              )
            }
          >
            <option value="">
              Select Product
            </option>

            {products.map((p) => (
              <option
                key={p._id}
                value={p._id}
              >
                {p.name}
              </option>
            ))}
          </select>

          <br />
          <br />

          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
          />

          <br />
          <br />

          <button
            className="btn btn-success"
            onClick={
              createInvoice
            }
          >
            Create Invoice
          </button>

        </div>
        <button
 className="btn btn-primary"
 onClick={downloadPdf}
>
 Download PDF
</button>
      </div>
    </>
  );
}

export default Invoice;