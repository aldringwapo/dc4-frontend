<template>
    <div class="container">
      <div class="content">
        <div class="nav-content">
          <h1 class="cust">
            ROOM
            <RouterLink to="/roomcreate" class="plus">Add</RouterLink>
          </h1>
        </div>
        <div class="table-rooms">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Room No.</th>
                <th>Room Type</th>
                <th>Occupancy Limit</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="room in rooms" :key="room.id">
                <td>{{ room . id }}</td>
                <td>{{ room . room_no }}</td>
                <td>{{ room . room_type }}</td>
                <td>{{ room . occupancy_limit }}</td>
                <td>{{ room . price }}</td>
                <td>{{ room . is_available }}</td>
                <td>
                  <button @click="deleteRoom(room.id)" class="btn btn-danger">Delete</button>
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

  th,
  td {
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
    margin-left: 75.75rem;
    font-weight: 500;
    /* justify-content: flex-end; */
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

  const rooms = ref([]);

  onMounted(() => {
    fetch('http://localhost:8000/api/rooms')
      .then(response => response.json().then(data => (rooms.value = data)));
  });

  const deleteRoom = async (guestId) => {
    try {
      const response = await fetch('http://localhost:8000/api/guests/' + guestId, {
        method: 'DELETE',
      });


      if (response.ok) {
        guests.value = guests.value.filter((guest) => guest.id !== guestId);
        alert('Guest deleted successfully!');
      } else {
        console.error('Failed to delete guest:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

//     import { onMounted, ref } from 'vue';
  
//   const vehicles = ref([]);
  
//   onMounted(async () => {
//   try {
//     const response = await fetch('http://localhost:8000/api/vehicles');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();

//     const promises = data.map(async (vehicle) => {
//       const orderResponse = await fetch(`http://localhost:8000/api/orders/${vehicle.order_id}`);
//       if (!orderResponse.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const orderData = await orderResponse.json();
//       return { ...vehicle, order: orderData };
//     });

//     const vehiclesWithOrder = await Promise.all(promises);
//     console.log('Vehicles with order:', vehiclesWithOrder);
//     vehicles.value = vehiclesWithOrder;
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//   }
// });

  
//   const deleteRoom = async (vehicleId) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/vehicles/${vehicleId}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         vehicles.value = vehicles.value.filter((vehicle) => vehicle.id !== vehicleId);
//         alert('Vehicle deleted successfully!');
//       } else {
//         console.error('Failed to delete vehicle:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting vehicle:', error);
//     }
//   };
  </script>
  