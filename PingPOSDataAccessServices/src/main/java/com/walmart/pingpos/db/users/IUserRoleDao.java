
package com.walmart.pingpos.db.users;

import java.util.List;

import com.walmart.pingpos.entity.Role;
import com.walmart.pingpos.entity.User;
import com.walmart.pingpos.entity.UserRole;

public interface IUserRoleDao {

    Role getRoleByCode(String code);
	
    List<Role> getImmediateChildRoles(Role role);

    List<UserRole> getUserRoleMappingForUser(User user);
}
