let walletAddress = null;

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      walletAddress = accounts[0];
      document.getElementById('walletStatus').innerText = `Connected: ${walletAddress}`;
      fetchExistingOffering();
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  } else {
    alert('MetaMask not found. Please install it to continue.');
  }
}

async function fetchExistingOffering() {
  const url = `https://your-supabase-url/rest/v1/member_offerings?wallet_address=eq.${walletAddress}`;
  try {
    const response = await fetch(url, {
      headers: {
        'apikey': 'your-supabase-anon-key',
        'Authorization': 'Bearer your-supabase-anon-key'
      }
    });
    const data = await response.json();
    if (data.length > 0) {
      const entry = data[0];
      document.getElementById('want').value = entry.want || '';
      document.getElementById('give').value = entry.give || '';
      document.getElementById('visible').checked = entry.visible;
    }
  } catch (err) {
    console.error('Error fetching offering:', err);
  }
}

document.getElementById('exchangeForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  if (!walletAddress) {
    alert('Please connect your wallet first.');
    return;
  }

  const want = document.getElementById('want').value;
  const give = document.getElementById('give').value;
  const visible = document.getElementById('visible').checked;
  const passion = document.getElementById('passion').value;

const payload = {
  want,
  give,
  passion,
  visible,
  wallet_address: walletAddress
};

  try {
    const upsertUrl = `https://your-supabase-url/rest/v1/member_offerings`;
    const response = await fetch(upsertUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'your-supabase-anon-key',
        'Authorization': 'Bearer your-supabase-anon-key',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('Your offering has been updated 🌿');
    } else {
      console.error('Failed to update offering:', await response.text());
    }
  } catch (err) {
    console.error('Error submitting offering:', err);
  }
});
