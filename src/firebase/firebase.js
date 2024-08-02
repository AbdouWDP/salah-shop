import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyBQ9RrguIon-0gyvPq_sDLZ1FWmROU5TB0",
  authDomain: "salah-shop-7b51d.firebaseapp.com",
  projectId: "salah-shop-7b51d",
  storageBucket: "salah-shop-7b51d.appspot.com",
  messagingSenderId: "612401581897",
  appId: "1:612401581897:web:4035db6ade661af6451498",
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
const storage = getStorage(app);

const productsCol = collection(database, "products");

export function fetchProducts(setProducts) {
  const productsQuery = query(productsCol);
  onSnapshot(productsQuery, (snapshot) => {
    let products = [];
    snapshot.docs.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    setProducts(products);
  });
}

// ========================= Add New Product =========================
export function addNewProduct(form) {
  const imageName = form.image.files[0].name + v4();
  if (
    form.title.value !== "" &&
    form.price.value !== "" &&
    form.image.files.length > 0 &&
    form.category.value !== "" &&
    form.big_image.files.length > 0
  ) {
    const storageRef = ref(storage, `images/${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, form.image.files[0]);
    uploadTask.on(
      "state_changed",
      () => {},
      (err) => alert(err.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
          const bigImageName = form.big_image.files[0].name + v4();
          const storageRef = ref(storage, `images/${bigImageName}`);
          const uploadTask = uploadBytesResumable(
            storageRef,
            form.big_image.files[0]
          );
          uploadTask.on(
            "state_changed",
            () => {},
            (e) => alert(err.message),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((bigImageUrl) => {
                addDoc(productsCol, {
                  title: form.title.value,
                  price: form.price.value,
                  category: form.category.value,
                  image: imageUrl,
                  timestamp: serverTimestamp(),
                  image_name: imageName,
                  big_image_name: bigImageName,
                  big_image: bigImageUrl,
                }).then(() => form.reset());
              });
            }
          );
        });
      }
    );
  } else {
    alert("All inputs must be filled!");
  }
}

// ========================= Fetch Single Product =========================
export function fetchSingleProduct(id, setProduct) {
  const productRef = doc(database, "products", id);
  getDoc(productRef)
    .then((product) => {
      setProduct(product.data());
    })
    .catch((err) => alert(err.message));
}

// ========================= Delete Product =========================
export function deleteProduct(product) {
  const c = confirm("Are you sure you want to delete this product?");
  if (c) {
    const productRef = doc(database, "products", product.id);
    deleteObject(ref(storage, `images/${product.image_name}`)).then(() => {
      deleteObject(ref(storage, `images/${product.big_image_name}`)).then(
        () => {
          deleteDoc(productRef)
            .then(() => alert("Product deleted successfully"))
            .catch((err) => alert(err));
        }
      );
    });
  }
}
