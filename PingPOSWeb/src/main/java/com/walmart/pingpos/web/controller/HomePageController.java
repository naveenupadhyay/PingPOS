package com.walmart.pingpos.web.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
public class HomePageController {
	
	@RequestMapping("home")
	public String comingSoon(HttpServletRequest request, ModelMap model){
       
		return "pos/pos";
	}
	
	

   
}

