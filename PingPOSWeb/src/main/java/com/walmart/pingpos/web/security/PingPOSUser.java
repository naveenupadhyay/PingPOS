
package com.walmart.pingpos.web.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.webapputils.base.utils.StringUtils;
import com.walmart.pingpos.entity.Role;
import com.walmart.pingpos.entity.User;

public class PingPOSUser implements UserDetails, CredentialsContainer {

    /**
     * 
     */
    private static final long                 serialVersionUID   = -5241619429374904310L;
    private final User                        user;
    private Map<String, PingPOSAuthority> roleToAuthorities  = new HashMap<String, PingPOSAuthority>();
    private List<GrantedAuthority>            authorities        = new ArrayList<GrantedAuthority>();

    public PingPOSUser(User user, List<Role> childRoles) {
        this.user = user;
        if (childRoles != null && childRoles.size() > 0) {
            for (Role r : childRoles) {
                PingPOSAuthority authority = new PingPOSAuthority(r);
                roleToAuthorities.put(r.getCode(), authority);
                authorities.add(authority);
            }
        }
    }

    public boolean hasRole(String role) {
        return roleToAuthorities.containsKey(role.toLowerCase());
    }

    public boolean hasAnyRole(String roles) {
        return hasAnyRole(StringUtils.split(roles));
    }

    public boolean hasAnyRole(List<String> roles) {
        for (String role : roles) {
            if (hasRole(role.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    public boolean hasAllRoles(List<String> roles) {
        for (String role : roles) {
            if (!hasRole(role)) {
                return false;
            }
        }
        return true;
    }

    public User getUser() {
        return this.user;
    }

    @Override
    public void eraseCredentials() {
        this.user.setPassword(null);
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.user.isEnabled();
    }

    public String getName() {

        StringBuilder name = new StringBuilder("");
        if (StringUtils.isNotEmpty(this.user.getFirstName())) {
            name.append(this.user.getFirstName());
        }
        if (StringUtils.isNotEmpty(this.user.getMiddleName())) {
            name.append(" " + this.user.getMiddleName());
        }
        if (StringUtils.isNotEmpty(this.user.getLastName())) {
            name.append(" " + this.user.getLastName());
        }
        return name.toString();
    }

}
