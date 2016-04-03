package com.walmart.pingpos.web.controller.app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/app/")
public class AppController {
	@RequestMapping("")
	public String shoHomePage(){
		return "app/walmarthome2";
	}
	
	
}
