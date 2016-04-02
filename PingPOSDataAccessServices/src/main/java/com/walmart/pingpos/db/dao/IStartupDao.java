
package com.walmart.pingpos.db.dao;

import java.util.List;

import com.walmart.pingpos.entity.PingPOSProperty;

public interface IStartupDao {

    public List<PingPOSProperty> getProperties();

}
