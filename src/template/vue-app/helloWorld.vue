<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    // Step 1 : "Hello, Heroku ! 👋"
    axios
      .get("https://cryptic-sands-41262.herokuapp.com")
      .then((res) => console.log(res.data));
    // Step 2 : "Get JWT token 🔓"
    axios
      .post(
        "https://cryptic-sands-41262.herokuapp.com/api/login",
        { username: "pikachu", password: "pikachu" },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        return res.token;
      })
      .then((token) => this.fetchPokemonlist(token));
  },
  methods: {
    // Step 3 : "Get pokemon list 🎉"
    fetchPokemonlist(token) {
      return axios
        .get("https://cryptic-sands-41262.herokuapp.com/api/pokemons", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data)
        .then((res) => console.log(res));
    },
  },
};
</script>