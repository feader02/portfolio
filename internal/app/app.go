package app

import "net/http"

type App struct {
	// App storage
}

func (a *App) Application() {

}

func (a *App) GetRouter() http.Handler {
	router := http.NewServeMux()

	router.HandleFunc("GET /products", a.ServeHTTP)

	return router
}

func (a *App) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	a.Application()
}
