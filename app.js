/**
 * Calculates all Items of Work Units
 * @param obj
 */
function calculateWorkUnitSum(obj) {

	let section = $(".workUnit-section");
	section.find(".hourlyRate-content").each(function (index) {
		let hours = section.find(".hours-content").eq(index).val();
		let rate = $(this).val();
		rate = rate.replace(",", ".");
		rate = parseFloat(rate);
		hours = hours.replace(",", ".");
		hours = parseFloat(hours);
		let sum = rate * hours;
		sum = sum.toFixed(2).replace(".", ",");
		$(this).closest(".workUnit-row").find(".sum-content").text(sum + " €");
	})

	let total = 0;
	$(".workUnit-section .sum-content").each(function (index) {
		total += parseFloat($(this).text().replace(",", "."));
	})

	total = total.toFixed(2).replace(".", ",") + " €";
	$(".workUnit-section .form-footer .total-sum").text(total);
}

function appendWorkUnit(obj) {
	$(".workUnit-row:last").clone().insertAfter(".workUnit-row:last");
	let elem = $(".workUnit-row:last");
	elem.find(".caption-content").val("");
	elem.find(".hourlyRate-content").val("");
	elem.find(".hours-content").val("");
	elem.find(".sum-content").text("");
}

function removeWorkUnit(obj) {
	if ($(".workUnit-row").length > 1) {
		obj.parentNode.remove();
	}
	calculateWorkUnitSum(obj);
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