
<template>
  <main class="container">
    <form class="row">
      <div class="col-md-8">
        <div class="alert alert-light">
          <div>
            <h1>Вывод средств</h1>
            <p class="mt-2">
              <b>Сумма, $</b>
              <b style="color: red;">*</b>
            </p>
            <input v-model="cost" class="form-control mb-4" type="number" min="1" max="1000000" id="example-number-input" />
            <p class="mt-2">
              <b>Email</b>
              <b style="color: red;">*</b>
            </p>
            <input v-model="email" type="email" placeholder="Введите email" id="exampleInputPassword1" maxlength="254" class="form-control" />
            <small id="emailHelp" class="form-text text-muted">Мы никогда не будем делиться вашей электронной почтой ни с кем другим.</small>
          </div>
          <p class="mt-2" style="color: red;">{{mess}}</p>
          <hr />
          <button type="submit" href="#" @click="withdrawal()" class="btn btn-warning btn-block">Вывести на PayPal</button>
        </div>
      </div>
    </form>
    <FlashMessage></FlashMessage>
  </main>
</template>

<script>
import { post } from "./../../Ajax/Http";

export default {
  name: "Withdrawal",

  data: function() {
    return {
      loaded: false,
      cost: 100,
      email: "",
      mess:""
    };
  },
  methods: {
    goPage(item) {
      this.$router.push({ name: item });
    },
    withdrawal() {
      if (this.email !== "" && this.cost > 0) {
        const url = this.$store.getters.get_url_server + "api/v1/withdrawal/";
        post(
          url,
          response => {
            this.flashMessage.warning({
              title: "Информация",
              message: "Вывод средств выполнен!"
            });
            this.goPage("balance");
          },
          { amount: this.cost, email: this.email },
          response => {
            this.flashMessage.error({
              title: "Не удалось вывести средства",
              message: "Пожалуйста, попробуйте позже!"
            });
          }
        );
      }
      else {
        this.mess="Пожалуйста, запоните все поля!";
      }
    }
  }
};
</script>