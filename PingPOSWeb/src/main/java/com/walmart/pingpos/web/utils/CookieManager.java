
package com.walmart.pingpos.web.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieManager {

    public static void setCookie(HttpServletResponse response, String name, String value) {
        setCookie(response, name, value, Integer.MAX_VALUE);
    }

    public static void setCookie(HttpServletResponse response, String name, String value, int expiry) {
        Cookie ckUser = new Cookie(name, value);
        ckUser.setMaxAge(expiry);
        ckUser.setPath("/");
        ckUser.setDomain(".snapdeal.com");
        response.addCookie(ckUser);
        response.setHeader("P3P", "policyref=\"http://www.snapdeal.com/w3c/p3p.xml\", " + "CP=\"NOI CURa ADMa DEVa TAIa OUR BUS IND UNI COM NAV INT\"");
    }

    public static Cookie getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    return cookie;
                }
            }
        }
        return null;
    }

    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        Cookie cookie = getCookie(request, name);
        if (cookie != null) {
            cookie.setMaxAge(0);
            cookie.setPath("/");
            cookie.setDomain(".snapdeal.com");
            response.addCookie(cookie);
        }
    }
}
