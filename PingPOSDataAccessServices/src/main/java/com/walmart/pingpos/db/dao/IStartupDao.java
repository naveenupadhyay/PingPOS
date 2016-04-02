
package com.walmart.pingpos.db.dao;

import java.util.List;

import com.walmart.pingpos.entity.PingPOSProperty;
import com.walmart.pingpos.model.request.SaveOrderDetailsRequest;

public interface IStartupDao {

    public List<PingPOSProperty> getProperties();

	public void saveOrderDetails(SaveOrderDetailsRequest request);

	public String getOrderDetails(String mobile);

}
