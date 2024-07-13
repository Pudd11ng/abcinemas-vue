<template>
  <div id="e-ticket">
    <HeaderPage />
    <main>
      <div class="tickets-container">
        <div class="ticket" v-for="(ticket, index) in tickets" :key="index">
          <div class="holes-top"></div>
          <div class="title">
            <p class="cinema">ABCinemas PRESENTS</p>
            <p class="movie-title">{{ ticket.movieTitle }}</p>
          </div>
          <div class="info">
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
          <div class="qr-code">
            <canvas :ref="`qrcodeCanvas${index}`"></canvas>
          </div>
          <div class="holes-lower"></div>
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
import QRCode from "qrcode";
import jsPDF from "jspdf";

export default {
  name: "ETicket",
  components: {
    HeaderPage,
  },
  data() {
    return {
      tickets: [],
      movies: {}, // Store movie details with movie_id as key
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
      fetch(`http://localhost:8088/bookings/${bookingId}`)
        .then(response => response.json())
        .then(data => {
          const bookingDetails = data.bookingDetails;
          const movieIds = [...new Set(bookingDetails.map(detail => detail.movie_id))];
          this.fetchMovieTitles(movieIds)
            .then(() => {
              this.tickets = bookingDetails.map(detail => ({
                movieTitle: this.movies[detail.movie_id],
                branch: detail.branch_name,
                hall: detail.hall,
                row: detail.seat_row,
                seat: detail.seat_number,
                price: detail.price,
                date: detail.show_date,
                time: detail.show_time,
              }));
              this.generateQRCodes();
            });
        })
        .catch(error => {
          console.error("Error fetching booking details:", error);
        });
    },
    fetchMovieTitles(movieIds) {
      const promises = movieIds.map(movieId => {
        return fetch(`http://localhost:8088/movies/${movieId}`)
          .then(response => response.json())
          .then(data => {
            this.$set(this.movies, movieId, data.title);
          })
          .catch(error => {
            console.error(`Error fetching movie details for ID ${movieId}:`, error);
          });
      });
      return Promise.all(promises);
    },
    generateQRCodes() {
      this.tickets.forEach((ticket, index) => {
        const qrData = `${ticket.movieTitle}-${ticket.branch}-${ticket.hall}-${ticket.row}-${ticket.seat}-${ticket.date}-${ticket.time}`;
        const canvas = this.$refs[`qrcodeCanvas${index}`];
        if (canvas) {
          QRCode.toCanvas(canvas, qrData, function (error) {
            if (error) console.error(error);
            console.log("QR code generated successfully!");
          });
        }
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

        const canvas = this.$refs[`qrcodeCanvas${index}`];
        if (canvas) {
          const imgData = canvas.toDataURL("image/png");
          pdf.addImage(imgData, "PNG", 150, 50, 50, 50);
        }
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
  flex-wrap: nowrap;
  justify-content: space-around;
  overflow-x: auto;
}

.ticket {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
  box-sizing: border-box;
  flex: 0 0 auto; /* Prevent shrinking */
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #df0e62;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c50d56;
}

button + button {
  margin-left: 10px;
}

.holes-top,
.holes-lower {
  width: 100%;
  height: 10px;
  background: repeating-linear-gradient(
    -45deg,
    #fff,
    #fff 3px,
    #ddd 3px,
    #ddd 6px
  );
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.cinema {
  font-size: 14px;
  color: #666;
}

.movie-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.info {
  margin-bottom: 20px;
}

.ticket-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-row {
  display: flex;
  justify-content: space-between;
}

.label {
  font-weight: bold;
}

.value {
  font-size: 14px;
}

.qr-code {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
