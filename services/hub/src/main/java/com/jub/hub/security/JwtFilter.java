package com.jub.hub.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;

@Slf4j
@Component
@Order(-1)
public class JwtFilter implements WebFilter {

    public static final String UID_ATTRIBUTE = "authenticatedUid";

    private final SecretKey secretKey;

    public JwtFilter(@Value("${jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }

        String token = authHeader.substring(7);

        try {
            String uid = extractUid(token);
            exchange.getAttributes().put(UID_ATTRIBUTE, uid);
        } catch (JwtException e) {
            log.warn("Invalid JWT: {}", e.getMessage());
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        } catch (Exception e) {
            log.warn("Failed to process JWT: {}", e.getMessage());
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        return chain.filter(exchange);
    }

    private String extractUid(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        // users service pošlje { userId } — preverimo vse možne variante
        String uid = claims.get("userId", String.class);
        if (uid == null)
            uid = claims.get("user_id", String.class);
        if (uid == null)
            uid = claims.getSubject();
        if (uid == null)
            throw new JwtException("No user identifier found in JWT claims");

        return uid;
    }
}
