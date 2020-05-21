
<template>
  <main class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="alert alert-light">
          <div>
            <h1>Пополнить баланс</h1>
            <p class="mt-2"><b>Сумма пополнения, $</b></p>
            <input v-model="cost" class="form-control mb-4" type="number" id="example-number-input">
          </div>
          <hr>
          <div ref="paypal"></div>
        </div>
      </div>
    </div>
    <FlashMessage></FlashMessage>
  </main>
</template>

<script>
import { post } from "./../../Ajax/Http";

export default {
  name: "PayPal",

  data: function() {
    return {
      loaded: false,
      cost: 100
    };
  },
  mounted: function() {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AZlasdOHARc22ZTCbENp-39E4ViRI4v2R8lAGui4qGneX0lG9NTJo4vwyDXwoQmyR4-nUaAUZ9pkFTKu";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    goPage(item) {
      this.$router.push({ name: item });
    },
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Пополнение счета FL",
                  amount: {
                    currency_code: "USD",
                    value: this.cost
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const url = this.$store.getters.get_url_server + "api/v1/up-balance/";
            post(url, response => {
            this.flashMessage.warning({
              title: "Информация",
              message: "Ваш счет успешно пополнен!"
            });
              this.goPage('balance');
            }, {"payer_id": data.payerID, "order_id": data.orderID});
            console.log(data);
          },
          onError: err => {
            this.flashMessage.error({
              title: "Ошибка",
              message: "Не удалось пополнить счет!"
            });
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    }
  }
};
</script>