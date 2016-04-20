package com.walmart.pingpos.configuration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.webapputils.base.cache.CacheManager;
import com.webapputils.base.utils.StringUtils;
import com.walmart.pingpos.configuration.exception.InvalidConfigurationException;

/**
 * Retrieves value of a specified {@link Property} from either file configuration (SHIPPING_CONFIG_RELATIVE_PATH) or
 * {@link com.walmart.Property.core.entity.ShippingProperty} table. If present, value if file overrides value in DB.
 * All methods present in this util are static.
 * 
 * @author amd
 */
public class ConfigUtils {

    private static final Logger LOG = LoggerFactory.getLogger(ConfigUtils.class);

    /**
     * Get the value of scalar {@link Property} having a String value.
     * <p>
     * Order of precedence:
     * <p>
     * 1. Name of the {@link Property} prefixed by {@link Environment} present in SHIPPING_CONFIG_RELATIVE_PATH.
     * Example: prod#ipms.web.service.url.
     * <p>
     * 2. Name of the {@link Property} present in SHIPPING_CONFIG_RELATIVE_PATH without any prefix. Such a property
     * would be applicable across all envirnments.
     * <p>
     * 3. Name of the {@link Property} present in {@link com.walmart.pingposProperty.core.entity.ShippingProperty} table.
     * <p>
     * 4. Default value of {@link Property}
     * <p>
     * 5. Returns null if default value is not found. Should never happen. Note: {@link Property} name present in
     * {@link com.walmart.pingposProperty.core.entity.ShippingProperty} will never have environment prefixed.
     * <p>
     * 
     * @param p
     * @return
     */
    public static String getStringScalar(Property p) {
        String value = null;

        // look for env.p.name
        try {
            value = CacheManager.getInstance().getCache(FilePropertiesCache.class).getScalar(overridePropertyName(p));
        } catch (InvalidConfigurationException e) {
        } catch (NullPointerException npe) {
        }

        // then look for p.name
        if (StringUtils.isEmpty(value)) {
            try {
                value = CacheManager.getInstance().getCache(FilePropertiesCache.class).getScalar(p.getName());
            } catch (InvalidConfigurationException e) {
            } catch (NullPointerException npe) {
            }
        }

        // then look in shipping_property
        if (StringUtils.isEmpty(value)) {
            value = CacheManager.getInstance().getCache(PingPOSPropertiesCache.class).getProperty(p.getName());
        }

        // then use default
        if (StringUtils.isEmpty(value)) {
            LOG.warn("Property: {} not found. Default value: {} will be used.", p.getName(), p.getValue());
            value = p.getValue();
        }
        return value;
    }

    /**
     * Get the value of scalar {@link Property} having a Boolean value.
     * 
     * @param p
     * @return
     */
    public static boolean getBooleanScalar(Property p) {
        if ("1".equals(getStringScalar(p)) || "true".equalsIgnoreCase(getStringScalar(p))) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get the value of scalar {@link Property} having a Integer value.
     * 
     * @param p
     * @return
     */
    public static int getIntegerScalar(Property p) {
        String s = getStringScalar(p);
        try {
            return Integer.parseInt(s);
        } catch (NumberFormatException ex) {
            LOG.warn("Incorrect property: {} found in file. Default value: {} will be used.", p.getName(), p.getValue());
            return Integer.parseInt(p.getValue());
        }
    }

    /**
     * Get the value of map {@link Property} having String as key and String value. Such properties can be present only
     * in the SHIPPING_CONFIG_RELATIVE_PATH.
     * 
     * @param p
     * @param key
     * @return
     */
    public static String getMapProperty(Property p, String key) {
        String value = null;

        // look for env.p.name
        try {
            value = CacheManager.getInstance().getCache(FilePropertiesCache.class).getMapValue(overridePropertyName(p), key);
        } catch (InvalidConfigurationException ex) {
            LOG.warn("Property: {} not found in file. Returning EMPTY string.", p.getName());
            value = "";
        }

        // look for p.name
        if (StringUtils.isEmpty(value)) {
            try {
                value = CacheManager.getInstance().getCache(FilePropertiesCache.class).getMapValue(p.getName(), key);
            } catch (InvalidConfigurationException e) {
                LOG.error("Exception {}", e);
            } catch (NullPointerException npe) {
                LOG.error("Exception {}", npe);
            }
        }

        return value;
    }

    /**
     * Returns a list of String for a property name. Same order of precedence applies as for getStringScalar.
     * 
     * @param p
     * @param delimitor
     * @return
     */
    public static List<String> getStringList(Property p, String delimitor) {
        List<String> list = null;

        // look for env.p.name
        try {
            list = CacheManager.getInstance().getCache(FilePropertiesCache.class).getList(overridePropertyName(p));
        } catch (InvalidConfigurationException e) {
        } catch (NullPointerException npe) {
        }

        // look for p.name
        if (list == null) {
            try {
                list = CacheManager.getInstance().getCache(FilePropertiesCache.class).getList(p.getName());
            } catch (InvalidConfigurationException e) {
            } catch (NullPointerException npe) {
            }
        }

        // look for p.name in shipping_property
        if (list == null) {
            String propValue = CacheManager.getInstance().getCache(PingPOSPropertiesCache.class).getProperty(p.getName());
            list = StringUtils.isNotEmpty(propValue) ? StringUtils.split(propValue, delimitor) : null;
        }

        // use default value
        if (list == null) {
            list = Collections.unmodifiableList(StringUtils.split(p.getValue()));
        }

        if (list != null) {
            return list;
        }
        // return empty list. should *never* happen.
        list = new ArrayList<String>(0);
        return list;
    }

    /**
     * Returns a list of String for a property name. Same order of precedence applies as for getStringScalar. Uses ","
     * as default delimitor.
     * 
     * @param p
     * @return
     */
    public static List<String> getStringList(Property p) {
        return getStringList(p, ",");
    }

    /**
     * Returns a list of integer for a property name.
     * 
     * @param p
     * @param delimitor
     * @return
     */
    public static List<Integer> getIntegerList(Property p, String delimitor) {
        List<String> list = getStringList(p, delimitor);
        List<Integer> returnList = new ArrayList<Integer>();
        for (String item : list) {
            try {
                returnList.add(Integer.parseInt(item));
            } catch (NumberFormatException e) {
                LOG.error("NumberFormatException while parsing Property: {}. Returning BLANK integer list.", p.getName());
                return new ArrayList<Integer>();
            }
        }
        return returnList;
    }

    /**
     * Returns a list of integer for a property name. Uses "," as default delimitor.
     * 
     * @param p
     * @return
     */
    public static List<Integer> getIntegerList(Property p) {
        return getIntegerList(p, ",");
    }

    /**
     * Returns a K,V map for a given {@link Property}. Such a property can be present only in
     * SHIPPING_CONFIG_RELATIVE_PATH.
     * 
     * @param p
     * @return
     */
    public static Map<String, String> getMap(Property p) {
        Map<String, String> map = null;
        try {
            map = CacheManager.getInstance().getCache(FilePropertiesCache.class).getMap(overridePropertyName(p));
        } catch (InvalidConfigurationException ex) {
            LOG.warn("Property: {} not found in file. Returning null.", p.getName());
        }

        if (map == null) {
            try {
                map = CacheManager.getInstance().getCache(FilePropertiesCache.class).getMap(p.getName());
            } catch (InvalidConfigurationException e) {
                LOG.error("Exception {}", e);
            } catch (NullPointerException npe) {
                LOG.error("Exception {}", npe);
            }
        }
        return map;
    }

    /**
     * @param p
     * @param value
     * @return
     */
    public static boolean isPresentInList(Property p, String value) {
        List<String> list = getStringList(p);
        return list != null ? list.contains(value) : false;
    }

    /**
     * @param p
     * @param value
     * @return
     */
    public static boolean isPresentInList(Property p, int value) {
        List<Integer> list = getIntegerList(p);
        return list != null ? list.contains(value) : false;
    }

    private static String overridePropertyName(Property p) {
        return StringUtils.join(Environment.DELIMITOR.getName().charAt(0), System.getProperty(Environment.KEY.getName()), p.getName());
    }
}
