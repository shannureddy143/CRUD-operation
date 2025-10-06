const API_URL = "http://localhost:3000/products";

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

// Load all products on page load
window.addEventListener("DOMContentLoaded", loadProducts);

// 🟢 CREATE Product
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct)
  });

  form.reset();
  loadProducts();
});

// 🔵 READ Products
async function loadProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();

  productList.innerHTML = "";
  products.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <div>
        <strong>${p.name}</strong><br>
        💰 Rs.${p.price}<br>
        📝 ${p.description || "No description"}
      </div>
      <div class="actions">
        <button class="edit" onclick="editProduct('${p._id}')">Edit</button>
        <button class="delete" onclick="deleteProduct('${p._id}')">Delete</button>
      </div>
    `;
    productList.appendChild(div);
  });
}

// 🟠 UPDATE Product
async function editProduct(id) {
  const name = prompt("Enter new product name:");
  const price = prompt("Enter new price:");
  const description = prompt("Enter new description:");

  if (!name || !price) return alert("Name and price are required!");

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, description })
  });

  loadProducts();
}

// 🔴 DELETE Product
async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadProducts();
}
