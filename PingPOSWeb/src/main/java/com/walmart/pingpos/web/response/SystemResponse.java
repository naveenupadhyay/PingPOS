
package com.walmart.pingpos.web.response;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="sr")
public class SystemResponse implements Serializable {

	private static final long serialVersionUID = -2167050397351276764L;

	public enum ResponseStatus {
        SUCCESS("success"), FAIL("fail");

        private String responseType;

        private ResponseStatus(String responseType) {
            this.responseType = responseType;
        }

        public String responseType() {
            return responseType;
        }
    }

    private String              status;
    private String              message;
    private Map<String, Object> items;
    
    public SystemResponse() {
    }

    public SystemResponse(ResponseStatus status, String message) {
        this.status = status.responseType();
        this.message = message;
    }
    
    @XmlElement(name="s")
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    @XmlElement(name="m")
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public void setItems(Map<String, Object> items) {
        this.items = items;
    }
    	
    public Map<String, Object> getItems() {
        return items;
    }
    
    public void addItem(String name, Object value) {
        if (items == null) {
            items = new HashMap<String, Object>();
        }
        items.put(name, value);
    }
}
