package com.walmart.pingpos.configuration;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.webapputils.base.annotations.Cache;
import com.walmart.pingpos.configuration.exception.InvalidConfigurationException;

@Cache(name = "FileProperties")
public class FilePropertiesCache {
    private Map<String, Object> shippingPropertyMap = new ConcurrentHashMap<String, Object>();

    public FilePropertiesCache() {
    }

    public FilePropertiesCache(Map<String, Object> maps) {
        shippingPropertyMap = maps;
    }

    protected String getScalar(String property) throws InvalidConfigurationException {
        property = property.toLowerCase();
        if (shippingPropertyMap.containsKey(property)) {
            if (!(shippingPropertyMap.get(property) instanceof Collection<?>)) {
                return (String) shippingPropertyMap.get(property);
            } else {
                throw new InvalidConfigurationException("The property passed is a collection");
            }
        }
        return null;
    }

    protected String getMapValue(String property, String key) throws InvalidConfigurationException {
        property = property.toLowerCase();
        if (shippingPropertyMap.containsKey(property)) {
            if (shippingPropertyMap.get(property) instanceof Map<?, ?>) {
                @SuppressWarnings("unchecked")
                Map<String, String> tempMap = (Map<String, String>) shippingPropertyMap.get(property);
                return tempMap.get(key);
            } else {
                throw new InvalidConfigurationException("The property passed is not a Map");
            }
        }
        return null;
    }

    protected List<String> getList(String property) throws InvalidConfigurationException {
        property = property.toLowerCase();
        if (shippingPropertyMap.containsKey(property) && shippingPropertyMap.get(property) != null) {
            if (shippingPropertyMap.get(property) instanceof List<?>) {
                List<String> list = (List<String>) shippingPropertyMap.get(property);
                return new ArrayList<String>(list);
            } else {
                throw new InvalidConfigurationException("The property Called is not a List");
            }
        }
        return null;
    }

    protected Map<String, String> getMap(String property) throws InvalidConfigurationException {
        property = property.toLowerCase();
        if (shippingPropertyMap.containsKey(property)) {
            if (shippingPropertyMap.get(property) instanceof Map<?, ?>) {
                Map<String, String> tempMap = (Map<String, String>) shippingPropertyMap.get(property);
                return new ConcurrentHashMap<String, String>(tempMap);
            } else {
                throw new InvalidConfigurationException("The property Called is not a Map");
            }
        }
        return null;
    }

    protected boolean isPresentInList(String property, String value) {
        property = property.toLowerCase();
        if (shippingPropertyMap.containsKey(property) && shippingPropertyMap.get(property) instanceof List<?>) {
            List<String> list = (List<String>) shippingPropertyMap.get(property);
            return list.contains(value);
        }
        return false;
    }


}
