package com.sastit.clubscoresystem.exception.user;

import com.sastit.clubscoresystem.exception.BaseException;

public class UserException extends BaseException {
  public UserException(Integer code, String message) {
    super(code, message);
  }
}
