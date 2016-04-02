package com.walmart.pingpos.model.request;

import java.io.Serializable;

import com.webapputils.base.model.common.ServiceRequest;

public class SaveOrderDetailsRequest extends ServiceRequest implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2131964157661751994L;

	String json;
	String mobile;
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
}
