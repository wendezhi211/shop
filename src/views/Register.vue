<template>
  <div class="register-container">
    <h2>注册</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">邮箱:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">确认密码:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit" class="btn-register">注册</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const router = useRouter();

    const handleRegister = () => {
      if (password.value !== confirmPassword.value) {
        alert('密码不匹配');
        return;
      }
      // 这里处理注册逻辑，例如调用 API 进行注册
      // 假设注册成功，跳转到登录页面
      router.push({ name: 'Login' });
    };

    return {
      email,
      password,
      confirmPassword,
      handleRegister,
    };
  },
};
</script>

<style lang="scss" scoped>
.register-container {
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

  .btn-register {
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
}
</style>
