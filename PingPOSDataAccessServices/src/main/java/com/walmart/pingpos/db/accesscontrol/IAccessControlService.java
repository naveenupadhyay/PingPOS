
package com.walmart.pingpos.db.accesscontrol;

import java.util.List;

import com.walmart.pingpos.entity.AccessControl;

public interface IAccessControlService {

    public List<String> getRoleCodesByPattern(String URI);

    List<AccessControl> getAllAccessControlsFromDB();
}
