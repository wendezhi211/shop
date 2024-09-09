<template>
  <div class="login-container">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">邮箱:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn-login">登录</button>
    </form>
    <div class="register-link">
      没有账号？<router-link to="/register">立即注册！</router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleLogin = () => {
      // 这里处理登录逻辑，例如调用 API 进行验证
      // 假设登录成功，生成一个随机的鉴权 token
      const token = generateToken();
      localStorage.setItem("authToken", token);
      router.push({ name: "ProductList" });
    };

    const generateToken = () => {
      // 生成一个随机的 32 位字符串作为 token
      return Array(32).fill(0).map(() => Math.random().toString(36)[2]).join('');
    };

    onMounted(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        alert("已登录");
        router.push({ name: "ProductList" });
      }
    });

    return {
      email,
      password,
      handleLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  h2 {
    text-align: center;
    color: #333;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      color: #555;
    }

    input {
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

  .btn-login {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

  .register-link {
    margin-top: 15px;
    text-align: center;
    font-size: 14px;

    a {
      color: #007bff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
