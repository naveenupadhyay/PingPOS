
package com.walmart.pingpos.web.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.walmart.pingpos.web.security.PingPOSUser;

public class WebContextUtils {
    public static HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

    public static ServletContext getServletContext() {
        return ContextLoader.getCurrentWebApplicationContext().getServletContext();
    }

    @SuppressWarnings("unchecked")
    public static Map<String, String> constructRequestParamMap(HttpServletRequest request) {
        Map<String, String[]> params = request.getParameterMap();
        Set<String> paramKeys = params.keySet();

        Map<String, String> parameters = new HashMap<String, String>();
        for (String param : paramKeys) {
            String[] values = params.get(param);
            if (values != null && values.length > 0) {
                parameters.put(param, values[0]);
            }
        }
        return parameters;
    }

    public static PingPOSUser getCurrentUser() {
        Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user != null && user instanceof PingPOSUser) {
            return (PingPOSUser) user;
        }
        return null;
    }

    public static void setSessionAttribute(String name, Object value) {
        getRequest().getSession(true).setAttribute(name, value);
    }

    @SuppressWarnings("unchecked")
    public static <T> T getSessionAttribute(String name, Class<T> type) {
        HttpSession session = getRequest().getSession(true);
        return (T) session.getAttribute(name);
    }

    public static String getCurrentUserEmail() {
        Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user != null && user instanceof PingPOSUser) {
            return ((PingPOSUser) user).getUsername();
        }
        return null;
    }
}
