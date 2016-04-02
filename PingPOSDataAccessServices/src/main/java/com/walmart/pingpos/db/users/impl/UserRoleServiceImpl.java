
package com.walmart.pingpos.db.users.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapputils.base.cache.CacheManager;
import com.walmart.pingpos.cache.RoleCache;
import com.walmart.pingpos.entity.Role;
import com.walmart.pingpos.entity.User;
import com.walmart.pingpos.entity.UserRole;
import com.walmart.pingpos.db.users.IUserRoleDao;
import com.walmart.pingpos.db.users.IUserRoleService;
import com.walmart.pingpos.db.users.IUserService;

@Transactional
@Service("roleService")
public class UserRoleServiceImpl implements IUserRoleService {

    @Autowired
    private IUserRoleDao userRoleDao;

    @Autowired
    IUserService         userService;

    @Override
    public Role getRoleByCode(String code) {
        Role r = CacheManager.getInstance().getCache(RoleCache.class).getRoleByCode(code);
        if (null != r) {
            r = userRoleDao.getRoleByCode(code);
        }
        return r;
    }

    @Override
    public List<Role> getRoleByUserEmail(String email) {
        User user = userService.getUserByEmail(email);
        Set<Role> roles = new HashSet<Role>();
        if (user != null) {
            Set<UserRole> userRoles = user.getUserRoleMapping();
            for (UserRole uRole : userRoles) {
                roles.add(uRole.getRole());
            }
        }
        return new ArrayList<Role>(roles);
    }

    @Override
    public List<Role> getAllChilds(Role r) {
        List<Role> childRoles = userRoleDao.getImmediateChildRoles(r);
        List<Role> tempChildRoles = new ArrayList<Role>();

        for (Role role : childRoles) {
            tempChildRoles.addAll(getAllChilds(role));
        }
        childRoles.addAll(tempChildRoles);

        return childRoles;
    }

    @Override
    public List<Role> getRoleTree(Role r) {
        List<Role> roleTree = new ArrayList<Role>();
        roleTree.add(r);//adding root
        if (r != null) {
            roleTree.addAll(getAllChilds(r));
        }
        return roleTree;
    }
}
