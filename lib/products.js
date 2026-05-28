const products = [
    {
      id: "1",
      name: "Classic White T-Shirt",
      price: 499,
      description: "A comfortable everyday white t-shirt made from 100% cotton.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      category: "Clothing",
    },
    {
      id: "2",
      name: "Running Shoes",
      price: 1999,
      description: "Lightweight running shoes perfect for daily workouts.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      category: "Footwear",
    },
    {
      id: "3",
      name: "Leather Wallet",
      price: 799,
      description: "Slim genuine leather wallet with 6 card slots.",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
      category: "Accessories",
    },
    {
      id: "4",
      name: "Wireless Earbuds",
      price: 2499,
      description: "True wireless earbuds with noise cancellation and 24hr battery.",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
      category: "Electronics",
    },
    {
      id: "5",
      name: "Sunglasses",
      price: 999,
      description: "UV400 polarized sunglasses for all-day comfort.",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      category: "Accessories",
    },
    {
      id: "6",
      name: "Backpack",
      price: 1499,
      description: "Durable 30L backpack with laptop compartment.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      category: "Bags",
    },
  ]
  export function getAllProducts() {
    return products
  }
  export function getProductById(id) {
    return products.find((p) => p.id === String(id))
  }
  