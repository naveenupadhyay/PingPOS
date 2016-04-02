
package com.walmart.pingpos.db.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.walmart.pingpos.db.dao.IStartupDao;
import com.walmart.pingpos.entity.PingPOSProperty;

@Repository("startupDao")
@SuppressWarnings("unchecked")
public class StartupDaoImpl implements IStartupDao {

    private SessionFactory sessionFactory;

    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    
    @Override
    public List<PingPOSProperty> getProperties() {
        Query query = sessionFactory.getCurrentSession().createQuery("from PingPOSProperty");
        return query.list();
    }

   
}
