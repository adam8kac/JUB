package handlers

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
)

func ProxyTo(target string) http.HandlerFunc {
	u, _ := url.Parse(target)

	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("PROXYING TO %s %s%s\n", r.Method, u.Host, r.URL.Path)

		r.URL.Scheme = u.Scheme
		r.URL.Host = u.Host
		r.Host = u.Host
		r.RequestURI = ""

		resp, err := http.DefaultTransport.RoundTrip(r)
		if err != nil {
			http.Error(w, "proxy error", http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()

		for k, v := range resp.Header {
			w.Header()[k] = v
		}
		w.WriteHeader(resp.StatusCode)
		io.Copy(w, resp.Body)
	}
}
