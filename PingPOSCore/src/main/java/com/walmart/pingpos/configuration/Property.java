package com.walmart.pingpos.configuration;
/*
pingpos.toUpperCase;
get${display.capitalize($projectPackageName)}();
${display.capitalize(${projectPackageName})};
$display.capitalize($projectPackageName);
$display.capitalize(${projectPackageName});
$display.capitalize( $projectPackageName );
$projectPackageName.toUpperCase;
PINGPOS;
*/
/**
 * Name and default value of each property used in shipping system. Each of these Property's name can be present at:  
 * <p>
 * 1. SHIPPING_CONFIG_RELATIVE_PATH: prefixed by {@link Environment} name. Property name would be applicable globally 
 *    if no environment name is prefixed.
 * <p>
 * 2. In {@link com.snapdeal.FCProperty.core.entity.ShippingProperty} table.
 * <p> 
 * Value present at SHIPPING_CONFIG_RELATIVE_PATH will always override value present in shipping_property table.
 * 
 * @author amd
 */

public enum Property {
    
    STATIC_RESOURCES_PATH                                   ("static.resources.path",null),
    CONFIG_RELATIVE_PATH                                    ("fc.config.file.path", "/configuration/fcconfig.xml"),
    BARCODE_TYPE                                            ("barcode.type","BDBarcode.ttf"),
    CONTENT_PATH                                            ("content.path", "http://i.sdlcdn.com/"),
    CONFIGURATION_DIR_PATH                                  ("fc.configuration.dir.path", "/opt/fc"),
    CACHE_RELOAD_OVERRIDE_MAP                               ("oneship.cache.reload.override.map",null); 

   
    private String name;
    private String value;

    private Property(String name, String value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }
    
    public String getValue(){
        return value;
    }
}
