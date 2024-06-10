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
            <table>
              <tr>
                <th>HALL</th>
                <th>ROW</th>
                <th>SEAT</th>
              </tr>
              <tr>
                <td class="bigger">{{ ticket.hall }}</td>
                <td class="bigger">{{ ticket.row }}</td>
                <td class="bigger">{{ ticket.seat }}</td>
              </tr>
            </table>
            <table>
              <tr>
                <th>PRICE</th>
                <th>DATE</th>
                <th>TIME</th>
              </tr>
              <tr>
                <td>RM {{ ticket.price }}</td>
                <td>{{ ticket.date }}</td>
                <td>{{ ticket.time }}</td>
              </tr>
            </table>
          </div>
          <div class="holes-lower"></div>
          <div class="qr-code">
            <canvas :ref="'qrcodeCanvas' + index"></canvas>
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
import HeaderPage from '@/components/HeaderPage.vue';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';

export default {
  name: 'ETicket',
  components: {
    HeaderPage
  },
  data() {
    return {
      tickets: []
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
        console.error('Failed to parse tickets:', error);
      }
    }
  },
  methods: {
    generateQRCodes() {
      this.tickets.forEach((ticket, index) => {
        const randomData = Math.random().toString(36).substring(7); // Generating random string
        const canvas = this.$refs['qrcodeCanvas' + index][0]; // Accessing the canvas element
        QRCode.toCanvas(canvas, randomData, function (error) {
          if (error) console.error(error);
          console.log('QR code generated successfully!');
        });
      });
    },
    returnToHome() {
      this.$router.push('/');
    },
    downloadPDF() {
      const pdf = new jsPDF();
      this.tickets.forEach((ticket, index) => {
        if (index !== 0) {
          pdf.addPage();
        }
        pdf.setFontSize(20);
        console.log(`Text: 'ABCinemas PRESENTS' at (10, 20)`);
        pdf.text('ABCinemas PRESENTS', 10, 20);
        console.log(`Text: '${ticket.movieTitle}' at (10, 30)`);
        pdf.text(ticket.movieTitle, 10, 30);
        pdf.setFontSize(12);
        console.log(`Text: 'HALL: ${ticket.hall}' at (10, 50)`);
        pdf.text(`HALL: ${ticket.hall}`, 10, 50);
        console.log(`Text: 'ROW: ${ticket.row}' at (10, 60)`);
        pdf.text(`ROW: ${ticket.row}`, 10, 60);
        console.log(`Text: 'SEAT: ${ticket.seat}' at (10, 70)`);
        pdf.text(`SEAT: ${ticket.seat}`, 10, 70);
        console.log(`Text: 'PRICE: RM ${ticket.price}' at (10, 80)`);
        pdf.text(`PRICE: RM ${ticket.price}`, 10, 80);
        console.log(`Text: 'DATE: ${ticket.date}' at (10, 90)`);
        pdf.text(`DATE: ${ticket.date}`, 10, 90);
        console.log(`Text: 'TIME: ${ticket.time}' at (10, 100)`);
        pdf.text(`TIME: ${ticket.time}`, 10, 100);

        const canvas = this.$refs['qrcodeCanvas' + index][0];
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 150, 50, 50, 50); // Adjust position and size as needed
      });
      pdf.save('e-tickets.pdf');
    }
  }
};
</script>

<style src="../assets/css/e-ticket.css"></style>

<style scoped>
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
</style>
