package com.walmart.pingpos.model.response;

import com.webapputils.base.model.common.ServiceResponse;

public class GetOrderDetailsResponse extends ServiceResponse{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8138699273305639641L;
	String json;
	
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}

	
}
