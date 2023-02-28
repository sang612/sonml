const layoutSelect = document.querySelectorAll(
  "#layout-select .input-form .selection-list .selection-items"
);
const backLayoutSelect = document.querySelectorAll(
  "#back__layout-select .input-form .selection-list .btn-list button"
);
const drawTypeSelect = document.querySelectorAll(
  "#drawer__type-select .input-form .selection-list .selection-items"
);
const doorGradeSelect = document.querySelectorAll(
  "#door__grade-select .input-form .selection-list .btn-list button"
);
const hangCabinetSelect = document.querySelectorAll(
  "#hanging__cabinet-select .input-form .selection-list .selection-items"
);
const handLightingSelect = document.querySelectorAll(
  "#hand__lighting-select .input-form .selection-list .btn-list button"
);
const seismicLatchSelect = document.querySelectorAll(
  "#seismic__latch-select .input-form .selection-list .btn-list button"
);
const counterMaterialSelect = document.querySelectorAll(
  "#counter__material-select .input-form .selection-list .selection-items"
);
const counterHeightSelect = document.querySelectorAll(
  "#counter__height-select .input-form .selection-list .btn-list button"
);
const sinkMaterialSelect = document.querySelectorAll(
  "#sink__material-select .input-form .selection-list .selection-items"
);
const sinkPositionSelect = document.querySelectorAll(
  "#sink__position-select .input-form .selection-list .selection-items"
);
const faucetMaterialSelect = document.querySelectorAll(
  "#faucet__material-select .input-form .selection-list .selection-items"
);
const specificationsSelect = document.querySelectorAll(
  "#specifications-select .input-form .selection-list .btn-list button"
);
const waterPurifierSelect = document.querySelectorAll(
  "#water__purifier-select .input-form .selection-list .selection-items"
);
const cookingEquipmentSelect = document.querySelectorAll(
  "#cooking__equipment-select .input-form .selection-list .selection-items"
);
const grilledFishSelect = document.querySelectorAll(
  "#grilled__fish-select .input-form .selection-list .btn-list button"
);
const cookingDesiredColorSelect = document.querySelectorAll(
  "#cooking_desired__color-select .input-form .selection-list .selection-items"
);
const rangeFoodSelect = document.querySelectorAll(
  "#range__food-select .input-form .selection-list .selection-items"
);
const rangeFoodColorSelect = document.querySelectorAll(
  "#range__food_desired__color-select .input-form .selection-list .selection-items"
);
const dishWasherSelect = document.querySelectorAll(
  "#dishwasher-select .input-form .selection-list .selection-items"
);
const dishWasherColorSelect = document.querySelectorAll(
  "#dishwasher_desired__color-select .input-form .selection-list .selection-items"
);
const dishWasherTypeSelect = document.querySelectorAll(
  "#dishwasher__type-select .input-form .selection-list .btn-list button"
);
const kitchenPanelSelect = document.querySelectorAll(
  "#kitchen__panel-select .input-form .selection-list .selection-items"
);
const beforeFaucetPositionSelect = document.querySelectorAll(
  "#before_faucet__position-select .input-form .selection-list .btn-list button"
);
const beforeCookingdPositionSelect = document.querySelectorAll(
  "#before_cooking__position-select .input-form .selection-list .btn-list button"
);
const beforeRangeHoodPositionSelect = document.querySelectorAll(
  "#before_range-hood__position-select .input-form .selection-list .btn-list button"
);
const beforeDishwasherPositionSelect = document.querySelectorAll(
  "#before_dishwasher__position-select .input-form .selection-list .btn-list button"
);
const constructionRequestSelect = document.querySelectorAll(
  "#construction__request-select .input-form .selection-list .btn-list button"
);

const nameMaker = document.querySelectorAll(".name-maker");
const productCode = document.querySelectorAll(".product-code");
const productName = document.querySelectorAll(".product-name");
const cabinetColor = document.getElementById("cabinet-color");
const kitchenPanelColor = document.getElementById("kitchen_panel-color");
const companyName = document.getElementById("company-name");
const companyNameFurigana = document.getElementById("company-name_furigana");
const customerName = document.getElementById("customer-name");
const customerNameFurigana = document.getElementById("customer-name_furigana");
const emailAddress = document.getElementById("email-address");
const emailAddressConfirm = document.getElementById("email-address_confirm");
const postCode = document.getElementById("postcode");
const cityName = document.getElementById("city-name");
const address = document.getElementById("address");
const contactNumber = document.getElementById("contact-number");
const phoneNumber = document.getElementById("cell-phone");
const fax = document.getElementById("fax");
const inquiryContent = document.getElementById("inquiry-content");
const storeName = document.getElementById("store-name");
const deliDate = document.getElementById("deli_date");
const memo = document.getElementById("memo");

const amountProduct = document.querySelector(".amount-product");
const discerning = document.getElementById("discerning");
const houseType = document.getElementById("house-type");
const floor = document.getElementById("floor");
const kitchenwide = document.getElementById("kitchen-wide");
const customerType = document.getElementById("customer-type");
const district = document.getElementById("district");
const quotation = document.getElementById("quotation");
const supplierType = document.getElementById("supplier-type");
const purpose = document.getElementById("purpose");
const paymentMethod = document.getElementById("payment-method");
const budget = document.getElementById("budget");
const contactHistory = document.getElementById("contact-history");
const backHome = document.getElementById("back-to-home");

const btnSubmit = document.querySelector(".list-btn-submit .btn-success");
const btnReset = document.getElementById("btnResetForm")
const btnResetFile = document.getElementById("btn-reset-files")
const btnAddProduct = document.querySelector(
  "#btn-add_product .input-desc .btn-add"
);
const uploadForm = document.getElementById("upload-form");
const showInput = document.getElementById("kitchenWidthAnother")
const showInputValue = document.querySelector("#kitchenWidthAnother input")

kitchenwide.addEventListener("change", () => {
  if (kitchenwide.options[kitchenwide.selectedIndex].text === "その他") {
    showInput.classList.remove("hide")
  } else {
    showInput.classList.add("hide")
  }
})

for (let i = 0; i <= 100; i++) {
  var opt = document.createElement("option");
  opt.value = i;
  opt.innerHTML = i + "個";
  amountProduct.appendChild(opt);
}

btnReset.addEventListener("click", resetForm);
btnResetFile.addEventListener("click", resetFormFile);
function resetForm() {
  showInput.classList.add("hide")
  var btnListActive = document.querySelectorAll(".btn-list button")
  var optionListActive = document.querySelectorAll(".selection-list .selection-items")
  for (let i = 0; i < btnListActive.length; i++) {
    btnListActive.forEach(function (item) {
      item.classList.remove("active");
    });
  }
  for (let i = 0; i < optionListActive.length; i++) {
    optionListActive.forEach(function (item) {
      item.classList.remove("active");
    });
  }
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

function selectHandler(buttons) {
  buttons.forEach((item) => {
    item.addEventListener("click", function () {
      buttons.forEach(function (item) {
        item.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
}
selectHandler(layoutSelect);
selectHandler(backLayoutSelect);
selectHandler(drawTypeSelect);
selectHandler(doorGradeSelect);
selectHandler(hangCabinetSelect);
selectHandler(handLightingSelect);
selectHandler(seismicLatchSelect);
selectHandler(counterMaterialSelect);
selectHandler(counterHeightSelect);
selectHandler(sinkMaterialSelect);
selectHandler(sinkPositionSelect);
selectHandler(faucetMaterialSelect);
selectHandler(specificationsSelect);
selectHandler(waterPurifierSelect);
selectHandler(cookingEquipmentSelect);
selectHandler(grilledFishSelect);
selectHandler(cookingDesiredColorSelect);
selectHandler(rangeFoodSelect);
selectHandler(rangeFoodColorSelect);
selectHandler(dishWasherSelect);
selectHandler(dishWasherColorSelect);
selectHandler(dishWasherTypeSelect);
selectHandler(kitchenPanelSelect);
selectHandler(beforeFaucetPositionSelect);
selectHandler(beforeDishwasherPositionSelect);
selectHandler(beforeRangeHoodPositionSelect);
selectHandler(beforeCookingdPositionSelect);
selectHandler(constructionRequestSelect);
selectHandler(layoutSelect);
selectHandler(layoutSelect);

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

const handleGetValueInput = (input) => {
  let values = input.value.replace(/\n|\r/g, "");
  return values;
};

const handleGetValueAnotherSelect = () => {
  let values = showInputValue.value.replace(/\n|\r/g, "");
  return values*1;
}
const handleGetValueSelect = (select) => {
  let value = select.options[select.selectedIndex].value;
  if (value.match(/[0-9]/g)) {
    return parseInt(value);
  }
  return value;
};
const handleGetValueSelectOption = (select) => {
  let value = select.options[select.selectedIndex].value;
  var test 
  if (value === "その他") {
     test = handleGetValueAnotherSelect();
    return test
  }
  test = handleGetValueSelect(select)
  return test
}

const handleGetValueOptionList = (option) => {
  let value;
  option.forEach((item) => {
    if (item.classList.contains("active"))
      value = item
        .getElementsByTagName("label")[0]
        .innerText.replace(/\n|\r/g, "");
  });
  return value;
};

const handleGetValueButtonList = (buttons) => {
  var value;
  buttons.forEach((item) => {
    if (item.classList.contains("active")) {
      var option = item.textContent;
      if (option.match(/\d/g)) {
        var size = option.replace(/[^0-9]/g, "");
        value = parseInt(size);
      } else {
        value = option.replace(/\n|\r/g, "").trim();
      }
    }
  });
  return value;
};

const handleGetBooleanValue = (boolValue) => {
  let value;
  boolValue.forEach((item, index) => {
    if (item.classList.contains("active")) {
      if (index === 0) {
        value = true;
      } else {
        value = false;
      }
    }
  });
  return value;
};

var currentTab = 0;
let form = document.getElementById("form-kitchen");
let form2 = document.getElementById("form-kitchen-file");
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

function ValidateEmail() {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAddress.value.match(mailformat)) {
    emailAddress.style.outline = "1px #dddddd solid";
  } else {
    emailAddress.style.outline = "1px red solid";
  }
}
emailAddress.addEventListener("blur", ValidateEmail);

function check() {
  setTimeout(() => {
    if (emailAddress.value !== emailAddressConfirm.value) {
      emailAddressConfirm.style.outline = "2px solid red";
    } else {
      emailAddressConfirm.style.outline = "1px #dddddd solid";
    }
  }, 1500);
}

emailAddressConfirm.addEventListener("keyup", check);
emailAddress.addEventListener("blur", check);

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n === 0) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById("email-address").value;
      const confirmEmail = document.getElementById(
        "email-address_confirm"
      ).value;
      if (email !== confirmEmail) {
        alert("メールが一致しません!");
        return;
      }

      const fetchOptions = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shop: location.host,
          supplier: handleGetValueInput(storeName),
          email: handleGetValueInput(emailAddress),
          companyName: handleGetValueInput(companyName),
          companyNamePhonetic: handleGetValueInput(companyNameFurigana),
          name: handleGetValueInput(customerName),
          namePhonetic: handleGetValueInput(customerNameFurigana),
          customerType: handleGetValueSelect(customerType),
          address: handleGetValueInput(address),
          district: handleGetValueInput(district),
          phoneNumber: handleGetValueInput(contactNumber),
          city: handleGetValueInput(cityName),
          content: handleGetValueInput(inquiryContent),
          fax: handleGetValueInput(fax),
          cellPhone: handleGetValueInput(phoneNumber),
          postCode: handleGetValueInput(postCode),
          note: handleGetValueInput(memo),
          supplierType: handleGetValueSelect(supplierType),
          purpose: handleGetValueSelect(purpose),
          paymentMethod: handleGetValueSelect(paymentMethod),
          estimateDate: handleGetValueInput(deliDate),
          budget: handleGetValueInput(budget),
          contactHistory: handleGetValueSelect(contactHistory),

          quotation: handleGetValueSelect(quotation),
          discerning: handleGetValueSelectOption(discerning),
          layout: handleGetValueOptionList(layoutSelect),
          houseType: handleGetValueSelect(houseType),
          floors: handleGetValueSelect(floor),
          layoutBehind: handleGetValueButtonList(backLayoutSelect),
          kitchenwide: handleGetValueSelectOption(kitchenwide),
          cabinetType: handleGetValueOptionList(drawTypeSelect),
          cabinetColor: handleGetValueInput(cabinetColor),
          doorType: handleGetValueButtonList(doorGradeSelect),
          hangingCabinet: handleGetBooleanValue(hangCabinetSelect),
          light: handleGetBooleanValue(handLightingSelect),
          antiEarthquakeLatch: handleGetBooleanValue(seismicLatchSelect),
          counterMaterial: handleGetValueOptionList(counterMaterialSelect),
          counterHeight: handleGetValueButtonList(counterHeightSelect),
          sinkMaterial: handleGetValueOptionList(sinkMaterialSelect),
          sinkPosition: handleGetBooleanValue(sinkPositionSelect),
          tapType: handleGetValueOptionList(faucetMaterialSelect),
          specType: handleGetValueButtonList(specificationsSelect),
          waterPurifier: handleGetValueOptionList(waterPurifierSelect),
          stoveType: handleGetValueOptionList(cookingEquipmentSelect),
          stoveColor: handleGetValueOptionList(cookingDesiredColorSelect),
          ovenType: handleGetValueButtonList(grilledFishSelect),
          kitchenHoodType: handleGetValueOptionList(rangeFoodSelect),
          kitchenHoodColor: handleGetValueOptionList(rangeFoodColorSelect),
          dishwasherType: handleGetBooleanValue(dishWasherSelect),
          dishwasherColor: handleGetValueOptionList(dishWasherColorSelect),
          dishwasherSegment: handleGetValueButtonList(dishWasherTypeSelect),
          kitchenPanelType: handleGetValueOptionList(kitchenPanelSelect),
          kitchenPanelColor: handleGetValueInput(kitchenPanelColor),
          tapPoistionMoment: handleGetValueButtonList(
            beforeFaucetPositionSelect
          ),
          stovePoistionMoment: handleGetValueButtonList(
            beforeCookingdPositionSelect
          ),
          kitchenHoodPoistionMoment: handleGetValueButtonList(
            beforeRangeHoodPositionSelect
          ),
          dishwasherPoistionMoment: handleGetValueButtonList(
            beforeDishwasherPositionSelect
          ),
          contentType: handleGetValueButtonList(constructionRequestSelect),
          products: serializeForm(form).products,
        }),
      };
      fetch("/apps/shop/kitchen", fetchOptions)
        .then((data) => data.json())
        .then((data) => {
          localStorage.setItem("idKitchen", data.payload.id);
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
    data.append("table", "kitchen");
    const _id = localStorage.getItem("idKitchen");
    data.append("id", _id);

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

const addNewFormBtn = document.getElementById("addNewFormBtn");

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
    select.name = `products[${count}]${strSelect}`;
    select.selectedIndex = 0;
  });
  let productForm = document.getElementById("product-form");
  productForm.append(newForm);
}

addNewFormBtn.addEventListener("click", addNewForm);
backHome.addEventListener("click", function () {
  location.assign(`${location.origin}`);
});
