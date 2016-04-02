
package com.walmart.pingpos.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.webapputils.base.annotations.Cache;
import com.walmart.pingpos.entity.Role;

@Cache(name = "roleCache")
public class RoleCache {
    private Map<String, Role> code2RoleMap = new HashMap<String, Role>();
    private List<Role>        roles        = new ArrayList<Role>();

    public void addRole(Role r) {
        code2RoleMap.put(r.getCode(), r);
        roles.add(r);
    }

    public Role getRoleByCode(String code) {
        return code2RoleMap.get(code);
    }

    public Map<String, Role> getCode2RoleMap() {
        return code2RoleMap;
    }

    public void setCode2RoleMap(Map<String, Role> code2RoleMap) {
        this.code2RoleMap = code2RoleMap;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

}
