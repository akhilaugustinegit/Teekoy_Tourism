const fs = require('fs');

const pages = [
  {
    file: 'tourist-places-near-teekoy.html',
    title: 'Top Tourist Places Near Teekoy | Complete Guide',
    desc: 'Explore the best tourist places near Teekoy. Find hidden gems, viewpoints, and nature spots in the gateway to Vagamon.',
    h1: 'Tourist Places Near Teekoy',
    heroP: 'Your ultimate guide to exploring the hidden gems and top attractions around Teekoy.',
    canonical: 'https://www.teekoytourism.com/tourist-places-near-teekoy.html'
  },
  {
    file: 'waterfalls-near-teekoy.html',
    title: 'Beautiful Waterfalls Near Teekoy & Kottayam',
    desc: 'Discover stunning waterfalls near Teekoy, Kottayam. Guide to Marmala, Kattikayam, Kadavupuzha and more pristine nature spots.',
    h1: 'Waterfalls Near Teekoy',
    heroP: 'Immerse yourself in the beauty of cascading waters hidden deep in the lush tropical forests of Kottayam.',
    canonical: 'https://www.teekoytourism.com/waterfalls-near-teekoy.html'
  },
  {
    file: 'places-near-vagamon.html',
    title: 'Best Places to Visit Near Vagamon | Tourist Guide',
    desc: 'Planning a trip to Vagamon? Discover the best places to visit near Vagamon, from rolling meadows and pine forests to majestic viewpoints.',
    h1: 'Places Near Vagamon',
    heroP: 'Explore the breathtaking landscapes, pine forests, and rolling meadows that make Vagamon a premier hill station.',
    canonical: 'https://www.teekoytourism.com/places-near-vagamon.html'
  },
  {
    file: 'places-near-pala.html',
    title: 'Tourist Places Near Pala | One-Day Trip Guide',
    desc: 'Looking for a one-day trip near Pala? Discover the best tourist places near Pala including Ilaveezhapoonchira, Teekoy, and Marmala.',
    h1: 'Tourist Places Near Pala',
    heroP: 'Discover the perfect spots for a weekend getaway or a one-day trip near Pala.',
    canonical: 'https://www.teekoytourism.com/places-near-pala.html'
  },
  {
    file: 'illikkal-kallu.html',
    title: 'Illikkal Kallu | Tourist Attractions Near Teekoy',
    desc: 'Visit Illikkal Kallu, the majestic rock formation near Teekoy offering panoramic views. Get directions, timings, and travel tips.',
    h1: 'Illikkal Kallu',
    heroP: 'A majestic and unique rock formation atop a lush green mountain, offering epic panoramic views of the landscape.',
    canonical: 'https://www.teekoytourism.com/illikkal-kallu.html'
  }
];

let template = fs.readFileSync('index.html', 'utf8');

pages.forEach(page => {
  let content = template;
  
  // Replace Title
  content = content.replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`);
  
  // Replace Meta Description
  content = content.replace(/<meta name="description"[\s\S]*?content=".*?">/s, `<meta name="description" content="${page.desc}">`);
  
  // Replace Canonical
  content = content.replace(/<link rel="canonical" href=".*?">/s, `<link rel="canonical" href="${page.canonical}">`);
  
  // Replace OG and Twitter
  content = content.replace(/<meta property="og:title" content=".*?">/s, `<meta property="og:title" content="${page.title}">`);
  content = content.replace(/<meta property="og:description" content=".*?">/s, `<meta property="og:description" content="${page.desc}">`);
  content = content.replace(/<meta property="og:url" content=".*?">/s, `<meta property="og:url" content="${page.canonical}">`);
  
  content = content.replace(/<meta name="twitter:title" content=".*?">/s, `<meta name="twitter:title" content="${page.title}">`);
  content = content.replace(/<meta name="twitter:description" content=".*?">/s, `<meta name="twitter:description" content="${page.desc}">`);
  
  // Replace H1
  content = content.replace(/<h1>.*?<\/h1>/s, `<h1>${page.h1}</h1>`);
  
  // Replace Hero P
  content = content.replace(/<p>The enchanting gateway to the lush green hills of Vagamon\.<\/p>/s, `<p>${page.heroP}</p>`);
  
  fs.writeFileSync(page.file, content);
  console.log(`Generated ${page.file}`);
});
