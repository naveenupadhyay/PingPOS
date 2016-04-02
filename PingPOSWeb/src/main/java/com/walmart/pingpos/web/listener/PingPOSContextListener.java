package com.walmart.pingpos.web.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.webapputils.base.utils.StringUtils;
import com.webapputils.base.cache.CacheManager;
import com.webapputils.base.utils.DateUtils;
import com.walmart.pingpos.web.utils.PathResolver;
import com.walmart.pingpos.configurations.IStartupService;

public class PingPOSContextListener implements ServletContextListener {

    private static final Logger LOG = LoggerFactory.getLogger(PingPOSContextListener.class);

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        LOG.info("Context initialized event called...");
        if (StringUtils.isNotEmpty(System.getProperty("env"))) {
            WebApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(sce.getServletContext());
            IStartupService startupService = context.getBean(IStartupService.class);
            try {
                startupService.loadAll(true);
            } catch (Exception e) {
                LOG.error("error while initializing application:", e);
            }
            sce.getServletContext().setAttribute("path", new PathResolver());
            sce.getServletContext().setAttribute("cache", CacheManager.getInstance());
            sce.getServletContext().setAttribute("dateUtils", new DateUtils());
        } else {
            LOG.error("System property 'env' not found. EXITING!");
            throw new RuntimeException("Property 'env' not found");
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // nothing needed here
    }

}
