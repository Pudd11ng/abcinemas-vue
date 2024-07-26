<template>
  <div id="ticket-booking">
    <HeaderPage />
    <main>
      <div class="container" id="progress-container-id">
        <div class="row">
          <div class="col">
            <div class="px-0 pt-4 pb-0 mt-3 mb-3">
              <form id="form">
                <br />
                <fieldset v-if="step === 1">
                  <div id="movie-select-div">
                    <h2>Movie Selection</h2>
                    <div class="movie-selection">
                      <label for="movie">Select Movie:</label>
                      <select v-model="selectedMovie" id="movie">
                        <option v-for="movie in movies" :key="movie.id" :value="movie.id">
                          {{ movie.title }}
                        </option>
                      </select>
                    </div>
                    <input type="button" name="next-step" class="next-step" value="Continue" :disabled="!selectedMovie" @click="proceedToBranchSelection" />
                    <input type="button" name="previous-step" class="previous-step" value="Back" @click="goBackToHome" />
                  </div>
                </fieldset>
                <fieldset v-if="step === 2">
                  <div id="branch-select-div">
                    <h2>Branch Selection</h2>
                    <div class="branch-selection">
                      <div class="branch-card" v-for="branch in branches" :key="branch.branch_id" :class="{ selected: branch.branch_id === selectedBranch }" @click="selectBranch(branch.branch_id)">
                        <h3>{{ branch.name }}</h3>
                      </div>
                    </div>
                    <input type="button" name="next-step" class="next-step" value="Continue" :disabled="!selectedBranch" @click="proceedToDateSelection" />
                    <input type="button" name="previous-step" class="previous-step" value="Back" @click="step = 1" />
                  </div>
                </fieldset>
                <fieldset v-if="step === 3">
                  <div id="date-select-div">
                    <h2>Date Selection</h2>
                    <div>
                      <p>Selected Movie: <strong>{{ selectedMovieTitle }}</strong></p>
                      <p>Selected Branch: <strong>{{ selectedBranchName }}</strong></p>
                      <input type="date" v-model="selectedDate" :min="minDate" :max="maxDate" @change="enableContinueBooking" />
                    </div>
                    <input id="date-next-btn" type="button" name="next-step" class="next-step" value="Continue Booking" :disabled="!selectedDate" @click="proceedToShowTimeSelection" />
                    <input type="button" name="previous-step" class="previous-step" value="Back" @click="step = 2" />
                  </div>
                </fieldset>
                <fieldset v-if="step === 4">
                  <div id="showtime-select-div">
                    <h2>Show Time Selection</h2>
                    <div>
                      <p>Selected Movie: <strong>{{ selectedMovieTitle }}</strong></p>
                      <p>Selected Branch: <strong>{{ selectedBranchName }}</strong></p>
                      <input type="date" v-model="selectedDate" :min="minDate" :max="maxDate" @change="fetchShowTimes" />
                    </div>
                    <div v-if="sortedShowTimes && sortedShowTimes.length > 0" class="time-table">
                      <div v-for="(showTime, index) in sortedShowTimes" :key="index" class="time-row">
                        <div class="time-cell">
                          <div class="hall-number">Hall {{ showTime.hall }}</div>
                          <div class="show-time" :class="{ selected: selectedHall === showTime.hall && selectedTime === showTime.show_time }" @click="selectTime(showTime.hall, showTime.show_time)">
                            {{ showTime.show_time }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <p>No show times available for the selected date.</p>
                    </div>
                    <input id="showtime-next-btn" type="button" name="next-step" class="next-step" value="Continue Booking" :disabled="!selectedTime || !selectedHall" @click="proceedToTicketSelection" />
                    <input type="button" name="previous-step" class="previous-step" value="Back" @click="step = 3" />
                  </div>
                </fieldset>
                <fieldset v-if="step === 5">
                  <div id="ticket-select-div">
                    <h2>Ticket Selection</h2>
                    <div class="ticket-type-selection-container">
                      <div v-for="(ticketType, index) in ticketTypes" :key="index" class="ticket-type-selection">
                        <label :for="ticketType.name">{{ ticketType.label }} (RM{{ ticketType.price }}):</label>
                        <select :id="ticketType.name" v-model.number="ticketType.quantity" @change="updateTotalPrice">
                          <option v-for="n in 7" :key="n" :value="n - 1">{{ n - 1 }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="total-price">Total Price: RM {{ totalPrice }}</div>
                    <input type="button" name="next-step" class="next-step" value="Continue to Seat Selection" :disabled="totalTickets === 0" @click="proceedToSeatSelection" />
                    <input type="button" name="previous-step" class="previous-step" value="Back" @click="step = 4" />
                  </div>
                </fieldset>
                <fieldset v-if="step === 6">
                  <div id="seat-sel-frame" :style="frameStyle">
                    <SeatSelection @update-total="updateTotal" @select-seat="selectSeat" :selected-branch="selectedBranchName" :selected-date="selectedDate" :selected-time="selectedTime" :hall="selectedHall" :max-seats="totalTickets" :selected-movie="selectedMovieTitle" :ticketTypes="ticketTypes" />
                  </div>
                  <br />
                  <input type="button" name="next-step" class="next-step" value="Proceed to Payment" @click="validateSeatSelection" />
                  <input type="button" name="previous-step" class="previous-step" value="Back" @click="goBackToTicketSelection" />
                </fieldset>
                <fieldset v-if="step === 7">
                  <div id="payment_div">
                    <div class="payment-row">
                      <div class="col-75">
                        <div class="payment-container">
                          <h3 id="payment-h3">PAYMENT</h3>
                          <div class="payment-methods">
                            <label for="card" class="method card">
                              <div class="icon-container">
                                <i class="fa fa-cc-visa card-icon" style="color: navy"></i>
                                <i class="fa fa-cc-mastercard card-icon" style="color: red"></i>
                              </div>
                              <div class="radio-input">
                                <input type="radio" id="card" v-model="selectedPayment" value="card" />
                                <span>Pay RM {{ totalPrice }} with Credit Card</span>
                              </div>
                            </label>
                            <label for="e-wallet" class="method e-wallet">
                              <div class="icon-container">
                                <img src="@/assets/images/e-wallet.png" alt="e-Wallet" class="e-wallet-icon" />
                              </div>
                              <div class="radio-input">
                                <input type="radio" id="e-wallet" v-model="selectedPayment" value="e-wallet" />
                                <span>Pay RM {{ totalPrice }} with e-Wallet</span>
                              </div>
                            </label>
                            <label for="fpx" class="method fpx">
                              <div class="icon-container">
                                <i class="fa fa-university bank-icon" style="color: navy"></i>
                              </div>
                              <div class="radio-input">
                                <input type="radio" id="fpx" v-model="selectedPayment" value="fpx" />
                                <span>Pay RM {{ totalPrice }} with FPX</span>
                              </div>
                            </label>
                          </div>
                          <div v-if="selectedPayment === 'card'" class="credit-card-details">
                            <div class="payment-row">
                              <div class="col-50">
                                <label for="cname">Cardholder's Name</label>
                                <input type="text" id="cname" name="cardname" placeholder="Firstname Lastname" required />
                              </div>
                              <div class="col-50">
                                <label for="ccnum">Credit card number</label>
                                <input type="text" id="ccnum" name="cardnumber" placeholder="xxxx-xxxx-xxxx-xxxx" required />
                              </div>
                            </div>
                            <div class="payment-row">
                              <div class="col-50">
                                <label for="expmonth">Exp Month</label>
                                <input type="text" id="expmonth" name="expmonth" placeholder="September" required />
                              </div>
                              <div class="col-50">
                                <div class="payment-row">
                                  <div class="col-50">
                                    <label for="expyear">Exp Year</label>
                                    <input type="text" id="expyear" name="expyear" placeholder="yyyy" required />
                                  </div>
                                  <div class="col-50">
                                    <label for="cvv">CVV</label>
                                    <input type="text" id="cvv" name="cvv" placeholder="xxx" required />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="confirm-payment">
                              <button type="button" @click="confirmCardPayment">Confirm Payment</button>
                            </div>
                          </div>
                          <div v-else-if="selectedPayment === 'e-wallet' || selectedPayment === 'fpx'" class="proceed-payment">
                            <button type="button" @click="proceedForPayment">Proceed for Payment</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input type="button" name="previous-step" class="cancel-pay-btn" value="Cancel Payment" @click="cancelPayment" />
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SeatSelection from '@/views/SeatSelection.vue';
import HeaderPage from "@/components/HeaderPage.vue";
import { useUserStore } from "@/stores/userStore";

export default {
  name: 'TicketBooking',
  components: {
    HeaderPage,
    SeatSelection
  },
  data() {
    return {
      step: 1,
      selectedMovie: '',
      selectedBranch: '',
      selectedDate: '',
      selectedTime: '',
      selectedHall: '',
      totalPrice: 0,
      selectedPayment: '',
      movies: [],
      branches: [],
      showTimes: [], // Initialize as empty array
      blockedSeats: {},
      ticketTypes: [
        { name: 'adult', label: 'Adult', price: 16, quantity: 0 },
        { name: 'child', label: 'Child', price: 11, quantity: 0 },
        { name: 'student', label: 'Student', price: 14, quantity: 0 },
        { name: 'disabilities', label: 'Disabilities', price: 11, quantity: 0 },
        { name: 'senior', label: 'Senior Citizen', price: 11, quantity: 0 }
      ],
      selectedSeats: [],
      unavailableTimes: {},
      user: null // Remove direct user check
    };
  },
  computed: {
    minDate() {
      const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }));
      return today.toISOString().split('T')[0];
    },
    maxDate() {
      const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }));
      const nextWeek = new Date(today.setDate(today.getDate() + 7));
      return nextWeek.toISOString().split('T')[0];
    },
    frameStyle() {
      return {
        boxShadow: '0 14px 12px 0 var(--theme-border), 0 10px 50px 0 var(--theme-border)',
        width: '800px',
        height: '550px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
      };
    },
    totalTickets() {
      return this.ticketTypes.reduce((acc, ticket) => acc + ticket.quantity, 0);
    },
    selectedMovieTitle() {
      const movie = this.movies.find(m => m.id === this.selectedMovie);
      return movie ? movie.title : '';
    },
    selectedBranchName() {
      const branch = this.branches.find(b => b.branch_id === this.selectedBranch);
      return branch ? branch.name : '';
    },
    sortedShowTimes() {
      if (this.showTimes) {
        return this.showTimes.slice().sort((a, b) => {
          const timeA = new Date(`1970-01-01T${a.show_time}`);
          const timeB = new Date(`1970-01-01T${b.show_time}`);
          return timeA - timeB;
        });
      }
      return [];
    }
  },
  created() {
    // Remove the authentication check
    this.fetchMovies();
    this.fetchBranches();
  },
  methods: {
  fetchMovies() {
    console.log('Fetching movies...');
    fetch('http://localhost:8088/movies')
      .then(response => {
        console.log('Received response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        this.movies = data.movies;
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  },
  fetchBranches() {
    console.log('Fetching branches...');
    fetch('http://localhost:8088/branches')
      .then(response => {
        console.log('Received response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        this.branches = data.branches;
      })
      .catch(error => {
        console.error('Error fetching branches:', error);
      });
  },
  fetchShowTimes() {
    const movieTitle = this.movies.find(movie => movie.id === this.selectedMovie).title;
    const branchName = this.branches.find(branch => branch.branch_id === this.selectedBranch).name;
    console.log(`Fetching showtimes for movie: ${movieTitle}, branch: ${branchName}, date: ${this.selectedDate}`);
    fetch(`http://localhost:8088/showtimes?movie=${movieTitle}&branch=${branchName}&date=${this.selectedDate}`)
      .then(response => {
        console.log('Received response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        this.showTimes = data.showTimes;
      })
      .catch(error => {
        console.error('Error fetching show times:', error);
      });
  },
  selectMovie(movieId) {
    this.selectedMovie = movieId;
  },
  selectBranch(branchId) {
    this.selectedBranch = branchId;
  },
  enableContinueBooking() {
    console.log(`Selected Date: ${this.selectedDate}`);
  },
  selectTime(hall, time) {
    console.log(`Selected Hall: ${hall}, Selected Time: ${time}`);
    this.selectedHall = hall;
    this.selectedTime = time;
  },
  proceedToBranchSelection() {
    this.step = 2;
  },
  proceedToDateSelection() {
    this.step = 3;
  },
  proceedToShowTimeSelection() {
    this.fetchShowTimes();
    this.step = 4;
  },
  proceedToTicketSelection() {
    console.log('Proceeding to ticket selection');
    console.log(`Selected Time: ${this.selectedTime}, Selected Hall: ${this.selectedHall}`);
    if (!this.selectedTime || !this.selectedHall) {
      alert('Please select a show time and hall.');
      return;
    }
    this.step = 5;
  },
  proceedToSeatSelection() {
    if (this.totalTickets > 0 && this.totalTickets <= 6) {
      this.step = 6;
    } else {
      alert('You can select at most 6 tickets.');
    }
  },
  validateSeatSelection() {
    if (this.selectedSeats.length !== this.totalTickets) {
      alert(`You have selected ${this.selectedSeats.length} seats, but you need to select ${this.totalTickets} seats.`);
    } else {
      this.proceedToPayment();
    }
  },
  proceedToPayment() {
    this.step = 7;
  },
  goBackToTicketSelection() {
    this.step = 5;
  },
  cancelPayment() {
    this.$router.push('/');
  },
  updateTotal(total) {
    this.totalPrice = total;
  },
  updateTicketPrices() {
    const selectedDay = new Date(this.selectedDate).getDay();
    const selectedTime = this.selectedTime;
    const isAfter6pm = selectedTime >= '18:00';

    this.ticketTypes.forEach(ticket => {
      if (selectedDay === 3 && !isAfter6pm) { // Wednesday before 6pm
        if (ticket.name === 'adult' || ticket.name === 'student') {
          ticket.price = 14;
        } else {
          ticket.price = ticket.name === 'child' ? 11 : 11;
        }
      } else if (isAfter6pm) { // After 6pm
        ticket.price = ticket.name === 'adult' ? 22 :
          ticket.name === 'child' ? 16 :
            ticket.name === 'student' ? 18 : 16;
      } else { // Regular pricing
        ticket.price = ticket.name === 'adult' ? 16 :
          ticket.name === 'child' ? 11 :
            ticket.name === 'student' ? 14 : 11;
      }
    });

    this.updateTotalPrice();
  },
  updateTotalPrice() {
    this.totalPrice = this.ticketTypes.reduce((acc, ticket) => acc + (ticket.quantity * ticket.price), 0);
  },
  selectSeat(seat) {
    const seatIndex = this.selectedSeats.findIndex(s => s.row === seat.row && s.seat === seat.seat);

    if (seatIndex !== -1) {
      this.selectedSeats.splice(seatIndex, 1);
    } else if (this.selectedSeats.length < this.totalTickets) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats[this.selectedSeats.length - 1] = seat;
    }

    console.log(`Selected seats: ${JSON.stringify(this.selectedSeats)}`);
  },
  proceedForPayment() {
    this.createBooking();
  },
  confirmCardPayment() {
    this.createBooking();
  },
  createBooking() {
    const userStore = useUserStore();
    const bookingData = {
      user_id: userStore.userId,
      movie_id: this.selectedMovie,
      branch: this.selectedBranchName,
      hall: this.selectedHall,
      show_date: this.selectedDate,
      show_time: this.selectedTime,
      total_price: this.totalPrice,
      payment_method: this.selectedPayment,
      seats: []
    };

    this.selectedSeats.forEach(seat => {
      const ticketType = this.ticketTypes.find(type => type.quantity > 0);
      if (ticketType) {
        bookingData.seats.push({
          row: seat.row,
          seat: seat.seat,
          ticket_type: ticketType.label,
          price: ticketType.price
        });
        ticketType.quantity--;
      }
    });

    fetch('http://localhost:8088/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch (bookings)`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          alert('Booking confirmed!');
          const bookingId = data.booking_id;
          this.$router.push({ name: 'ETicket', query: { bookingId } });
        } else {
          alert('Booking failed: ' + data.error);
        }
      })
      .catch(error => {
        console.error('Error during booking:', error);
        alert('Booking failed: ' + error.message);
      });
  },
  goBackToHome() {
    this.$router.push('/');
  }
}

};
</script>

<style scoped>
@import '../assets/css/style-starter.css';
@import '../assets/css/progress.css';
@import '../assets/css/ticket-booking.css';
@import '../assets/css/payment.css';

.movie-selection {
  margin: 20px 0;
}

.movie-selection select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.branch-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
}

.branch-card {
  flex: 1 0 21%;
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.branch-card.selected {
  background-color: #df0e62;
  color: white;
}

.branch-card:hover {
  transform: scale(1.05);
  background-color: #f0f0f0;
}

.time-table {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
}

.time-row {
  flex: 1 1 30%;
  box-sizing: border-box;
  text-align: center;
}

.time-cell {
  text-align: center;
}

.hall-number {
  font-weight: bold;
}

.show-time {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.2s, color 0.2s;
}

.show-time:hover {
  background-color: #f0f0f0;
}

.show-time.selected {
  background-color: #df0e62;
  color: white;
}

.payment-methods {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.method {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 30%;
}

.method:hover {
  border-color: #007bff;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}

.card-icon {
  font-size: 3em;
}

.bank-icon {
  font-size: 3em;
}

.e-wallet-icon {
  width: 30px;
}

.radio-input {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.proceed-payment {
  text-align: center;
  margin-top: 20px;
}

.proceed-payment button,
.confirm-payment button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.proceed-payment button:hover,
.confirm-payment button:hover {
  background-color: #0056b3;
}

#seat-sel-frame {
  overflow: hidden;
  border: 1px solid var(--theme-border);
}

.ticket-type-selection-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.ticket-type-selection {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ticket-type-selection label {
  flex: 1;
  margin-right: 10px;
  text-align: right;
}

.ticket-type-selection select {
  flex: 1;
  padding: 5px;
  font-size: 1em;
  width: 60px;
  text-align: center;
}

.total-price {
  text-align: center;
  margin-top: 20px;
}
</style>
