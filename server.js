const express = require('express');
const cors = require("cors");
const Sequelize = require("./src/models");
const wholesalerRoutes = require('./src/routes/wholesaler.js');
const retailerRoutes = require('./src/routes/retailer.js');
const stockRoutes = require('./src/routes/stock.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/wholesaler", wholesalerRoutes);
app.use("/api/retailer", retailerRoutes);
app.use("/api/stock", stockRoutes);

Sequelize.sync().then(()=>{
    console.log(`Database connected successfully`);
});

const PORT =  process.env.PORTS || 3000;
app.listen(PORT, ()=> {
    console.log(`Server running on Port ${PORT}`); 
})