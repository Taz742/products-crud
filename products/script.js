const createProductBtn = document.getElementById("createProductBtn");
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");
const modalBtn = document.getElementById("modalBtn");

const closeModal = () => {
  productModal.style.display = "none";

  clearInputs();
};

const clearInputs = () => {
  productName.value = "";
  productDescription.value = "";
  productPrice.value = "";
  productImage.value = "";
};

createProductBtn.addEventListener("click", function () {
  productModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", function () {
  closeModal();
});

modalBtn.addEventListener("click", async function () {
  const nameValue = productName.value;
  const priceValue = productPrice.value;
  const descriptionValue = productDescription.value;
  const imageValue = productImage.value;

  if (nameValue && priceValue && descriptionValue && imageValue) {
    const dataToSend = {
      name: nameValue,
      price: priceValue,
      description: descriptionValue,
      image: imageValue,
    };

    await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: { "Content-Type": "application/json" },
    });
    displayProducts();
    closeModal();
  } else {
    alert("Please fill all the inputs");
  }
});

const displayProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();

  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product");
    productItem.innerHTML = `
      <img src="${product.image}" />
      <p>${product.name}</p>
      <p>${product.description}</p>
      <p>${product.price}</p>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    `;
    productsContainer.appendChild(productItem);
  });
};

displayProducts();
