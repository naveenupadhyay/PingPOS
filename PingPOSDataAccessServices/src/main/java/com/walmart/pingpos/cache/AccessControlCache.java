
package com.walmart.pingpos.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.webapputils.base.annotations.Cache;
import com.walmart.pingpos.entity.AccessControl;

@Cache(name = "accessControlCache")
public class AccessControlCache {
    private Map<String, AccessControl> urlToAccessControl = new HashMap<String, AccessControl>();
    private List<AccessControl>        urlList            = new ArrayList<AccessControl>();

    public void addAccessControls(AccessControl accessControl) {
        urlToAccessControl.put(accessControl.getUrlPrefix(), accessControl);
        urlList.add(accessControl);
    }

    public AccessControl getAccessControl(String url){
        return urlToAccessControl.get(url);
    }
    
    public boolean anyAccessExists(String url){
        return urlToAccessControl.containsKey(url);
    }
}
