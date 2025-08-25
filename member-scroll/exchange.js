console.log("exchange.js loaded");

let walletAddress = null;

function connectinitialize() { ... }
  walletAddress = "demo_wallet_123";
  document.getElementById("walletStatus").textContent = `Connected: ${walletAddress}`;
  fetchExistingOffering();
}

async function fetchExistingOffering() {
  const url = `https://guykaykfekwabnuhqcqv.supabase.co/rest/v1/member_offerings?wallet_address=eq.${walletAddress}`;
  try {
    const response = await fetch(url, {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...',  // full anon key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...'
      }
    });

    const data = await response.json();
    if (data.length > 0) {
      const entry = data[0];
      document.getElementById('want').value = entry.want || '';
      document.getElementById('give').value = entry.give || '';
      document.getElementById('passion').value = entry.passion || '';
      document.getElementById('visible').checked = entry.visible;
    }
  } catch (error) {
    console.error('Error fetching offering:', error);
  }
document.getElementById('exchangeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!walletAddress) {
    alert('Please connect your wallet first.');
    return;
  }

  const want = document.getElementById('want').value;
  const give = document.getElementById('give').value;
  const passion = document.getElementById('passion').value;
  const visible = document.getElementById('visible').checked;

  const payload = {
    wallet_address: walletAddress,
    want,
    give,
    passion,
    visible
  };

  try {
    const response = await fetch(`https://guykaykfekwabnuhqcqv.supabase.co/rest/v1/member_offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...',  // full anon key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('Offering submitted successfully.');
    } else {
      alert('Error submitting offering.');
    }
  } catch (error) {
    console.error('Error submitting offering:', error);
  }
});
