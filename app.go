package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func Handler() http.Handler {
	router := mux.NewRouter()

	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/index.html")
	})

	router.HandleFunc("/submit-form", SubmitForm).Methods("POST")

	return router
}

func SubmitForm(w http.ResponseWriter, r *http.Request) {
	if cookie, err := r.Cookie("formSubmitted"); err == nil && cookie.Value == "true" {
		http.Redirect(w, r, "/?alreadySubmitted=true", http.StatusSeeOther)
		return
	}

	fmt.Println("SubmitForm is active")
	r.ParseForm()
	fullName := r.Form.Get("fullName")
	phoneNumber := r.Form.Get("phoneNumber")
	email := r.Form.Get("email")

	fmt.Printf("Received form submission: Full Name: %s, Phone Number: %s, Email: %s\n", fullName, phoneNumber, email)

	fmt.Println("Form submitted successfully!")

	http.SetCookie(w, &http.Cookie{
		Name:  "formSubmitted",
		Value: "true",
		Path:  "/",
	})

	http.Redirect(w, r, "/?success=true", http.StatusSeeOther)
}
