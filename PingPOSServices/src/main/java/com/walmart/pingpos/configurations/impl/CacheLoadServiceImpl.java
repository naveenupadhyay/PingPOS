package com.walmart.pingpos.configurations.impl;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webapputils.base.utils.DateUtils;
import com.walmart.pingpos.annotations.Reload;
import com.walmart.pingpos.cache.loader.impl.CacheLoader;
import com.walmart.pingpos.configuration.ConfigUtils;
import com.walmart.pingpos.configuration.Property;
import com.walmart.pingpos.configurations.ICacheLoadService;
import com.walmart.pingpos.db.dao.IStartupDao;

@Service("CacheLoadManager")
public class CacheLoadServiceImpl implements ICacheLoadService {

    @Autowired
    IStartupDao                 startupDao;

    private Map<String, Date>   cacheNameToLastReloadTime = new HashMap<String, Date>();

    //to see both strategies loading full cache and hit one by one
    private static final Logger LOG                       = LoggerFactory.getLogger(CacheLoadServiceImpl.class);

    @Override
    public synchronized void loadCacheByMethodName(Object clazz, List<String> methodNameList, Map<String, Object[]> paramMap, boolean forceReload, String hostSource)
            throws IllegalArgumentException, IllegalAccessException, InvocationTargetException {
        Map<String, Method> nameToMethodMap = new HashMap<String, Method>();
        Map<String, Method> methodNameToMethodMap = new HashMap<String, Method>();
        for (Method method : clazz.getClass().getDeclaredMethods()) {
            nameToMethodMap.put(method.getName(), method);
        }
        for (Method method : CacheLoader.class.getDeclaredMethods()) {
            methodNameToMethodMap.put(method.getName(), method);
        }

        Date currentTime = DateUtils.getCurrentTime();//this current time will be set as last update time for methods so that no edge cases get missed
        for (String methodName : methodNameList) {
            if (nameToMethodMap.containsKey(methodName)) {
                Method methodForAnnotation = methodNameToMethodMap.get(methodName);
                Method method = nameToMethodMap.get(methodName);
                Reload reload = methodForAnnotation.getAnnotation(Reload.class);
                if (reload == null || forceReload || isCacheReloadAllowed(method.getName(), reload)) {
                    updateCache(method.getName(), reload, currentTime);
                    method.invoke(clazz, paramMap == null ? null : paramMap.get(method.getName()));
                }
            }
        }
    }

    @Override
    public synchronized void loadCacheByCacheGroup(Object clazz, Set<String> cacheGroupSet, Map<String, Object[]> paramMap, boolean forceReload, String hostSource)
            throws IllegalArgumentException, IllegalAccessException, InvocationTargetException {
        Date currentTime = DateUtils.getCurrentTime();
        for (Method method : clazz.getClass().getMethods()) {
            Reload reload = method.getAnnotation(Reload.class);
            if (reload != null) {
                for (String group : reload.CACHE_GROUP()) {
                    if (cacheGroupSet.contains(group)) {
                        if (forceReload || isCacheReloadAllowed(method.getName(), reload)) {
                            updateCache(method.getName(), reload, currentTime);
                            method.invoke(clazz, paramMap == null ? null : paramMap.get(method.getName()));
                        }
                        break;
                    }
                }

            }
        }
    }

    private void updateCache(String methodName, Reload reload, Date currentTime) {
        cacheNameToLastReloadTime.put(methodName, currentTime);
    }

    private boolean isCacheReloadAllowed(String methodName, Reload reload) {
        boolean result = false;
        Date lastUpdatedTimeInMin = cacheNameToLastReloadTime.get(methodName);
        if (lastUpdatedTimeInMin != null) {
            int minutes = reload.MIN_REPEAT_TIME_IN_MINUTE() + 60 * reload.MIN_REPEAT_TIME_IN_HOUR();
            Map<String, String> minuteMap = ConfigUtils.getMap(Property.CACHE_RELOAD_OVERRIDE_MAP);
            if (minuteMap != null) {
                String overrideMinutes = minuteMap.get(methodName);
                if (overrideMinutes != null) {
                    LOG.info("Using overrrided minutes:{} from properties file", overrideMinutes);
                    minutes = Integer.parseInt(overrideMinutes);
                }
            }
            if (getDifferenceInMinutes(DateUtils.getCurrentTime(), lastUpdatedTimeInMin) < minutes) {
                result = false;
                LOG.info("Last Cache Load happened at:{} i.e. just under {} minutes. Not Reloading Cache again.", lastUpdatedTimeInMin, minutes);
            } else {
                LOG.info("Allow Reloading Cache:{}", methodName);
                result = true;
            }
        } else {
            LOG.info("Cache Detail entry not found..so allowing to reload cache:{}", methodName);
            result = true;
        }
        return result;
    }

    //date1-date2
    private long getDifferenceInMinutes(Date date1, Date date2) {
        return (date1.getTime() - date2.getTime()) / (1000 * 60);
    }

    public static void main(String args[]) {
        System.out.println("hello");
        //        List<String> methodNameList = new ArrayList<String>();
        //        methodNameList.add("cacheLoad1");
        //        methodNameList.add("cacheLoad2");
        //        methodNameList.add("cacheLoad3");
        //        try {
        //            loadCacheByMethodName(new CacheLoader(), methodNameList, null, false);
        //        } catch (IllegalArgumentException e) {
        //            e.printStackTrace();
        //        } catch (IllegalAccessException e) {
        //            e.printStackTrace();
        //        } catch (InvocationTargetException e) {
        //            e.printStackTrace();
        //        }

        //        CacheLoader cacheLoader=new CacheLoader();
        //         for(Method method:cacheLoader.getClass().getMethods()){
        //             if(method.getName().equalsIgnoreCase("cacheLoad2")){
        //                 System.out.println(method.getName());
        //                 try {
        //                     Object[] oArray=new Object[]{"hello",1};
        //                     System.out.println("array length:"+oArray.length);
        //                    method.invoke(cacheLoader,oArray);
        //                } catch (IllegalArgumentException e) {
        //                    e.printStackTrace();
        //                } catch (IllegalAccessException e) {
        //                    e.printStackTrace();
        //                } catch (InvocationTargetException e) {
        //                    e.printStackTrace();
        //                }
        //             }
        //         }
    }
}
