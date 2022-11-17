package com.sastit.clubscoresystem.exception.auth;

import com.sastit.clubscoresystem.exception.BaseException;

public class LoginException extends BaseException {
  public LoginException(Integer code, String message) {
    super(code, message);
  }
}
