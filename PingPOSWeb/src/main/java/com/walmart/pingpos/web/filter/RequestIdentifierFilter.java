
package com.walmart.pingpos.web.filter;

import java.io.IOException;
import java.util.regex.Pattern;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.MDC;
import org.springframework.web.filter.OncePerRequestFilter;

import com.walmart.pingpos.web.utils.CookieManager;
import com.webapputils.base.utils.RequestContext;
import com.webapputils.base.utils.StringUtils;

public class RequestIdentifierFilter extends OncePerRequestFilter {

    private static final String MOBILE_POP_UA             = "|acs-|alav|alca|amoi|audi|aste|avan|benq|bird|blac|blaz|brew|cell|cldc|cmd-|dang|doco|eric|hipt|inno|ipaq|java|jigs|kddi|keji|leno|lg-c|lg-d|lg-g|lge-|maui|maxo|midp|mits|mmef|mobi|mot-|moto|mwbp|nec-|newt|noki|opwv|palm|pana|pant|pdxg|phil|play|pluc|port|prox|qtek|qwap|sage|sams|sany|sch-|sec-|send|seri|sgh-|shar|sie-|siem|smal|smar|sony|sph-|symb|t-mo|teli|tim-|tosh|tsm-|upg1|upsi|vk-v|voda|w3c |wap-|wapa|wapi|wapp|wapr|webc|winw|winw|xda|xda-|";

    private static final String MOBILE_USER_AGENT_PATTERN = ".*(up\\.browser|up\\.link|windows ce|iphone|iemobile|mini|mmp|symbian|midp|wap|phone|pocket|mobile|pda|psp).*";

    @Override
    protected void initFilterBean() throws ServletException {
        super.initFilterBean();
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        if (request.getPathInfo() == null || !request.getPathInfo().matches(".*/(css|img|js|w3c|font)/.*")) {
            String url = request.getRequestURL().toString().toLowerCase();
            RequestContext.current().setRequestUrl(url.substring(url.indexOf(".snapdeal.com/m") + 15, url.length()));
            //            int index = url.lastIndexOf(".snapdeal.com");
            //            if (index != -1) {
            //                if (!"getaways|staging|release.dev|releasestatic.dev|dev|matrix|www|pt.dev|main.dev|mainstatic.dev|branch1.dev|branch1static.dev|m.dev|mstatic.dev|matrix2|matrix3|cc|shipping|".contains(affName)) {
            //                    response.sendRedirect("http://www.snapdeal.com" + StringUtils.getNotNullValue(request.getPathInfo()));
            //                    return;
            //                }
            //            }
        }


        Cookie userTrackingCookie = CookieManager.getCookie(request, "u");
        String userAgent = request.getHeader("user-agent");
        String requestFrom = null;

        if (StringUtils.isNotEmpty(userAgent)) {
            if (isMobileRequest(userAgent)) {
                requestFrom = "Mobile";
            }
            String browser = getBrowser(userAgent);
            if (StringUtils.isNotEmpty(browser)) {
                request.setAttribute("browser", browser);
                RequestContext.current().setBrowser(browser);
            }
        }

        if (StringUtils.isEmpty(requestFrom)) {
            requestFrom = "Computer";
        }

        request.setAttribute("requestFrom", requestFrom);
        RequestContext.current().setRequestFrom(requestFrom);

        String userTrackingId;

        if (userTrackingCookie == null) {
            userTrackingId = String.valueOf(System.currentTimeMillis());
            CookieManager.setCookie(response, "u", userTrackingId);
        } else {
            userTrackingId = userTrackingCookie.getValue();
        }
        String view = request.getParameter("view");
        if (view != null) {
            if (view.equals("mobile")) {
                request.setAttribute("view", "mobile");
            } else {
                request.setAttribute("view", "desktop");
            }
        }

        request.setAttribute("userTrackingId", userTrackingId);
        request.setAttribute("origin", request.getRequestURI());
        RequestContext.current().setUserTrackingId(userTrackingId);

//        if (CacheManager.getInstance().getCache(ShippingPropertiesCache.class).isEventTrackingActive()) {
//            Cookie sourceTrackingCookie = CookieManager.getCookie(request, "st");
//            Map<String, String> visitTrackingParams = (Map<String, String>) request.getSession(true).getAttribute("visitTrackingParams");
//            if (sourceTrackingCookie == null || visitTrackingParams == null) {
//                Map<String, String> trackingParams = getTrackingParamsFromRequest(request);
//                if (sourceTrackingCookie == null) {
//                    CookieManager.setCookie(response, "st", getTrackingParams(trackingParams), ST_COOKIE_EXPIRY);
//                    RequestContext.current().setSourceTrackingParams(trackingParams);
//                } else {
//                    RequestContext.current().setSourceTrackingParams(getTrackingParams(sourceTrackingCookie.getValue()));
//                }
//                if (visitTrackingParams == null) {
//                    request.getSession(true).setAttribute("visitTrackingParams", trackingParams);
//                    RequestContext.current().setVisitTrackingParams(trackingParams);
//                } else {
//                    RequestContext.current().setVisitTrackingParams(visitTrackingParams);
//                }
//            } else {
//                RequestContext.current().setVisitTrackingParams(visitTrackingParams);
//                RequestContext.current().setSourceTrackingParams(getTrackingParams(sourceTrackingCookie.getValue()));
//
//            }
//        }

        StringBuilder sb = new StringBuilder();
        if (CookieManager.getCookie(request, "uid") != null) {
            sb.append(CookieManager.getCookie(request, "uid").getValue());
        }
        sb.append("-" + System.nanoTime());
        MDC.put("requestId", sb.toString());

        chain.doFilter(request, response);
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

    private String getBrowser(String userAgent) {
        userAgent = userAgent.toUpperCase();
        if (userAgent.contains("MSIE 9")) {
            return RequestContext.BROWSER_IE_9;
        }
        return null;
    }
}
