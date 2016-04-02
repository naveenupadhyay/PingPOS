
package com.walmart.pingpos.db.users;

import java.util.List;
import java.util.Set;

import com.walmart.pingpos.entity.Role;

public interface IUserRoleService {

    public Role getRoleByCode(String code);

    public List<Role> getRoleByUserEmail(String email);

    public List<Role> getAllChilds(Role r);

    public List<Role> getRoleTree(Role r);

}
