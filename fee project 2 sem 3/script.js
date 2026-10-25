/* ============================================================
   ELYRA — Complete E-Commerce JS  v3 (Other Designs + Full Products)
   ============================================================ */
'use strict';

// ── UTILS ──────────────────────────────────────────────────
function $(sel,ctx){return (ctx||document).querySelector(sel);}
function $$(sel,ctx){return Array.from((ctx||document).querySelectorAll(sel));}

// ── STORAGE KEYS ───────────────────────────────────────────
var CART_KEY     = 'elyra_cart';
var WISH_KEY     = 'elyra_wishlist';
var REVIEWS_KEY  = 'elyra_reviews';
var USER_KEY     = 'elyra_user_name';
var BUY_NOW_KEY  = 'elyra_buy_now';  // single-item Buy Now flow

// ── DATA HELPERS ───────────────────────────────────────────
function getCart()    {try{return JSON.parse(localStorage.getItem(CART_KEY))||[];}catch(e){return[];}}
function getWish()    {try{return JSON.parse(localStorage.getItem(WISH_KEY))||[];}catch(e){return[];}}
function getReviews() {try{return JSON.parse(localStorage.getItem(REVIEWS_KEY))||{};}catch(e){return{};}}
function saveCart(c)  {localStorage.setItem(CART_KEY,JSON.stringify(c));}
function saveWish(w)  {localStorage.setItem(WISH_KEY,JSON.stringify(w));}
function saveReviews(r){localStorage.setItem(REVIEWS_KEY,JSON.stringify(r));}

// ── PRODUCT DATABASE ───────────────────────────────────────
// All images use Unsplash CDN — stable, hotlink-safe, no CORS issues.
// To replace any image: change the `image` field URL and the first
// entry in the `gallery` array for that product.
var PRODUCTS = [

  // ══ WOMENSWEAR ══
  { id:'w-1', name:'Salwar Suit', price:8499, category:'womenswear',
    sizes:['XS','S','M','L','XL'],
    image:'https://th.bing.com/th/id/OIP.l95nGJlyORojaJhoXMfq_AHaNI?w=186&h=330&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    material:'Pure Cotton · Straight Cut · Dupatta Included',
    gallery:[
      'https://th.bing.com/th/id/OIP.l95nGJlyORojaJhoXMfq_AHaNI?w=186&h=330&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
    ],
    colors:[]
  },

  { id:'w-2', name:'Floral Tops', price:5999, category:'womenswear',
    sizes:['XS','S','M','L','XL'],
    image:'https://sutrammbyroshni.in/assets/collections/ladies-dresses-tops-2.webp',
    material:'Linen Blend · Relaxed Fit',
    gallery:[
      'https://sutrammbyroshni.in/assets/collections/ladies-dresses-tops-2.webp'
    ],
    colors:[]
  },
  { id:'w-3', name:'Wrap Midi Skirt', price:3299, category:'womenswear',
    sizes:['XS','S','M','L'],
    image:'https://th.bing.com/th/id/OIP.q3jmjQPH9igTFBEw-16jywHaL3?w=186&h=298&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    material:'Satin Crepe · Wrap Style',
    gallery:[
      'https://th.bing.com/th/id/OIP.q3jmjQPH9igTFBEw-16jywHaL3?w=186&h=298&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
    ],
    colors:[]
  },
  { id:'w-4', name:'Lehenga', price:7199, category:'womenswear',
    sizes:['S','M','L','XL'],
    image:'https://th.bing.com/th/id/OIP.hM5ptGlJ85OvgU19rChKxgHaKb?w=186&h=262&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    material:'Georgette · Embroidered · Flared',
    gallery:[
      'https://th.bing.com/th/id/OIP.hM5ptGlJ85OvgU19rChKxgHaKb?w=186&h=262&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
    ],
    colors:[]
  },
  { id:'w-5', name:'Hoodies', price:11999, category:'womenswear',
    sizes:['XS','S','M','L','XL','XXL'],
    image:'https://th.bing.com/th/id/OIP.R8FLte8Z8hnNiZScZbwRZAHaJ3?w=186&h=248&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    material:'French Terry · Kangaroo Pocket',
    gallery:[
      'https://th.bing.com/th/id/OIP.R8FLte8Z8hnNiZScZbwRZAHaJ3?w=186&h=248&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      'https://th.bing.com/th/id/OIP.R8FLte8Z8hnNiZScZbwRZAHaJ3?w=186&h=248&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
    ],
    colors:[]
  },
  { id:'w-6', name:'Kurta Set', price:4599, category:'womenswear',
    sizes:['XS','S','M','L','XL'],
    image:'https://th.bing.com/th/id/OIP.tPGudKvNrcFTmGsjU_XDCwHaJ4?w=186&h=248&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    material:'Cotton Silk · Block Print',
    gallery:[
      'https://th.bing.com/th/id/OIP.tPGudKvNrcFTmGsjU_XDCwHaJ4?w=186&h=248&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
    ],
    colors:[]
  },

  // ══ MENSWEAR ══
  { id:'m-1', name:'Slim Linen Suit', price:14999, category:'menswear',
    sizes:['S','M','L','XL','XXL'],
    image:'https://i.pinimg.com/736x/99/f9/2c/99f92cf5f5974224aa22320d27f67467.jpg',
    material:'100% Linen · Unlined · Two-Button · Slim Fit',
    gallery:[
      'https://i.pinimg.com/736x/99/f9/2c/99f92cf5f5974224aa22320d27f67467.jpg'
    ],
    colors:[]
  },
  { id:'m-2', name:'Sportswear Set', price:12499, category:'menswear',
    sizes:['S','M','L','XL','XXL'],
    image:'https://tse1.mm.bing.net/th/id/OIP.mZGq8JVfmAshHiBOY73mWAHaHa?r=0&w=2000&h=2000&rs=1&pid=ImgDetMain&o=7&rm=3',
    material:'Performance Poly · Moisture Wicking',
    gallery:[
      'https://tse1.mm.bing.net/th/id/OIP.mZGq8JVfmAshHiBOY73mWAHaHa?r=0&w=2000&h=2000&rs=1&pid=ImgDetMain&o=7&rm=3'
    ],
    colors:[]
  },
  { id:'m-3', name:'T-Shirt', price:3499, category:'menswear',
    sizes:['XS','S','M','L','XL','XXL'],
    image:'https://i.pinimg.com/originals/80/d9/76/80d97698c66a0b1e09806de890453bfe.jpg',
    material:'Supima Cotton · 200 GSM · Pre-Shrunk',
    gallery:[
      'https://i.pinimg.com/originals/80/d9/76/80d97698c66a0b1e09806de890453bfe.jpg',
      'https://i.pinimg.com/originals/80/d9/76/80d97698c66a0b1e09806de890453bfe.jpg'
    ],
    colors:[]
  },
  { id:'m-4', name:'Tailored Trousers', price:4999, category:'menswear',
    sizes:['28','30','32','34','36'],
    image:'https://i.pinimg.com/736x/f5/72/0a/f5720a5f9f00ec1bd5f878ba676cb1e1.jpg',
    material:'Wool Blend · Flat Front',
    gallery:[
      'https://i.pinimg.com/736x/f5/72/0a/f5720a5f9f00ec1bd5f878ba676cb1e1.jpg'
    ],
    colors:[]
  },
  { id:'m-5', name:'Formal Shirt', price:6299, category:'menswear',
    sizes:['S','M','L','XL'],
    image:'https://png.pngtree.com/png-vector/20241010/ourlarge/pngtree-formal-mens-black-shirt-without-beground-png-image_14066586.png',
    material:'Egyptian Cotton · Regular Fit',
    gallery:[
      'https://png.pngtree.com/png-vector/20241010/ourlarge/pngtree-formal-mens-black-shirt-without-beground-png-image_14066586.png',
      'https://png.pngtree.com/png-vector/20241010/ourlarge/pngtree-formal-mens-black-shirt-without-beground-png-image_14066586.png'
    ],
    colors:[]
  },
  { id:'m-6', name:'Denim Jacket', price:7899, category:'menswear',
    sizes:['S','M','L','XL','XXL'],
    image:'https://th.bing.com/th/id/OIP.vVMB34-IXjiTu_lWzJxGVAHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    material:'100% Denim · Trucker Style',
    gallery:[
      'https://th.bing.com/th/id/OIP.vVMB34-IXjiTu_lWzJxGVAHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      'https://th.bing.com/th/id/OIP.vVMB34-IXjiTu_lWzJxGVAHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
    ],
    colors:[]
  },

  // ══ KIDSWEAR ══
  { id:'k-1', name:'Floral Summer Dress', price:1099, category:'kidswear',
    sizes:['2Y','4Y','6Y','8Y'],
    image:'https://m.media-amazon.com/images/I/81cIjkPd4pS._AC_UY1000_.jpg',
    material:'Cotton Lawn · Lightweight · Machine Washable',
    gallery:[
      'https://m.media-amazon.com/images/I/81cIjkPd4pS._AC_UY1000_.jpg'
    ],
    colors:[]
  },
  { id:'k-2', name:'Cotton Shirt', price:499, category:'kidswear',
    sizes:['3Y','4Y','5Y','6Y'],
    image:'https://3.imimg.com/data3/WN/MP/MY-2743845/kids-cotton-shirt-500x500.jpg',
    material:'Pure Cotton · Soft Touch · Easy-Care',
    gallery:[
      'https://3.imimg.com/data3/WN/MP/MY-2743845/kids-cotton-shirt-500x500.jpg'
    ],
    colors:[]
  },
  { id:'k-3', name:'Denim Dungaree', price:1299, category:'kidswear',
    sizes:['2Y','4Y','6Y'],
    image:'https://5.imimg.com/data5/SG/SE/MY-60215845/kids-denim-dungaree-1000x1000.jpg',
    material:'Stretch Denim · Adjustable Straps',
    gallery:[
      'https://5.imimg.com/data5/SG/SE/MY-60215845/kids-denim-dungaree-1000x1000.jpg'
    ],
    colors:[]
  },
  { id:'k-4', name:'Kids Jacket', price:1999, category:'kidswear',
    sizes:['4Y','6Y','8Y','10Y'],
    image:'https://i5.walmartimages.com/seo/Autumn-Winter-Baby-Boys-Jacket-Jacket-For-Boys-Children-Jacket-Kids-Hooded-Warm-Outerwear-Coat-For-Boy-Clothes-2-3-4-5-Yrs_0a1ada3c-a577-4f15-a609-5f75eaa4cd2a.29464305ef361477cb772f2da2c0c728.jpeg',
    material:'Padded Poly · Hooded · Zip-Up',
    gallery:[
      'https://i5.walmartimages.com/seo/Autumn-Winter-Baby-Boys-Jacket-Jacket-For-Boys-Children-Jacket-Kids-Hooded-Warm-Outerwear-Coat-For-Boy-Clothes-2-3-4-5-Yrs_0a1ada3c-a577-4f15-a609-5f75eaa4cd2a.29464305ef361477cb772f2da2c0c728.jpeg'
    ],
    colors:[]
  },
  { id:'k-5', name:'Kids Kurta', price:2099, category:'kidswear',
    sizes:['3Y','5Y','7Y'],
    image:'https://i.pinimg.com/736x/da/5a/4d/da5a4d5bd14411d631e5836e83dcaf9c.jpg',
    material:'Block Print Cotton · Festive',
    gallery:[
      'https://i.pinimg.com/736x/da/5a/4d/da5a4d5bd14411d631e5836e83dcaf9c.jpg'
    ],
    colors:[]
  },

  // ══ SUNGLASSES ══
  { id:'sg-1', name:'Aviator Classic', price:1299, category:'sunglasses',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
    material:'Metal Frame · UV400 · Anti-Glare Coating',
    gallery:[
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
      'https://images.unsplash.com/photo-1560537635-d4b98f15d2cf?w=500&q=80'
    ],
    colors:[]
  },
  { id:'sg-2', name:'Round Tortoise', price:999, category:'sunglasses',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&q=80',
    material:'Acetate Frame · UV400',
    gallery:[
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80'
    ],
    colors:[]
  },
  { id:'sg-3', name:'Cat Eye Noir', price:1499, category:'sunglasses',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
    material:'Acetate · Polarised Lenses',
    gallery:[
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&q=80'
    ],
    colors:[]
  },
 
  { id:'sg-4', name:'Sport Shield', price:1899, category:'sunglasses',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&q=80',
    material:'TR90 · Smoke Lens · Sporty Wrap',
    gallery:[
      'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&q=80',
      'https://images.unsplash.com/photo-1560537635-d4b98f15d2cf?w=500&q=80'
    ],
    colors:[]
  },
  

  // ══ BAGS ══
  { id:'b-1', name:'Shoulder Bag', price:2199, category:'bags',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    material:'Signature Canvas · Adjustable Strap · Zip Closure',
    gallery:[
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'
    ],
    colors:[]
  },
  { id:'b-2', name:'Saddle Bag Mini', price:3499, category:'bags',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
    material:'Pebbled Leather · Structured',
    gallery:[
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80'
    ],
    colors:[]
  },
  { id:'b-3', name:'Laptop Bag', price:5999, category:'bags',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    material:'Canvas · Vegan Leather · 15" Laptop Fits',
    gallery:[
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'
    ],
    colors:[]
  },
  { id:'b-4', name:'Evening Clutch', price:1899, category:'bags',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    material:'Satin · Pleated · Detachable Chain',
    gallery:[
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80'
    ],
    colors:[]
  },
  { id:'b-5', name:'Crossbody Slim', price:2799, category:'bags',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=600&q=80',
    material:'Nylon · Water Resistant · Multi-Pocket',
    gallery:[
      'https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=600&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80'
    ],
    colors:[]
  },
  { id:'b-6', name:'Tote Bag Classic', price:3199, category:'bags',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&q=80',
    material:'Full-Grain Leather · Open Top',
    gallery:[
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'
    ],
    colors:[]
  },

  // ══ JEWELLERY ══
  { id:'j-1', name:'Layered Gold Necklace', price:2499, category:'jewellery',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    material:'18K Gold Plated · Tarnish Resistant · Adjustable Chain',
    gallery:[
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80'
    ],
    colors:[]
  },
  
  { id:'j-3', name:'Pearl Drop Earrings', price:1799, category:'jewellery',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    material:'Freshwater Pearl · Gold Posts',
    gallery:[
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80'
    ],
    colors:[]
  },
  { id:'j-4', name:'Charm Bracelet', price:999, category:'jewellery',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    material:'Sterling Silver · Multiple Charms',
    gallery:[
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80'
    ],
    colors:[]
  },
  
  { id:'j-6', name:'Choker Necklace', price:1199, category:'jewellery',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
    material:'Gold-Plated Brass · Statement Piece',
    gallery:[
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80'
    ],
    colors:[]
  },

  // ══ WATCHES ══
  { id:'wt-1', name:'Timepiece No.5', price:8999, category:'watches',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=85',
    material:'Swiss Movement · Stainless Steel Case',
    gallery:[
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=85',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85'
    ],
    colors:[]
  },
  { id:'wt-2', name:'Minimal Dial Watch', price:6499, category:'watches',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=85',
    material:'Sapphire Crystal · Leather Strap',
    gallery:[
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=85',
      'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600&q=85'
    ],
    colors:[]
  },
  { id:'wt-3', name:'Sport Chrono', price:12999, category:'watches',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600&q=85',
    material:'Chronograph · Rubber Strap · 100m WR',
    gallery:[
      'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600&q=85',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=85'
    ],
    colors:[]
  },
  { id:'wt-4', name:'Rose Gold Classic', price:9499, category:'watches',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85',
    material:'Rose Gold PVD · Mesh Bracelet',
    gallery:[
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85',
      'https://images.unsplash.com/photo-1553545204-4f7d339aa06a?w=600&q=85'
    ],
    colors:[]
  },
  { id:'wt-5', name:'Thin Quartz', price:4999, category:'watches',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1553545204-4f7d339aa06a?w=600&q=85',
    material:'Ultra-Slim 6mm · Quartz Movement',
    gallery:[
      'https://images.unsplash.com/photo-1553545204-4f7d339aa06a?w=600&q=85',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=85'
    ],
    colors:[]
  },
  { id:'wt-6', name:'Dive Watch 200m', price:11499, category:'watches',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=85',
    material:'200m Water Resistant · Ceramic Bezel',
    gallery:[
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=85',
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&q=85'
    ],
    colors:[]
  },

  

 

  // ══ MAKEUP ══
  { id:'mk-1', name:'Concealer', price:699, category:'makeup',
    sizes:['OS'],
    image:'https://static.thcdn.com/images/large/original/productimg/1600/1600/12655788-1735005269660213.jpg',
    material:'8 Shades · Full Coverage · Long-Wear',
    gallery:[
      'https://static.thcdn.com/images/large/original/productimg/1600/1600/12655788-1735005269660213.jpg',
      'https://static.thcdn.com/images/large/original/productimg/1600/1600/12655788-1735005269660213.jpg'
    ],
    colors:[]
  },
  { id:'mk-2', name:'Eyeshadow Palette', price:1499, category:'makeup',
    sizes:['OS'],
    image:'https://png.pngtree.com/png-clipart/20230425/original/pngtree-eyeshadow-palette-makeup-eye-makeup-color-png-image_9099962.png',
    material:'18-Pan Palette · Highly Pigmented · Blendable',
    gallery:[
      'https://png.pngtree.com/png-clipart/20230425/original/pngtree-eyeshadow-palette-makeup-eye-makeup-color-png-image_9099962.png',
      'https://png.pngtree.com/png-clipart/20230425/original/pngtree-eyeshadow-palette-makeup-eye-makeup-color-png-image_9099962.png'
    ],
    colors:[]
  },
  { id:'mk-3', name:'Foundation', price:999, category:'makeup',
    sizes:['OS'],
    image:'https://i5.walmartimages.com/seo/Maybelline-Fit-Me-Matte-Poreless-Liquid-Foundation-Makeup-238-Rich-Tan-1-fl-oz_c2c0ccfc-8e83-4dbc-bafe-52f598f93184.5eaa35cce34bb0ba3c9d5617026a4181.jpeg',
    material:'12 Shades · Matte Finish · SPF 22',
    gallery:[
      'https://i5.walmartimages.com/seo/Maybelline-Fit-Me-Matte-Poreless-Liquid-Foundation-Makeup-238-Rich-Tan-1-fl-oz_c2c0ccfc-8e83-4dbc-bafe-52f598f93184.5eaa35cce34bb0ba3c9d5617026a4181.jpeg',
      'https://i5.walmartimages.com/seo/Maybelline-Fit-Me-Matte-Poreless-Liquid-Foundation-Makeup-238-Rich-Tan-1-fl-oz_c2c0ccfc-8e83-4dbc-bafe-52f598f93184.5eaa35cce34bb0ba3c9d5617026a4181.jpeg'
    ],
    colors:[]
  },
  { id:'mk-4', name:'Makeup Brushes', price:1199, category:'makeup',
    sizes:['OS'],
    image:'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80',
    material:'Synthetic Bristle · 12 pcs Set',
    gallery:[
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80'
    ],
    colors:[]
  },
  { id:'mk-5', name:'Intense Kajal', price:349, category:'makeup',
    sizes:['OS'],
    image:'https://media6.ppl-media.com/tr:h-750,w-750,c-at_max,dpr-2,q-40/static/img/product/348562/insight-intense-kohl-kajal-0-35gm-14-15-15_1_display_1710743271_5262184c.jpg',
    material:'Kohl Formula · Smudge-Proof',
    gallery:[
      'https://media6.ppl-media.com/tr:h-750,w-750,c-at_max,dpr-2,q-40/static/img/product/348562/insight-intense-kohl-kajal-0-35gm-14-15-15_1_display_1710743271_5262184c.jpg',
      'https://media6.ppl-media.com/tr:h-750,w-750,c-at_max,dpr-2,q-40/static/img/product/348562/insight-intense-kohl-kajal-0-35gm-14-15-15_1_display_1710743271_5262184c.jpg'
    ],
    colors:[]
  },
  // ══ INDEX page cards (Edit + New In) ══
  { id:'edit-1', name:'Accessories', price:599, category:'accessories',
    sizes:['OS'], material:'Boiled Cashmere · Obsidian',
    image:'https://images.unsplash.com/photo-1723802205505-2f88b2227718?w=600&q=85',
    gallery:['https://images.unsplash.com/photo-1723802205505-2f88b2227718?w=600&q=85'],
    colors:[]
  },
  { id:'edit-2', name:'Heels', price:4299, category:'heels',
    sizes:['36','37','38','39','40','41'], material:'Canvas & Leather',
    image:'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&q=85',
    gallery:['https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&q=85'],
    colors:[]
  },
  { id:'edit-3', name:'The Lien Bag', price:5999, category:'bags',
    sizes:['OS'], material:'Pebbled Leather · Slate',
    image:'https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?w=600&q=80',
    gallery:['https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?w=600&q=80'],
    colors:[]
  },
  { id:'new-1', name:'Aviator Sunglasses', price:1299, category:'sunglasses',
    sizes:['OS'], material:'Metal Frame · Gold',
    image:'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=90',
    gallery:['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=90'],
    colors:[]
  },
  { id:'new-2', name:'Luxury Makeup', price:599, category:'makeup',
    sizes:['OS'], material:'Cream Formula',
    image:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=90',
    gallery:['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=90'],
    colors:[]
  },
  { id:'new-3', name:'Chelsea Boots', price:2499, category:'shoes',
    sizes:['36','37','38','39','40','41','42'], material:'Full-Grain Leather · Black',
    image:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=90',
    gallery:['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=90'],
    colors:[]
  },
  { id:'new-4', name:'Perfume', price:1799, category:'accessories',
    sizes:['50ml','100ml'], material:'Eau de Parfum',
    image:'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
    gallery:['https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg'],
    colors:[]
  },
  { id:'new-5', name:'Minimal Watch', price:8999, category:'watches',
    sizes:['OS'], material:'Stainless Steel',
    image:'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=90',
    gallery:['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=90'],
    colors:[]
  },
  { id:'new-6', name:'Saddle Bag Mini', price:3499, category:'bags',
    sizes:['OS'], material:'Pebbled Leather · Tan',
    image:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=90',
    gallery:['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=90'],
    colors:[]
  }
];

// ── COUPON CODES ───────────────────────────────────────────
var COUPONS = {
  'ELYRA10': { type:'percent', value:10,  label:'10% off' },
  'ELYRA20': { type:'percent', value:20,  label:'20% off' },
  'FLAT500': { type:'flat',    value:500, label:'Rs.500 off' },
  'NEWUSER': { type:'percent', value:15,  label:'15% off for new users' },
  'WELCOME': { type:'flat',    value:200, label:'Rs.200 off' }
};

// ── TOAST ──────────────────────────────────────────────────
var toastTimer;
function showToast(msg, type) {
  var t = document.getElementById('elyraToast');
  if (!t) { t = document.createElement('div'); t.id = 'elyraToast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = 'elyra-toast elyra-toast--' + (type || 'info') + ' elyra-toast--show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.classList.remove('elyra-toast--show'); }, 2600);
}

// ── CART BADGE ─────────────────────────────────────────────

function updateCartBadge() {
  var cart  = getCart();
  var total = cart.reduce(function(s,i){return s+i.qty;}, 0);
  $$('.nav__cart-badge, #cartBadge, .elyra-cart-badge').forEach(function(el){
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
  var hCount = document.querySelector('.cart-header__count');
  if (hCount) hCount.textContent = total + (total===1?' item':' items');
}


function updateWishBadge() {
  var w = getWish();
  $$('.elyra-wish-badge').forEach(function(el){
    el.textContent = w.length;
    el.style.display = w.length > 0 ? 'flex' : 'none';
  });
}

// ══════════════════════════════════════════════════════════
// FEATURE 1 — SAVE DELIVERY ADDRESS  (Promise-based)
// ══════════════════════════════════════════════════════════
//
// saveAddress(address)
//   → PENDING  : 1-second delay (button shows "Saving address…")
//   → FULFILLED: address is non-empty → saved to localStorage, resolve
//   → REJECTED : address is empty     → nothing saved, reject
//
function saveAddress(address) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (address.trim() !== '') {
        localStorage.setItem(
          'elyra_delivery_address',
           address.trim()
          );
        resolve('Address saved successfully!');
      } 
      else { 
        reject('Please enter your delivery address!');
      }
    }, 1000);
  });
}

// wireAddressPromise(checkoutCart, isBuyNow)
// Called by renderCartPage() after the checkout form is in the DOM.
// checkoutCart : the items to order (Buy Now item OR full cart)
// isBuyNow     : true = came via Buy Now (do NOT clear the shared cart)
function wireAddressPromise(checkoutCart, isBuyNow) {
  var btn    = document.getElementById('chkSubmit');
  var addrEl = document.getElementById('chkAddr');
  var errEl  = document.getElementById('chkErrors');
  if (!btn || !addrEl) return;

  // ── PREFILL from localStorage ─────────────────────────
  // If the customer saved an address in a previous session or order,
  // fill it in automatically. Only set if the saved value is non-empty
  // so we never overwrite a value the customer has already typed.
  var savedAddr = localStorage.getItem('elyra_delivery_address');
  if (savedAddr && savedAddr.trim() !== '' && addrEl.value.trim() === '') {
    addrEl.value = savedAddr.trim();
  }

  // Remove any previously attached listener by cloning the button
  var newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  btn = newBtn;

  btn.addEventListener('click', function() {
    // ── Validate the rest of the form first ──────────────
    var errors = [];
    var first = (document.getElementById('chkFirst') || {}).value || '';
    var last  = (document.getElementById('chkLast')  || {}).value || '';
    var email = (document.getElementById('chkEmail') || {}).value || '';
    var phone = (document.getElementById('chkPhone') || {}).value || '';
    var addr  = addrEl.value;

    if (!first.trim()) errors.push('First name is required.');
    if (!last.trim())  errors.push('Last name is required.');
    if (!email.trim() || !email.includes('@')) errors.push('Valid email is required.');
    if (!phone.trim()) errors.push('Phone number is required.');
    // NOTE: empty address is NOT added here — we let the Promise handle it
    // so all three Promise states are genuinely testable.

    if (errors.length) {
      errEl.innerHTML = errors.map(function(e){
        return '<p class="form-error">'+escHtml(e)+'</p>';
      }).join('');
      return;
    }

    // ── PENDING state ─────────────────────────────────────
    // Disable button and show "Saving…" to prevent double-clicks
    btn.disabled    = true;
    btn.textContent = 'Saving address…';
    btn.style.opacity = '0.7';
    if (errEl) errEl.innerHTML = '';

    // ── Fire the Promise ──────────────────────────────────
    saveAddress(addr)
      .then(function(successMsg) {
        // ── FULFILLED ─────────────────────────────────────
        // Address already saved to localStorage inside saveAddress().
        showToast(successMsg, 'success');

        // Small delay so the user sees the success toast first
        setTimeout(function() {
          // Use the items that were displayed in THIS checkout session.
          // For Buy Now: only the one selected product.
          // For normal cart: all items in the shared cart.
          var sub  = checkoutCart.reduce(function(s,i){ return s + i.price * i.qty; }, 0);
          var ship = sub >= 2000 ? 0 : 199;

          // Read any applied coupon discount that was set by the coupon handler
          var discountAmt = 0;
          var discountEl  = document.getElementById('discountAmt');
          if (discountAmt === 0 && discountEl && discountEl.textContent) {
            var dText = discountEl.textContent.replace(/[^0-9]/g,'');
            if (dText) discountAmt = parseInt(dText, 10) || 0;
          }

          var grand = sub - discountAmt + ship;

          // Calculate estimated delivery date (5 business days from today)
          var today    = new Date();
          var delivery = new Date(today);
          var added    = 0;
          while (added < 5) {
            delivery.setDate(delivery.getDate() + 1);
            var day = delivery.getDay();
            if (day !== 0 && day !== 6) added++; // skip Sundays (0) and Saturdays (6)
          }
          var deliveryStr = delivery.toLocaleDateString('en-IN', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
          });

          // Only clear the shared cart for normal cart checkout.
          // Buy Now uses a separate key (already consumed); shared cart unchanged.
          if (!isBuyNow) saveCart([]);
          updateCartBadge();

          var cartMain = document.querySelector('.cart-page');
          if (!cartMain) return;
          var hdr = cartMain.querySelector('.cart-header');
          cartMain.innerHTML = '';
          if (hdr) cartMain.appendChild(hdr);

          cartMain.insertAdjacentHTML('beforeend',
            '<div class="order-success">'
              + '<div class="order-success__icon">✓</div>'
              + '<h2 class="order-success__title">Order Confirmed!</h2>'
              + '<p class="order-success__msg">'
                  + 'Thank you, <strong>'+escHtml(first.trim())+'</strong>! '
                  + 'Your order has been placed successfully.'
                + '</p>'

              // Delivery address — clearly labelled, matches what was entered
              + '<div style="margin:18px 0;padding:16px 20px;background:rgba(184,147,90,.06);border:1px solid rgba(184,147,90,.25);border-radius:2px;text-align:left;max-width:460px;width:100%;">'
                + '<p style="font-size:0.62rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">Delivery Address</p>'
                + '<p style="font-size:0.85rem;color:var(--white);line-height:1.6;">'+escHtml(addr.trim())+'</p>'
                + '<p style="font-size:0.75rem;color:var(--grey);margin-top:6px;">'+escHtml(first.trim()+' '+last.trim())+'</p>'
                + '<p style="font-size:0.75rem;color:var(--grey);">'+escHtml(phone.trim())+'</p>'
              + '</div>'

              // Estimated delivery date
              + '<div style="margin-bottom:12px;padding:12px 20px;background:rgba(22,163,74,.06);border:1px solid rgba(22,163,74,.25);border-radius:2px;text-align:left;max-width:460px;width:100%;">'
                + '<p style="font-size:0.62rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:#4ade80;margin-bottom:4px;">Estimated Delivery</p>'
                + '<p style="font-size:0.88rem;color:var(--white);">'+escHtml(deliveryStr)+'</p>'
                + '<p style="font-size:0.72rem;color:var(--grey);margin-top:4px;">Free shipping included · Tracked dispatch within 24 hrs</p>'
              + '</div>'

              // Order total (real figure — includes discount & shipping)
              + '<p class="order-success__total">Order Total: ₹'+grand.toLocaleString('en-IN')+'</p>'

              // Delivery Promise reminder on the confirmation page
              + '<div style="margin-top:18px;padding:14px 18px;border:1px solid rgba(184,147,90,.2);border-radius:2px;text-align:left;max-width:460px;width:100%;">'
                + '<p style="font-size:0.62rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;">The ELYRA Promise</p>'
                + '<div style="display:flex;flex-direction:column;gap:8px;">'
                  + '<div style="display:flex;align-items:center;gap:10px;">'
                    + '<span style="color:var(--gold);font-size:1rem;">★</span>'
                    + '<span style="font-size:0.75rem;color:var(--grey);">Premium Quality — 12-point inspection on every item</span>'
                  + '</div>'
                  + '<div style="display:flex;align-items:center;gap:10px;">'
                    + '<span style="color:var(--gold);">🔒</span>'
                    + '<span style="font-size:0.75rem;color:var(--grey);">Secure Shopping — end-to-end encrypted checkout</span>'
                  + '</div>'
                  + '<div style="display:flex;align-items:center;gap:10px;">'
                    + '<span style="color:var(--gold);">📦</span>'
                    + '<span style="font-size:0.75rem;color:var(--grey);">Delivery Care — signature packaging, 15-day returns</span>'
                  + '</div>'
                + '</div>'
              + '</div>'

              + '<a href="index.html" class="btn btn--gold" style="margin-top:22px;">Continue Shopping</a>'
            + '</div>'
          );

          var hCountEl = document.querySelector('.cart-header__count');
          if (hCountEl) hCountEl.textContent = '0 items';
        }, 600);
      })
      .catch(function(errMsg) {
        // ── REJECTED ──────────────────────────────────────
        // Address was empty — show error message
        showToast(errMsg, 'error');
        if (errEl) {
          errEl.innerHTML = '<p class="form-error">'+escHtml(errMsg)+'</p>';
        }
        // Re-enable button so user can fix and retry
        btn.disabled    = false;
        btn.textContent = 'Place Order';
        btn.style.opacity = '1';
      });
  });
}

// ══════════════════════════════════════════════════════════
// FEATURE 2 — ADD TO CART  (Promise-based)
// ══════════════════════════════════════════════════════════
//
// The requirement spec names this function addToCart(), but that name
// is already used by the synchronous cart function above. So we name
// the Promise version addToCartP() — it works exactly the same way.
//
// addToCartP(productId, size, qty)
//   → PENDING  : 1 second delay simulates adding to server
//   → FULFILLED: product found in PRODUCTS array → resolve(product)
//   → REJECTED : product not found or missing    → reject(errorMsg)
//
// Beginner-friendly equivalent (matches the spec exactly):
//
//   function addToCart(product) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (product) { resolve(product); }
//         else         { reject("Unable to add product to cart!"); }
//       }, 1000);
//     });
//   }
//
function addToCartP(productId, size, qty) {
  return new Promise(function(resolve, reject) {
    // Look up the product — the 1 s delay represents a server round-trip
    setTimeout(function() {
      var product = PRODUCTS.find(function(p) { return p.id === productId; });
      if (product) {
        resolve(product);                         // FULFILLED
      } else {
        reject('Unable to add product to cart!'); // REJECTED
      }
    }, 1000);
  });
}

// handleAddToCartPromise(productId, size, qty, btnEl)
// Orchestrates all three states: Pending → Fulfilled / Rejected.
// Pass the clicked button element so its text and disabled state
// can be managed during the Pending phase.
function handleAddToCartPromise(productId, size, qty, btnEl) {
  var originalText = btnEl ? btnEl.textContent : '';

  // ── PENDING state ─────────────────────────────────────
  if (btnEl) {
    btnEl.disabled    = true;
    btnEl.textContent = 'Adding to cart…';
    btnEl.style.opacity = '0.7';
  }

  addToCartP(productId, size || 'OS', qty || 1)
    .then(function(product) {
      // ── FULFILLED ─────────────────────────────────────
      // Persist to cart using existing synchronous storage logic
      var selectedSize  = size || product.sizes[0];
      var selectedColor = '';
      var cart     = getCart();
      var existing = cart.find(function(i) {
        return i.id === product.id && i.size === selectedSize && i.color === selectedColor;
      });
      if (existing) {
        existing.qty += (qty || 1);
      } else {
        cart.push({
          id:       product.id,
          name:     product.name,
          price:    product.price,
          image:    product.image,
          size:     selectedSize,
          color:    selectedColor,
          qty:      qty || 1,
          material: product.material || ''
        });
      }
      saveCart(cart);
      updateCartBadge();
      showToast(product.name + ' added to bag!', 'success');
    })
    .catch(function(errMsg) {
      // ── REJECTED ──────────────────────────────────────
      showToast(errMsg, 'error');
      console.error('[ELYRA] addToCartP rejected:', errMsg);
    })
    .finally(function() {
      // Restore button regardless of outcome
      if (btnEl) {
        btnEl.disabled    = false;
        btnEl.textContent = originalText;
        btnEl.style.opacity = '1';
      }
    });
}

// ── ADD TO CART ────────────────────────────────────────────
function addToCart(productId, size, qty, color) {
  var product = PRODUCTS.find(function(p){return p.id===productId;});
  if (!product) { showToast('Product not found.','error'); return; }
  var selectedSize  = size  || product.sizes[0];
  var selectedColor = '';
  var cart     = getCart();
  var existing = cart.find(function(i){return i.id===productId && i.size===selectedSize && i.color===selectedColor;});
  if (existing) { existing.qty += (qty||1); }
  else {
    cart.push({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      image:    product.image,
      size:     selectedSize,
      color:    selectedColor,
      qty:      qty||1,
      material: product.material||''
    });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(product.name + ' added to bag','success');
}

function removeFromCart(productId, size, color) {
  var cart = getCart().filter(function(i){
    return !(i.id===productId && i.size===size && i.color===color);
  });
  saveCart(cart);
  updateCartBadge();
  if (typeof renderCartPage === 'function') renderCartPage();
}

function updateQty(productId, size, color, delta) {
  var cart = getCart();
  var item = cart.find(function(i){return i.id===productId && i.size===size && i.color===color;});
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
  updateCartBadge();
  if (typeof renderCartPage === 'function') renderCartPage();
}

// ── WISHLIST ───────────────────────────────────────────────
function toggleWishlist(productId) {
  var wish = getWish();
  var idx  = wish.indexOf(productId);
  if (idx === -1) { wish.push(productId); showToast('Added to wishlist','wish'); }
  else            { wish.splice(idx,1);   showToast('Removed from wishlist','info'); }
  saveWish(wish);
  updateWishBadge();
  syncWishButtons();
}
function isWishlisted(id){ return getWish().indexOf(id) !== -1; }
function syncWishButtons(){
  var wish = getWish();
  $$('[data-wish-id]').forEach(function(btn){
    var id = btn.getAttribute('data-wish-id');
    var active = wish.indexOf(id) !== -1;
    btn.classList.toggle('wishlisted', active);
    // Swap between outline heart (inactive) and solid heart (active)
    // ♡ = outline (U+2661)   ♥ = solid filled (U+2665)
    btn.textContent = active ? '♥' : '♡';
  });
}

// ── HELPERS ────────────────────────────────────────────────
function escHtml(str){
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function starString(n){
  var s='';
  for(var i=1;i<=5;i++) s+='<span class="star '+(i<=n?'star--on':'')+'">&#9733;</span>';
  return s;
}
function highlightStars(n, ctx){
  $$('.star-pick-btn',ctx).forEach(function(btn){
    btn.classList.toggle('active', +btn.dataset.star<=n);
  });
}

// ── PRODUCT MODAL (redirects to product page) ──────────────
function openModal(productId) {
  goToProduct(productId);
}
function closeModal(){
  var modal = document.getElementById('productModal');
  if(modal){ modal.setAttribute('hidden',''); modal.classList.remove('open'); }
  document.body.style.overflow='';
}

// ── SEARCH ────────────────────────────────────────────────
function openSearch(){
  var overlay=document.getElementById('searchOverlay');
  if(!overlay) return;
  overlay.removeAttribute('hidden'); overlay.classList.add('open');
  document.body.style.overflow='hidden';
  var inp=document.getElementById('searchInput');
  if(inp){ inp.value=''; inp.focus(); renderSearchResults(''); }
}
function closeSearch(){
  var overlay=document.getElementById('searchOverlay');
  if(!overlay) return;
  overlay.setAttribute('hidden',''); overlay.classList.remove('open');
  document.body.style.overflow='';
}
function renderSearchResults(query){
  var container=document.getElementById('searchResults');
  if(!container) return;
  query=query.trim().toLowerCase();
  if(!query){ container.innerHTML='<p class="search-hint">Start typing to search&hellip;</p>'; return; }
  var results=PRODUCTS.filter(function(p){
    return p.name.toLowerCase().indexOf(query)!==-1||p.category.toLowerCase().indexOf(query)!==-1||(p.material||'').toLowerCase().indexOf(query)!==-1;
  });
  var seen={}; results=results.filter(function(p){ if(seen[p.id]) return false; seen[p.id]=true; return true; });
  if(!results.length){ container.innerHTML='<p class="search-hint">No results for "'+escHtml(query)+'"</p>'; return; }
  container.innerHTML=results.slice(0,12).map(function(p){
    return '<div class="search-result" data-pid="'+p.id+'">'
      +'<img class="search-result__img" src="'+p.image+'" alt="'+escHtml(p.name)+'" loading="lazy"/>'
      +'<div class="search-result__info">'
        +'<p class="search-result__name">'+escHtml(p.name)+'</p>'
        +'<p class="search-result__cat">'+p.category+'</p>'
        +'<p class="search-result__price">Rs.'+p.price.toLocaleString('en-IN')+'</p>'
      +'</div>'
      +'<button class="search-result__add btn btn--gold" data-pid="'+p.id+'">View</button>'
    +'</div>';
  }).join('');
  $$('.search-result',container).forEach(function(el){
    el.addEventListener('click',function(e){
      if(e.target.classList.contains('search-result__add')){ closeSearch(); goToProduct(e.target.getAttribute('data-pid')); return; }
      var pid=el.getAttribute('data-pid'); closeSearch(); goToProduct(pid);
    });
  });
}

// ── FILTER + SORT ──────────────────────────────────────────
var activeFilter='all', activeSort='default';
function applyFilter(cat){ activeFilter=cat; $$('.elyra-filter-btn').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-filter')===cat);}); applyFilterAndSort(); }
function applySort(v){ activeSort=v; applyFilterAndSort(); }
function applyFilterAndSort(){
  var cards=$$('.shop-card[data-product-id], .new-card[data-product-id], .product-card[data-product-id]');
  cards.forEach(function(card){
    var cat=card.getAttribute('data-category')||'';
    card.style.display=(activeFilter==='all'||cat===activeFilter)?'':'none';
  });
  $$('.shop-grid').forEach(function(grid){
    var visible=$$('.shop-card',grid).filter(function(c){return c.style.display!=='none';});
    if(activeSort==='low-high')  visible.sort(function(a,b){return getPriceFromCard(a)-getPriceFromCard(b);});
    else if(activeSort==='high-low') visible.sort(function(a,b){return getPriceFromCard(b)-getPriceFromCard(a);});
    else if(activeSort==='name-az')  visible.sort(function(a,b){return getNameFromCard(a).localeCompare(getNameFromCard(b));});
    visible.forEach(function(card){grid.appendChild(card);});
  });
}
function getPriceFromCard(card){var pid=card.getAttribute('data-product-id');var p=PRODUCTS.find(function(x){return x.id===pid;});return p?p.price:0;}
function injectFilterBar(){
  // Skip on index.html — it has its own .all-products-filter-bar
  if(document.getElementById('allProductsFilterBar')) return;
  if(!document.querySelector('.shop-grid-section')&&!document.querySelector('.edit')) return;
  if(document.querySelector('.elyra-filter-bar')) return;
  if(!document.querySelector('.shop-grid-section')&&!document.querySelector('.edit')) return;
  if(document.querySelector('.elyra-filter-bar')) return;
  var bar=document.createElement('div');
  bar.className='elyra-filter-bar';
  var cats=[
    {val:'all',label:'All'},{val:'womenswear',label:'Womenswear'},{val:'menswear',label:'Menswear'},
    {val:'kidswear',label:'Kidswear'},{val:'bags',label:'Bags'},{val:'sunglasses',label:'Sunglasses'},
    {val:'makeup',label:'Makeup'},{val:'jewellery',label:'Jewellery'},{val:'accessories',label:'Accessories'},
    {val:'shoes',label:'Shoes'},{val:'watches',label:'Watches'},{val:'heels',label:'Heels'}
  ];
  bar.innerHTML='<div class="elyra-filter-pills">'
    +cats.map(function(c){return '<button class="elyra-filter-btn'+(c.val==='all'?' active':'')+'" data-filter="'+c.val+'">'+c.label+'</button>';}).join('')
    +'</div>'
    +'<div class="elyra-sort-wrap">'
      +'<label class="elyra-sort__label" for="elyraSort">Sort by</label>'
      +'<select class="elyra-sort__select form-input" id="elyraSort">'
        +'<option value="default">Featured</option>'
        +'<option value="low-high">Price: Low to High</option>'
        +'<option value="high-low">Price: High to Low</option>'
        +'<option value="name-az">Name: A-Z</option>'
      +'</select>'
    +'</div>';
  var ref=document.querySelector('.shop-grid-section')||document.querySelector('.new-in');
  if(ref) ref.parentNode.insertBefore(bar,ref);
  $$('.elyra-filter-btn',bar).forEach(function(btn){ btn.addEventListener('click',function(){applyFilter(this.getAttribute('data-filter'));}); });
  var sortEl=document.getElementById('elyraSort');
  if(sortEl) sortEl.addEventListener('change',function(){applySort(this.value);});
}

// ── DECORATE CARDS ────────────────────────────────────────
function decorateCards(){
  $$('.shop-card').forEach(function(card){
    if(card.getAttribute('data-product-id')) return;
    var nameEl=card.querySelector('.shop-card__name');
    var name=nameEl?nameEl.textContent.trim():'';
    var matched=PRODUCTS.find(function(p){return p.name.toLowerCase()===name.toLowerCase();});
    if(!matched) matched=PRODUCTS.find(function(p){return name.toLowerCase().indexOf(p.name.toLowerCase().split(' ')[0])!==-1||p.name.toLowerCase().indexOf(name.toLowerCase().split(' ')[0])!==-1;});
    if(matched){
      card.setAttribute('data-product-id',matched.id);
      card.setAttribute('data-category',matched.category);
      var btn=card.querySelector('.shop-card__btn');
      if(btn) btn.setAttribute('data-pid',matched.id);
      var wish=card.querySelector('.shop-card__wish');
      if(wish) wish.setAttribute('data-wish-id',matched.id);
    }
  });
  $$('.product-card').forEach(function(card){
    if(card.getAttribute('data-product-id')) return;
    var nameEl=card.querySelector('.product-card__name'); var name=nameEl?nameEl.textContent.trim():'';
    var matched=PRODUCTS.find(function(p){return p.name.toLowerCase()===name.toLowerCase();});
    if(matched){
      card.setAttribute('data-product-id',matched.id); card.setAttribute('data-category',matched.category);
      var btn=card.querySelector('.btn--cart'); if(btn) btn.setAttribute('data-pid',matched.id);
      var wish=card.querySelector('.product-card__wish'); if(wish) wish.setAttribute('data-wish-id',matched.id);
    }
  });
  var newIds=['new-1','new-2','new-3','new-4','new-5','new-6'];
  $$('.new-card').forEach(function(card,idx){
    if(card.getAttribute('data-product-id')) return;
    var id=newIds[idx]; var prod=PRODUCTS.find(function(p){return p.id===id;});
    if(prod){
      card.setAttribute('data-product-id',prod.id); card.setAttribute('data-category',prod.category);
      var btn=card.querySelector('.btn--cart'); if(btn) btn.setAttribute('data-pid',prod.id);
      var wish=card.querySelector('.new-card__wish'); if(wish) wish.setAttribute('data-wish-id',prod.id);
    }
  });
}

// ── GO TO PRODUCT PAGE ─────────────────────────────────────
function goToProduct(pid){
  window.location.href = 'product.html?id=' + pid;
}

// ── WIRE CARD BUTTONS ─────────────────────────────────────
function wireCardButtons(){
  document.addEventListener('click',function(e){
    var addBtn=e.target.closest('[data-pid]');
    if(addBtn&&(addBtn.classList.contains('shop-card__btn')||addBtn.classList.contains('btn--cart')||addBtn.classList.contains('btn--cart-sm'))){
      e.stopPropagation();
      goToProduct(addBtn.getAttribute('data-pid'));
      return;
    }
    var wishBtn=e.target.closest('[data-wish-id]');
    if(wishBtn&&(wishBtn.classList.contains('shop-card__wish')||wishBtn.classList.contains('new-card__wish')||wishBtn.classList.contains('product-card__wish'))){
      e.stopPropagation(); toggleWishlist(wishBtn.getAttribute('data-wish-id')); return;
    }
    var shopCard=e.target.closest('.shop-card');
    if(shopCard&&!e.target.closest('button')&&!e.target.closest('a')){
      var pid2=shopCard.getAttribute('data-product-id'); if(pid2) goToProduct(pid2); return;
    }
    var newCard=e.target.closest('.new-card');
    if(newCard&&!e.target.closest('button')&&!e.target.closest('a')){
      var pid3=newCard.getAttribute('data-product-id'); if(pid3) goToProduct(pid3); return;
    }
    var editCard=e.target.closest('.product-card');
    if(editCard&&!e.target.closest('button')&&!e.target.closest('a')){
      var pid4=editCard.getAttribute('data-product-id'); if(pid4) goToProduct(pid4); return;
    }
  });
}

// ── NAVBAR ENHANCEMENTS ────────────────────────────────────
function enhanceNavbar(){
  var actions=document.querySelector('.nav__actions');
  if(!actions) return;
  if(!document.getElementById('navSearch')){
    var sb=document.createElement('button');
    sb.className='nav__icon-btn'; sb.id='navSearch'; sb.setAttribute('aria-label','Search');
    sb.innerHTML='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
    actions.insertBefore(sb,actions.firstChild);
    sb.addEventListener('click',openSearch);
  }
  var cartLink=actions.querySelector('a[href="cart.html"]');
  if(cartLink&&!cartLink.querySelector('.elyra-cart-badge')){
    cartLink.style.position='relative';
    var badge=document.createElement('span'); badge.className='elyra-cart-badge nav__badge'; badge.style.display='none';
    cartLink.appendChild(badge);
  }
  var wishBtn=actions.querySelector('.nav__icon-btn[aria-label="Wishlist"]');
  if(wishBtn&&!wishBtn.querySelector('.elyra-wish-badge')){
    wishBtn.style.position='relative';
    var wb=document.createElement('span'); wb.className='elyra-wish-badge nav__badge'; wb.style.display='none'; wb.style.background='#e05555';
    wishBtn.appendChild(wb);
    wishBtn.addEventListener('click',openWishlistDrawer);
  }
}

// ── WISHLIST DRAWER ────────────────────────────────────────
function openWishlistDrawer(){
  var drawer=document.getElementById('wishDrawer'); if(!drawer) return;
  var wish=getWish();
  var products=wish.map(function(id){return PRODUCTS.find(function(p){return p.id===id;});}).filter(Boolean);
  var inner=drawer.querySelector('.wish-drawer__inner');
  if(!products.length){ inner.innerHTML='<p class="wish-empty">Your wishlist is empty.</p>'; }
  else{
    inner.innerHTML=products.map(function(p){
      return '<div class="wish-item" data-pid="'+p.id+'">'
        +'<img src="'+p.image+'" alt="'+escHtml(p.name)+'" class="wish-item__img"/>'
        +'<div class="wish-item__info"><p class="wish-item__name">'+escHtml(p.name)+'</p><p class="wish-item__price">Rs.'+p.price.toLocaleString('en-IN')+'</p></div>'
        +'<div class="wish-item__actions">'
          +'<button class="wish-item__cart btn btn--gold" data-pid="'+p.id+'">Add to Bag</button>'
          +'<button class="wish-item__remove" data-pid="'+p.id+'">x</button>'
        +'</div>'
      +'</div>';
    }).join('');
    $$('.wish-item__cart',inner).forEach(function(btn){btn.addEventListener('click',function(){addToCart(btn.getAttribute('data-pid'));});});
    $$('.wish-item__remove',inner).forEach(function(btn){btn.addEventListener('click',function(){toggleWishlist(btn.getAttribute('data-pid'));openWishlistDrawer();});});
  }
  drawer.removeAttribute('hidden'); drawer.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeWishlistDrawer(){
  var drawer=document.getElementById('wishDrawer');
  if(drawer){drawer.setAttribute('hidden','');drawer.classList.remove('open');}
  document.body.style.overflow='';
}

// ── INJECT OVERLAYS ────────────────────────────────────────
function injectOverlays(){
  if(!document.getElementById('searchOverlay')){
    var overlay=document.createElement('div');
    overlay.id='searchOverlay'; overlay.className='search-overlay'; overlay.setAttribute('hidden','');
    overlay.innerHTML='<div class="search-box"><div class="search-input-wrap">'
      +'<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
      +'<input type="text" id="searchInput" class="search-input" placeholder="Search products, categories..." autocomplete="off"/>'
      +'<button class="search-close" id="searchClose" aria-label="Close search">&times;</button>'
      +'</div><div id="searchResults" class="search-results"><p class="search-hint">Start typing to search...</p></div></div>';
    document.body.appendChild(overlay);
    document.getElementById('searchInput').addEventListener('input',function(){renderSearchResults(this.value);});
    document.getElementById('searchClose').addEventListener('click',closeSearch);
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeSearch();});
  }
  if(!document.getElementById('wishDrawer')){
    var drawer=document.createElement('div');
    drawer.id='wishDrawer'; drawer.className='wish-drawer'; drawer.setAttribute('hidden','');
    drawer.innerHTML='<div class="wish-drawer__panel"><div class="wish-drawer__header"><h2 class="wish-drawer__title">Wishlist</h2><button class="wish-drawer__close" id="wishDrawerClose">&times;</button></div><div class="wish-drawer__inner"></div></div>';
    document.body.appendChild(drawer);
    document.getElementById('wishDrawerClose').addEventListener('click',closeWishlistDrawer);
    drawer.addEventListener('click',function(e){if(e.target===drawer)closeWishlistDrawer();});
  }
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeSearch();closeWishlistDrawer();}});
}

// ── DYNAMIC PRODUCT GRID RENDERER ─────────────────────────
// Renders product cards from PRODUCTS array into a target container.
// containerEl  : the .shop-grid DOM element to render into
// filterCat    : 'all' or a category string e.g. 'womenswear'
// sortVal      : 'default' | 'low-high' | 'high-low' | 'name-az'
function renderProductGrid(containerEl, filterCat, sortVal) {
  if (!containerEl) return;
  filterCat = filterCat || 'all';
  sortVal   = sortVal   || 'default';

  // Filter
  // Exclude internal edit/new placeholder ids — keep real category products
  var excludeIds = ['edit-1','edit-2','edit-3','new-1','new-2','new-3','new-4','new-5','new-6'];
  var products = PRODUCTS.filter(function(p) {
    if (excludeIds.indexOf(p.id) !== -1) return false;
    return filterCat === 'all' || p.category === filterCat;
  });

  // Sort
  if (sortVal === 'low-high')  products.sort(function(a,b){ return a.price - b.price; });
  if (sortVal === 'high-low')  products.sort(function(a,b){ return b.price - a.price; });
  if (sortVal === 'name-az')   products.sort(function(a,b){ return a.name.localeCompare(b.name); });

  if (!products.length) {
    containerEl.innerHTML = '<p style="color:var(--grey);font-size:0.85rem;grid-column:1/-1;text-align:center;padding:48px 0;">No products found.</p>';
    return;
  }

  containerEl.innerHTML = products.map(function(p) {
    return '<div class="shop-card" data-product-id="'+p.id+'" data-category="'+p.category+'">'
      + '<div class="shop-card__img-wrap">'
        + '<img src="'+escHtml(p.image)+'" alt="'+escHtml(p.name)+'" loading="lazy" '
          + 'onerror="this.onerror=null;this.src=\'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=70\'" />'
        + '<button class="shop-card__wish" data-wish-id="'+p.id+'" aria-label="Wishlist">♡</button>'
      + '</div>'
      + '<div class="shop-card__body">'
        + '<p class="shop-card__name">'+escHtml(p.name)+'</p>'
        + '<p class="shop-card__price">₹'+p.price.toLocaleString('en-IN')
          + (p.material ? ' · '+escHtml(p.material) : '')+'</p>'
        + '<button class="shop-card__btn" data-pid="'+p.id+'">View Product</button>'
      + '</div>'
    + '</div>';
  }).join('');

  // Wire buttons on the freshly rendered cards
  containerEl.querySelectorAll('.shop-card__btn[data-pid]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      goToProduct(btn.getAttribute('data-pid'));
    });
  });
  containerEl.querySelectorAll('.shop-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.closest('button')) return;
      var pid = card.getAttribute('data-product-id');
      if (pid) goToProduct(pid);
    });
  });
  containerEl.querySelectorAll('.shop-card__wish[data-wish-id]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleWishlist(btn.getAttribute('data-wish-id'));
    });
  });
  syncWishButtons();
}

// ── CATEGORY PAGE BOOTSTRAPPER ─────────────────────────────
// Call this on any dedicated category page. Pass the initial category
// (or 'all') and the page will wire up filter pills + sort.
function initCategoryPage(initialCat) {
  var grid      = document.getElementById('dynProductGrid');
  var countEl   = document.getElementById('dynProductCount');
  var sortEl    = document.getElementById('dynSort');
  var filterBar = document.getElementById('dynFilterBar');

  if (!grid) return;

  var currentCat  = initialCat || 'all';
  var currentSort = 'default';

  function redraw() {
    renderProductGrid(grid, currentCat, currentSort);
    // Update count label
    var excludeIds = ['edit-1','edit-2','edit-3','new-1','new-2','new-3','new-4','new-5','new-6'];
    var count = PRODUCTS.filter(function(p) {
      if (excludeIds.indexOf(p.id) !== -1) return false;
      return currentCat === 'all' || p.category === currentCat;
    }).length;
    if (countEl) countEl.textContent = count + (count === 1 ? ' product' : ' products');
  }

  // Filter pill clicks
  if (filterBar) {
    filterBar.querySelectorAll('.dyn-filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBar.querySelectorAll('.dyn-filter-btn').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        currentCat = btn.getAttribute('data-cat');
        redraw();
      });
    });
  }

  // Sort change
  if (sortEl) {
    sortEl.addEventListener('change', function() {
      currentSort = sortEl.value;
      redraw();
    });
  }

  redraw();
}

// ── CART PAGE RENDERER ────────────────────────────────────
function renderCartPage() {
  // ── Buy Now flow: use single-item cart, then clear the key ──
  // If the customer came via Buy Now, show only that item.
  // Normal cart checkout (all items) is used when this key is absent.
  var buyNowRaw = localStorage.getItem(BUY_NOW_KEY);
  var isBuyNow  = false;
  var cart;
  if (buyNowRaw) {
    try {
      var buyNowItem = JSON.parse(buyNowRaw);
      if (buyNowItem && buyNowItem.id) {
        cart      = [buyNowItem];
        isBuyNow  = true;
        localStorage.removeItem(BUY_NOW_KEY); // consume immediately — no double-order
      }
    } catch(e) {
      localStorage.removeItem(BUY_NOW_KEY);
    }
  }
  if (!cart) cart = getCart();  // normal cart flow
  var cartPage    = document.querySelector('.cart-page');
  if (!cartPage) return;

  // Always sync the header count element
  var countEl = cartPage.querySelector('.cart-header__count');
  var total   = cart.reduce(function(s, i) { return s + i.qty; }, 0);
  if (countEl) countEl.textContent = total + (total === 1 ? ' item' : ' items');

  // Also sync nav badges
  updateCartBadge();

  var emptyEl = cartPage.querySelector('.cart-empty');

  // Remove previously rendered sections so we can re-render
  var oldItems   = cartPage.querySelector('.cart-items-section');
  var oldSummary = cartPage.querySelector('.cart-summary-section');
  if (oldItems)   oldItems.remove();
  if (oldSummary) oldSummary.remove();

  if (!cart.length) {
    if (emptyEl) emptyEl.style.display = '';
    return;
  }

  // Hide empty state
  if (emptyEl) emptyEl.style.display = 'none';

  // ── Build items HTML ──
  var itemsHtml = '<section class="cart-items-section">'
    + '<h2 class="cart-section__title">Items in Your Bag</h2>'
    + '<div class="cart-items-list">'
    + cart.map(function(item) {
        return '<div class="cart-item" data-id="'+escHtml(item.id)+'" data-size="'+escHtml(item.size)+'" data-color="'+escHtml(item.color||'')+'">'
          + '<div class="cart-item__img-wrap"><img class="cart-item__img" src="'+escHtml(item.image)+'" alt="'+escHtml(item.name)+'"/></div>'
          + '<div class="cart-item__details">'
            + '<p class="cart-item__name">'+escHtml(item.name)+'</p>'
            + '<p class="cart-item__meta">Size: <strong>'+escHtml(item.size)+'</strong>'+(item.material ? ' &nbsp;·&nbsp; '+escHtml(item.material) : '')+'</p>'
            + '<div class="cart-item__qty-row">'
              + '<button class="cart-qty-btn cart-qty-minus" aria-label="Decrease">−</button>'
              + '<span class="cart-qty-val">'+item.qty+'</span>'
              + '<button class="cart-qty-btn cart-qty-plus" aria-label="Increase">+</button>'
            + '</div>'
          + '</div>'
          + '<div class="cart-item__right">'
            + '<span class="cart-item__price">₹'+((item.price * item.qty)).toLocaleString('en-IN')+'</span>'
            + '<span class="cart-item__unit">₹'+item.price.toLocaleString('en-IN')+' each</span>'
            + '<button class="cart-item__remove">Remove</button>'
          + '</div>'
        + '</div>';
      }).join('')
    + '</div>'
  + '</section>';

  // ── Build summary HTML ──
  var subtotal  = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
  var shipping  = subtotal >= 2000 ? 0 : 199;
  var discount  = 0;
  var appliedCoupon = '';

  var summaryHtml = '<section class="cart-summary-section">'
    + '<h2 class="cart-section__title">Order Summary</h2>'
    + '<div class="cart-summary">'

    + '<div class="cart-coupon">'
      + '<div class="cart-coupon__row">'
        + '<input class="form-input" id="couponInput" placeholder="COUPON CODE" style="text-transform:uppercase;letter-spacing:0.06em;" />'
        + '<button class="btn btn--outline" id="couponApply">Apply</button>'
      + '</div>'
      + '<p class="cart-coupon__hint" id="couponHint">Try: ELYRA10 · ELYRA20 · FLAT500 · NEWUSER</p>'
      + '<p class="cart-coupon__applied" id="couponApplied" style="display:none;"></p>'
    + '</div>'

    + '<div class="cart-totals" id="cartTotals">'
      + '<div class="cart-totals__row"><span>Subtotal</span><span>₹'+subtotal.toLocaleString('en-IN')+'</span></div>'
      + '<div class="cart-totals__row cart-totals__row--discount" id="discountRow" style="display:none;"><span>Discount</span><span id="discountAmt">−₹0</span></div>'
      + '<div class="cart-totals__row"><span>Shipping</span><span>'+(shipping===0?'<span class="free-ship">Free</span>':'₹'+shipping)+'</span></div>'
      + '<div class="cart-totals__row cart-totals__row--total"><span>Total</span><span id="grandTotal">₹'+(subtotal+shipping).toLocaleString('en-IN')+'</span></div>'
    + '</div>'

    + '<div class="cart-checkout">'
      + '<h3 class="cart-checkout__title">Delivery Details</h3>'
      + '<div class="contact-form">'
        + '<div class="form-row">'
          + '<div class="form-group"><label class="form-label">First Name</label><input class="form-input" id="chkFirst" placeholder="Ayesha" /></div>'
          + '<div class="form-group"><label class="form-label">Last Name</label><input class="form-input" id="chkLast" placeholder="Khan" /></div>'
        + '</div>'
        + '<div class="form-group"><label class="form-label">Email</label><input class="form-input" id="chkEmail" type="email" placeholder="you@example.com" /></div>'
        + '<div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="chkPhone" type="tel" placeholder="+91 98765 43210" /></div>'
        + '<div class="form-group"><label class="form-label">Address</label><input class="form-input" id="chkAddr" placeholder="Street, City, PIN" /></div>'
        + '<div class="cart-form-errors" id="chkErrors"></div>'
        + '<button class="btn btn--gold btn--full" id="chkSubmit" style="margin-top:8px;">Place Order</button>'
      + '</div>'
    + '</div>'

  + '</div></section>';

  cartPage.insertAdjacentHTML('beforeend', itemsHtml + summaryHtml);

  // ── Wire qty & remove buttons ──
  cartPage.querySelectorAll('.cart-item').forEach(function(row) {
    var id    = row.getAttribute('data-id');
    var size  = row.getAttribute('data-size');
    var color = row.getAttribute('data-color');

    row.querySelector('.cart-qty-minus').addEventListener('click', function() {
      updateQty(id, size, color, -1);
      renderCartPage();
    });
    row.querySelector('.cart-qty-plus').addEventListener('click', function() {
      updateQty(id, size, color, 1);
      renderCartPage();
    });
    row.querySelector('.cart-item__remove').addEventListener('click', function() {
      removeFromCart(id, size, color);
      renderCartPage();
    });
  });

  // ── Coupon ──
  var couponInput = document.getElementById('couponInput');
  var couponApply = document.getElementById('couponApply');
  if (couponApply) {
    couponApply.addEventListener('click', function() {
      var code = couponInput.value.trim().toUpperCase();
      var coupon = COUPONS[code];
      var hintEl    = document.getElementById('couponHint');
      var appliedEl = document.getElementById('couponApplied');
      if (!coupon) {
        showToast('Invalid coupon code.', 'error');
        return;
      }
      var sub = cart.reduce(function(s,i){return s+i.price*i.qty;},0);
      discount = coupon.type === 'percent'
        ? Math.round(sub * coupon.value / 100)
        : Math.min(coupon.value, sub);
      appliedCoupon = code;
      var ship = (sub - discount) >= 2000 ? 0 : 199;
      var grand = sub - discount + ship;

      document.getElementById('discountRow').style.display = '';
      document.getElementById('discountAmt').textContent   = '−₹' + discount.toLocaleString('en-IN');
      document.getElementById('grandTotal').textContent    = '₹' + grand.toLocaleString('en-IN');
      if (hintEl)    hintEl.style.display    = 'none';
      if (appliedEl) { appliedEl.style.display = ''; appliedEl.textContent = '✓ ' + coupon.label + ' applied!'; }
      showToast(coupon.label + ' applied!', 'success');
    });
  }

  // ── Checkout — wired via Promise (see wireAddressPromise above) ──
  wireAddressPromise(cart, isBuyNow);
}

// ── ALL PRODUCTS SECTION (index.html) ─────────────────────
// Drives the #all-products section: filter pills + sort + dynamic grid
function initAllProductsSection() {
  var grid     = document.getElementById('allProductsGrid');
  var countEl  = document.getElementById('allProductCount');
  var sortEl   = document.getElementById('allProductsSort');
  var pillsEl  = document.getElementById('allProductsPills');

  if (!grid) return;

  // IDs that are "display-only" duplicates in The Edit / New In — exclude them
  var EXCLUDE = ['edit-1','edit-2','edit-3','new-1','new-2','new-3','new-4','new-5','new-6'];

  var currentCat  = 'all';
  var currentSort = 'default';

  function getFiltered() {
    return PRODUCTS.filter(function(p) {
      if (EXCLUDE.indexOf(p.id) !== -1) return false;
      return currentCat === 'all' || p.category === currentCat;
    });
  }

  function getSorted(list) {
    var arr = list.slice();
    if (currentSort === 'low-high')  arr.sort(function(a,b){ return a.price - b.price; });
    if (currentSort === 'high-low')  arr.sort(function(a,b){ return b.price - a.price; });
    if (currentSort === 'name-az')   arr.sort(function(a,b){ return a.name.localeCompare(b.name); });
    return arr;
  }

  function redraw() {
    var products = getSorted(getFiltered());

    // Update count label
    if (countEl) {
      countEl.textContent = products.length + (products.length === 1 ? ' product' : ' products');
    }

    if (!products.length) {
      grid.innerHTML = '<p class="ap-no-results">No products found in this category.</p>';
      return;
    }

    grid.innerHTML = products.map(function(p) {
      return '<div class="shop-card" data-product-id="'+p.id+'" data-category="'+p.category+'" style="cursor:pointer;">'
        + '<div class="shop-card__img-wrap">'
          + '<img src="'+escHtml(p.image)+'" alt="'+escHtml(p.name)+'" loading="lazy"'
            + ' onerror="this.onerror=null;this.src=\'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=70\'"/>'
          + '<button class="shop-card__wish" data-wish-id="'+p.id+'" aria-label="Wishlist">♡</button>'
        + '</div>'
        + '<div class="shop-card__body">'
          + '<p class="shop-card__name">'+escHtml(p.name)+'</p>'
          + '<p class="shop-card__price">₹'+p.price.toLocaleString('en-IN')
            + (p.material ? ' · '+escHtml(p.material) : '')+'</p>'
          + '<button class="shop-card__btn" data-pid="'+p.id+'">View Product</button>'
        + '</div>'
      + '</div>';
    }).join('');

    // Wire View Product buttons
    grid.querySelectorAll('.shop-card__btn[data-pid]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        goToProduct(btn.getAttribute('data-pid'));
      });
    });
    // Wire card click
    grid.querySelectorAll('.shop-card').forEach(function(card) {
      card.addEventListener('click', function(e) {
        if (e.target.closest('button')) return;
        var pid = card.getAttribute('data-product-id');
        if (pid) goToProduct(pid);
      });
    });
    // Wire wishlist buttons
    grid.querySelectorAll('.shop-card__wish[data-wish-id]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleWishlist(btn.getAttribute('data-wish-id'));
      });
    });
    syncWishButtons();
  }

  // Wire filter pills
  if (pillsEl) {
    pillsEl.querySelectorAll('.ap-filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        pillsEl.querySelectorAll('.ap-filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentCat = btn.getAttribute('data-cat');
        redraw();
      });
    });
  }

  // Wire sort select
  if (sortEl) {
    sortEl.addEventListener('change', function() {
      currentSort = sortEl.value;
      redraw();
    });
  }

  // Initial render
  redraw();
}

// ── loadProducts() — Promise-based data loader ────────────
// Returns a Promise that resolves with the PRODUCTS array.
// Uses a real Promise (not a fake delay) so it works even when
// called before DOMContentLoaded finishes.
function loadProducts() {
  return new Promise(function(resolve, reject) {
    try {
      if (!window.PRODUCTS || !Array.isArray(window.PRODUCTS) || window.PRODUCTS.length === 0) {
        reject(new Error('PRODUCTS data is empty or missing.'));
        return;
      }
      resolve(window.PRODUCTS);
    } catch(err) {
      reject(err);
    }
  });
}

// ── BOOTSTRAP ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  var loader = document.getElementById('loader');

  // Helper — dismiss the loader (used in multiple places)
  function dismissLoader() {
    if (loader && !loader.classList.contains('done')) {
      loader.classList.add('done');
    }
  }

  // ── 1. DISMISS LOADER via Promise ──────────────────────
  // loadProducts() is Promise-based:
  //   Pending  → loader stays visible while data initialises
  //   Fulfilled→ schedule loader dismissal after gold-bar animation (2.6s)
  //   Rejected → show brief error toast, then dismiss loader anyway
  // A hard 5-second safety timeout ensures the loader is ALWAYS dismissed
  // even if an unexpected error prevents the Promise from settling.
  var loaderSafetyTimer = setTimeout(function() {
    dismissLoader(); // absolute last resort — loader never hangs > 5s
  }, 5000);

  loadProducts()
    .then(function(products) {
      // Promise fulfilled — products loaded OK.
      // Wait for the gold fill animation (2.6s + 0.2s buffer) then dismiss.
      setTimeout(dismissLoader, 2800);
    })
    .catch(function(err) {
      // Promise rejected — data unavailable.
      console.error('[ELYRA] Product data error:', err.message);
      showToast('Could not load products. Please refresh.', 'error');
      dismissLoader(); // dismiss immediately so the rest of the site is usable
    })
    .finally(function() {
      clearTimeout(loaderSafetyTimer); // safety timer no longer needed
    });

  // ── 2. THEME ──────────────────────────────────────────
  // CSS uses body.light-mode — apply immediately on load
  var savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light-mode') document.body.classList.add('light-mode');

  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light-mode' : 'dark');
    });
  }

  // ── 3. NAVBAR / OVERLAYS / CARDS ──────────────────────
  injectOverlays();
  enhanceNavbar();
  decorateCards();
  wireCardButtons();
  injectFilterBar();
  updateCartBadge();
  updateWishBadge();
  syncWishButtons();

  // ── 3b. CART PAGE ──────────────────────────────────────
  if (document.querySelector('.cart-page')) {
    renderCartPage();
  }

  // ── 3c. ALL PRODUCTS dynamic section (index.html) ─────
  if (document.getElementById('allProductsGrid')) {
    initAllProductsSection();
  }

  // ── 4. AUTH STATE ──────────────────────────────────────
  var userName = localStorage.getItem(USER_KEY);
  var profileEl = document.getElementById('navProfile');
  var signInEl  = document.getElementById('navSignIn');
  if (userName) {
    if (profileEl) {
      profileEl.style.display = 'flex';
      var avatarEl = document.getElementById('navProfileAvatar');
      var nameEl   = document.getElementById('navProfileName');
      if (avatarEl) avatarEl.textContent = userName.charAt(0).toUpperCase();
      if (nameEl)   nameEl.textContent   = userName;
    }
    if (signInEl) signInEl.style.display = 'none';
  } else {
    if (profileEl) profileEl.style.display = 'none';
    if (signInEl)  signInEl.style.display  = '';
  }

  // ── 5. HERO SLIDER ─────────────────────────────────────
  var slides     = Array.from(document.querySelectorAll('.slide'));
  var dots       = Array.from(document.querySelectorAll('.slider-dot'));
  var prevBtn    = document.getElementById('sliderPrev');
  var nextBtn    = document.getElementById('sliderNext');
  var current    = 0;
  var sliderInterval;

  function goToSlide(n) {
    slides.forEach(function (s, i) { s.classList.toggle('active', i === n); });
    dots.forEach(function (d, i)   { d.classList.toggle('active', i === n); });
    current = n;
  }

  if (slides.length) {
    goToSlide(0);
    sliderInterval = setInterval(function () {
      goToSlide((current + 1) % slides.length);
    }, 5000);

    if (prevBtn) prevBtn.addEventListener('click', function () {
      clearInterval(sliderInterval);
      goToSlide((current - 1 + slides.length) % slides.length);
      sliderInterval = setInterval(function () { goToSlide((current + 1) % slides.length); }, 5000);
    });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      clearInterval(sliderInterval);
      goToSlide((current + 1) % slides.length);
      sliderInterval = setInterval(function () { goToSlide((current + 1) % slides.length); }, 5000);
    });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () {
        clearInterval(sliderInterval);
        goToSlide(i);
        sliderInterval = setInterval(function () { goToSlide((current + 1) % slides.length); }, 5000);
      });
    });
  }

  // ── 6. SCROLL ANIMATIONS ───────────────────────────────
  var scrollEls = Array.from(document.querySelectorAll('.scroll-animate'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    scrollEls.forEach(function (el) { io.observe(el); });
  } else {
    scrollEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // ── 7. SCROLL PROGRESS + BACK-TO-TOP ──────────────────
  var progressBar = document.getElementById('scrollProgress');
  var topBtn      = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (progressBar) progressBar.style.width = (scrolled * 100) + '%';
    if (topBtn) topBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  if (topBtn) topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // ── 8. NAVBAR SCROLL HIDE/SHOW ─────────────────────────
  var navEl    = document.getElementById('nav');
  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    if (!navEl) return;
    var y = window.scrollY;
    navEl.classList.toggle('nav--scrolled', y > 60);
    navEl.classList.toggle('nav--hidden', y > lastScroll && y > 200);
    lastScroll = y;
  }, { passive: true });

  // ── 9. HAMBURGER ───────────────────────────────────────
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }

});
