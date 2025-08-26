console.log("exchange.js loaded");

let walletAddress = null;

async function connectInitialize() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      walletAddress = accounts[0];
      document.getElementById("walletStatus").textContent = `Connected: ${walletAddress}`;
      fetchExistingOffering();
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Could not connect wallet.");
    }
  } else {
    alert("MetaMask not detected. Please install it to continue.");
  }
}

async function fetchExistingOffering() {
  const url = `https://guykaykfekwabnuhqcqv.supabase.co/rest/v1/member_offerings?wallet_address=eq.${walletAddress}`;
  try {
    const response = await fetch(url, {
      headers: {
        'apikey': 'YOUR_SUPABASE_ANON_KEY',
        'Authorization': 'Bearer YOUR_SUPABASE_ANON_KEY'
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
        'apikey': 'YOUR_SUPABASE_ANON_KEY',
        'Authorization': 'Bearer YOUR_SUPABASE_ANON_KEY'
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
