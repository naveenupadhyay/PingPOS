function showNotification() {
	
	//code to show or hide notification goes here..
	$(".notification").show();
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
					console.log(data)
					// code to use the json received and paint the ui goes here.
				},
			});

}

function pullOrder(){
	alert("pull");
    var mobile =9886902226;
	var settings = {
	 "type" : "POST",
	 "url" : "/getOrderDetails",
	 "dataType" : "text",
     "data" : {"mobile" : mobile}
}

	$.ajax(settings).done(function (response) {
	  processOrder(response);
	  console.log(response);
	});
}
function processOrder(response){
	alert("before");
	$(".homepage-middle-zone").hide();
	alert("inside");
    var html = "";
	response = {  
	   "json":{  
		  "notification_count":1,
		  "customer_id":"76449e86-41ef-4431-8ed2-74b1925007ad",
		  "itemCount":13,
		  "items":[  
			 {  
				"productId":"7K78WVTAA9C6",
				"img_url":"http://i5.walmartimages.com/dfw/dce07b8c-66be/k2-_8f7e0f9c-d364-4395-a559-8cffa01f0edf.v2.jpg",
				"product_url":"http://www.walmart.com/ip/Apple-iPad-mini-2-16GB-WiFi/30146246",
				"name":"Apple iPad mini 2 16GB WiFi",
				"price":269,
				"linePrice":269,
				"quantity":1
			 },
			 {  
				"productId":"0YC5BNSSL0XK",
				"img_url":"http://i5.walmartimages.com/dfw/dce07b8c-3c01/k2-_e528c8eb-36b9-49b3-8acb-4c1a2e53731b.v1.jpg",
				"product_url":"http://www.walmart.com/ip/Samsung-UN32J4000-32-720p-60Hz-LED-HDTV/44162661",
				"name":"Samsung UN32J4000 32\" 720p 60Hz LED HDTV",
				"price":198,
				"linePrice":198,
				"quantity":1
			 },
			 {  
				"productId":"4G1PQZ6SIFXT",
				"img_url":"http://i5.walmartimages.com/dfw/dce07b8c-fd71/k2-_140010c3-cf29-413a-94f7-36549ec45739.v1.jpg",
				"product_url":"http://www.walmart.com/ip/Acer-UM.UV6AA.C01/44689742",
				"name":"Acer 24\" Full HD LCD Monitor (V246HQL CBD Black)",
				"price":107,
				"linePrice":642,
				"quantity":6
			 },
			 {  
				"productId":"1I91V2YBMPAH",
				"img_url":"http://i5.walmartimages.com/dfw/dce07b8c-e05f/k2-_f2832ee6-b7cd-4aa7-af17-af55c40b44ed.v2.jpg",
				"product_url":"http://www.walmart.com/ip/Casio-Men-s-Classic-Digital-Watch-Black/20670078",
				"name":"Casio Men's Classic Digital Watch, Black",
				"price":10.34,
				"linePrice":41.36,
				"quantity":4
			 },
			 {  
				"productId":"5UR2QDJ882ZT",
				"img_url":"http://i5.walmartimages.com/dfw/dce07b8c-a498/k2-_215d3fbe-39a9-445b-8d76-651ac05f449c.v2.jpg",
				"product_url":"http://www.walmart.com/ip/Avia-Women-s-Summon-Running-Shoe/44104494",
				"name":"Avia Women's Summon Running Shoe",
				"price":19.97,
				"linePrice":19.97,
				"quantity":1
			 }
		  ]
	   },
	   "mobile":"9886902226"
};
	alert("hello");
	console.log(response);
	alert("hello1");
	var items = response["json"]["items"];
	alert("length" + items.length);
	for(i=0;i<items.length;i++){
		var img_url = items[i]["img_url"];
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
