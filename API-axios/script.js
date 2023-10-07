const tableBody = document.getElementById("tableBody");
const SecilenDeger = document.getElementById("SecilenDeger");

function updateTable(range) {
    axios.get(`https://northwind.vercel.app/api/products?id_lte=${range}`)
        .then(res => {

            tableBody.innerHTML = "";

            res.data.forEach(product => {
                const row = document.createElement("tr");

                const idInstance = document.createElement("td");
                idInstance.textContent = product.id;

                const nameInstance = document.createElement("td");
                nameInstance.textContent = product.name;

                const unitPriceInstance = document.createElement("td");
                unitPriceInstance.textContent = product.unitPrice;

                const stokInstance = document.createElement("td");
                stokInstance.textContent = product.unitsInStock;


                const deleteInstance = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                    row.remove();

                    axios.delete(`https://northwind.vercel.app/api/products/${product.id}`)
                        .then(() => {
                            alert(`Ürün ID: ${product.id} silindi.`);
                        })
                        .catch(err => {
                            console.error("Silinemedi:", err);
                        });
                });

                deleteInstance.appendChild(deleteButton);

                row.appendChild(idInstance);
                row.appendChild(nameInstance);
                row.appendChild(unitPriceInstance);
                row.appendChild(stokInstance);
                row.appendChild(deleteInstance);
                tableBody.appendChild(row);
            });
        })
        .catch(err => {
            console.error(err);
        });

}

updateTable(50);
SecilenDeger.addEventListener("change", () => {
    const secilen = parseInt(SecilenDeger.value);
    updateTable(secilen);
});


