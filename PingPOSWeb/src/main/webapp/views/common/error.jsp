<%@ include file="/tld_includes.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><c:choose>
		<c:when test="${param['code'] == '404'}">
			Page not found
		</c:when>
		<c:otherwise>
			<c:choose>
				<c:when test="${param['code'] == '500'}">
					Internal Server Error
				</c:when>
				<c:when test="${param['code'] == '403'}">
					Access Denied
				</c:when>
				<c:otherwise>
				</c:otherwise>
			</c:choose>
		</c:otherwise>
	</c:choose>
</title>
<link href="${path.css('walmart/jqueryUi.css')}" rel="stylesheet" type="text/css" />
<link href="${path.css('walmart/style.css')}" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="${path.resources('img/icons/favicon.ico')}" type="image/x-icon" />
<link rel=icon type=image/ico href="${path.resources('img/icons/favicon.ico')}" />
<tiles:insertAttribute name="head" defaultValue="" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="${path.js('jquery/jquery.all.min.js')}"></script>
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
		<div id="internal-content">
			<c:choose>
				<c:when test="${param['code'] == '404'}">
					<div class="error_pic">
						<img src="${path.resources('img/error/error404.jpg')}" width="320">
						<div class="clear"></div>
					</div>
					<div class="error-cont">
						<div class="error-text">
							The page you were looking for appears to have been moved, deleted
							or does not exists. <br> Please click the links below to go
							to relevant section of the website.
						</div>
						<div class="error-text-line">&nbsp;</div>
						<div class="clear"></div>
					</div>

				</c:when>
				<c:otherwise>
					<div align="center">
						<c:choose>
							<c:when test="${param['code'] == '500'}">
								<img src="${path.resources('img/error/error500.jpg')}">
							</c:when>
							<c:when test="${param['code'] == '403'}">
								<img src="${path.resources('img/error/error403.jpg')}">
							</c:when>
							<c:otherwise>
								<img src="${path.resources('img/error/error401.jpg')}">
							</c:otherwise>
						</c:choose>
					</div>
				</c:otherwise>
			</c:choose>
		</div>
</body>
</html>


