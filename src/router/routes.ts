import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [

   {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', redirect: 'login' },
      { path: 'login', name: 'login', component: () => import('pages/auth/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('pages/auth/RegisterPage.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/auth/EmailConfirmationPage.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/auth/ForgotPasswordPage.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/auth/ResetPasswordPage.vue') }

    ]
  },

  {
    path: '/product-store',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: ':id', name: 'product-store', component: () => import('pages/product/StorePage.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', redirect: 'me' },
      { path: 'me', name: 'me', component: () => import('pages/MePage.vue') },
      { path: 'category', name: 'category', component: () => import('pages/category/ListPage.vue') },
      { path: 'category/form/:id?', name: 'category-form', component: () => import('pages/category/FormPage.vue') },
      { path: 'product', name: 'product', component: () => import('pages/product/ListPage.vue') },
      { path: 'product/form/:id?', name: 'product-form', component: () => import('pages/product/FormPage.vue') },
      { path: 'config-form/:id?', name: 'config-form', component: () => import('pages/FormConfig.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
