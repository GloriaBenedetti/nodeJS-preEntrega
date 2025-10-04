
const BASE_URL = "https://fakestoreapi.com/products";

// Captura de argumentos desde la terminal
const [,, method, resource, ...params] = process.argv;

// Función principal que procesa los argumentos de la terminal y  ejecuta la acción CRUD correspondiente
async function main() {
try {
if (!method || !resource) {
console.log("❗Uso correcto:");
console.log("npm run start GET products");
console.log("npm run start GET products/<id>");
console.log("npm run start POST products <title> <price> <category>");
console.log("npm run start DELETE products/<id>");
return;
}

// ------------------------------
// 1️⃣ Obtener todos los productos
// ------------------------------
if (method === "GET" && resource === "products") {
const res = await fetch(BASE_URL);
const data = await res.json();
console.log("📦 Lista de productos:");
data.forEach(p => {
console.log(`ID: ${p.id} | ${p.title} - $${p.price}`);
});
return;
}

// ------------------------------
// 2️⃣ Obtener un producto por ID
// ------------------------------
if (method === "GET" && resource.startsWith("products/")) {
const id = resource.split("/")[1];
const res = await fetch(`${BASE_URL}/${id}`);
const data = await res.json();
console.log("🔍 Producto encontrado:");
console.log(data);
return;
}

// ------------------------------
// 3️⃣ Crear un nuevo producto
// ------------------------------
if (method === "POST" && resource === "products") {
const [title, price, category] = params;
if (!title || !price || !category) {
console.log("❗Faltan parámetros. Uso:");
console.log("npm run start POST products <title> <price> <category>");
return;
}

const nuevoProducto = {
title,
price: Number(price),
category
};

const res = await fetch(BASE_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(nuevoProducto)
});
const data = await res.json();

console.log("✅ Producto creado:");
console.log(data);
return;
}

// ------------------------------
// 4️⃣ Eliminar un producto
// ------------------------------
if (method === "DELETE" && resource.startsWith("products/")) {
const id = resource.split("/")[1];
const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
const data = await res.json();

console.log("🗑️ Producto eliminado:");
console.log(data);
return;
}

// ------------------------------
// Comando no válido
// ------------------------------
console.log("❌ Comando no reconocido. Verifica el formato del comando.");

} catch (error) {
console.error("🚨 Error:", error.message);
}
}

// Ejecuta el programa
main();






