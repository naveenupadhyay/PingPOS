<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en-US">
<head>
<link href="${path.css('walmart/all.css')}" rel="stylesheet"
	type="text/css" />
<script type="text/javascript" src="${path.js('jquery/jquery.all.min.js')}"></script>
</head>
	<body>	
		<div class="header">

			
				<div class="logo-head"><img src="${path.resources('img/header_logo.png')}" alt=""></div>

		</div>

<script type="text/javascript">
$(document).ready(function() {
	
	$(".showorder").click(function(){
		$("#orderDetails").show();	
	})
})
 
</script>

		<div class="action">
			
			<div class="search no-left-border boxwidth">
	
					<input type="tel" pattern="^\d{4}-\d{3}-\d{4}$" class="form-control ui-autocomplete-input customernum" name="search" id="tele" value="" placeholder="Enter Customer Phone Number" autocomplete="off">
				</div>
					<a href="" id="new-person-btn" class="btn btn-primary btn-lg" title="New Customer"><span class="showorder">Pull order</span></a>	
		</div>

<div class="container-fluid" id="orderDetails"">
		<div class="row manage-table">
			<div class="panel panel-piluku">
				<div class="panel-heading">
					<h3 class="panel-title">
						Your Order List:<span title="2 total items" class="badge bg-primary tip-left"></span>
						<div class="panel-options custom">
						</div>
					</h3>
				</div>
				<div class="panel-body nopadding table_holder table-responsive">
					<table class="table tablesorter table-hover" id="sortable_table">
					<thead>
						<tr>
							<th class="leftmost">
								<input type="checkbox" id="select_all"><label for="select_all"><span></span></label>
							</th>
								<th>SKU ID</th>
								<th>Product Image</th>
								<th>Item Description</th>
								<th>Cost Price</th>
								<th>Selling Price</th>
								<th>Quantity</th>
								<th>Delete</th>
	
							</tr>
							</thead>
							<tbody>
							<tr style="cursor: pointer;">
								<td><input type="checkbox" id="item_1" value="1"><label for="item_1"><span></span></label></td>
								<td>12387</td>
								<td><img src="" width="50" height="50" alt="" class="prodimg"></td>
								<td>Combining the suction power of an upright with the agility of a cordless</td>
								<td>$347.00</td>
								<td>$320.00</td>
								<td>2</td>
								<td>Delete</td>
							</tr>
														<tr style="cursor: pointer;">
								<td><input type="checkbox" id="item_1" value="1"><label for="item_1"><span></span></label></td>
								<td>12387</td>
								<td><img src="" width="50" height="50" alt="" class="prodimg"></td>
								<td>Combining the suction power of an upright with the agility of a cordless</td>
								<td>$347.00</td>
								<td>$320.00</td>
								<td>2</td>
								<td>Delete</td>
							</tr>
														<tr style="cursor: pointer;">
								<td><input type="checkbox" id="item_1" value="1"><label for="item_1"><span></span></label></td>
								<td>12387</td>
								<td><img src="" width="50" height="50" alt="" class="prodimg"></td>
								<td>Combining the suction power of an upright with the agility of a cordless</td>
								<td>$347.00</td>
								<td>$320.00</td>
								<td>2</td>
								<td>Delete</td>
							</tr>
														<tr style="cursor: pointer;">
								<td><input type="checkbox" id="item_1" value="1"><label for="item_1"><span></span></label></td>
								<td>12387</td>
								<td><img src="" width="50" height="50" alt="" class="prodimg"></td>
								<td>Combining the suction power of an upright with the agility of a cordless</td>
								<td>$347.00</td>
								<td>$320.00</td>
								<td>2</td>
								<td>Delete</td>
							</tr>
														<tr style="cursor: pointer;">
								<td><input type="checkbox" id="item_1" value="1"><label for="item_1"><span></span></label></td>
								<td>12387</td>
								<td><img src="" width="50" height="50" alt="" class="prodimg"></td>
								<td>Combining the suction power of an upright with the agility of a cordless</td>
								<td>$347.00</td>
								<td>$320.00</td>
								<td>2</td>
								<td>Delete</td>
							</tr>



								</tbody></table>			
				</div>	


				
			</div>
		</div>
	</div>





		<div class="footer">
			
zadasdsds

		</div>
	</body>
</html>