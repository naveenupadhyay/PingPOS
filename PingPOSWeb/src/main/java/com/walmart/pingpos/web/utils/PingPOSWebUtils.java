
package com.walmart.pingpos.web.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import com.webapputils.base.cache.EmailVerificationCode;
import com.webapputils.base.utils.StringUtils;
import com.walmart.pingpos.web.security.PingPOSUser;
import com.walmart.pingpos.entity.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
public class PingPOSWebUtils {

    private static final Logger LOG = LoggerFactory.getLogger(PingPOSWebUtils.class);

    private static String NO_REDIRECT_URL = "home";

    public static String getEmailVerificationLink(String url, String email, EmailVerificationCode emailVerificationCode) {
        if (emailVerificationCode != null) {
            return getEmailVerificationLink(url, email, emailVerificationCode.getCode(), emailVerificationCode.getSource(), emailVerificationCode.getTargetUrl());
        }
        return null;
    }

    public static String getEmailVerificationLink(String url, String email, String confirmationCode, String source, String targetUrl) {
        StringBuilder builder = new StringBuilder().append(PathResolver.getHttpPath()).append("/").append(url);
        if (url.indexOf("?") == -1) {
            builder.append("?email=");
        } else {
            builder.append("&email=");
        }
        try {
            builder.append(URLEncoder.encode(email, "UTF-8"));
            builder.append("&code=").append(confirmationCode);
            if (StringUtils.isNotEmpty(source)) {
                builder.append("&source=").append(source);
            }
            if (StringUtils.isNotEmpty(targetUrl)) {
                builder.append("&targetUrl=").append(URLEncoder.encode(targetUrl, "UTF-8"));

            }
        } catch (UnsupportedEncodingException e) {
            builder.append(email);
            builder.append("&code=").append(confirmationCode);
            if (StringUtils.isNotEmpty(source)) {
                builder.append("&source=").append(source);
            }
            if (StringUtils.isNotEmpty(targetUrl)) {
                builder.append("&targetUrl=").append(targetUrl);
            }
        }
        return builder.toString();
    }

    public static String determineAutoRedirctUrl(PingPOSUser user) {
        String userMail = user.getUser().getEmail();
        Set<UserRole> mappings = user.getUser().getUserRoleMapping();
/*
        List<UserRole> rolesMapping = getUserMappingsApplicableToFC(mappings, fcCode) ;
        
        if ( fcRolesMapping.isEmpty()) {
            LOG.warn("No roles found for user " + userMail + " specific to fc " + fcCode);
            return NO_REDIRECT_URL;
        }
        
        // Sort roles by role code and pick the first role for default url
        // this is for consistent behaviour accross logins where user has access to 
        // more than one role
        Comparator<? super UserRole> c = new Comparator<UserRole>() {

            @Override
            public int compare(UserRole o1, UserRole o2) {
               return  o1.getRole().getCode().compareTo(o2.getRole().getCode());
            }
            
        };
        Collections.sort(fcRolesMapping, c);

        LOG.info("User " + userMail + " Auto redirect url " + fcRolesMapping.get(0).getRole().getDefaultUrl()
                + " Based on Role " + fcRolesMapping.get(0).getRole().getCode() + " for fc " + fcCode);
*/
	/*for(UserRole ur:mappings){
		if(StringUtils.isNotEmpty(ur.getRole().getDefaultUrl())){
			return ur.getRole().getDefaultUrl();
		}
	}*/
	//THROW SOME EXCEPTION
        LOG.warn("No role mappings for user " + userMail);
        return NO_REDIRECT_URL;
    }
}
