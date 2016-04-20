package com.walmart.pingpos.web.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import com.webapputils.base.utils.StringUtils;

public class SiteResolverUtils {

    private static final String      MOBILE_POP_UA             = "|acs-|alav|alca|amoi|audi|aste|avan|benq|bird|blac|blaz|brew|cell|cldc|cmd-|dang|doco|eric|hipt|inno|ipaq|java|jigs|kddi|keji|leno|lg-c|lg-d|lg-g|lge-|maui|maxo|midp|mits|mmef|mobi|mot-|moto|mwbp|nec-|newt|noki|opwv|palm|pana|pant|pdxg|phil|play|pluc|port|prox|qtek|qwap|sage|sams|sany|sch-|sec-|send|seri|sgh-|shar|sie-|siem|smal|smar|sony|sph-|symb|t-mo|teli|tim-|tosh|tsm-|upg1|upsi|vk-v|voda|w3c |wap-|wapa|wapi|wapp|wapr|webc|winw|winw|xda|xda-|";

    private static final String      MOBILE_USER_AGENT_PATTERN = ".*(up\\.browser|up\\.link|windows ce|iphone|iemobile|mini|mmp|symbian|midp|wap|phone|pocket|mobile|pda|psp).*";

    @SuppressWarnings("serial")
    public static final List<String> REDIRECTION_URL_PATTERN   = Collections.unmodifiableList(new ArrayList<String>() {
                                                                   {
                                                                       add("/");
                                                                       add("/deals-[^-]*");
                                                                       add("/localdeals-[^-]*");
                                                                       add("/deal-(.*)");
                                                                       add("/product/(.*)/(.*)");
                                                                       add("/getaway-(.*)");
                                                                   }
                                                               });

    public static boolean isRequestFromMobile(HttpServletRequest request) {
        String userAgent = request.getHeader("user-agent");
        if (!StringUtils.isEmpty(userAgent)) {
            userAgent = userAgent.toLowerCase();
        } else {
            return false;
        }

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

    public static boolean isRequestMapped(HttpServletRequest request) {
        String requestPath = getRequestPathWithoutParam(request);
        Map<String, String> parameters = getParameterMap(request);
        if ("desktop".equalsIgnoreCase(parameters.get("view"))) {
            return false;
        }
        for (String urlMapped : REDIRECTION_URL_PATTERN) {
            if (Pattern.matches(urlMapped, requestPath)) {
                return true;
            }
        }
        return false;
    }

    public static String getRequestPath(HttpServletRequest request) {
        String url = request.getRequestURL().toString();
        StringBuilder sb = new StringBuilder();
        sb.append(url.substring(url.indexOf(".walmart.com") + 13, url.length())).append("?");
        Map<String, String> parameters = getParameterMap(request);
        for (String name : parameters.keySet()) {
            sb.append(name).append("=").append(parameters.get(name)).append("&");
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }

    private static String getRequestPathWithoutParam(HttpServletRequest request) {
        String url = request.getRequestURL().toString().toLowerCase();
        return url.substring(url.indexOf(".walmart.com") + 13, url.length());
        /*Map<String, String> parameters = getParameterMap(request);
        if (parameters != null && parameters.keySet().size() > 0) {
            return requestPath.substring(0, url.indexOf(parameters.keySet().iterator().next()) - 1);
        } else {
            return requestPath;
        }*/
    }

    private static Map<String, String> getParameterMap(HttpServletRequest request) {
        Map<String, String> parameters = new HashMap<String, String>();
        for (Object parameterName : request.getParameterMap().keySet()) {
            parameters.put(parameterName.toString(), request.getParameter(parameterName.toString()));
        }
        return parameters;
    }
}
