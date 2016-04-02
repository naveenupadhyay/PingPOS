
package com.walmart.pingpos.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.walmart.pingpos.entity.PingPOSTemplate;
import com.webapputils.base.annotations.Cache;
import com.webapputils.base.velocity.Template;

@Cache(name = "pingposTemplateCache")
public class PingPOSTemplateCache {
    private final Map<String, Template> pingposTemplates    = new HashMap<String, Template>();
    private final List<Template>        pingposTemplateList = new ArrayList<Template>();

    public void addPingPOSTemplate(PingPOSTemplate pingposTemplate) {
        Template template = Template.compile(pingposTemplate.getTemplate());
        pingposTemplates.put(pingposTemplate.getName(), template);
        pingposTemplateList.add(template);
    }

    public Template getPingPOSTemplateByName(String templateName) {
        return pingposTemplates.get(templateName);
    }

    public List<Template> getPingPOSTemplateList() {
        return pingposTemplateList;
    }

    public Map<String, Template> getPingPOSTemplates() {
        return pingposTemplates;
    }
}
