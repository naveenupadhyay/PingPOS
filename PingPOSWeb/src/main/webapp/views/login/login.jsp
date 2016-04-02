<%@ include file="/tld_includes.jsp"%>
<%@ page session="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>PING POS Login</title>
<link href="${path.css('walmart/jqueryUi.css')}" rel="stylesheet" type="text/css" />
<link href="${path.css('walmart/style.css')}" rel="stylesheet" type="text/css" />

<link rel="shortcut icon" href="${path.resources('img/icons/favicon.ico')}" type="image/x-icon" />
<link rel=icon type=image/ico href="${path.resources('img/icons/favicon.ico')}" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="${path.js('jquery/jquery.all.min.js')}"></script>
<script type="text/javascript">
		$(document).ready(function() {
	 		$("#forgotPasswordEmailSubmit").click(function(){
	 			$('#forgotPasswordSuccessMessage').html('');
	 			$('#forgotPasswordErrorMessage').html('');
	 			var ajaxUrl = "/forgotPassword?";
	 			
	 			ajaxUrl += "email=" + $("#forgot_email_buy_page").val();
	 			
	 			$.ajax({url:ajaxUrl, type: "POST", dataType: 'json', success: function(data) {
	 				if(data['status']=='success'){
	 					$('#forgotPasswordSuccessMessage').html('Please check email to reset your password.');	 					
	 				}else{
	 					$('#forgotPasswordErrorMessage').html('Not able reset your password, contact sysadmin.');
	 				}
	 			}});
	 		});

	 		$("#forgotPasswordLink").click(function(){
				$("#forgotPasswordEmaildiv").show();		 			
	 		});

	 		// validate signup form on keyup and submit
			$("#signupForm").validate({
				rules: {
					email: {
						required: true,
						email: true
					},
					password: {
						required: true,
						minlength: 6
					},
					confirmPassword: {
						required: true,
						minlength: 6,
						equalTo: "#password"
					},			
					agree: "required"
				},
				messages: {
					email: "Please enter a valid email address",
					password: {
						required: "Please provide a password",
						minlength: "Your password must be at least 6 characters long"
					},
					confirmPassword: {
						required: "Please provide a confirm password",
						minlength: "Your confirm password must be at least 6 characters long",
						equalTo: "Please enter the same password as above"
					},			
					agree: "Please accept our policy"
				}
			});
			});
		</script>
</head>
<body style="width: 100%; height: 100%; min-width: 962px;">
	<div id="system_message">
		<div class="sytem-msj-cont">
			<c:choose>
				<c:when test="${systemMessage != null}">
					<div class="system_${systemMessage.status}">
						<div class="message_inner">
							<c:out value="${systemMessage.message}"></c:out>
							<div class="close">Close</div>
						</div>
					</div>
				</c:when>
				<c:otherwise>
					<c:choose>
						<c:when test="${param['systemcode'] != null}">
							<c:set var="sysMessage" value="${cache.getCache('systemMessage').getSystemMessageByCode(param['systemcode'])}"></c:set>
							<div class="system_${sysMessage.status}">
								<div class="message_inner">
									<c:out value="${sysMessage.message}"></c:out>
									<div class="close">Close</div>
								</div>
							</div>
						</c:when>
						<c:otherwise>
							<sec:authorize ifAllGranted="unverified">
								<div class="system_fail">
									<div class="message_inner">
										Please verify your account to activate. Click <a href="${path.http}/sendVerificationEmail">here</a> to send verification email.
										<div class="close">Close</div>
									</div>
								</div>
							</sec:authorize>
						</c:otherwise>
					</c:choose>
				</c:otherwise>
			</c:choose>
		</div>
	</div>
	<div id="newSubscriber"></div>
	
	 <c:set var="loginPath" value="${path.http}/login_security_check?"/>
	      <c:if test="${not empty signupForm.targetUrl}">
	      	<c:set var="loginPath" value="${path.http}/login_security_check?spring-security-redirect=${signupForm.targetUrl}&"/>
	      </c:if>
   		  <c:set var="encodedLoginPath" value="${path.getEncodedUrl(loginPath)}"/>
		<div class="signupBoxDiv">
			<c:if test="${passwordUpdated}">
				<div id="pwdUpdatedMessage" style="color : green">Password updated successfully, try login with new passowrd. </div>
			</c:if>
			<div id="prevSource" style="display:none">You have signed up thru <span id="pSource"></span>. Please click the same icon to login again. </div>
			<div class="register_head">PING POS Login</div>
			<form id="loginform" method="post" action="${loginPath}">
				<div class="loginformCont">
					<div class="cus_info_wrap">
						<label class="labelTop" for="email">E-mail *</label>
						<input class="input" type="text" name="j_username" id="j_username">
					</div>
					<div class="cus_info_wrap">
					<label class="labelTop" for="password">Password *</label>
					<input class="input" type="password" name="j_password">
					</div>
					<div class="rememberme">
						<input class="checkBox" id="rememberMe" name="_spring_security_remember_me" type="checkbox">
						<span>Remember me on this computer</span> 
					</div>
					<div align="center">
						<input value="Sign in" class="button" type="submit" />
					</div>
				</div>
				<div id="forgotPasswordLink" align="center" style="cursor: pointer;"><a>Forgot your password?</a></div> <br/>
				<div id="forgotPasswordEmaildiv" align = "center" style="display: none;">
				      <div  id="forgotPasswordSuccessMessage" style="color: green;"></div>
				      <div  id="forgotPasswordErrorMessage" style="color: red;"></div> <br/>			     
					    	<input type="text" value="Enter email to reset it" name="email" id="forgot_email_buy_page"
			            	onblur="if(this.value=='') { this.value='Enter email to reset it'; }"
			            	onfocus="if(this.value=='Enter email to reset it') { this.value=''; }"  style="width:65%" /> <br/><br/>
							<input type="button" value="Submit" class="button" id="forgotPasswordEmailSubmit" style="width:30%" /><br/><br/>
		      </div>
				</form>
		</div>
</body>
</html>





