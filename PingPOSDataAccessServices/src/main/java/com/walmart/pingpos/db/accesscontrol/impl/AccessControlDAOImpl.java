
package com.walmart.pingpos.db.accesscontrol.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.walmart.pingpos.entity.AccessControl;
import com.walmart.pingpos.db.accesscontrol.IAccessControlDao;

@Repository("access_control")
@SuppressWarnings("unchecked")
public class AccessControlDAOImpl implements  IAccessControlDao{    
    private SessionFactory sessionFactory;

    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

    @Override
    public List<AccessControl> getAllAccessControls() {
        Query query = sessionFactory.getCurrentSession().createQuery("from AccessControl");
        return query.list();
    }

    @Override
    public AccessControl getAccessControlByPattern(String uri) {
        Query query = sessionFactory.getCurrentSession().createQuery("from AccessControl where urlPrefix=:uri");
        query.setParameter("uri", uri);
        return (AccessControl) query.uniqueResult();
    }

}
