function showNotification() {
	
	//code to show or hide notification goes here..
}

function fetchOrderJson(){

	var mobile =9886902226;
	$.ajax({
				type : "POST",
				url : "/getOrderDetails",
				dataType : 'text',
				data : {'mobile' : mobile},
				success : function(data) {
					console.log("received response");
					console.log(data);
					
					// code to use the json received and paint the ui goes here.
				},
				
			});

}