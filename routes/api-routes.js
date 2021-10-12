const router=require("express").Router();
const userController=require("../controllers/user");
const productController=require("../controllers/product");
const cartController=require("../controllers/cart");
const orderController=require("../controllers/order");
const { route } = require("./user");


router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/users",userController.users);
router.delete("/user/delete/:id",userController.delete);

// products
router.post("/product/create", productController.create);
router.put("/product/update/:id",productController.update);
router.delete("/product/delete/:id",productController.delete);
router.get("/products",productController.products);

// cart routes
router.post("/cart/create",cartController.create);
router.get("/my-cart/:userId",cartController.myCart);
router.put("/cart/update/:id",cartController.update);
router.delete("/cart/delete/:id",cartController.delete);
router.get("/carts",cartController.carts);

// order routes
router.post("/order/create",orderController.create);
router.get("/my-order/:userId",orderController.myOrders);
router.put("/order/update/:id",orderController.update);
router.delete("/order/delete/:id",orderController.delete);
router.get("/orders",orderController.orders);



module.exports=router;