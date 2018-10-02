/**
 * Author: digi-craft
 * http://digi-craft.de
 */

$( document ).ready(function() {

});

/**
 * Calculates sum of all Items in Work Unit Section
 * @param obj
 */
function calculateSum(obj, sectionName) {
	let sectionString = "." + sectionName +"-section"
	let section = $(sectionString);
	section.find(".hourlyRate-content").each(function (index) {
		let rate = $(this).val();
		let hours = section.find(".hours-content").eq(index).val();
		rate = rate.replace(",", ".");
		rate = parseFloat(rate);
		hours = hours.replace(",", ".");
		hours = parseFloat(hours);
		let sum = rate * hours;
		sum = sum.toFixed(2).replace(".", ",");
		$(this).closest(".workUnit-row").find(".sum-content").text(sum + " €");
	})

	let total = 0;
	$(sectionString + " .sum-content").each(function (index) {
		let sum = $(this).text();
		total += parseFloat(sum.replace(",", "."));
	})

	total = total.toFixed(2).replace(".", ",") + " €";
	$(sectionString + " .form-footer .total-sum").text(total);
}

function appendWorkUnit(obj) {
	$(".workUnit-row:last").clone().insertAfter(".workUnit-row:last");
	let elem = $(".workUnit-row:last");
	elem.find(".caption-content").val("");
	elem.find(".hourlyRate-content").val("");
	elem.find(".hours-content").val("");
	elem.find(".sum-content").text("");
	calculateSum(obj);
}

function removeWorkUnit(obj) {
	if ($(".workUnit-row").length > 1) {
		obj.parentNode.remove();
	}
	calculateSum(obj);
}


function appendMaterial(obj) {
	$(".material-row:last").clone().insertAfter(".material-row:last");
}

function removeMaterial(obj) {
	if ($(".material-row").length > 1) {
		obj.parentNode.remove();
	}
}


function appendMachine(obj) {
	$(".machine-row:last").clone().insertAfter(".machine-row:last");
}

function removeMachine(obj) {
	if ($(".machine-row").length > 1) {
		obj.parentNode.remove();
	}
}