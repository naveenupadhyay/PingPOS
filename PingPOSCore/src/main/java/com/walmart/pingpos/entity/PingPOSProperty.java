package com.walmart.pingpos.entity;

// Generated 16 Aug, 2010 10:08:39 PM by Hibernate Tools 3.2.4.GA
//Pingpos
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "walmart_property")
public class PingPOSProperty implements java.io.Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = -6507176103210740800L;
    private String            name;
    private String            value;
    private Date              created;
    
    public PingPOSProperty() {
    }

    public PingPOSProperty(String name, String value) {
        this.name = name;
        this.value = value;
    }

    @Id
    @Column(name = "name", unique = true, nullable = false, length = 48)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "value", nullable = false, length = 256)
    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created", nullable = false)
    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }
}
