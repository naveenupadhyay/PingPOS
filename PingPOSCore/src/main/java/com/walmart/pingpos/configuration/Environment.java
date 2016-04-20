package com.walmart.pingpos.configuration;

/**
 * Specifies each of the development, test and production environments.
 * <p>
 * File available at {@link Property SHIPPING_CONFIG_RELATIVE_PATH} should have properties like:
 * <i>release#oms.web.service.url</i> or <i>prod#oms.web.service.url</i> for specifying the environment for which that
 * property is applicable.
 * <p>
 * File properties will always override db level properties (mentioned in
 * {@link com.walmart.FCProperty.core.entity.ShippingProperty} table). DB level properties will not have environment name
 * prefixed.
 * 
 * @author amd
 */
public enum Environment {

    KEY("env"), DELIMITOR("#"), LOCAL("local"), DEV("dev"), RELEASE("release"), STAGING("staging"), PT("pt"), PRODUCTION("prod");

    private String name;

    private Environment(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
