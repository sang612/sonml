let count = 0;

function addNewForm() {
	count++;
	let newForm = document.getElementById("product-form-inputs").cloneNode(true);
	newForm.querySelectorAll("input").forEach((input) => {
		let strInput = input.name.slice(11);
		input.name = `products[${count}]${strInput}`;
		input.value = "";
	});
	newForm.querySelectorAll("select").forEach((select) => {
		let strSelect = select.name.slice(11);
		console.log(select.name);
		select.name = `products[${count}]${strSelect}`;
		select.selectedIndex = 0;
	});
	let productForm = document.getElementById("product-form");
	productForm.append(newForm);
}
