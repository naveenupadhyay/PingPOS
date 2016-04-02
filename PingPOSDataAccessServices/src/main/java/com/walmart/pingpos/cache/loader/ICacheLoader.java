package com.walmart.pingpos.cache.loader;

import com.walmart.pingpos.configuration.exception.InvalidConfigurationException;
import com.walmart.pingpos.configuration.exception.InvalidFormatException;

public interface ICacheLoader {

    void loadProperties();

    void loadPingPOSPropertiesCache() throws InvalidFormatException, InvalidConfigurationException;

    void loadPingPOSPropertiesCacheWithParams(String confgPath, String fileName) throws InvalidFormatException, InvalidConfigurationException;

}
