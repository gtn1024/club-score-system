package com.sastit.clubscoresystem.model.response.auth;

import com.sastit.clubscoresystem.model.response.Result;

public record LoginResult(
  String token
) implements Result {
}