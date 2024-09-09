<template>
  <div class="product-detail">
    <h2>商品详情</h2>
    <div v-if="product" class="product-info">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="product-details">
        <h3>{{ product.name }}</h3>
        <p><strong>价格:</strong> ¥{{ product.price }}</p>
        <p><strong>销量:</strong> {{ product.sales }}</p>
        <p><strong>描述:</strong> {{ product.description }}</p>
        <button @click="addToCart" class="btn-add-to-cart">加入购物车</button>
        <button @click="goToCart" class="btn-go-to-cart">前往购物车</button>
      </div>
    </div>
    <div v-if="reviews && reviews.length" class="reviews">
      <h4>用户评价</h4>
      <ul>
        <li v-for="review in reviews" :key="review.user">
          <strong>{{ review.user }}:</strong> {{ review.comment }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref(null);
    const reviews = ref([]);

    const fetchProduct = async () => {
      const response = await fetch('/products.json');
      const data = await response.json();
      const productId = route.params.id;
      product.value = data.products.find(p => p.id == productId);

      const reviewsResponse = await fetch('/reviews.json');
      const reviewsData = await reviewsResponse.json();
      const productReviews = reviewsData.find(r => r.productId == productId);
      reviews.value = productReviews ? productReviews.reviews : [];
    };

    const addToCart = () => {
      const quantity = prompt('请输入购买数量:', '1');
      if (quantity !== null && !isNaN(quantity) && parseInt(quantity) > 0) {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        const productId = product.value.id;
        if (cart[productId]) {
          cart[productId].quantity += parseInt(quantity);
        } else {
          cart[productId] = {
            id: productId,
            name: product.value.name,
            price: product.value.price,
            quantity: parseInt(quantity)
          };
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('商品已加入购物车');
      } else {
        alert('请输入有效的数量');
      }
    };

    const goToCart = () => {
      router.push({ name: 'Cart' });
    };

    onMounted(fetchProduct);

    return {
      product,
      reviews,
      addToCart,
      goToCart
    };
  }
};
</script>

<style lang="scss">
.product-detail {
  padding: 20px;
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  .product-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

    .product-image {
      margin-right: 20px;

      img {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .product-details {
      text-align: left;

      h3 {
        font-size: 22px;
        margin-bottom: 10px;
        color: #333;
      }

      p {
        font-size: 16px;
        margin-bottom: 5px;
        color: #666;

        strong {
          color: #333;
        }
      }

      .btn-add-to-cart, .btn-go-to-cart {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;

        &:hover {
          background-color: #0056b3;
        }
      }

      .btn-go-to-cart {
        margin-left: 10px;
      }
    }
  }

  .reviews {
    h4 {
      font-size: 20px;
      margin-bottom: 10px;
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

        strong {
          color: #333;
        }
      }
    }
  }
}
</style>
