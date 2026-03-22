package config

import (
	"net/url"
	"os"
)

type AppConfig struct {
	Port string
	AuthUrl string
	EmployerUrl string
	// AuthUpstreamBase is only scheme://host[:port] for the reverse proxy (request path is forwarded as-is).
	AuthUpstreamBase string
	// EmployerUpstreamBase is only scheme://host[:port] for the reverse proxy.
	EmployerUpstreamBase string
}

func upstreamBase(raw string) string {
	u, err := url.Parse(raw)
	if err != nil || u.Scheme == "" || u.Host == "" {
		return "http://localhost:3001"
	}
	return u.Scheme + "://" + u.Host
}

func Load() AppConfig {
	auth := getEnv("USER_AUTH", "http://localhost:3001/auth")
	emp := getEnv("EMPLOYER_AUTH", "http://localhost:3001/employer")
	return AppConfig{
		Port:                   ":" + getEnv("PORT", "8082"),
		AuthUrl:                auth,
		EmployerUrl:            emp,
		AuthUpstreamBase:       upstreamBase(auth),
		EmployerUpstreamBase:   upstreamBase(emp),
	}
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}