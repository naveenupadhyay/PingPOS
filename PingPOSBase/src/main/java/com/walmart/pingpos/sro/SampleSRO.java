package com.walmart.pingpos.sro;

import java.io.Serializable;

import com.dyuproject.protostuff.Tag;

public class SampleSRO implements Serializable {

    private static final long serialVersionUID = -6926349777982273249L;
    
    @Tag(1)
    private String            name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    

}

