<%@ include file="/tld_includes.jsp"%>
<tiles:insertTemplate template="/views/layout/base.jsp">

	<tiles:putAttribute name="title" value="shipping.snapdeal.com - Reset Your Password"/>
	
	<tiles:putAttribute name="head">
		<link href="${path.css('snapdeal/voucher.css')}" rel="stylesheet" type="text/css" />
	</tiles:putAttribute>
	
   <tiles:putAttribute name="body">
	<div align="center">
		<div id="internal-content">
	  	<div class="signupBoxDiv">
	  		<div class="register_head" >Reset Password</div>
	  	<div class="resetpass">
			<form id="resetPassword" method="post" action="${path.http}/changePassword"> <br/>
			<sec:authorize ifAllGranted="registered">
			<input type="hidden" name="validateOldPassword" value="true"/>
			<div class="cus_info_wrap">
				<label class="labelTop">Old Password *</label>
				<input type="password" name="oldPassword" id="oldPassword" class="input" />
				<c:if test="${passwordUpdateFailed}">
					<div id="pwdUpdatedMessage" style="color : red">Wrong old password</div>
				</c:if>
			</div> <br/>
			</sec:authorize>
	     	<div class="cus_info_wrap">
				<label class="labelTop">New Password *</label>
				<input type="password" name="newPassword" id="newPassword" class="input" />
			</div> <br/>
			<div class="cus_info_wrap">
				<label class="labelTop"> Confirm Password *</label>
				<input type="password" name="confirmPassword" id="confirmPassword" class="input" />
			</div> <br/>
			<input type="hidden" name="email" value="${email}"/>
			<sec:authorize ifNotGranted="registered">
				<input type="hidden" name="code" value="${param['code']}"/>
				<input type="hidden" name="targetUrl" value="${param['targetUrl']}"/> 
			</sec:authorize>
			<table>
				<tr>
					<td>
						<input type="submit" value="Submit"  class="button"/>
					</td>
					<td>
						<input type="button" value="Cancel" class="button" onclick="cancelResetPwd('/login')" />  <!--  redirecting to home page of the user, /login would lead to home page of user, if he's logged in -->
					</td>
				</tr>
			</table>
			<br/>
			</form>
		 </div>
		</div>
		</div>
	</div>	
	
   </tiles:putAttribute>
   <tiles:putAttribute name="deferredScript">
   	<script>
	function cancelResetPwd(url){
			window.location.href =  url;
	}

   	$(document).ready(function() {
   		
   		// validate signup form on keyup and submit
		$("#resetPassword").validate({
			rules: {
				<sec:authorize ifAllGranted="registered">
				oldPassword: {
					required: true,
				},
				</sec:authorize>
				newPassword: {
					required: true,
					minlength: 6
				},
				confirmPassword: {
					required: true,
					minlength: 6,
					equalTo: "#newPassword"
				},			
				agree: "required"
			},
			messages: {
				<sec:authorize ifAllGranted="registered">
				oldPassword: {
					required: "Old Password cannot be empty"
				},
				</sec:authorize>
				newPassword: {
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
   </tiles:putAttribute>
</tiles:insertTemplate>