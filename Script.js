function addToCart(artworkId) {
    fetch('/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ artworkId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Artwork added to cart!');
        } else {
          alert('Failed to add artwork to cart.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }