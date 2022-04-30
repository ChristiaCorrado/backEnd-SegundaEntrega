const admin = require("firebase-admin");
const serviceAccount = require("../../dataBase/firebase/ecommercentf-firebase-adminsdk-h867s-4894494d42.json");

class ContenedorCartsF {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async getAllCarts() {
    const db = admin.firestore();
    const query = db.collection("carritos");

    try {
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;
      const item = docs.map((doc) => ({
        id: doc.id,
        productos: doc.data(),
      }));

      if (item) {
        return item;
      } else {
        return console.log("Carrito no encontrado");
      }
    } catch (error) {
      return console.log("Error al obtener el Carrito", error.message);
    }
  }

  async saveCart(nuevoCarrito) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    let today = new Date().toLocaleString();

    try {
      const newCart = await query
        .add({
          timestamp: today,
          article: nuevoCarrito,
        })
        .then((docRef) => {
          return docRef.id;
        })
        .catch((error) => console.error("Error adding document: ", error));
      return newCart;
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteCartById(id) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    try {
      console.log(id);
      let idTodelete = id.toString();
      console.log(idTodelete);
      const doc = query
        .doc(`${idTodelete}`)
        .delete()
        .then((e) => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      console.log("se borro el carrito");
    } catch (error) {
      return console.log("Error al eliminar el Carrito", error.message);
    }
  }

  async addProductToCartById(id, productToAdd) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    const time = new Date().toLocaleString();

    try {
      var docRef = await this.getCartById(id)
      const support = docRef.article
      const newCart = {
        article: [...support, productToAdd ],
        timestamp:time
      } 
      
      console.log(newCart);
      
      const updated = await query.doc(id).set(newCart)
    } catch (error) {
      return console.log(
        "Error al agregar el producto al carrito",- 
        error.message
      );
    }
  }

  async deleteProductCartById(idCart, idProduct) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    const time = new Date().toLocaleString();

    try {

      var docRef = await this.getCartById(idCart)
      const support = docRef.article
      
      const deleteProd = support.filter((p) => p.id != idProduct);
      
      console.log(deleteProd);


      const newCart = {
        article: deleteProd,
        timestamp:time
      } 
      
      
      
      const updated = await query.doc(idCart).set(newCart)
      console.log(updated);
    } catch (error) {
      return console.log(
        "Error al eliminar porducto del carrito" + 
        error.message
      );
    }
    
  }

  async getCartById(id) {
    try {
      const db = admin.firestore();
      const query = db.collection("carritos");
      const doc = query.doc(String(id));
      const finded = await doc.get()

      if (finded) {
        return finded.data();
      } else {
        return console.log("Carrito no encontrado");
      }
    } catch (error) {
      return console.log("Error al obtener el Carrito", null);
    }
  }
}

module.exports = ContenedorCartsF;
