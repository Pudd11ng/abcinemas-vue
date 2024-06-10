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
                  <li>Movie:</li>
                  <li>Time:</li>
                  <li>Tickets:</li>
                  <li>Total:</li>
                  <li>Selected Seats:</li>
                  <li id="selected-seats" class="scrollbar scrollbar1"></li>
                </ul>
                <ul class="book-right">
                  <li>{{ selectedMovie }}</li>
                  <li>{{ selectedDate }}, {{ selectedTime }}</li>
                  <li><span id="counter">0</span></li>
                  <li><b><i>RM</i><span id="total">0</span></b></li>
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
    selectedDate: String,
    selectedTime: String,
    hall: String,
    selectedMovie: String,
    maxSeats: Number
  },
  data() {
    return {
      selectedSeats: []
    };
  },
  mounted() {
    const price = 14; // price per ticket
    const self = this; // Reference to Vue component
    const seatMaps = {
      'Hall 1': [
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa'
      ],
      'Hall 2': [
        'aaaaa_aaaa',
        'aaaaa_aaaa',
        'aaaaa_aaaa'
      ],
      'Hall 3': [
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
        'aaaaa_aaaa'
      ],
      'Hall 5': [
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
              const newTotal = recalculateTotal(sc) + price;
              $total.text(newTotal);
              self.$emit('update-total', newTotal); // Emit the update-total event with the new total
              self.$emit('select-seat', { row: this.settings.row + 1, seat: this.settings.label }); // Emit the selected seat

              return 'selected';
            } else {
              alert(`You can only select up to ${self.maxSeats} seats.`);
              return 'available';
            }
          } else if (this.status() === 'selected') {
            self.selectedSeats = self.selectedSeats.filter(seat => !(seat.row === this.settings.row + 1 && seat.seat === this.settings.label));
            
            $counter.text(self.selectedSeats.length);
            const newTotal = recalculateTotal(sc) - price;
            $total.text(newTotal);
            self.$emit('update-total', newTotal); // Emit the update-total event with the new total

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

      function recalculateTotal(sc) {
        let total = 0;
        sc.find('selected').each(function () {
          total += price;
        });

        return total;
      }
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

#total {
  font-size: 1em; /* Adjust the size as needed */
}
</style>
