/**
 * Author: digi-craft
 * http://digi-craft.de
 */

class QuotationData {
	constructor() {
		this.project = "";
		this.date = "";
		this.quotationNumber = "";
		this.customer = "";
		this.address1 = "";
		this.address2 = "";
		this.city = "";
	}
}

class WorkUnit {
	constructor() {
		this.name = "";
		this.rate = 0;
		this.factor = 0;
	}
}

class Material {
	constructor() {
		this.name = "";
		this.rate = 0;
		this.factor = 0;
	}
}

class Machine {
	constructor() {
		this.name = "";
		this.rate = 0;
		this.factor = 0;
	}
}

class Surcharge {
	constructor() {
		this.discount = 0;
		this.profit = 0;
		this.tax = 0;
	}
}

class Quotation {
	constructor () {
		this.quotationData = new QuotationData();
		this.workUnits = [];
		this.materials = [];
		this.machines = [];
		this.surcharge = new Surcharge();
	}
};


$( document ).ready(function() {

});

function buildJson() {
	let data = new Quotation();

	let quot = new QuotationData();
	quot.project = $("#project").val();
	quot.quotationNumber = $("#quotation-number").val();
	quot.date = $("#date").val();
	quot.customer = $("#customer").val();
	quot.address1 = $("#address1").val();
	quot.address2 = $("#address2").val();
	quot.city = $("#city").val();
	data.quotationData = quot;

	$(".workUnit-section .caption-content").each(function (index) {
		let obj = new WorkUnit();
		obj.name = $(this).val();
		obj.rate = $(".workUnit-section .rate-content").eq(index).val();
		obj.factor = $(".workUnit-section .factor-content").eq(index).val();
		data.workUnits.push(obj);
	});
	$(".material-section .caption-content").each(function (index) {
		let obj = new Material();
		obj.name = $(this).val();
		obj.rate = $(".material-section .rate-content").eq(index).val();
		obj.factor = $(".material-section .factor-content").eq(index).val();
		data.materials.push(obj);
	});
	$(".machine-section .caption-content").each(function (index) {
		let obj = new Machine();
		obj.name = $(this).val();
		obj.rate = $(".machine-section .rate-content").eq(index).val();
		obj.factor = $(".machine-section .factor-content").eq(index).val();
		data.machines.push(obj);
	});

	let sur = new Surcharge();
	sur.discount = $("#discount-input").val();
	sur.profit = $("#profit-input").val();
	sur.tax = $("#tax-input").val();
	data.surcharge = sur;

	return data;
}

function fillForm(data) {

	let quot = data.quotationData;
	$("#project").val(quot.project);
	$("#quotation-number").val(quot.quotationNumber);
	$("#date").val(quot.date);
	$("#customer").val(quot.customer);
	$("#address1").val(quot.address1);
	$("#address2").val(quot.address2);
	$("#city").val(quot.city);

	removeClonesButOne();

	let workUnits = data.workUnits;
	let count = workUnits.length;

	if(count > 0) {
		let obj = data.workUnits[0];
		$(".workUnit-section .caption-content").val(obj.name);
		$(".workUnit-section .rate-content").val(obj.rate);
		$(".workUnit-section .factor-content").val(obj.factor);
	}

	if (count > 1) {
		for (let i = 1; i < count; i++) {
			let obj = data.workUnits[i];
			$(".workUnit-section .caption-content").eq(i).val(obj.name);
			$(".workUnit-section .rate-content").eq(i).val(obj.rate);
			$(".workUnit-section .factor-content").eq(i).val(obj.factor);
		}
	}
	
}

function cloneRow(sectionName) {
	return $("." + sectionName + "-section .form-row :last").clone();
}

function removeClonesButOne() {

	let workUnit = $(".workUnit-section .form-row").eq(0).clone();
	let material = $(".material-section .form-row").eq(0).clone();
	let machine = $(".machine-section .form-row").eq(0).clone();

	let sections = [workUnit, material, machine];

	$("main").remove(".form-row");
	$(".form-footer").each(function (index) {
		$(this).insertBefore(sections[index]);
	})

}

/**
 * https://stackoverflow.com/a/24776295/3153939
 */
function upload() {
	let input = $(document.createElement('input'));
	input.attr("type", "file");
	input.trigger('click');
}

/**
 * https://stackoverflow.com/a/18197341/3153939
 */
function download() {
	let data = buildJson();
	let element = document.createElement('a');
	element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, "\t")));
	element.setAttribute('download', "json.json");

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

/**
 * Calculates sum of all Items in Work Unit Section
 * @param obj
 */
function calculateSum() {
	let sectionString = [".workUnit-section", ".material-section", ".machine-section"];
	for (let i = 0; i < 3; i++) {
		let section = $(sectionString[i]);
		section.find(".rate-content").each(function (index) {
			let rate = $(this).val();
			let factor = section.find(".factor-content").eq(index).val();
			rate = rate.replace(",", ".");
			rate = parseFloat(rate);
			factor = factor.replace(",", ".");
			factor = parseFloat(factor);
			let sum = rate * factor;
			sum = sum.toFixed(2).replace(".", ",");
			$(this).closest(".form-row").find(".sum-content").text(sum + " €");
		});

		let sectionSum = 0;
		$(sectionString[i] + " .sum-content").each(function (index) {
			let sum = $(this).text();
			sectionSum += parseFloat(sum.replace(",", "."));
		});

		$(sectionString[i] + " .form-footer .section-sum").text(sectionSum.toFixed(2).replace(".", ",") + " €");

	}

	let total = 0;
	$(".section-sum").each(function () {
		total += parseFloat($(this).text().replace(".", ",").replace("€", ""));
	});

	$("#net-label").text(total.toFixed(2).replace(".", ",") + " €");

	let discount = parseFloat($("#discount-input").val().replace(",", "."));
	let discountValue = total * (discount/100);
	$("#discount-label").text(discountValue.toFixed(2).replace(".", ",") + " €");

	let profit = parseFloat($("#profit-input").val().replace(",", "."));
	let profitValue = total * (profit/100);
	$("#profit-label").text(profitValue.toFixed(2).replace(".", ",") + " €");

	let tax = parseFloat($("#tax-input").val().replace(",", "."));
	let taxValue = total * (tax/100);
	$("#tax-label").text(taxValue.toFixed(2).replace(".", ",") + " €");

	total = total - discountValue + profitValue + taxValue;
	$(".total-sum").text(total.toFixed(2).replace(".", ",") + " €");
}

function appendRow(obj) {
	let cloned = $(obj).parent().prev();
	let clone = cloned.clone();
	clone.insertAfter(cloned);
	clone.find(".caption-content").val("");
	clone.find(".rate-content").val("");
	clone.find(".factor-content").val("");
	clone.find(".sum-content").text("");
}

function removeRow(obj) {
	let rows = $(obj).parent().parent().find(".form-row");
	if (rows.length > 1) {
		obj.parentNode.remove();
	}
}

