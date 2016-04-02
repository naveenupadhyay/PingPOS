function getOrder(){
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "http://www.walmart.com/api/cart/:CRT",
	  "method": "GET",
	  "headers": {
		"content-type": "application/json",
	  },
	  "processData": false,
	  "data": ""
	}
	$.ajax(settings).done(function (response) {
	  localStorage.setItem("FullCartResponse",JSON.stringify(response));
	  setCartCount(response);
	  getOrderCallBack(response);
	  console.log(response);
	});
}
function setCartCount(response){
	if(response.length == 0){
		$('#orderCount').html("The cart is currently empty");
	}
	else{
	$('#orderCount').html(response["cart"]["itemCount"] + " items are available in the Cart");
	}
}
function getOrderCallBack(response){
	var html = "";
	var items = response["items"];
	for(i=0;i<items.length;i++){
		console.log(items[i]);
		var skuId = items[i]["productId"];
		var imgUrl = items[i]["assets"]["primary"][0]["100"];
		console.log("ImgUrl = "+imgUrl);
		var itemName = items[i]['name'];
		var itemPrice = items[i]["price"];
		var itemLinePrice = items[i]['linePrice'];
		var itemQuantity = items[i]['quantity'];

		html += "<tr style='cursor: pointer;'>"+
				"<td><input type='checkbox' id='item_1' value='1'><label for='item_1'><span></span></label></td>"+
				"<td>"+skuId+"</td>"+
				"<td><img src="+imgUrl+" width='50' height='50' alt='' class='prodimg'></td>"+
				"<td>"+itemName+"</td>"+
				"<td>"+itemPrice+"</td>"+
				"<td>"+itemLinePrice+"</td>"+
				"<td>"+itemQuantity+"</td>"+
				"</tr>";
	}
	console.log(html);
	$('#displayCart').html(html);
	console.log("Items : " + items);
}
function postOrder(){
	var payload = {    
			"json" : localStorage.getItem("FullCartResponse"), 
			"mobile" :"9886902226"
		}
	console.log("Payload is : " + JSON.stringify(payload));
	var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "http://10.4.2.19:80/saveOrderDetails",
		  "method": "POST",
		  "headers": {
			"content-type": "application/json",
			"cache-control": "no-cache",
			"postman-token": "a8bcffde-56f3-41e7-cd81-ec0c34c2d4df"
		  },
		  "processData": false,
		  "data": JSON.stringify(payload)
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
}