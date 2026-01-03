const QRCode = require('qrcode');
const os = require('os');

// Get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();
const port = process.env.PORT || 8080;
const url = `http://${localIP}:${port}`;

console.log('\n🚀 Codexia Development Server\n');
console.log(`Local:   http://localhost:${port}`);
console.log(`Network: ${url}\n`);

// Generate QR code
QRCode.toString(url, { type: 'terminal', small: true }, (err, qr) => {
  if (err) {
    console.error('Error generating QR code:', err);
    return;
  }
  console.log('📱 Scan this QR code with your phone:\n');
  console.log(qr);
  console.log(`\nOr manually enter: ${url}\n`);
});

// Also save QR code as image
QRCode.toFile('codexia-qr.png', url, {
  width: 300,
  margin: 2
}, (err) => {
  if (err) {
    console.error('Error saving QR code image:', err);
  } else {
    console.log('✅ QR code saved as codexia-qr.png\n');
  }
});
