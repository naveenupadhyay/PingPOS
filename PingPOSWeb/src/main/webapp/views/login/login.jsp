<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en-US">
<head>
<link href="${path.css('walmart/all.css')}" rel="stylesheet"
	type="text/css" />
<link href="${path.css('walmart/style.css')}" rel="stylesheet"
	type="text/css" />

</head>
<body>


	<div class="flip-container">
		<div class="flipper">
			<div class="front">
				<!-- front content -->
				<div class="holder">


					<div class="heading login-logo">
						<img src="${path.resources('img/header_logo.png')}" alt="">
					</div>
					<c:set var="loginPath" value="${path.http}/login_security_check?" />
					<form action="${path.http}/login_security_check?" class="form login-form" id="loginform"
						autocomplete="off" method="post" accept-charset="utf-8">

						<h2 class="text-center">Associate Login</h2>
						<p></p>
						<input type="text" name="j_username" id="j_username" id="username"
							class="form-control" placeholder="Username" size="20"><input
							type="password" name="j_password" value="pointofsale"
							id="password" class="form-control" size="20">

							<div class="bottom_info">
								<div class="rememberme">
									<input class="checkBox" id="rememberMe"
										name="_spring_security_remember_me" type="checkbox"> <span>Remember
											me on this computer</span>
								</div>
								<a href="" class="pull-right flip-link to-recover">Reset
									password?</a>

							</div>
							<div class="clearfix"></div>
							<button type="submit" class="btn btn-primary btn-block">Login</button>
					</form>
					<div class="version"></div>
				</div>
			</div>
		</div>
	</div>
	n
</body>
</html>