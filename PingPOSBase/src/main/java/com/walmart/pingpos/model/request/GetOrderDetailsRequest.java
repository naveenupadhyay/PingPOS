package com.walmart.pingpos.model.request;

import com.webapputils.base.model.common.ServiceRequest;

public class GetOrderDetailsRequest extends ServiceRequest{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8488331548929884554L;

	String mobile;

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	
}
