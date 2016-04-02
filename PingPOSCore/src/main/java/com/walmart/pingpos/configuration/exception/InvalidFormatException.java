package com.walmart.pingpos.configuration.exception;

public class InvalidFormatException extends Exception {

    private static final long serialVersionUID = -9076109639122796180L;

    private String            fileName;

    public InvalidFormatException(String fileName) {
        this.fileName = fileName;
    }

    public InvalidFormatException() {
        this.fileName = "";
    }

    public void printStackTrace() {
        System.out.println("fileName:" + fileName);
        super.printStackTrace();
    }
}
