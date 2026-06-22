import Customer from "../models/Customer.js";

export const getCustomers =
  async (req, res) => {

    try {

      const {
        search,
        filter
      } = req.query;

      const query = {};

      if (search) {
        query.name = {
          $regex: search,
          $options: "i"
        };
      }

      if (filter) {
        query.phone = {
          $regex: `^${filter}`
        };
      }

      const customers =
        await Customer.find(query);

      res.json(customers);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };

export const createCustomer =
  async (req, res) => {
    const customer =
      await Customer.create(req.body);

    res.status(201).json(customer);
  };

export const updateCustomer =
  async (req, res) => {
    const customer =
      await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    res.json(customer);
  };

export const deleteCustomer =
  async (req, res) => {
    await Customer.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Customer Deleted"
    });
  };