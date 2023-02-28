var currentTab = 0;
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const email = document.getElementById("email");
const confirmEmail = document.getElementById("confirmEmail");
const inputFiles = document.querySelectorAll('input[type="file"]');
const text1 = document.getElementById("text1");
const text3 = document.getElementById("text3");
const text2 = document.getElementById("text2");
const fileName1 = document.getElementById("btn1");
const fileName2 = document.getElementById("btn2");
const fileName3 = document.getElementById("btn3");
const productQuantity = document.getElementById("products[0][productQuantity]");
const backHome = document.getElementById("back-to-home");

showTab(currentTab);
fileName1.addEventListener("change", function () {
	text1.innerHTML = fileName1.files[0].name;
});

fileName3.addEventListener("change", function () {
	text3.innerHTML = fileName3.files[0].name;
});

fileName2.addEventListener("change", function () {
	text2.innerHTML = fileName2.files[0].name;
});

for (let i = 1; i <= 100; i++) {
	var opt = document.createElement("option");
	opt.value = i;
	opt.innerHTML = i;
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

function showTab(n) {
	// This function will display the specified tab of the form...
	var x = document.getElementsByClassName("tab");
	x[n].style.display = "block";
	if (n === 0) {
		form1.onsubmit = (e) => {
			e.preventDefault();

			if (email.value !== confirmEmail.value) {
				alert("メールが一致しません!");
				confirmEmail.focus();
				return;
			}

			let data = serializeForm(form1);
			const fetchOptions = {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			};
			fetch("/apps/shop/proposal", fetchOptions)
				.then((data) => data.json())
				.then((data) => {
					console.log(data);
					localStorage.setItem("idProposal", data.payload.id);
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
		data.append("table", "proposal");
		const _id = localStorage.getItem("idProposal");
		data.append("id", _id);

		console.log(data);
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
