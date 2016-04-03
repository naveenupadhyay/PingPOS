package com.walmart.pingpos.web.controller.app;

import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walmart.pingpos.db.dao.IStartupDao;
import com.walmart.pingpos.entity.OrderDetails;

import antlr.StringUtils;

@Controller
@RequestMapping("/app/")
public class AppController {
	@Autowired
	IStartupDao dao;
	
	@RequestMapping("")
	public String shoHomePage(){
		return "app/walmarthome2";
	}
	
	@RequestMapping("test")
	public String showTestPage(){
		return "app/test";
	}
	
	 @RequestMapping("systemalert/{mobile}")
     public @ResponseBody String sendMessage(HttpServletResponse response ,@PathVariable("mobile") String mobile) {
             Random r = new Random();
             String returnData = "";
             response.setContentType("text/event-stream");
             try {
                     Thread.sleep(10000);
                String order =     dao.getOrderDetails(mobile); 
                if(order !=null)
                	returnData += 1;
             } catch (InterruptedException e) {
                     e.printStackTrace();
             }   
             return "data:" + returnData + r.nextInt() +"\n\n";
     }
	
}
