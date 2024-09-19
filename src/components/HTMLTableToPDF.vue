<template>
    <button class="btn btn-primary btn-download rounded-0 mb-0"  @click="exportToPDF" type="button">Download</button>
</template>

<script setup>
import jsPDF from "jspdf";


const props = defineProps({
    headers: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
})
function exportToPDF() {
      const doc = new jsPDF();
      
      doc.text("User Information", 10, 10);
      
      const data = [
        [1, 'John Doe', 25],
        [2, 'Jane Doe', 32],
      ];

      // Simple table structure
      data.forEach((row, index) => {
        doc.text(row.join(" "), 10, 20 + (index * 10));
      });

      doc.save("CRM.pdf");
    }

</script>

  