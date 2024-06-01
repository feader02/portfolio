package main

import (
	"fmt"
	"net/http"
)

const port = 8000

func main() {
	handler := Handler()

	fmt.Printf("Listening on port %d \n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), handler)
}
