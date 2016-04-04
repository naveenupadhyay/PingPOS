package com.walmart.pingpos.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walmart.pingpos.db.dao.IStartupDao;
import com.walmart.pingpos.model.request.SaveOrderDetailsRequest;
import com.walmart.pingpos.model.response.GetOrderDetailsResponse;
import com.webapputils.base.model.common.ServiceResponse;

@Controller
public class PingPOSWebServiceController {

	@Autowired
	IStartupDao dao;

	@RequestMapping("saveOrderDetails")
	@ResponseBody 
	ServiceResponse saveOrderDetails(@RequestBody SaveOrderDetailsRequest request) {
		ServiceResponse response = new ServiceResponse();
		dao.saveOrderDetails(request);
		return response;
	}

	@RequestMapping(value = "getOrderDetails", produces = "application/json")
	@ResponseBody GetOrderDetailsResponse getOrderDetails(@RequestParam String mobile){
		GetOrderDetailsResponse response = new GetOrderDetailsResponse();
		String json = dao.getOrderDetails(mobile);
		response.setJson(json);
		return response;
	}
}
