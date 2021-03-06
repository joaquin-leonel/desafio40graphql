const express = require("express");
const Vistas = express.Router();
let { productsController, cartController } = require("../../controller/index");
const isAuthenticated = require("../../middleware/isAuthenticated");
const logger = require("../../services/modules/loggerService");

// --------------------------Vistas Productos
module.exports = () => {
  Vistas.get("/", isAuthenticated, (req, res) => {
    res.redirect("/productos");
    return;
  });

  Vistas.get("/productos", isAuthenticated, async (req, res) => {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductos = await productsController.getAllProducts(req, res);

      res.render("pages/productos", { listaDeProductos, userInfo });
      return;
    } catch (error) {
      console.log(error);
    }
  });

  Vistas.get("/productos/name/:name", isAuthenticated, async (req, res) => {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductos = await productsController.getProductByName(req);
      listaDeProductos._id = listaDeProductos._id.toString();
      res.render("pages/productos", {
        listaDeProductos: [listaDeProductos],
        userInfo,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  });

  Vistas.get("/productos/code/:code", isAuthenticated, async (req, res) => {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductos = await productsController.getProductByCode(req);
      listaDeProductos._id = listaDeProductos._id.toString();
      res.render("pages/productos", {
        listaDeProductos: [listaDeProductos],
        userInfo,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  });

  Vistas.get("/productos/price", isAuthenticated, async (req, res) => {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductos = await productsController.getProductsByPrice(req);
      res.render("pages/productos", { listaDeProductos, userInfo });
      return;
    } catch (error) {
      console.log(error);
    }
  });

  Vistas.get("/productos/stock", isAuthenticated, async (req, res) => {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductos = await productsController.getProductsByStock(req);
      console.log(listaDeProductos);
      res.render("pages/productos", { listaDeProductos, userInfo });
      return;
    } catch (error) {
      console.log(error);
    }
  });
  // -------------------------Cart View -------------------------------//
  Vistas.get("/carrito", isAuthenticated, async (req, res) => {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductosEnCarro = await cartController.getCartByUserId(
        req,
        res
      );
      if (listaDeProductosEnCarro === null) {
        res.render("pages/carrito", {
          listaDeProductosEnCarro: false,
          userInfo,
        });
        return;
      }
      res.render("pages/carrito", {
        listaDeProductosEnCarro,
        userInfo,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  });

  // --------------- Other views------------------------------/

  Vistas.get("/perfil", isAuthenticated, (req, res) => {
    const userInfo = req.user.toJSON();
    res.render("pages/perfil", { userInfo });
  });

  Vistas.get("/agregar-productos", isAuthenticated, (req, res) => {
    res.render("pages/agregarProductos");
  });

  return Vistas;
};
