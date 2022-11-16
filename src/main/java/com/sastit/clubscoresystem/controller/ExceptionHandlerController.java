package com.sastit.clubscoresystem.controller;

import com.sastit.clubscoresystem.exception.BaseException;
import com.sastit.clubscoresystem.model.response.EmptyResult;
import com.sastit.clubscoresystem.model.response.HttpResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerController {
  @ExceptionHandler(BaseException.class)
  public ResponseEntity<HttpResponse<EmptyResult>> handleException(BaseException e) {
    return HttpResponse.fail(e.getCode(), e.getMessage());
  }
}
