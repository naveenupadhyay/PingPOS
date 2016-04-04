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

function pullOrder(){
    var mobile =9886902226;
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "/getOrderDetails",
	  "dataType" : "text",
	  "method": "POST",
	  "headers": {
		"content-type": "application/json",
		},
	  "processData": false,
      "data" : {'mobile' : mobile}
}

	$.ajax(settings).done(function (response) {
	  processOrder(response);
	  console.log(response);
	});
}
function processOrder(){
	$('.notification').click( function(){
		$(".homepage-middle-zone").hide();
	});

    var html = "";
	var items = response["json"]["items"];
	for(i=0;i<items.length;i++){
		var imgUrl = items[i]["img_url"];
		var product_url=items[i]["product_url"];
		var name = items[i]["name"];
		var price = items[i]["price"];
		html+="<div class='item-list-wrapper'>"+
				"<div class='product-image'>"+
					"<img class='' width='120' height='120' alt='' src="+img_url+" />"+
				"</div>"+
              "<div>"+
              "<div class='pricetag'>"+price+"</div>"+
			  "<div class='pdsc'>"+name+"</div>"+
			  "<div>Share and earn referal bonus<span class='tc'>*</span></div>"+
				"<div>"+
					"<div class='facebook icon'> <i class='fa fa-facebook'> </i> <span class='labelfb' a href='http://www.facebook.com/sharer/sharer.php/?u='"+product_url+"'>Facebook</span></div>"+
					"<div class='twitter icon'> <i class='fa fa-twitter'> </i> <span class='labeltw'>Twitter</span></div>"+
				"</div>"+
              "</div>"+
              "</div>";
	}
	$('#displayCart').html(html);
}
