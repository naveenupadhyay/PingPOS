
package com.walmart.pingpos.web.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import com.google.gson.Gson;
import com.webapputils.base.utils.StringUtils;
import com.walmart.pingpos.web.utils.PingPOSWebUtils;
import com.walmart.pingpos.web.response.SystemResponse;
import com.walmart.pingpos.web.response.SystemResponse.ResponseStatus;
import com.walmart.pingpos.web.utils.WebContextUtils;
import com.walmart.pingpos.web.security.PingPOSUser;

public class CustomSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private static final Logger LOG = LoggerFactory.getLogger(CustomSuccessHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        String ajax = request.getParameter("ajax");
        if (ajax != null && "true".equals(ajax)) {
            LOG.debug("ajax request received.");
            SystemResponse sr = new SystemResponse(ResponseStatus.SUCCESS, "Login is successful");
            String targetUrl = request.getParameter("spring-security-redirect");
            if (StringUtils.isNotEmpty(targetUrl)) {
                sr.addItem("targetUrl", targetUrl);
            }
            response.setHeader("Cache-Control", "no-cache");
            response.getOutputStream().write(new Gson().toJson(sr).getBytes("UTF-8"));
        } else if (request.getAttribute("rpxNowRequest") != null) {
            response.sendRedirect("/popup/rpxSuccess");
        } else {
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response) {
        StringBuilder builder = new StringBuilder();
        builder.append(super.determineTargetUrl(request, response));
        PingPOSUser user = WebContextUtils.getCurrentUser();
        builder.append(PingPOSWebUtils.determineAutoRedirctUrl(user));
        
        //This is a work around for url / issue.
        String starting = builder.substring(0, 2);
        if("//".equals(starting)){
        	String temp = builder.substring(1);
        	builder = new StringBuilder(temp);
        }
        
        //end of work around. This is to be removed in next release with proper fix.
        
        if (builder.indexOf("?") == -1) {
            builder.append('?');
        } else {
            builder.append('&');
        }
        return builder.append("login=success").toString();
    }

}
