package com.walmart.pingpos.cache.loader.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapputils.base.cache.CacheManager;
import com.walmart.pingpos.annotations.Reload;
import com.walmart.pingpos.cache.loader.ICacheLoader;
import com.walmart.pingpos.configuration.ConfigUtils;
import com.walmart.pingpos.configuration.ConfigurationUtils;
import com.walmart.pingpos.configuration.FilePropertiesCache;
import com.walmart.pingpos.configuration.PingPOSPropertiesCache;
import com.walmart.pingpos.configuration.Property;
import com.walmart.pingpos.configuration.exception.InvalidConfigurationException;
import com.walmart.pingpos.configuration.exception.InvalidFormatException;
import com.walmart.pingpos.db.dao.IStartupDao;
import com.walmart.pingpos.entity.PingPOSProperty;

@Service("CacheLoader")
@Transactional(readOnly = true)
public class CacheLoader implements ICacheLoader {

    private static final Logger LOG = LoggerFactory.getLogger(CacheLoader.class);

    @Autowired
    IStartupDao                 startupDao;


    @Override
    @Reload(MIN_REPEAT_TIME_IN_MINUTE = 60, CACHE_GROUP = { "ALL" })
    public void loadProperties() {
        LOG.info("Loading Properties..");
        List<PingPOSProperty> properties = startupDao.getProperties();
        PingPOSPropertiesCache propertiesCache = new PingPOSPropertiesCache();
        for (PingPOSProperty property : properties) {
            propertiesCache.addProperty(property.getName(), property.getValue());
        }

        CacheManager.getInstance().setCache(propertiesCache);
        LOG.info("Loaded Properties SUCCESSFULLY!");
    }

    @Override
    @Reload(MIN_REPEAT_TIME_IN_MINUTE = 60, CACHE_GROUP = { "ALL" })
    public void loadPingPOSPropertiesCache() throws InvalidFormatException, InvalidConfigurationException {
        String basePath = ConfigUtils.getStringScalar(Property.CONFIGURATION_DIR_PATH);
        String filePath = ConfigUtils.getStringScalar(Property.CONFIG_RELATIVE_PATH);
       // loadPingPOSPropertiesCacheWithParams(basePath, filePath);
    }

    @Override
    @Reload(MIN_REPEAT_TIME_IN_MINUTE = 60, CACHE_GROUP = { "ALL" })
    public void loadPingPOSPropertiesCacheWithParams(String confgPath, String fileName) throws InvalidFormatException, InvalidConfigurationException {
        LOG.info("Loading PingPOS Properties Cache ..");
        FilePropertiesCache opc = null;
        Map<String, Object> properties = new HashMap<String, Object>();
        LOG.info("Reading PingPOS Configuration File: " + confgPath + fileName);
        properties = ConfigurationUtils.getMaps(confgPath + fileName);

        opc = new FilePropertiesCache(properties);
        CacheManager.getInstance().setCache(opc);
        LOG.info("PingPOS properties loaded SUCCESSFULLY!");
    }

}
