package com.walmart.pingpos.utils;

import com.webapputils.base.utils.MD5ChecksumUtils;

public class EncryptionUtils {

    private static final String MD5_SALT_PASSWORD_ENCRYPTION = "walmartsaltforpassword123876heysaltie";

    public static String getMD5EncodedPassword(String text) {
        return MD5ChecksumUtils.md5Encode(text, MD5_SALT_PASSWORD_ENCRYPTION);
    }

}
