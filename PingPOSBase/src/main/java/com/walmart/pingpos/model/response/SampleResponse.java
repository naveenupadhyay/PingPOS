package com.walmart.pingpos.model.response;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.dyuproject.protostuff.Tag;
import com.webapputils.base.model.common.ServiceResponse;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SampleResponse extends ServiceResponse{

   private static final long serialVersionUID = 1776475728871771095L;

   @Tag(5)
   private Boolean success;

   public Boolean getSuccess(){
	   return success;
   }
   
   public void setSuccess(Boolean success){
	   this.success=success;
   }
   
}
