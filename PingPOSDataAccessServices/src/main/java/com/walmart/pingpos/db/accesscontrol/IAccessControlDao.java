
package com.walmart.pingpos.db.accesscontrol;

import java.util.List;

import com.walmart.pingpos.entity.AccessControl;

public interface IAccessControlDao {

    public List<AccessControl> getAllAccessControls();

    public AccessControl getAccessControlByPattern(String uRI);

}
