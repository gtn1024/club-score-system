package com.sastit.clubscoresystem.exception;

public abstract class BaseException extends RuntimeException {
  private final Integer code;

  protected BaseException(Integer code, String message) {
    super(message);
    this.code = code;
  }

  public Integer getCode() {
    return code;
  }
}
