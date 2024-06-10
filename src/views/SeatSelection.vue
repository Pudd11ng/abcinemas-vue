<template>
  <div id="seat-selection">
    <main>
      <div class="content">
        <h2>Seat Booking</h2>
        <div class="main">
          <div class="demo">
            <div id="seat-map">
              <div class="front">HALL</div>
            </div>
            <div class="booking-details">
              <div class="details">
                <ul class="book-left">
                  <li>Branch:</li>
                  <li>Movie:</li>
                  <li>Time:</li>
                  <li>Tickets:</li>
                  <li>Ticket Types:</li>
                  <li>Total:</li>
                  <li>Selected Seats:</li>
                  <li id="selected-seats" class="scrollbar scrollbar1"></li>
                </ul>
                <ul class="book-right">
                  <li>{{ selectedBranch }}</li>
                  <li>{{ selectedMovie }}</li>
                  <li>{{ selectedDate }}, {{ selectedTime }}</li>
                  <li>{{ totalTickets }}</li>
                  <li>
                    <ul class="ticket-types">
                      <li v-for="(ticket, index) in selectedTicketTypes" :key="index">
                        {{ abbreviate(ticket.label) }}: {{ ticket.quantity }}
                      </li>
                    </ul>
                  </li>
                  <li><b><i>RM</i>{{ totalPrice }}</b></li>
                </ul>
              </div>
              <div class="clear"></div>
              <div class="legend-container">
                <ul class="legend">
                  <li><span class="seat available"></span> Available</li>
                  <li><span class="seat sold"></span> Sold</li>
                  <li><span class="seat selected"></span> Selected</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import jQuery from 'jquery';
import '@/assets/js/jquery.seat-charts.js'; // Import the local script

export default {
  name: 'SeatSelection',
  props: {
    selectedBranch: String,
    selectedDate: String,
    selectedTime: String,
    hall: String,
    selectedMovie: String,
    maxSeats: Number,
    ticketTypes: {
      type: Array,
      default: () => [] // Default to an empty array
    }
  },
  data() {
    return {
      selectedSeats: []
    };
  },
  computed: {
    totalTickets() {
      return this.ticketTypes.reduce((acc, ticket) => acc + ticket.quantity, 0);
    },
    totalPrice() {
      return this.ticketTypes.reduce((acc, ticket) => acc + (ticket.price * ticket.quantity), 0);
    },
    selectedTicketTypes() {
      return this.ticketTypes.filter(ticket => ticket.quantity > 0);
    }
  },
  methods: {
    abbreviate(label) {
      const abbreviations = {
        'Adult': 'A',
        'Child': 'C',
        'Student': 'S',
        'Disabilities': 'D',
        'Senior Citizen': 'SC'
      };
      return abbreviations[label] || label;
    },
    handleSeatSelection(seat, action) {
      const ticketType = this.ticketTypes.find(ticket => ticket.quantity > 0);
      if (ticketType) {
        if (action === 'select') {
          this.selectedSeats.push(seat);
          ticketType.quantity -= 1;
        } else if (action === 'deselect') {
          this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
          ticketType.quantity += 1;
        }
        this.updateTotal();
      }
    },
    updateTotal() {
      this.$emit('update-total', this.totalPrice);
    },
    calculatePrice() {
      if (!this.ticketTypes || this.ticketTypes.length === 0) {
        return 0;
      }

      return this.ticketTypes.reduce((acc, ticket) => acc + (ticket.price * ticket.quantity), 0);
    }
  },
  mounted() {
    const self = this; // Reference to Vue component
    const seatMaps = {
      'Hall 1': [
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa'
      ],
      'Hall 2': [
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa'
      ],
      'Hall 3': [
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa'
      ],
      'Hall 4': [
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa'
      ],
      'Hall 5': [
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa'
      ],
      'Hall 6': [
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa'
      ]
    };

    jQuery(document).ready(function () {
      const $cart = jQuery('#selected-seats'), // Sitting Area
        $counter = jQuery('#counter'), // Votes
        $total = jQuery('#total'); // Total money

      const seatMapConfig = seatMaps[self.hall] || seatMaps['Hall 1'];

      if (!seatMapConfig) {
        console.error('Seat map configuration is missing.');
        return;
      }

      const sc = jQuery('#seat-map').seatCharts({
        map: seatMapConfig,
        naming: {
          top: false,
          getLabel: function (character, row, column) {
            return column;
          }
        },
        legend: {
          node: jQuery('#legend'),
          items: [
            ['a', 'available', 'Available'],
            ['a', 'unavailable', 'Sold'],
            ['a', 'selected', 'Selected']
          ]
        },
        click: function () {
          if (this.status() === 'available') {
            if (self.selectedSeats.length < self.maxSeats) {
              self.selectedSeats.push({ row: this.settings.row + 1, seat: this.settings.label });

              jQuery('<div class="seat-card">R' + (this.settings.row + 1) + ' S' + this.settings.label + '</div>')
                .attr('id', 'cart-item-' + this.settings.id)
                .data('seatId', this.settings.id)
                .appendTo($cart);

              $counter.text(self.selectedSeats.length);
              $total.text(self.totalPrice);
              self.$emit('update-total', self.totalPrice); // Emit the update-total event with the new total
              self.$emit('select-seat', { row: this.settings.row + 1, seat: this.settings.label }); // Emit the selected seat

              return 'selected';
            } else {
              alert(`You can only select up to ${self.maxSeats} seats.`);
              return 'available';
            }
          } else if (this.status() === 'selected') {
            self.selectedSeats = self.selectedSeats.filter(seat => !(seat.row === this.settings.row + 1 && seat.seat === this.settings.label));

            $counter.text(self.selectedSeats.length);
            $total.text(self.totalPrice);
            self.$emit('update-total', self.totalPrice); // Emit the update-total event with the new total

            jQuery('#cart-item-' + this.settings.id).remove();

            return 'available';
          } else if (this.status() === 'unavailable') {
            return 'unavailable';
          } else {
            return this.style();
          }
        }
      });

      function makeRandomSeatsUnavailable() {
        const allSeats = [];
        for (let row = 0; row < sc.settings.map.length; row++) {
          for (let col = 0; col < sc.settings.map[row].length; col++) {
            if (sc.settings.map[row][col] === 'a') {
              allSeats.push(`${row}_${col + 1}`);
            }
          }
        }
        const unavailableSeats = allSeats.sort(() => 0.5 - Math.random()).slice(0, Math.floor(allSeats.length * 0.3));
        sc.get(unavailableSeats).status('unavailable');
      }

      // Ensure seat chart is initialized before making seats unavailable
      setTimeout(() => {
        if (sc && sc.settings && sc.settings.map) {
          makeRandomSeatsUnavailable();
        }
      }, 100); // Delay to ensure the seat chart is initialized
    });
  }
};
</script>


<style scoped>
.booking-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.legend-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
}

.booking-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.booking-details .book-left {
  text-align: right;
  margin-right: 10px;
}

.booking-details .book-right {
  text-align: left;
}

.booking-details li {
  padding: 5px 0;
}

#selected-seats {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.seat-card {
  background: #f0f0f0;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px 0;
  display: inline-block;
}

.seat-card:nth-child(3n+1) {
  clear: left;
}

.legend {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.legend li {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.legend .seat {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 5px;
}

.legend .available {
  background-color: grey;
}

.legend .sold {
  background-color: red;
}

.legend .selected {
  background-color: green;
}

.ticket-types {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.ticket-types li::after {
  content: ",";
}

.ticket-types li:last-child::after {
  content: "";
}

#total {
  font-size: 1em; /* Adjust the size as needed */
}
</style>
