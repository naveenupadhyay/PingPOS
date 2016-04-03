<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en-US">
<head>
<link href="${path.css('walmart/all.css')}" rel="stylesheet"
	type="text/css" />
<script type="text/javascript" src="${path.js('pos/Jquery.js')}"></script>
<script type="text/javascript" src="${path.js('pos/pos.js')}"></script>
</head>
	<body>	
		<div class="header">

			
				<div class="logo-head"><img src="${path.resources('img/header_logo.png')}" alt=""></div>

		</div>

		<div class="action">
			<div class="search no-left-border boxwidth">
				<input type="tel" pattern="^\d{4}-\d{3}-\d{4}$" class="form-control ui-autocomplete-input customernum" name="search" id="tele" value="" placeholder="Enter Customer Phone Number" autocomplete="off">
			</div>
			<a href="#" id="new-person-btn" class="btn btn-primary btn-lg" title="Get Customer Order" onclick="getOrder()"><span class="">Pull order</span></a>	
		</div>
	<div class="container-fluid">
			<div class="row manage-table">
				<div class="panel panel-piluku">
					<div class="panel-heading">
						<h3 class="panel-title">
							Order List:<span id="orderCount" title="2 total items" class="badge bg-primary tip-left"></span>
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
										<th>Item Price</th>
										<th>Quantity</th>
										<th>Billed Price</th>
								</tr>
							</thead>
							<tbody id="displayCart">
							</tbody>
						</table>	
					</div>
				</div>
			</div>
	</div>
	<div>
		<a href="#" id="new-person-btn" class="btn btn-primary btn-lg submitorderbtn" onclick="postOrder()" title="Submit Order">
			<span class="">Submit Order</span>
		</a> 
	</div>
	</body>
</html>