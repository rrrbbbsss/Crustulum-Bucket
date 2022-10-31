const express = require("express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { cleaner } = require("./utils/cleanup");
const { ApolloServer } = require("apollo-server-express");
const stripe = require('stripe')('sk_test_51Lz4z2HQ6q6DJNSmChY9yfjGnvYux87OLxuTHCtmvfv6D2zhx4bXW75HQnGLbtUEc9tQg3OsJkfva3BGzZE3dFdi00p3gOdwLP');
const { typeDefs, resolvers } = require("./schema");
const db = require("./config/connection");


const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  debug: false,
});

const app = express();
const YOUR_DOMAIN = 'http://localhost:3001';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1Lz6ThHQ6q6DJNSmVnh2zI9R',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    automatic_tax: { enabled: true },
  });
  res.redirect(303, session.url);
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    cleaner();
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });

};

startApolloServer(typeDefs, resolvers);
