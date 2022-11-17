package com.sastit.clubscoresystem.controller;

import cn.dev33.satoken.exception.NotLoginException;
import com.sastit.clubscoresystem.exception.BaseException;
import com.sastit.clubscoresystem.model.response.HttpResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerController {
  private final Logger logger = LoggerFactory.getLogger(ExceptionHandlerController.class);

  @ExceptionHandler(NotLoginException.class)
  public ResponseEntity<HttpResponse<Void>> handleSaTokenNotLoginException(NotLoginException e) {
    return HttpResponse.fail(401, "未登录");
  }

  @ExceptionHandler(BaseException.class)
  public ResponseEntity<HttpResponse<Void>> handleBaseException(BaseException e) {
    return HttpResponse.fail(e.getCode(), e.getMessage());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<HttpResponse<Void>> handleAllException(Exception e) {
    logger.error(e.getLocalizedMessage(), e);
    return HttpResponse.fail(500, e.getMessage());
  }
}
