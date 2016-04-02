
package com.walmart.pingpos.db.users.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.walmart.pingpos.entity.Role;
import com.walmart.pingpos.entity.User;
import com.walmart.pingpos.entity.UserRole;
import com.walmart.pingpos.db.users.IUserRoleDao;

@Repository("roleDao")
public class UserRoleDaoImpl implements IUserRoleDao {

    private SessionFactory sessionFactory;

    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public Role getRoleByCode(String code) {
        Query q = sessionFactory.getCurrentSession().createQuery("from Role where code = :code");
        q.setParameter("code", code);
        return (Role) q.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Role> getImmediateChildRoles(Role role) {
        Query q = sessionFactory.getCurrentSession().createQuery("from Role r where r.parentRole=:role");
        q.setParameter("role", role);
        return q.list();
    }

    @Override
    public List<UserRole> getUserRoleMappingForUser(User user) {
        Query q = sessionFactory.getCurrentSession().createQuery("from UserRole ur where ur.user =:user");
        q.setParameter("user", user);
        return q.list();
    }
}
