
package com.walmart.pingpos.db.users.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.walmart.pingpos.entity.User;
import com.walmart.pingpos.entity.UserRole;
import com.walmart.pingpos.db.users.IUsersDao;

@Repository("usersDao")
@SuppressWarnings("unchecked")
public class UsersDaoImpl implements IUsersDao {

    private SessionFactory sessionFactory;

    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public User getUserById(int userId) {
        return (User) sessionFactory.getCurrentSession().get(User.class, userId);
    }

    @Override
    public User getUserByEmail(String email) {
        Query query = sessionFactory.getCurrentSession().createQuery(
                "select distinct u from User u where u.email=:email");
        query.setParameter("email", email);
        return (User) query.uniqueResult();
    }

    @Override
    public boolean isUserExists(String email) {
        Query query = sessionFactory.getCurrentSession().createQuery("select id from User where email = :email");
        query.setParameter("email", email);
        List<Integer> users = query.list();
        if (users.size() == 1) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void persistUser(User user) {
        user.setLastUpdated(new Date());
        sessionFactory.getCurrentSession().persist(user);
    }

    @Override
    public User updateUser(User user) {
        user.setLastUpdated(new Date());
        return (User) sessionFactory.getCurrentSession().merge(user);
    }

    @Override
    public UserRole persistUserRole(UserRole userRole) {
        userRole.setLastUpdated(new Date());
        sessionFactory.getCurrentSession().persist(userRole);
        return userRole;
    }

    @Override
    public void deleteUserRole(UserRole userRole) {
        sessionFactory.getCurrentSession().delete(userRole);
    }

    @Override
    public List<UserRole> getEnabledUserRoleMapping(User user, String fcCode) {
        Query query = sessionFactory.getCurrentSession().createQuery("from UserRole ur where ur.fulfillmentCentre.code=:fcCode and ur.user =:user and ur.enabled =1");
        query.setParameter("fcCode", fcCode);
        query.setParameter("user", user);
        return query.list();

    }

    @Override
    public UserRole updateUserRole(UserRole userRole) {
        return (UserRole) sessionFactory.getCurrentSession().merge(userRole);
    }

    @Override
    public List<UserRole> getAllUserRoles(User u) {
        Query query = sessionFactory.getCurrentSession().createQuery(
                "from UserRole ur left join fetch ur.role pr left join fetch ur.fulfillmentCentre fc left join fetch ur.user urs where ur.user =:user  ");
        query.setParameter("user", u);
        return query.list();

    }

    @Override
    public User getUserByEmailForEdit(String email) {
        Query query = sessionFactory.getCurrentSession().createQuery("select distinct u from User u left join fetch u.userRoleMapping urm where u.email=:email ");
        query.setParameter("email", email);
        return (User) query.uniqueResult();
    }
}
