
package com.walmart.pingpos.web.utils.dto;

import java.util.HashMap;
import java.util.Map;

public class TemplateDTO {
    private String              templateName;
    private Map<String, Object> templateParams = new HashMap<String, Object>();

    public TemplateDTO() {
        super();
    }

    public TemplateDTO(String templateName) {
        super();
        this.templateName = templateName;
    }

    public void setTemplateParams(Map<String, Object> templateParams) {
        this.templateParams = templateParams;
    }

    public void addTemplateParam(String key, Object value) {
        templateParams.put(key, value);
    }
    
    public Object getTempateParam(String key){
        return templateParams.get(key);
    }

    public Map<String, Object> getTemplateParams() {
        return templateParams;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getTemplateName() {
        return templateName;
    }

}
