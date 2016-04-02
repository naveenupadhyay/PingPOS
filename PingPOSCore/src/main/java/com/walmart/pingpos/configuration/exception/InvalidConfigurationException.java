package com.walmart.pingpos.configuration.exception;

public class InvalidConfigurationException extends Exception {
    private static final long serialVersionUID = 1027150492317778428L;
    private String            message          = "";

    public InvalidConfigurationException() {
    }

    public InvalidConfigurationException(String message) {
        this.message = message;
    }

    public void printStackTrace() {
        System.out.println(message);
        super.printStackTrace();
    }
}
