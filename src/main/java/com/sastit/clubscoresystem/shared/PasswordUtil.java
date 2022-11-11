package com.sastit.clubscoresystem.shared;

import org.apache.commons.codec.digest.DigestUtils;

public class PasswordUtil {
    public static String hashPassword(String username, String password) {
        String s = username + password;
        return DigestUtils.md5Hex(s);
    }

    public static boolean checkPassword(String hash, String username, String password) {
        String s = username + password;
        return hash.equals(DigestUtils.md5Hex(s));
    }
}
