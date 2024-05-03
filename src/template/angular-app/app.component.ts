import { HttpClient, HttpHeaders } from "@angular/common/http"; //les erreurs sont du au faites que ne ne sont pas effectivement dans une application angular
import { Component, OnInit } from "@angular/core";
import { tap, switchMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Step 1 : "Hello, Heroku ! 👋"
    this.http
      .get("https://cryptic-sands-41262.herokuapp.com/")
      .subscribe((res) => console.log(res));

    // Step 2 : "Get JWT token 🔓"
    this.http
      .post(
        "https://cryptic-sands-41262.herokuapp.com/api/login",
        { username: "pikachu", password: "pikachu" },
        this.httpOptions
      )
      .pipe(
        tap((res) => console.log(res)),
        switchMap((res) => this.fetchPokemonlist(res.token))
      )
      .subscribe((res) => console.log(res));
  }

  // Step 3 : "Get pokemon list 🎉"
  fetchPokemonlist(token: string) {
    const httpOptionsWithJWT = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

    return this.http.get(
      "https://cryptic-sands-41262.herokuapp.com/api/pokemons",
      httpOptionsWithJWT
    );
  }
}