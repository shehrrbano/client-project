const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

dotenv.config();

const UNSPLASH = 'https://images.unsplash.com';

const products = [
    { name: 'Classic Smash Burger', description: 'Double smashed beef patties with melted cheddar, caramelised onions, pickles, and our signature Ember sauce on a toasted brioche bun.', price: 8.99, category: 'burgers', image: `${UNSPLASH}/photo-1568901346375-23c9450c58cd?w=800&q=80`, featured: true, preparationTime: 12 },
    { name: 'Smoky BBQ Bacon Burger', description: 'Chargrilled beef patty topped with crispy streaky bacon, smoked Gouda, BBQ glaze, lettuce, and tomato.', price: 10.49, category: 'burgers', image: `${UNSPLASH}/photo-1553979459-d2229ba7433b?w=800&q=80`, featured: true, preparationTime: 14 },
    { name: 'Spicy Chicken Burger', description: 'Crispy buttermilk chicken fillet with sriracha mayo, jalapeños, slaw, and crunchy lettuce.', price: 9.49, category: 'burgers', image: `${UNSPLASH}/photo-1525164286253-04e68b9d94c6?w=800&q=80`, featured: false, preparationTime: 13 },
    { name: 'Mushroom Swiss Burger', description: 'Juicy beef patty topped with sautéed mushrooms, melted Swiss cheese, garlic aioli, and fresh rocket.', price: 9.99, category: 'burgers', image: `${UNSPLASH}/photo-1572802419224-296b0aeee0d9?w=800&q=80`, featured: false, preparationTime: 13 },
    { name: 'Double Trouble Burger', description: 'Two flame-grilled beef patties stacked with American cheese, ketchup, mustard, and dill pickles in a sesame bun.', price: 11.49, category: 'burgers', image: `${UNSPLASH}/photo-1586190848861-99aa4a171e90?w=800&q=80`, featured: false, preparationTime: 14 },
    { name: 'Flame-Grilled Chicken Platter', description: 'Half chicken marinated in our secret herb blend, flame-grilled to perfection. Served with seasoned rice and grilled vegetables.', price: 13.99, category: 'grilled', image: `${UNSPLASH}/photo-1532550907401-a500c9a57435?w=800&q=80`, featured: true, preparationTime: 20 },
    { name: 'Mixed Grill Feast', description: 'A generous selection of grilled lamb chops, chicken skewers, beef kofta, and spicy sausage with flatbread and hummus.', price: 18.99, category: 'grilled', image: `${UNSPLASH}/photo-1555939594-58d7cb561ad1?w=800&q=80`, featured: true, preparationTime: 25 },
    { name: 'Grilled Lamb Skewers', description: 'Tender lamb pieces marinated in Middle Eastern spices, chargrilled on skewers with peppers and onions.', price: 14.49, category: 'grilled', image: `${UNSPLASH}/photo-1603360946369-dc9bb6258143?w=800&q=80`, featured: false, preparationTime: 18 },
    { name: 'Peri-Peri Chicken Wings', description: '8 jumbo chicken wings tossed in fiery peri-peri sauce, served with blue cheese dip and celery sticks.', price: 9.99, category: 'grilled', image: `${UNSPLASH}/photo-1527477396000-e27163b4bdb1?w=800&q=80`, featured: false, preparationTime: 15 },
    { name: 'Grilled Ribeye Steak', description: '10oz aged ribeye steak grilled to your liking, served with peppercorn sauce, chips, and grilled tomato.', price: 21.99, category: 'grilled', image: `${UNSPLASH}/photo-1600891964092-4316c288032e?w=800&q=80`, featured: true, preparationTime: 22 },
    { name: 'Chicken Shawarma Wrap', description: 'Spiced chicken shawarma with garlic sauce, pickled turnips, fresh salad, and crispy fries wrapped in warm flatbread.', price: 8.49, category: 'wraps', image: `${UNSPLASH}/photo-1626700051175-6818013e1d4f?w=800&q=80`, featured: true, preparationTime: 10 },
    { name: 'Grilled Halloumi Wrap', description: 'Chargrilled halloumi cheese with roasted peppers, rocket, sundried tomatoes, and balsamic glaze.', price: 7.99, category: 'wraps', image: `${UNSPLASH}/photo-1600367163720-7d1c1a7b0cf2?w=800&q=80`, featured: false, preparationTime: 10 },
    { name: 'Beef Kofta Wrap', description: 'Seasoned beef kofta with tahini sauce, fresh parsley, tomato, and onion in a toasted tortilla.', price: 8.99, category: 'wraps', image: `${UNSPLASH}/photo-1561758033-d89a9ad46330?w=800&q=80`, featured: false, preparationTime: 12 },
    { name: 'Falafel Wrap', description: 'Crispy homemade falafel with tahini, pickles, tomato, and shredded lettuce in a warm pita.', price: 7.49, category: 'wraps', image: `${UNSPLASH}/photo-1529006557810-274b9b2fc783?w=800&q=80`, featured: false, preparationTime: 10 },
    { name: 'Loaded Fries', description: 'Crispy seasoned fries smothered in melted cheese, jalapeños, crispy bacon bits, and sour cream.', price: 5.99, category: 'sides', image: `${UNSPLASH}/photo-1573080496219-bb080dd4f877?w=800&q=80`, featured: false, preparationTime: 8 },
    { name: 'Onion Rings', description: 'Thick-cut beer-battered onion rings served golden and crispy with chipotle mayo.', price: 4.49, category: 'sides', image: `${UNSPLASH}/photo-1639024471283-03518883512d?w=800&q=80`, featured: false, preparationTime: 7 },
    { name: 'Coleslaw', description: 'Fresh homemade creamy coleslaw with shredded cabbage, carrot, and a tangy dressing.', price: 2.99, category: 'sides', image: `${UNSPLASH}/photo-1625938145744-e380515399bf?w=800&q=80`, featured: false, preparationTime: 2 },
    { name: 'Sweet Potato Fries', description: 'Crispy sweet potato fries seasoned with paprika and sea salt, served with garlic mayo.', price: 4.99, category: 'sides', image: `${UNSPLASH}/photo-1635269781330-fe0e0a86e68e?w=800&q=80`, featured: false, preparationTime: 8 },
    { name: 'Hummus & Flatbread', description: "Creamy house-made hummus drizzled with olive oil and za'atar, served with warm toasted flatbread.", price: 4.99, category: 'sides', image: `${UNSPLASH}/photo-1637361973-1d0f5eb18e02?w=800&q=80`, featured: false, preparationTime: 5 },
    { name: 'Fresh Lemonade', description: 'Hand-squeezed lemonade with a hint of mint, served over crushed ice. Refreshingly tangy.', price: 3.49, category: 'drinks', image: `${UNSPLASH}/photo-1621263764928-df1444c5e859?w=800&q=80`, featured: false, preparationTime: 3 },
    { name: 'Mango Lassi', description: 'Thick and creamy mango yoghurt drink blended with cardamom and a touch of honey.', price: 3.99, category: 'drinks', image: `${UNSPLASH}/photo-1527661591475-527312dd65f5?w=800&q=80`, featured: false, preparationTime: 3 },
    { name: 'Coca-Cola', description: 'Ice-cold 330ml can of classic Coca-Cola.', price: 1.99, category: 'drinks', image: `${UNSPLASH}/photo-1629203851122-3726ecdf080e?w=800&q=80`, featured: false, preparationTime: 1 },
    { name: 'Iced Coffee', description: 'Cold brew coffee served over ice with a splash of cream and caramel syrup.', price: 3.99, category: 'drinks', image: `${UNSPLASH}/photo-1461023058943-07fcbe16d735?w=800&q=80`, featured: false, preparationTime: 3 },
    { name: 'Chocolate Brownie Sundae', description: 'Warm Belgian chocolate brownie topped with vanilla ice cream, chocolate sauce, whipped cream, and crushed hazelnuts.', price: 6.49, category: 'desserts', image: `${UNSPLASH}/photo-1606313564200-e75d5e30476c?w=800&q=80`, featured: true, preparationTime: 6 },
    { name: 'Churros', description: 'Golden crispy churros dusted with cinnamon sugar, served with warm Nutella and caramel dipping sauces.', price: 5.49, category: 'desserts', image: `${UNSPLASH}/photo-1624353365286-3f8d62daad51?w=800&q=80`, featured: false, preparationTime: 8 },
    { name: 'New York Cheesecake', description: 'Rich and creamy baked cheesecake with a biscuit base, topped with strawberry compote.', price: 5.99, category: 'desserts', image: `${UNSPLASH}/photo-1533134242443-d4fd215305ad?w=800&q=80`, featured: false, preparationTime: 3 },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        await Order.deleteMany({});
        await User.deleteMany({});

        await Product.insertMany(products);
        await User.create({ name: 'Admin', email: 'admin@embergrill.co.uk', password: 'admin123', role: 'admin' });

        console.log(`Database seeded: ${products.length} products + admin user`);
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error.message);
        process.exit(1);
    }
};

seedDB();
