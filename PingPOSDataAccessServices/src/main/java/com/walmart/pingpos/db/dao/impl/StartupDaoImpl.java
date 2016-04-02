
package com.walmart.pingpos.db.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.walmart.pingpos.db.dao.IStartupDao;
import com.walmart.pingpos.entity.OrderDetails;
import com.walmart.pingpos.entity.PingPOSProperty;
import com.walmart.pingpos.model.request.SaveOrderDetailsRequest;

@Repository("startupDao")
@SuppressWarnings("unchecked")
@Transactional
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


	@Override
	public void saveOrderDetails(SaveOrderDetailsRequest request) {
		OrderDetails order = new OrderDetails();
		order.setJson(request.getJson());
		order.setMobile(request.getMobile());
		sessionFactory.getCurrentSession().save(order);
	}


	@Override
	public String getOrderDetails(String mobile) {
		Query query = sessionFactory.getCurrentSession().createQuery("from OrderDetails where mobile=:mobile");
		query.setParameter("mobile", mobile);
		List<OrderDetails> orders = query.list();
		
		return orders.get(orders.size()-1).getJson();
	}

   
}
