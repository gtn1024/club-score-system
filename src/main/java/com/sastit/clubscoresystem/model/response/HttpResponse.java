package com.sastit.clubscoresystem.model.response;

import org.springframework.http.ResponseEntity;

public record HttpResponse<T>(
  Integer code,
  String message,
  T data
) {
  public static <T> ResponseEntity<HttpResponse<T>> success(Integer code, String message, T data) {
    return ResponseEntity.ok(new HttpResponse<>(code, message, data));
  }
}
