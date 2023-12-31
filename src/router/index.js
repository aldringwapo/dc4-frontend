import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Guest from '../views/Guest.vue'
import Booking from '../views/Booking.vue'
import Room from '../views/Room.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/guest',
      name: 'guest',
      component: Guest
    },

    {
      path: '/booking',
      name: 'booking',
      component: Booking
    },

    {
      path: '/room',
      name: 'room',
      component: Room
    },
  ]
})

export default router
