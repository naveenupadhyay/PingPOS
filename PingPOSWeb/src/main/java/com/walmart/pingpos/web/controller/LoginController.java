
package com.walmart.pingpos.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.webapputils.base.cache.EmailVerificationCode;
import com.webapputils.base.utils.StringUtils;
import com.webapputils.base.utils.ValidatorUtils;
import com.walmart.pingpos.web.controller.form.SignupForm;
import com.walmart.pingpos.web.utils.PathResolver;
import com.walmart.pingpos.web.utils.PingPOSWebUtils;
import com.walmart.pingpos.web.response.SystemResponse;
import com.walmart.pingpos.web.response.SystemResponse.ResponseStatus;
import com.walmart.pingpos.web.utils.WebContextUtils;
import com.walmart.pingpos.entity.User;
import com.walmart.pingpos.utils.EncryptionUtils;
import com.walmart.pingpos.web.security.PingPOSUser;
import com.walmart.pingpos.db.users.IUserRoleService;
import com.walmart.pingpos.db.users.IUserService;

@Controller
public class LoginController {

    public static String        REDIRECT_PATH      = "spring-security-redirect";
    public static String        THIRD_PARTY_SOURCE = "facebookgoogleyahoo";

    @Autowired
    private IUserService        userService;

    @Autowired
    IUserRoleService            userRoleService;

    private static final Logger LOG                = LoggerFactory.getLogger(LoginController.class);

    @RequestMapping("/login")
    public String loginPage(@RequestParam(value = "authenticated", required = false) Boolean authenticated, @RequestParam(value = "source", required = false) String source,
            @RequestParam(value = "targetUrl", required = false) String targetUrl, ModelMap model) {
        SignupForm signupForm = new SignupForm();
        if (StringUtils.isNotEmpty(source)) {
            signupForm.setSource(source);
        }
        if (StringUtils.isNotEmpty(targetUrl)) {
            signupForm.setTargetUrl(targetUrl);
        }
        model.addAttribute("signupForm", signupForm);

        PingPOSUser user = WebContextUtils.getCurrentUser();
        if (user != null) {
            return "redirect:" + PingPOSWebUtils.determineAutoRedirctUrl(user);
        }

        if (authenticated != null && !authenticated) {
            return "redirect:login?systemcode=508";
        } else {
            return "login/login";
        }
    }
}
