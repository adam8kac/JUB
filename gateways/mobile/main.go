package main

import (
	"fmt"
	"net/http"

	"mobile/src/config"
	"mobile/src/handlers"
)

func main() {
	app := config.Load()
	mux := http.NewServeMux()

	mux.HandleFunc("/auth/register", handlers.ProxyTo(app.AuthUpstreamBase))
	mux.HandleFunc("/auth/login", handlers.ProxyTo(app.AuthUpstreamBase))
	mux.HandleFunc("/employer/register", handlers.ProxyTo(app.EmployerUpstreamBase))
	mux.HandleFunc("/employer/login", handlers.ProxyTo(app.EmployerUpstreamBase))
	
	server := &http.Server{
		Addr:    app.Port,
		Handler: mux,
	}

	fmt.Println("Running on port http://localhost" + app.Port)
	server.ListenAndServe()
}
