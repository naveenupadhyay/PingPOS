
package com.walmart.pingpos.web.security;

import org.springframework.security.core.GrantedAuthority;

import com.walmart.pingpos.entity.Role;

public class PingPOSAuthority implements GrantedAuthority {

    private static final long serialVersionUID = 68620155670337310L;
    private final String      role;

    public PingPOSAuthority(Role role) {
        this.role = role.getCode();
    }

    @Override
    public String getAuthority() {
        return role;
    }

}
