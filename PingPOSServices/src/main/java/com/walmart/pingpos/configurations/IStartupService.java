
package com.walmart.pingpos.configurations;

import com.walmart.pingpos.configuration.exception.InvalidConfigurationException;
import com.walmart.pingpos.configuration.exception.InvalidFormatException;

public interface IStartupService {

    void loadProperties(boolean forceReload) throws Exception;

    void loadAll(boolean forcedReload) throws Exception;
}
