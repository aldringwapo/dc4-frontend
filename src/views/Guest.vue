<template>
    <div class="container">
      <div class="content">
        <div class="nav-content">
          <h1 class="cust">
            GUEST
            <RouterLink to="/guestcreate" class="plus">Add</RouterLink>
          </h1>
        </div>
        <div class="table-guests">
          <table class="table table-bordered table-striped " >
            <thead>
              <tr>
                <th>ID</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Check-in Date</th>
                <th>Check-out Date</th>
                <th>Room Type</th>
                <th>Total Guests</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="guest in guests" :key="guest.id">
                <td>{{ guest.id }}</td>
                <td>{{ guest.full_name }}</td>
                <td>{{ guest.email }}</td>
                <td>{{ guest.phoneNumber }}</td>
                <td>{{ guest.check_in_date }}</td>
                <td>{{ guest.check_out_date }}</td>
                <td>{{ guest.room_type }}</td>
                <td>{{ guest.total_guests }}</td>
                <td>
                  <button @click="deleteGuest(guest.id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <style>
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
    color:#4d4a4b;
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
    margin-left: 70rem;
    font-weight: 500;
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
  
  const guests = ref([]);
  
  onMounted(() => {
    fetch('http://localhost:8000/api/guests')
      .then(response => response.json().then(data => (guests.value = data)));
  });
  
  const deleteGuest = async (guestId) => {
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
</script>

  
  