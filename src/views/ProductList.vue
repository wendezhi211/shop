<template>
  <div class="product-list">
    <h2>商品列表</h2>
    <div class="header">
      <button v-if="!isLoggedIn" @click="goToLogin">去登录</button>
      <button v-else @click="logout">注销</button>
    </div>
    <div class="filters">
      <label for="category">分类:</label>
      <select v-model="selectedCategory">
        <option value="">全部</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <label for="sort">排序:</label>
      <select v-model="sortBy">
        <option value="price">价格</option>
        <option value="sales">销量</option>
      </select>
      <label for="sortOrder">顺序:</label>
      <select v-model="sortOrder">
        <option value="asc">升序</option>
        <option value="desc">降序</option>
      </select>
    </div>
    <div class="product-container">
      <div class="product" v-for="product in filteredProducts" :key="product.id" @click="goToProductDetail(product.id)">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>价格: ¥{{ product.price }}</p>
        <p>销量: {{ product.sales }}</p>
      </div>
    </div>
    <button @click="loadMore" v-if="!allLoaded">加载更多</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const products = ref([]);
    const categories = ref([]);
    const selectedCategory = ref('');
    const sortBy = ref('price');
    const sortOrder = ref('asc');
    const pageSize = 2;
    const currentPage = ref(1);
    const allLoaded = ref(false);
    const router = useRouter();
    const isLoggedIn = ref(false);

    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      isLoggedIn.value = !!token;
    };

    const fetchProducts = async () => {
      const response = await fetch('/products.json');
      const data = await response.json();
      products.value = data.products;
      categories.value = [...new Set(data.products.map(product => product.category))];
    };

    onMounted(() => {
      fetchProducts();
      checkAuth();
    });

    const filteredProducts = computed(() => {
      let filtered = selectedCategory.value ? products.value.filter(product => product.category === selectedCategory.value) : products.value;
      return filtered.sort((a, b) => {
        if (sortBy.value === 'price') {
          return sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortBy.value === 'sales') {
          return sortOrder.value === 'asc' ? a.sales - b.sales : b.sales - a.sales;
        }
        return 0;
      }).slice(0, currentPage.value * pageSize);
    });

    const loadMore = () => {
      if (currentPage.value * pageSize < products.value.length) {
        currentPage.value++;
      } else {
        allLoaded.value = true;
      }
    };

    const goToProductDetail = (productId) => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push({ name: 'Login' });
      } else {
        router.push({ name: 'ProductDetail', params: { id: productId } });
      }
    };

    const goToLogin = () => {
      router.push({ name: 'Login' });
    };

    const logout = () => {
      localStorage.removeItem('authToken');
      isLoggedIn.value = false;
    };

    return {
      products,
      categories,
      selectedCategory,
      sortBy,
      sortOrder,
      filteredProducts,
      loadMore,
      allLoaded,
      goToProductDetail,
      isLoggedIn,
      goToLogin,
      logout
    };
  }
};
</script>

<style lang="scss">
.product-list {
  padding: 20px;
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .filters {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      margin-right: 10px;
    }

    select {
      margin-right: 20px;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }

  .product-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .product {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    img {
      width: 150px;
      height: 150px;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      margin-bottom: 5px;
    }
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
