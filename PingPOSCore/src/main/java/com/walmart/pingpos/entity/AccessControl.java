package com.walmart.pingpos.entity;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "access_control")
public class AccessControl implements Serializable {

    /**
     * @author prateek
     */
    private static final long serialVersionUID = 749174706787621689L;
    private Integer           id;
    private String            urlPrefix;
    private String            csvRoleCodes;
    private Date              created;
    private Date              lastUpdated;
    private String            feature;
    private boolean           enabled;

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "url_prefix", nullable = false)
    public String getUrlPrefix() {
        return urlPrefix;
    }

    public void setUrlPrefix(String urlPrefix) {
        this.urlPrefix = urlPrefix;
    }

    @Column(name = "role_code_csv", nullable = false)
    public String getCsvRoleCodes() {
        return csvRoleCodes;
    }

    public void setCsvRoleCodes(String csvRoleCodes) {
        this.csvRoleCodes = csvRoleCodes;
    }

    @Column(name = "enabled", nullable = false)
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created", length = 19, nullable = false)
    public Date getCreated() {
        return this.created;
    }


    public void setCreated(Date created) {
        this.created = created;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_updated", length = 19)
    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
    @Column(name = "feature")
    public String getFeature() {
        return feature;
    }

    

    public void setFeature(String feature) {
        this.feature = feature;
    }

}
