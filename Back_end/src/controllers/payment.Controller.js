const { application } = require("express");
require("dotenv").config();
const axios = require("axios");
const { PAYPAL_API_SECRET, PAYPAL_API, PAYPAL_API_CLIENT, HOST } = process.env;

const createOrder = async (req, res) => {
  const price = req.body.totalPrice
  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: price,
        },
      },
    ],
    application_context: {
      brand_name: "Wearfashion",
      landing_page: "NO_PREFERENCE", // Cambiado a un valor válido
      user_action: "PAY_NOW",
      return_url: `${HOST}/capture_order`,
      cancel_url: `${HOST}/cancel_order`,
    },
  };

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    });

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log(response.data);

    return res.json(response.data);
  } catch (error) {
    console.error("Error al crear el pedido:", error.response.data);
    return res.status(500).json({ error: error});
  }
};

const captureOrder = async (req, res) => {
  const { token } = req.query;

  const response = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    }
  );

  console.log(response.data);

  return res.send("Pagado");
};

const cancelOrder = async (req, res) => {
  const { token } = req.query;

  const response = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders/${token}/cancel`,
    {},
    {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    }
  );

  
};

module.exports = { createOrder, cancelOrder, captureOrder };
