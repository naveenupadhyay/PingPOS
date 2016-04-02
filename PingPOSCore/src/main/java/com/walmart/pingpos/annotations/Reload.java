package com.walmart.pingpos.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Reload {

    int MIN_REPEAT_TIME_IN_MINUTE() default 0;
    int MIN_REPEAT_TIME_IN_HOUR() default 0;
    String[] CACHE_GROUP() default {};
}
