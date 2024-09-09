import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import ProductList from './views/ProductList.vue';
import ProductDetail from './views/ProductDetail.vue';
import Cart from './views/Cart.vue';
import Checkout from './views/Checkout.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/',
        name: 'ProductList',
        component: ProductList
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetail
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
