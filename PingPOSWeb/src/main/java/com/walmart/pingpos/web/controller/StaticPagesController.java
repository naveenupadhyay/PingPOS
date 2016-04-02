
package com.walmart.pingpos.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StaticPagesController {
    
    @RequestMapping("/info/{fileName}")
    public String staticPages(HttpServletRequest request, @PathVariable("fileName") String fileName, ModelMap model) {
        return "common/" + fileName;
    }

    @RequestMapping("")
    public String homePage(HttpServletRequest request, ModelMap model) {
        return "redirect:/login";
    }
}
