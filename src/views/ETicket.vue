<template>
  <div id="e-ticket">
    <HeaderPage />
    <main>
      <div class="tickets-container">
        <div class="ticket" v-for="(ticket, index) in tickets" :key="index">
          <div class="ticket-header">
            <p class="cinema">ABCinemas PRESENTS</p>
            <p class="movie-title">{{ ticket.movieTitle }}</p>
          </div>
          <div class="ticket-body">
            <div class="ticket-info">
              <div class="info-row">
                <span class="label">BRANCH:</span>
                <span class="value">{{ ticket.branch }}</span>
              </div>
              <div class="info-row">
                <span class="label">HALL:</span>
                <span class="value">{{ ticket.hall }}</span>
              </div>
              <div class="info-row">
                <span class="label">ROW:</span>
                <span class="value">{{ ticket.row }}</span>
              </div>
              <div class="info-row">
                <span class="label">SEAT:</span>
                <span class="value">{{ ticket.seat }}</span>
              </div>
              <div class="info-row">
                <span class="label">PRICE:</span>
                <span class="value">RM {{ ticket.price }}</span>
              </div>
              <div class="info-row">
                <span class="label">DATE:</span>
                <span class="value">{{ ticket.date }}</span>
              </div>
              <div class="info-row">
                <span class="label">TIME:</span>
                <span class="value">{{ ticket.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button @click="returnToHome">Return to Home</button>
        <button @click="downloadPDF">Download as PDF</button>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import jsPDF from "jspdf";

export default {
  name: "ETicket",
  components: {
    HeaderPage,
  },
  data() {
    return {
      tickets: [],
    };
  },
  mounted() {
    const bookingId = this.$route.query.bookingId;
    if (bookingId) {
      this.fetchBookingDetails(bookingId);
    }
  },
  methods: {
    fetchBookingDetails(bookingId) {
      fetch(`http://localhost:8088/api/bookings/${bookingId}`)
        .then(response => response.json())
        .then(data => {
          this.tickets = data.bookingDetails.map(detail => ({
            movieTitle: detail.movie_title,
            branch: detail.branch,
            hall: detail.hall,
            row: detail.seat_row,
            seat: detail.seat_number,
            price: detail.price,
            date: detail.show_date,
            time: detail.show_time,
          }));
        })
        .catch(error => {
          console.error("Error fetching booking details:", error);
        });
    },
    returnToHome() {
      this.$router.push("/");
    },
    downloadPDF() {
      const pdf = new jsPDF();
      this.tickets.forEach((ticket, index) => {
        if (index !== 0) {
          pdf.addPage();
        }
        pdf.setFontSize(20);
        pdf.text("ABCinemas PRESENTS", 10, 20);
        pdf.text(ticket.movieTitle, 10, 30);
        pdf.setFontSize(12);
        pdf.text(`BRANCH: ${ticket.branch}`, 10, 40);
        pdf.text(`HALL: ${ticket.hall}`, 10, 50);
        pdf.text(`ROW: ${ticket.row}`, 10, 60);
        pdf.text(`SEAT: ${ticket.seat}`, 10, 70);
        pdf.text(`PRICE: RM ${ticket.price}`, 10, 80);
        pdf.text(`DATE: ${ticket.date}`, 10, 90);
        pdf.text(`TIME: ${ticket.time}`, 10, 100);
      });
      pdf.save("e-tickets.pdf");
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/e-ticket.css";

.tickets-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
}

.ticket {
  margin: 10px;
  padding: 10px;
  border: 2px solid #444;
  border-radius: 10px;
  width: 250px;
  box-sizing: border-box;
  flex: 0 0 auto;
  background-color: #f5f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ticket-header {
  text-align: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.cinema {
  font-size: 12px;
}

.movie-title {
  font-size: 16px;
  font-weight: bold;
}

.ticket-body {
  padding: 10px;
  background-color: #fff;
}

.ticket-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.info-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #444;
}

.value {
  font-size: 12px;
  color: #666;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}
</style>
