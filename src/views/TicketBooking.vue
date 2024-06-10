<template>
  <div id="ticket-booking">
    <!-- Header -->

    <!-- Ticket Booking Content -->
    <div class="container" id="progress-container-id">
      <div class="row">
        <div class="col">
          <div class="px-0 pt-4 pb-0 mt-3 mb-3">
            <form id="form">
              <br>
              <fieldset v-if="step === 1">
                <div id="movie-select-div">
                  <h2>Movie Selection</h2>
                  <div class="movie-selection">
                    <div class="movie-card" v-for="movie in movies" :key="movie"
                      :class="{ selected: movie === selectedMovie }" @click="selectMovie(movie)">
                      <h3>{{ movie }}</h3>
                    </div>
                  </div>
                  <input type="button" name="next-step" class="next-step" value="Continue" :disabled="!selectedMovie"
                    @click="proceedToBranchSelection" />
                </div>
              </fieldset>
              <fieldset v-if="step === 2">
                <div id="branch-select-div">
                  <h2>Branch Selection</h2>
                  <div class="branch-selection">
                    <div class="branch-card" v-for="branch in branches" :key="branch"
                      :class="{ selected: branch === selectedBranch }" @click="selectBranch(branch)">
                      <h3>{{ branch }}</h3>
                    </div>
                  </div>
                  <input type="button" name="next-step" class="next-step" value="Continue" :disabled="!selectedBranch"
                    @click="proceedToDateSelection" />
                </div>
              </fieldset>
              <fieldset v-if="step === 3">
                <div id="date-select-div">
                  <h2>Show Time Selection</h2>
                  <div>
                    <p>Selected Movie: <strong>{{ selectedMovie }}</strong></p>
                    <p>Selected Branch: <strong>{{ selectedBranch }}</strong></p>
                    <input type="date" v-model="selectedDate" :min="minDate" :max="maxDate" @change="fetchShowTimes" />
                  </div>
                  <div class="time-table" v-if="showTimes.length">
                    <div v-for="(showTimeRow, rowIndex) in showTimes" :key="rowIndex" class="time-row">
                      <div v-for="(time, hallIndex) in showTimeRow" :key="hallIndex" class="time-cell">
                        <div class="hall-number">Hall {{ time.hall }}</div>
                        <div class="show-time"
                          :class="{ selected: selectedHall === time.hall && selectedTime === time.time }"
                          @click="selectTime(time.hall, time.time)">
                          {{ time.time }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input id="date-next-btn" type="button" name="next-step" class="next-step" value="Continue Booking"
                  :disabled="isNextDisabled" @click="proceedToTicketSelection" />
              </fieldset>
              <fieldset v-if="step === 4">
                <div id="ticket-select-div">
                  <h2>Ticket Selection</h2>
                  <div v-for="(ticketType, index) in ticketTypes" :key="index" class="ticket-type-selection">
                    <label :for="ticketType.name">{{ ticketType.label }} (RM{{ ticketType.price }}):</label>
                    <select :id="ticketType.name" v-model.number="ticketType.quantity" @change="updateTotalPrice">
                      <option v-for="n in 7" :key="n" :value="n - 1">{{ n - 1 }}</option>
                    </select>
                  </div>
                  <div>Total Price: RM {{ totalPrice }}</div>
                  <input type="button" name="next-step" class="next-step" value="Continue to Seat Selection"
                    :disabled="totalTickets === 0" @click="proceedToSeatSelection" />
                </div>
              </fieldset>
              <fieldset v-if="step === 5">
                <div id="seat-sel-frame" :style="frameStyle">
                  <SeatSelection @update-total="updateTotal" @select-seat="selectSeat" :selected-branch="selectedBranch"
                    :selected-date="selectedDate" :selected-time="selectedTime" :hall="selectedHall"
                    :max-seats="totalTickets" :selected-movie="selectedMovie" :ticketTypes="ticketTypes" />

                </div>
                <br>
                <input type="button" name="next-step" class="next-step" value="Proceed to Payment"
                  @click="validateSeatSelection" />
                <input type="button" name="previous-step" class="previous-step" value="Back"
                  @click="goBackToTicketSelection" />
              </fieldset>
              <fieldset v-if="step === 6">
                <!-- Payment Page -->
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
                              <input type="radio" id="e-wallet" v-model="selectedPayment" value="e-wallet">
                              <span>Pay RM {{ totalPrice }} with e-Wallet</span>
                            </div>
                          </label>
                          <label for="fpx" class="method fpx">
                            <div class="icon-container">
                              <i class="fa fa-university bank-icon" style="color: navy"></i>
                            </div>
                            <div class="radio-input">
                              <input type="radio" id="fpx" v-model="selectedPayment" value="fpx">
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
                              <input type="text" id="ccnum" name="cardnumber" placeholder="xxxx-xxxx-xxxx-xxxx"
                                required />
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
                        <div v-else-if="selectedPayment === 'e-wallet' || selectedPayment === 'fpx'"
                          class="proceed-payment">
                          <button type="button" @click="proceedForPayment">Proceed for Payment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input type="button" name="previous-step" class="cancel-pay-btn" value="Cancel Payment"
                  @click="cancelPayment" />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SeatSelection from '@/views/SeatSelection.vue';

export default {
  name: 'TicketBooking',
  components: {
    SeatSelection
  },
  data() {
    return {
      step: 1, // To manage the form steps
      selectedMovie: '',
      selectedBranch: '',
      selectedDate: '',
      selectedTime: '',
      selectedHall: '',
      totalPrice: 0,
      selectedPayment: '', // Selected payment method
      movies: [
        'How To Make Millions Before Grandma Dies',
        'The Experts',
        'The Garfield Movie',
        'Twilight of The Warriors: Walled In',
        'Haikyu!!: The Dumpster Battle',
        'Padu',
        'The Watchers',
        'Vina: Sebelum 7 Hari',
        'Formed Police Unit',
        'Furiosa: A Mad Max Saga',
        'Kingdom Of The Planet Of The Apes',
        'Love You To Debt',
        'Memoir Seorang Guru',
        'Temurun',
        'Detective Conan Vs. Kid The Phantom Thief',
        'Garudan',
        'Sheriff',
        'Siksa',
        'Haraa',
        'Munjya'
      ],
      branches: ['UTM', 'Muar', 'Yong Peng', 'Kota Tinggi', 'Cameron Highlands'],
      halls: [
        { id: 1, name: '1', times: [] },
        { id: 2, name: '2', times: [] },
        { id: 3, name: '3', times: [] },
        { id: 4, name: '4', times: [] },
        { id: 5, name: '5', times: [] },
        { id: 6, name: '6', times: [] }
      ],
      showTimes: [],
      ticketTypes: [
        { name: 'adult', label: 'Adult', price: 16, quantity: 0 },
        { name: 'child', label: 'Child', price: 11, quantity: 0 },
        { name: 'student', label: 'Student', price: 14, quantity: 0 },
        { name: 'disabilities', label: 'Disabilities', price: 11, quantity: 0 },
        { name: 'senior', label: 'Senior Citizen', price: 11, quantity: 0 }
      ],
      selectedSeats: [],
      unavailableTimes: {} // To track unavailable times for each hall
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
    isNextDisabled() {
      return !this.selectedHall || !this.selectedTime;
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
    }
  },
  methods: {
    generateShowTimes() {
      const allTimes = [
        '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
        '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
        '22:00', '22:30', '23:00', '23:30'
      ];

      // Randomize the order of showtimes
      const shuffledTimes = allTimes.sort(() => Math.random() - 0.5).slice(0, 6);

      // Sort the randomized showtimes in ascending order
      const sortedTimes = shuffledTimes.sort((a, b) => {
        const [hoursA, minutesA] = a.split(':');
        const [hoursB, minutesB] = b.split(':');
        return new Date(0, 0, 0, hoursA, minutesA) - new Date(0, 0, 0, hoursB, minutesB);
      });

      return sortedTimes;
    },

    fetchShowTimes() {
      if (!this.selectedDate) return;
      const dateStr = this.selectedDate;
      const times = this.generateShowTimes(); // Get 6 times

      this.showTimes = [];
      const row = [];
      for (let i = 0; i < 6; i++) {
        const hallIndex = i % this.halls.length;
        row.push({ hall: this.halls[hallIndex].name, time: times[i] });
        if (row.length === 3) {
          this.showTimes.push(row.slice());
          row.length = 0;
        }
      }
      if (row.length) {
        this.showTimes.push(row);
      }
    },

    selectMovie(movie) {
      this.selectedMovie = movie;
    },
    selectBranch(branch) {
      this.selectedBranch = branch;
    },
    selectTime(hall, time) {
      this.selectedHall = hall;
      this.selectedTime = time;
      this.updateTicketPrices();
      // Block this hall for this time and the next 2 hours
      const dateStr = this.selectedDate;
      const hallName = hall;
      if (!this.unavailableTimes[hallName]) {
        this.unavailableTimes[hallName] = {};
      }
      if (!this.unavailableTimes[hallName][dateStr]) {
        this.unavailableTimes[hallName][dateStr] = [];
      }
      const timeIndex = this.generateShowTimes().indexOf(time);
      const blockTimes = this.generateShowTimes().slice(timeIndex, timeIndex + 3);
      this.unavailableTimes[hallName][dateStr].push(...blockTimes);
    },
    proceedToBranchSelection() {
      this.step = 2;
    },
    proceedToDateSelection() {
      this.step = 3;
    },
    proceedToTicketSelection() {
      this.step = 4;
    },
    proceedToSeatSelection() {
      if (this.totalTickets > 0 && this.totalTickets <= 6) {
        this.step = 5;
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
      this.step = 6;
    },
    goBackToTicketSelection() {
      this.step = 4;
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
      if (this.selectedSeats.length < this.totalTickets) {
        this.selectedSeats.push(seat);
      } else {
        alert(`You can only select up to ${this.totalTickets} seats.`);
      }
    },
    proceedForPayment() {
      alert('Proceeding for payment via ' + this.selectedPayment);
      this.ticketBooked = true;
      const serializedTickets = JSON.stringify(this.generateETicketParams());
      this.$router.push({ name: 'ETicket', query: { tickets: serializedTickets } });
    },
    confirmCardPayment() {
      alert('Payment confirmed with Credit Card');
      this.ticketBooked = true;
      const serializedTickets = JSON.stringify(this.generateETicketParams());
      this.$router.push({ name: 'ETicket', query: { tickets: serializedTickets } });
    },
    generateETicketParams() {
      const tickets = [];
      this.selectedSeats.forEach(seat => {
        tickets.push({
          movieTitle: this.selectedMovie,
          branch: this.selectedBranch,
          hall: this.selectedHall,
          row: seat.row,
          seat: seat.seat,
          price: this.totalPrice,
          date: this.selectedDate,
          time: this.selectedTime
        });
      });
      return tickets;
    }
  },
  created() {
    this.fetchShowTimes();
  }
};
</script>

<style>
@import '../assets/css/style-starter.css';
@import '../assets/css/progress.css';
@import '../assets/css/ticket-booking.css';
@import '../assets/css/payment.css';

.movie-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
}

.movie-card {
  flex: 1 0 21%;
  /* Adjust the width of each movie card to fit multiple cards in a row */
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.movie-card.selected {
  background-color: #df0e62;
  color: white;
}

.movie-card:hover {
  transform: scale(1.05);
  background-color: #f0f0f0;
}

.branch-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
}

.branch-card {
  flex: 1 0 21%;
  /* Adjust the width of each branch card to fit multiple cards in a row */
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
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
}

.time-row {
  display: flex;
  justify-content: space-around;
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

.booking-details ul {
  list-style: none;
  /* Remove bullet points */
  padding: 0;
  /* Remove padding */
  margin: 0;
  /* Remove margin */
}

.booking-details .book-left li,
.booking-details .book-right li {
  text-align: left;
  /* Align text to the left */
  padding: 5px 0;
  /* Add some padding for better spacing */
}

.booking-details .book-left {
  float: left;
  width: 50%;
  /* Adjust width as needed */
}

.booking-details .book-right {
  float: right;
  width: 50%;
  /* Adjust width as needed */
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
  /* Ensure methods are evenly spaced */
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
  /* Make card icon bigger */
}

.bank-icon {
  font-size: 3em;
  /* Make bank icon bigger */
}

.e-wallet-icon {
  width: 30px;
  /* Adjust e-wallet icon size */
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

/* Hide the Flickity navigation buttons */
.flickity-prev-next-button {
  display: none !important;
}

.carousel-cell {
  border: none;
  /* Ensure there is no border */
  background-color: transparent;
  /* Remove any background color */
  cursor: pointer;
}

.carousel-cell.active {
  background-color: #df0e62;
  /* Add your desired active background color */
}

.carousel-cell.previous-active {
  background-color: transparent;
  /* Ensure previously active cells are reset */
}

/* Removing default styles that might be adding borders or background */
#screen-select-div {
  border: none !important;
  background-color: transparent !important;
}

.date-numeric,
.date-day {
  border: none !important;
  background-color: transparent !important;
}

.left-btn {
  margin-right: 10px;
}

.right-btn {
  margin-left: 10px;
}

#seat-sel-frame {
  overflow: hidden;
  border: 1px solid var(--theme-border);
}

.ticket-type-selection {
  display: flex;
  align-items: center;
  /* Align items to the center */
  justify-content: space-between;
  /* Add space between items */
  margin-bottom: 15px;
}

.ticket-type-selection label {
  flex: 1;
  margin-right: 10px;
  text-align: right;
  /* Align label text to the right */
}

.ticket-type-selection select {
  flex: 1;
  padding: 5px;
  font-size: 1em;
  width: 60px;
  /* Adjust the width to make the choice box larger */
  text-align: center;
  /* Center the number in the select box */
}
</style>
