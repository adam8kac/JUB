package proxy

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func ProxyTo(target string) http.HandlerFunc {
	url, _ := url.Parse(target)
	proxy := httputil.NewSingleHostReverseProxy(url)

	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Proxying to: " + url.String(), "PATH: " + r.URL.Path)
		r.URL.Path = url.Path 
		proxy.ServeHTTP(w, r)
	}
}