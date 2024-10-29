// Product constructor
class Product {
    constructor(name, price, quantity, category) {
        this.name = name;
        this.price = parseFloat(price);
        this.quantity = parseInt(quantity);
        this.category = category;

        // Validate properties
        this.validate();
    }

    validate() {
        if (typeof this.name !== 'string' || this.name.trim() === '') {
            throw new Error('Invalid product name');
        }
        if (isNaN(this.price) || this.price <= 0) {
            throw new Error('Invalid price');
        }
        if (isNaN(this.quantity) || this.quantity < 0) {
            throw new Error('Invalid quantity');
        }
        if (typeof this.category !== 'string' || this.category.trim() === '') {
            throw new Error('Invalid category');
        }
    }

    isAvailable() {
        return this.quantity > 0;
    }

    compare(otherProduct) {
        return {
            priceDifference: Math.abs(this.price - otherProduct.price),
            quantityDifference: Math.abs(this.quantity - otherProduct.quantity)
        };
    }
}

// Inventory array
const inventory = [];

// Add product to inventory
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const category = document.getElementById('category').value;

    try {
        const product = new Product(name, price, quantity, category);
        inventory.push(product);
        displayInventory();
        
        // Clear the form
        this.reset();
        
    } catch (error) {
        alert(error.message);
    }
});

// Display inventory
function displayInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';

    inventory.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price.toFixed(2)} - Quantity: ${product.quantity} - Category: ${product.category} - Available: ${product.isAvailable() ? 'Yes' : 'No'}`;
        inventoryList.appendChild(li);
    });
}

// Search for products
document.getElementById('search-button').addEventListener('click', function() {
    const keyword = document.getElementById('search-input').value.toLowerCase();
    
    const filteredProducts = inventory.filter(product => 
        product.name.toLowerCase().includes(keyword) || 
        product.category.toLowerCase().includes(keyword)
    );

    if (filteredProducts.length > 0) {
        const inventoryList = document.getElementById('inventory-list');
        inventoryList.innerHTML = '';

        filteredProducts.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price.toFixed(2)} - Quantity: ${product.quantity} - Category: ${product.category}`;
            inventoryList.appendChild(li);
        });
        
    } else {
        alert("No products found.");
        displayInventory();
    }
});

// Compare two products
document.getElementById('compare-button').addEventListener('click', function() {
   const name1 = document.getElementById('compare-name1').value.trim();
   const name2 = document.getElementById('compare-name2').value.trim();

   const product1 = inventory.find(product => product.name === name1);
   const product2 = inventory.find(product => product.name === name2);

   if (product1 && product2) {
       const comparisonResult = product1.compare(product2);
       document.getElementById('comparison-result').innerHTML =
           `<p>Price Difference: $${comparisonResult.priceDifference.toFixed(2)}</p>` +
           `<p>Quantity Difference: ${comparisonResult.quantityDifference}</p>`;
   } else {
       alert("One or both products not found.");
   }
});