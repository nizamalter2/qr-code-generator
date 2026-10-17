import QRCode from 'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm';

const input = document.getElementById('qr-input');
const canvas = document.getElementById('canvas');
const downloadBtn = document.getElementById('download-btn');

// 1. Debounce helper
function debounce(func, delay = 200) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 2. Generate QR Code
function updateQRCode() {
  const text = input.value.trim();

  if (!text) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    downloadBtn.disabled = true; // Disable download button if input is empty
    return;
  }

  QRCode.toCanvas(canvas, text, { width: 250, margin: 2 }, (err) => {
    if (err) {
      console.error(err);
      downloadBtn.disabled = true;
    } else {
      downloadBtn.disabled = false; // Enable download button on successful render
    }
  });
}

// 3. Download Handler
function downloadQRCode() {
  // Convert canvas drawing to PNG data URL
  const imageUrl = canvas.toDataURL('image/png');

  // Create temporary link element to trigger file download
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = 'qrcode.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Event Listeners
input.addEventListener('input', debounce(updateQRCode, 200));
downloadBtn.addEventListener('click', downloadQRCode);