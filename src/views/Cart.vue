<template>
  <div class="cart-container">
    <h2>购物车</h2>
    <div v-if="cartItems.length === 0">
      <p>您的购物车是空的。</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <span>{{ item.name }} - ¥{{ item.price }} x {{ item.quantity }}</span>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item.id)">-</button>
            <button @click="increaseQuantity(item.id)">+</button>
          </div>
          <button @click="removeFromCart(item.id)" class="remove-button">移除</button>
        </li>
      </ul>
      <p>总价: ¥{{ totalPrice }}</p>
      <button @click="checkout">结算</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 导入 useRouter

export default {
  setup() {
    const cartItems = ref([]);
    const router = useRouter(); // 使用 useRouter

    const fetchCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      cartItems.value = Object.values(cart);
    };

    const totalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
    });

    const removeFromCart = (productId) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      delete cart[productId];
      localStorage.setItem('cart', JSON.stringify(cart));
      fetchCartItems();
    };

    const decreaseQuantity = (productId) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      if (cart[productId] && cart[productId].quantity > 1) {
        cart[productId].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        fetchCartItems();
      }
    };

    const increaseQuantity = (productId) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      if (cart[productId]) {
        cart[productId].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        fetchCartItems();
      }
    };

    const checkout = () => {
      router.push({ name: 'Checkout' }); // 使用 router
    };

    onMounted(fetchCartItems);

    return {
      cartItems,
      totalPrice,
      removeFromCart,
      decreaseQuantity,
      increaseQuantity,
      checkout
    };
  }
};
</script>

<style lang="scss">
.cart-container {
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

      .quantity-controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 10px;

        button {
          width: 30px;
          height: 30px;
          font-size: 14px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin: 2px 0;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            background-color: #0056b3;
          }
        }
      }

      .remove-button {
        padding: 5px 10px;
        font-size: 14px;
        background-color: #dc3545;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #c82333;
        }
      }
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

  button {
    padding: 10px 10px;
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
