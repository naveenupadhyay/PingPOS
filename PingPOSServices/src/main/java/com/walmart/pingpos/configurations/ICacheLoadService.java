package com.walmart.pingpos.configurations;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ICacheLoadService {

    void loadCacheByCacheGroup(Object clazz, Set<String> cacheGroupSet, Map<String, Object[]> paramMap, boolean forceReload, String hostSource) throws IllegalArgumentException,
            IllegalAccessException, InvocationTargetException;

    void loadCacheByMethodName(Object clazz, List<String> methodNameList, Map<String, Object[]> paramMap, boolean forceReload, String hostSource) throws IllegalArgumentException,
            IllegalAccessException, InvocationTargetException;

}
