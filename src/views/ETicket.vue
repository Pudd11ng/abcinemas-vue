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
            <canvas :ref="'qrcodeCanvas' + index"></canvas>
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
    };
  },
  mounted() {
    const queryTickets = this.$route.query.tickets;
    if (queryTickets) {
      try {
        this.tickets = JSON.parse(queryTickets);
        this.$nextTick(() => {
          this.generateQRCodes();
        });
      } catch (error) {
        console.error("Failed to parse tickets:", error);
      }
    }
  },
  methods: {
    generateQRCodes() {
      this.tickets.forEach((ticket, index) => {
        const qrData = `${ticket.movieTitle}-${ticket.branch}-${ticket.hall}-${ticket.row}-${ticket.seat}-${ticket.date}-${ticket.time}`; // Unique data for QR code
        const canvas = this.$refs["qrcodeCanvas" + index][0]; // Accessing the canvas element
        QRCode.toCanvas(canvas, qrData, function (error) {
          if (error) console.error(error);
          console.log("QR code generated successfully!");
        });
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

        const canvas = this.$refs["qrcodeCanvas" + index][0];
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 150, 50, 50, 50); // Adjust position and size as needed
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
