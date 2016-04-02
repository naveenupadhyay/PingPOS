package com.walmart.pingpos.configuration;

import java.util.HashMap;
import java.util.Map;

import com.webapputils.base.annotations.Cache;

@Cache(name = "properties")
public class PingPOSPropertiesCache {
    

    private final Map<String, String> properties = new HashMap<String, String>();

    public void addProperty(String name, String value) {
        properties.put(name, value);
    }

    public String getProperty(String name) {
        return properties.get(name);
    }

    public String getProperty(String name, String defaultValue) {
        String value = properties.get(name);
        return value != null ? value : defaultValue;
    }



}
