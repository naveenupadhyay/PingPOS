package com.walmart.pingpos.configuration;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.webapputils.base.utils.StringUtils;
import com.webapputils.base.utils.XMLParser;
import com.webapputils.base.utils.XMLParser.Element;
import com.walmart.pingpos.configuration.exception.InvalidConfigurationException;
import com.walmart.pingpos.configuration.exception.InvalidFormatException;

public class ConfigurationUtils {
    private Map<String, Object> shippingPropertyMap = new ConcurrentHashMap<String, Object>();

    private static Logger       LOG                 = LoggerFactory.getLogger(ConfigurationUtils.class);

    public static Map<String, Object> getMaps(String fileNameToParse) throws InvalidFormatException, InvalidConfigurationException {
        ConfigurationUtils spcu = new ConfigurationUtils();
        File file = new File(fileNameToParse);
        XMLParser parser = null;
        try {
            parser = new XMLParser(file);
        } catch (IllegalArgumentException e) {
            LOG.error("Couldn't find the file : {}", file, e);
            throw e;
        }
        if (parser != null) {
            Element root = parser.parse();
            for (Element property : root.list("property")) {
                String name = property.attribute("name");
                String value = property.attribute("value");

                if (StringUtils.isEmpty(name) || spcu.shippingPropertyMap.containsKey(name)) {
                    throw new InvalidFormatException(fileNameToParse);
                } else {
                    if (StringUtils.isNotEmpty(value)) {
                        spcu.putScalar(name.toLowerCase(), value);
                    } else {
                        if (StringUtils.isEmpty(property.get("values").attribute("key"))) {
                            // list
                            spcu.putList(name.toLowerCase(), property);
                        } else {
                            // map
                            spcu.putMap(name.toLowerCase(), property);
                        }
                    }
                }
            }
            return new ConcurrentHashMap<String, Object>(spcu.shippingPropertyMap);
        }
        return new ConcurrentHashMap<String, Object>();
    }

    private void putMap(String propertyName, Element property) throws InvalidConfigurationException {
        Map<String, String> tempMap = new ConcurrentHashMap<String, String>();
        if (StringUtils.isEmpty(property.attribute("caseInsensitiveKey")) || "false".equalsIgnoreCase(property.attribute("caseInsensitiveKey"))) {
            for (Element mapElement : property.list("values")) {
                tempMap.put(mapElement.attribute("key"), mapElement.attribute("value"));
            }
        } else if ("true".equalsIgnoreCase(property.attribute("caseInsensitiveKey"))) {
            for (Element mapElement : property.list("values")) {
                tempMap.put(mapElement.attribute("key").toLowerCase(), mapElement.attribute("value"));
            }
        } else {
            throw new InvalidConfigurationException("case insensitive attribute can either be true or false or not present at all(default false)");
        }
        this.shippingPropertyMap.put(propertyName, tempMap);
    }

    private void putList(String propertyName, Element property) {
        List<String> tempList = new ArrayList<String>();
        for (Element listElement : property.list("values")) {
            tempList.add(listElement.attribute("value"));
        }
        this.shippingPropertyMap.put(propertyName, tempList);
    }

    private void putScalar(String propertyName, String value) {
        this.shippingPropertyMap.put(propertyName, value);
    }
}
