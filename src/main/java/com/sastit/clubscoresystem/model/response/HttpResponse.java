package com.sastit.clubscoresystem.model.response;

import org.springframework.http.ResponseEntity;

public record HttpResponse<T extends Result>(
  Integer code,
  String message,
  T data
) {
  public static <T extends Result> ResponseEntity<HttpResponse<T>> success(Integer code, String message, T data) {
    return ResponseEntity.status(code).body(new HttpResponse<>(code, message, data));
  }

  public static ResponseEntity<HttpResponse<EmptyResult>> fail(Integer code, String message) {
    return ResponseEntity.status(code).body(new HttpResponse<>(code, message, null));
  }
}
