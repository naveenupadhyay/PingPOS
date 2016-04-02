
package com.walmart.pingpos.web.security;

import java.io.IOException;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import com.google.gson.Gson;
import com.walmart.pingpos.web.response.SystemResponse;
import com.walmart.pingpos.web.response.SystemResponse.ResponseStatus;

public class CustomFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    public CustomFailureHandler() {
    }

    public CustomFailureHandler(String defaultFailureUrl) {
        super(defaultFailureUrl);
    }

    private static final Logger LOG                       = LoggerFactory.getLogger(CustomFailureHandler.class);

    private static final String MOBILE_POP_UA             = "|acs-|alav|alca|amoi|audi|aste|avan|benq|bird|blac|blaz|brew|cell|cldc|cmd-|dang|doco|eric|hipt|inno|ipaq|java|jigs|kddi|keji|leno|lg-c|lg-d|lg-g|lge-|maui|maxo|midp|mits|mmef|mobi|mot-|moto|mwbp|nec-|newt|noki|opwv|palm|pana|pant|pdxg|phil|play|pluc|port|prox|qtek|qwap|sage|sams|sany|sch-|sec-|send|seri|sgh-|shar|sie-|siem|smal|smar|sony|sph-|symb|t-mo|teli|tim-|tosh|tsm-|upg1|upsi|vk-v|voda|w3c |wap-|wapa|wapi|wapp|wapr|webc|winw|winw|xda|xda-|";

    private static final String MOBILE_USER_AGENT_PATTERN = ".*(up\\.browser|up\\.link|windows ce|iphone|iemobile|mini|mmp|symbian|midp|wap|phone|pocket|mobile|pda|psp).*";

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String ajax = request.getParameter("ajax");
        if (ajax != null && "true".equals(ajax)) {
            LOG.debug("ajax request received.");
            // changing the default failure message on request
            SystemResponse sr = new SystemResponse(ResponseStatus.FAIL, "Invalid Username/Password");
            response.setHeader("Cache-Control", "no-cache");
            response.getOutputStream().write(new Gson().toJson(sr).getBytes("UTF-8"));
        } else if (request.getAttribute("rpxNowRequest") != null) {
            response.sendRedirect("/popup/rpxFail");
        } else if (isMobileRequest(request.getHeader("user-agent"))) {
            response.sendRedirect("/m/loginFailure");
        } else {
            super.onAuthenticationFailure(request, response, exception);
        }
    }

    private static boolean isMobileRequest(String userAgent) {
        userAgent = userAgent.toLowerCase();
        if (userAgent.contains("windows") && !userAgent.contains("windows ce")) {
            return false;
        }
        if (Pattern.matches(MOBILE_USER_AGENT_PATTERN, userAgent)) {
            return true;
        }

        if (userAgent.length() > 3 && MOBILE_POP_UA.contains("|" + userAgent.substring(0, 4) + "|")) {
            return true;
        }

        return false;
    }
}
