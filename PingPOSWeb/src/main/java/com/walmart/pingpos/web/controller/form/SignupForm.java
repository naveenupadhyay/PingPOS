
package com.walmart.pingpos.web.controller.form;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

public class SignupForm {
	


    @Email
    @NotEmpty
    private String email;

    @NotEmpty
    @Length(min = 6, max = 15)
    private String password;
    
    @NotEmpty
    @Length(min = 6, max = 15)
    private String confirmPassword;
    
    private String source;
    private String targetUrl;

    public String getEmail() {
        return email;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getTargetUrl() {
        return targetUrl;
    }

    public void setTargetUrl(String targetUrl) {
        this.targetUrl = targetUrl;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }


}
