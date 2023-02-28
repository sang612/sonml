var currentTab = 0;
let form = document.getElementById("form-estimate");
let form2 = document.getElementById("form-estimate-file");
showTab(currentTab);

let text1 = document.getElementById("text1");
let fileName1 = document.getElementById("btn1");
fileName1.addEventListener("change", function () {
	text1.innerHTML = fileName1.files[0].name;
});
let text2 = document.getElementById("text2");
let fileName2 = document.getElementById("btn2");
fileName2.addEventListener("change", function () {
	text2.innerHTML = fileName2.files[0].name;
});
let text3 = document.getElementById("text3");
let fileName3 = document.getElementById("btn3");
fileName3.addEventListener("change", function () {
	text3.innerHTML = fileName3.files[0].name;
});
let text4 = document.getElementById("text4");
let fileName4 = document.getElementById("btn4");
fileName4.addEventListener("change", function () {
	text4.innerHTML = fileName4.files[0].name;
});
let text5 = document.getElementById("text5");
let fileName5 = document.getElementById("btn5");
fileName5.addEventListener("change", function () {
	text5.innerHTML = fileName5.files[0].name;
});

const inputFiles = document.querySelectorAll('input[type="file"]');
const email = document.getElementById("email");
const confirmEmail = document.getElementById("email-confirm");
const productQuantity = document.getElementById("products[0][productQuantity]");
const btnReset = document.getElementById("btn-reset");
const btnResetFile = document.getElementById("btn-reset-files");
const backHome = document.getElementById("back-to-home");

btnReset.addEventListener("click", resetForm);
btnResetFile.addEventListener("click", resetFormFile);
function resetForm() {
  var elements = document.getElementsByTagName("input");
  for (let i = 0; i < elements.length; i++) {
    elements[i].value = "";
  }
  var textareaElements = document.getElementsByTagName("textarea");
  for (let i = 0; i < textareaElements.length; i++) {
    textareaElements[i].value = "";
  }
  var selectElements = document.getElementsByTagName("select");
  for (let i = 0; i < selectElements.length; i++) {
    selectElements[i].selectedIndex = 0;
  }
}

function resetFormFile() {
  var elements = document.getElementsByTagName("input");
  for (let i = 0; i < elements.length; i++) {
    elements[i].value = "";
  }

  let inputDesc = document.querySelectorAll(".button-list .input-button p");
  for (let i = 0; i < inputDesc.length; i++) {
    inputDesc[i].innerHTML = "選択されていません。";
  }
}

for (let i = 1; i <= 100; i++) {
	var opt = document.createElement("option");
	opt.value = i;
	opt.innerHTML = i+'個';
	productQuantity.appendChild(opt);
}

function update(data, keys, value) {
	if (keys.length === 0) {
		// Leaf node
		return value;
	}

	let key = keys.shift();
	if (!key) {
		data = data || [];
		if (Array.isArray(data)) {
			key = data.length;
		}
	}

	// Try converting key to a numeric value
	let index = +key;
	if (!isNaN(index)) {
		// We have a numeric index, make data a numeric array
		// This will not work if this is a associative array
		// with numeric keys
		data = data || [];
		key = index;
	}

	// If none of the above matched, we have an associative array
	data = data || {};

	let val = update(data[key], keys, value);
	data[key] = val;

	return data;
}

function serializeForm(form) {
	return Array.from(new FormData(form).entries()).reduce(
		(data, [field, value]) => {
			let [_, prefix, keys] = field.match(/^([^\[]+)((?:\[[^\]]*\])*)/);

			if (keys) {
				keys = Array.from(keys.matchAll(/\[([^\]]*)\]/g), (m) => m[1]);
				value = update(data[prefix], keys, value);
			}
			data[prefix] = value;
			return data;
		},
		{}
	);
}

function ValidateEmail() {
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email.value.match(mailformat)) {
		email.style.outline = "1px #dddddd solid";
	} else {
		email.style.outline = "1px red solid";
	}
}
email.addEventListener("blur", ValidateEmail);

function check() {
	setTimeout(() => {
		if (email.value !== confirmEmail.value) {
			confirmEmail.style.outline = "2px solid red";
		} else {
			confirmEmail.style.outline = "1px #dddddd solid";
		}
	}, 1500);
}

confirmEmail.addEventListener("keyup", check);
email.addEventListener("blur", check);

function showTab(n) {
	// This function will display the specified tab of the form...
	var x = document.getElementsByClassName("tab");
	x[n].style.display = "block";
	if (n === 0) {
		form.onsubmit = (e) => {
			e.preventDefault();
			const email = document.getElementById("email").value;
			const confirmEmail = document.getElementById("email-confirm").value;
			if (email !== confirmEmail) {
				alert("メールが一致しません!");
				document.getElementById("email-confirm").focus();
				return;
			}
			let data = serializeForm(form);
			data.budget = data.budget * 1;
			data.products.forEach((e) => (e.productQuantity = e.productQuantity * 1));

			const fetchOptions = {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			};
			fetch("/apps/shop/estimate", fetchOptions)
				.then((data) => data.json())
				.then((data) => {
					console.log(data);
					localStorage.setItem("idEstimate", data.payload.id);
					x[n].style.display = "none";
					x[n + 1].style.display = "block";
				})
				.catch((error) => {
					console.log("error:", error);
				});
		};
	}

	form2.onsubmit = function (e) {
		e.preventDefault();
		let data = new FormData(form2);
		for (const input of inputFiles) {
			if (input.files[0]) {
				data.append("files", input.files[0], input.files[0].name);
			}
		}
		data.append("table", "estimate");
		const _id = localStorage.getItem("idEstimate");
		data.append("id", _id);

		console.log("data file: ", data);
		const options = {
			method: "POST",
			body: data,
		};

		fetch("/apps/shop/file", options)
			.then((data) => data.json())
			.then((data) => {
				x[n + 1].style.display = "none";
				x[n + 2].style.display = "flex";
			})
			.catch((error) => console.log(error));
	};
}
backHome.addEventListener("click", function () {
	location.assign(`${location.origin}`);
});
