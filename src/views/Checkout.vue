<template>
  <div class="checkout-container">
    <h2>订单确认</h2>
    <div v-if="cartItems.length === 0">
      <p>您的购物车是空的。</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <span>{{ item.name }} - ¥{{ item.price }} x {{ item.quantity }}</span>
        </li>
      </ul>
      <p>总价: ¥{{ totalPrice }}</p>
      <div class="address-form">
        <div class="form-group">
          <label for="address">地址:</label>
          <input type="text" id="address" v-model="address" required />
        </div>
        <div class="form-group">
          <label for="paymentMethod">支付方式:</label>
          <select id="paymentMethod" v-model="paymentMethod">
            <option value="alipay">支付宝</option>
            <option value="wechat">微信支付</option>
            <option value="creditCard">信用卡</option>
          </select>
        </div>
      </div>
      <button @click="placeOrder" class="place-order-button">下单</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const cartItems = ref([]);
    const address = ref('');
    const paymentMethod = ref('alipay');
    const router = useRouter();

    const fetchCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      cartItems.value = Object.values(cart);
    };

    const totalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
    });

    const placeOrder = () => {
      // 这里处理下单逻辑，例如调用 API 进行下单
      alert('订单已提交');
      localStorage.removeItem('cart');
      router.push({ name: 'Cart' });
    };

    onMounted(fetchCartItems);

    return {
      cartItems,
      totalPrice,
      address,
      paymentMethod,
      placeOrder
    };
  }
};
</script>

<style lang="scss">
.checkout-container {
  padding: 20px;
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  p {
    font-size: 16px;
    margin-bottom: 10px;
    color: #666;

    strong {
      color: #333;
    }
  }

  .address-form {
    margin-bottom: 20px;

    h3 {
      font-size: 20px;
      margin-bottom: 10px;
      color: #333;
    }

    .form-group {
      margin-bottom: 15px;

      label {
        display: block;
        margin-bottom: 5px;
        color: #555;
      }

      input, select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;

        &:focus {
          border-color: #007bff;
          outline: none;
        }
      }
    }
  }

  .place-order-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
      background-color: #218838;
    }
  }
}
</style>
