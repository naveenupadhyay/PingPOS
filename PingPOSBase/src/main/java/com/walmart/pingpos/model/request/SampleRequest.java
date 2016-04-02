package com.walmart.pingpos.model.request;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.dyuproject.protostuff.Tag;
import com.webapputils.base.model.common.ServiceRequest;
import com.walmart.pingpos.sro.SampleSRO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SampleRequest extends ServiceRequest{

    
    private static final long serialVersionUID = -7192123570324741426L;
    
    @Tag(3)
    private List<SampleSRO>  sampleSROList = new ArrayList<SampleSRO>();

    public List<SampleSRO> getSampleSRO() {
        return sampleSROList;
    }

    public void setSampleSRO(List<SampleSRO> sampleSRO) {
        this.sampleSROList = sampleSROList;
    }
    

}
