<template>
    <div class="container">
      <div class="content">
      <div class="nav-content">
        <h1 class="cust">
          BOOKING
          <RouterLink to="/bookingcreate" class="plus">Add</RouterLink>
        </h1>
      </div>
      <div class="table-bookings">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Guest ID</th>
              <th>Room ID</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td>{{ booking.id }}</td>
              <td>{{ booking.guest?.id }}</td>
              <td>{{ booking.room?.id }}</td>
              <td>{{ booking.check_in }}</td>
              <td>{{ booking.check_out }}</td>
              <td>
                <button @click="deleteBooking(booking.id)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .container {
    padding: 0;
    height: 75vh;
  }

.content {
  padding: 1rem;
}

  .nav-content h1 {
    font-size: 2rem;
    margin-left: 2rem;
    font-weight: 700;
    justify-content: flex-start;
  }
  
  .nav-content {
    border-bottom: 1px solid #2b292a;
    padding-bottom: 10px;
    display: flex;
  }

  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #686667; 
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #4d4a4b; 
    color: white; 
  }
  
  .plus {
    padding: 1vh 1vw;
    color: #fff;
    background-color: rgb(71, 65, 65);
    border-radius: 5px;
    font-size: 25px;
    text-decoration: none;
    margin-left: 74.05rem;
    font-weight: 500;    /* justify-content: flex-end; */
  }
  
  .btn {
    background-color: #dc3545; 
    color: #ffffff;
    border-radius: 5px;
    padding: 5px 10px;
    border-style: none;
    /* margin-left: 4vw; */
  }

</style>



<script setup>
import { onMounted, ref } from 'vue';

const bookings = ref([]);

onMounted(() => {
  fetch('http://localhost:8000/api/bookings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const promises = data.map(booking => {
        const guestFetchUrl = `http://localhost:8000/api/guests/${booking.guest_id}`;
        const guestPromise = fetch(guestFetchUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          });

        // Fetch data for the vehicle
        const roomFetchUrl = `http://localhost:8000/api/rooms/${booking.room_id}`;
        const roomPromise = fetch(roomFetchUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          });

        // Combine promises for guest and room
        return Promise.all([guestPromise, roomPromise])
          .then(([guestData, roomData]) => {
            console.log('Guest Data:', guestData);
            console.log('Room Data:', roomData);

            // Return booking with both guest, and room data
            return { ...booking, guest: guestData, room: roomData };
          });
      });

      return Promise.all(promises);
    })
    .then(bookingsWithCustomers => {
      console.log('Bookings with Guest and Rooms:', bookingsWithCustomers);
      bookings.value = bookingsWithCustomers;
    })
    .catch(error => console.error('Error fetching data:', error.message));
});

</script>
  