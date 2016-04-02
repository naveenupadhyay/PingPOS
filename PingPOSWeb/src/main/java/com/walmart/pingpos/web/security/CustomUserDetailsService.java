
package com.walmart.pingpos.web.security;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.webapputils.base.utils.StringUtils;
import com.walmart.pingpos.entity.Role;
import com.walmart.pingpos.entity.User;
import com.walmart.pingpos.entity.UserRole;
import com.walmart.pingpos.db.users.IUserRoleService;
import com.walmart.pingpos.db.users.IUserService;
import com.walmart.pingpos.web.security.PingPOSUser;

public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger LOG = LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Autowired
    private IUserService        userService;

    @Autowired
    private IUserRoleService    userRoleService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, DataAccessException {
            User user = userService.getUserByEmail(username);
            if (user == null) {
                LOG.info("No user found with login username " + username);
                throw new UsernameNotFoundException("Invalid email", username);
            } else {
                List<Role> childRoles = new ArrayList<Role>();
               /* List<UserRole> userRoleMapping = userService.getAllUserRoleMappings(user);
                if (userRoleMapping == null) {
                    LOG.info("User " + username + " does not have any roles defined ");
                    throw new UsernameNotFoundException("Invalid user-role mapping", username);
                } else {
                    for (UserRole userRole : userRoleMapping) {
                        childRoles.addAll(userRoleService.getRoleTree(userRole.getRole()));
                    }
                }*/
                PingPOSUser pingposUser = new PingPOSUser(user, childRoles);
                return pingposUser;
            }
    }
}
