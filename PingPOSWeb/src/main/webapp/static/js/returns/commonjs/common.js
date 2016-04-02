function checkJsonResponse(data, type) {
		if (data.successfull == false) {
			if (typeof type === 'undefined' || type == "signal") {
				smoke.signal(data.errorMessage, 3000);
			} else if (type == "alert") {
				smoke.alert(data.errorMessage);
			}
		}
	}

	function checkJsonResponseWithSuccessMessage(data, type, successMessage) {
		if (data.successfull == false) {
			if (typeof type === 'undefined' || type == "signal") {
				smoke.signal(data.errorMessage, 3000);
			} else if (type == "alert") {
				smoke.alert(data.errorMessage);
			}
		} else {
			smoke.alert(successMessage);
		}
	}