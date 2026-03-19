import prosciuttoImg from '@/assets/prosciutto.png';
import mozzarellaImg from '@/assets/mozzarella.png';

export interface QuizItem {
  id: string;
  optionA: {
    name: string;
    image: string;
  };
  optionB: {
    name: string;
    image: string;
  };
  // If user swipes right (prefers A), their intensity goes toward intensityA
  // If user swipes left (prefers B), their intensity goes toward intensityB
  intensityA: number; // 1-10 scale
  intensityB: number; // 1-10 scale
  dietary: ('vegan' | 'vegetarian' | 'pescatarian' | 'all-good')[];
  // Branching logic: conditional questions based on user choices
  branchOnA?: string[]; // Question IDs to add if user chooses option A
  branchOnB?: string[]; // Question IDs to add if user chooses option B
  isBranchQuestion?: boolean; // If true, this question is only shown via branching
}

export type QuizType = 'sweet' | 'sour' | 'bitter' | 'salty' | 'rich' | 'spicy';

// Sweet comparisons (comparing sweetness preferences)
// Key items overlap across questions to help users calibrate their preferences
export const sweetItems: QuizItem[] = [
  {
    id: 'sweet-1',
    optionA: { name: 'White Chocolate', image: '/images/white_chocolate.png' },
    optionB: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 7,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-2',
    optionA: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop' },
    optionB: { name: 'Dark Chocolate (70%)', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 4,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-3',
    optionA: { name: 'White Chocolate', image: '/images/white_chocolate.png' },
    optionB: { name: 'Caramel', image: '/images/caramel.png' },
    intensityA: 9,
    intensityB: 6,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-3b',
    optionA: { name: 'Caramel', image: '/images/caramel.png' },
    optionB: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop' },
    intensityA: 6,
    intensityB: 7,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-3c',
    optionA: { name: 'White Chocolate', image: '/images/white_chocolate.png' },
    optionB: { name: 'Baklava', image: '/images/baklava.png' },
    intensityA: 9,
    intensityB: 8,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-3d',
    optionA: { name: 'Dark Chocolate (70%)', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop' },
    optionB: { name: 'Dark Chocolate (85%)', image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=600&h=600&fit=crop' },
    intensityA: 4,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-4',
    optionA: { name: 'Chocolate Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop' },
    optionB: { name: 'Cheesecake', image: '/images/cheese_cake.png' },
    intensityA: 8,
    intensityB: 6,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-5',
    optionA: { name: 'Cheesecake', image: '/images/cheese_cake.png' },
    optionB: { name: 'Carrot Cake', image: '/images/carrot_cake.png' },
    intensityA: 6,
    intensityB: 5,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-6',
    optionA: { name: 'Cotton Candy', image: '/images/cotton_candy.png' },
    optionB: { name: 'Caramel', image: '/images/caramel.png' },
    intensityA: 10,
    intensityB: 6,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-7',
    optionA: { name: 'Caramel', image: '/images/caramel.png' },
    optionB: { name: 'Honey', image: '/images/honey.png' },
    intensityA: 6,
    intensityB: 8,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-8',
    optionA: { name: 'Glazed Donut', image: '/images/glazed_donuts.png' },
    optionB: { name: 'French Macaron', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 8,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-9',
    optionA: { name: 'French Macaron', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&h=600&fit=crop' },
    optionB: { name: 'Plain Croissant', image: '/images/plain_croissant.png' },
    intensityA: 8,
    intensityB: 3,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-10',
    optionA: { name: 'Crème Brûlée', image: '/images/creme_brulee.png' },
    optionB: { name: 'Tiramisu', image: '/images/tiramisu.png' },
    intensityA: 7,
    intensityB: 5,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-10b',
    optionA: { name: 'Crème Brûlée', image: '/images/creme_brulee.png' },
    optionB: { name: 'Mont Blanc', image: '/images/mont_blanc.png' },
    intensityA: 7,
    intensityB: 3,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-10c',
    optionA: { name: 'Tiramisu', image: '/images/tiramisu.png' },
    optionB: { name: 'Mont Blanc', image: '/images/mont_blanc.png' },
    intensityA: 5,
    intensityB: 3,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-11',
    optionA: { name: 'Chocolate Cookie', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=600&fit=crop' },
    optionB: { name: 'Oat Cookie', image: '/images/oat_cookies.png' },
    intensityA: 7,
    intensityB: 4,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-11b',
    optionA: { name: 'Oat Cookie', image: '/images/oat_cookies.png' },
    optionB: { name: 'Biscotti', image: '/images/biscotti.png' },
    intensityA: 4,
    intensityB: 3,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-12',
    optionA: { name: 'Pancakes', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop' },
    optionB: { name: 'Bagel', image: 'https://images.unsplash.com/photo-1585445490387-f47934b73b54?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 3,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-13',
    optionA: { name: 'Cupcake', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&h=600&fit=crop' },
    optionB: { name: 'Muffin', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 5,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
];

// Sour comparisons
export const sourItems: QuizItem[] = [
  {
    id: 'sour-1',
    optionA: { name: 'Fresh Lemon', image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&h=600&fit=crop' },
    optionB: { name: 'Orange', image: '/images/orange.png' },
    intensityA: 10,
    intensityB: 3,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-2',
    optionA: { name: 'Sour Gummy Worms', image: '/images/sour_gummy_worms.png' },
    optionB: { name: 'Sweet Gummy Bears', image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-4',
    optionA: { name: 'Green Apple', image: '/images/green_apples.png' },
    optionB: { name: 'Red Apple', image: '/images/red_apples.png' },
    intensityA: 6,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-5',
    optionA: { name: 'Pickles', image: '/images/pickles.png' },
    optionB: { name: 'Cucumber', image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&h=600&fit=crop' },
    intensityA: 6,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-6',
    optionA: { name: 'Kombucha', image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&h=600&fit=crop' },
    optionB: { name: 'Sparkling Water', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=600&fit=crop' },
    intensityA: 6,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-7',
    optionA: { name: 'Passion Fruit', image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?w=600&h=600&fit=crop' },
    optionB: { name: 'Mango', image: '/images/mango.png' },
    intensityA: 7,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-8',
    optionA: { name: 'Greek Yogurt', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop' },
    optionB: { name: 'Vanilla Pudding', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=600&fit=crop' },
    intensityA: 5,
    intensityB: 1,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-9',
    optionA: { name: 'Sourdough Bread', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop' },
    optionB: { name: 'White Bread', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&h=600&fit=crop' },
    intensityA: 4,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-10',
    optionA: { name: 'Lemon Candy', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=600&fit=crop' },
    optionB: { name: 'Caramel Candy', image: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-11',
    optionA: { name: 'Lime Ceviche', image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&h=600&fit=crop' },
    optionB: { name: 'Grilled Fish', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 1,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'sour-12',
    optionA: { name: 'Balsamic Vinegar', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop' },
    optionB: { name: 'Olive Oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop' },
    intensityA: 5,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-13',
    optionA: { name: 'Lemonade', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&h=600&fit=crop' },
    optionB: { name: 'Orange Juice', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=600&fit=crop' },
    intensityA: 6,
    intensityB: 3,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-14',
    optionA: { name: 'Buffalo Wings', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&h=600&fit=crop' },
    optionB: { name: 'BBQ Wings', image: 'https://images.unsplash.com/photo-1608039829572-25e8182a7a01?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 3,
    dietary: ['all-good'],
  },
  {
    id: 'sour-15',
    optionA: { name: 'Buffalo Wings', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&h=600&fit=crop' },
    optionB: { name: 'Nashville Hot Chicken', image: 'https://images.unsplash.com/photo-1626645738196-c2a72c7d6e3b?w=600&h=600&fit=crop' },
    intensityA: 6,
    intensityB: 4,
    dietary: ['all-good'],
  },
];

// Bitter comparisons
export const bitterItems: QuizItem[] = [
  {
    id: 'bitter-1',
    optionA: { name: 'Black Coffee', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=600&fit=crop' },
    optionB: { name: 'Latte', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 3,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
    branchOnA: ['bitter-branch-coffee-espresso'],
  },
  {
    id: 'bitter-branch-coffee-espresso',
    optionA: { name: 'Black Coffee', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=600&fit=crop' },
    optionB: { name: 'Espresso', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 9,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
    isBranchQuestion: true,
  },
  {
    id: 'bitter-2',
    optionA: { name: '85% Cacao', image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=600&h=600&fit=crop' },
    optionB: { name: '70% Dark Chocolate', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 5,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
    branchOnA: ['bitter-branch-85-vs-90'],
  },
  {
    id: 'bitter-branch-85-vs-90',
    optionA: { name: '85% Cacao', image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=600&h=600&fit=crop' },
    optionB: { name: '90% Cacao', image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 9,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
    isBranchQuestion: true,
  },
  {
    id: 'bitter-3',
    optionA: { name: 'IPA Beer', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=600&fit=crop' },
    optionB: { name: 'Lager Beer', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 3,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'bitter-4',
    optionA: { name: 'Arugula/Rocket', image: '/images/arugula.png' },
    optionB: { name: 'Iceberg Lettuce', image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=600&h=600&fit=crop' },
    intensityA: 5,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'bitter-5',
    optionA: { name: 'Grapefruit', image: 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=600&h=600&fit=crop' },
    optionB: { name: 'Orange', image: '/images/orange.png' },
    intensityA: 6,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'bitter-6',
    optionA: { name: 'Kale Salad', image: '/images/kale_salad.png' },
    optionB: { name: 'Spinach Salad', image: '/images/spinach_salad.png' },
    intensityA: 6,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'bitter-7',
    optionA: { name: 'Brussels Sprouts', image: 'https://images.unsplash.com/photo-1438118907704-7718ee9a191a?w=600&h=600&fit=crop' },
    optionB: { name: 'Broccoli', image: '/images/broccoli.png' },
    intensityA: 5,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'bitter-8',
    optionA: { name: 'Green Tea', image: '/images/green_tea.png' },
    optionB: { name: 'Chamomile Tea', image: '/images/chamomile_tea.png' },
    intensityA: 4,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'bitter-9',
    optionA: { name: 'Green Tea', image: '/images/green_tea.png' },
    optionB: { name: 'Black Tea', image: '/images/black_tea.png' },
    intensityA: 4,
    intensityB: 6,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'bitter-10',
    optionA: { name: 'Radicchio', image: '/images/radicchio.png' },
    optionB: { name: 'Romaine Lettuce', image: '/images/romaine.png' },
    intensityA: 7,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'bitter-12',
    optionA: { name: 'Endive', image: '/images/endive.png' },
    optionB: { name: 'Butter Lettuce', image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=600&h=600&fit=crop' },
    intensityA: 5,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'bitter-13',
    optionA: { name: 'Espresso', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&h=600&fit=crop' },
    optionB: { name: 'Americano', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 5,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
];

// Salty comparisons
export const saltyItems: QuizItem[] = [
  {
    id: 'salty-1',
    optionA: { name: 'Salted Chips', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&h=600&fit=crop' },
    optionB: { name: 'Plain Crackers', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'salty-2',
    optionA: { name: 'Prosciutto', image: prosciuttoImg },
    optionB: { name: 'Roast Turkey', image: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 3,
    dietary: ['all-good'],
  },
  {
    id: 'salty-3',
    optionA: { name: 'Parmesan', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=600&fit=crop' },
    optionB: { name: 'Mozzarella', image: 'https://images.unsplash.com/photo-1505575967455-40e256f73376?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'salty-4',
    optionA: { name: 'Anchovies', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=600&h=600&fit=crop' },
    optionB: { name: 'Fresh Salmon', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 2,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'salty-5',
    optionA: { name: 'Soy Sauce', image: 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=600&h=600&fit=crop' },
    optionB: { name: 'Teriyaki Sauce', image: 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=600&h=600&fit=crop' },
    intensityA: 10,
    intensityB: 5,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'salty-6',
    optionA: { name: 'Feta Cheese', image: 'https://images.unsplash.com/photo-1626957341926-98752fc2ba90?w=600&h=600&fit=crop' },
    optionB: { name: 'Ricotta', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=600&fit=crop' },
    intensityA: 6,
    intensityB: 1,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'salty-7',
    optionA: { name: 'Bacon', image: 'https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?w=600&h=600&fit=crop' },
    optionB: { name: 'Grilled Chicken', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 2,
    dietary: ['all-good'],
  },
  {
    id: 'salty-8',
    optionA: { name: 'Salted Pretzels', image: 'https://images.unsplash.com/photo-1589927986089-35812418d1a6?w=600&h=600&fit=crop' },
    optionB: { name: 'Breadsticks', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop' },
    intensityA: 6,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'salty-9',
    optionA: { name: 'Olives', image: 'https://images.unsplash.com/photo-1593030103066-0093718b6f74?w=600&h=600&fit=crop' },
    optionB: { name: 'Grapes', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&h=600&fit=crop' },
    intensityA: 5,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'salty-10',
    optionA: { name: 'Miso Soup', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=600&fit=crop' },
    optionB: { name: 'Vegetable Broth', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=600&fit=crop' },
    intensityA: 6,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'salty-11',
    optionA: { name: 'Smoked Salmon', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop' },
    optionB: { name: 'Fresh Tuna', image: 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=600&h=600&fit=crop' },
    intensityA: 5,
    intensityB: 1,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'salty-12',
    optionA: { name: 'Seaweed Snacks', image: 'https://images.unsplash.com/photo-1590759485510-0a1d02fcd0c6?w=600&h=600&fit=crop' },
    optionB: { name: 'Rice Cakes', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop' },
    intensityA: 4,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
];

// Rich & Buttery comparisons (creaminess/heaviness/butter)
export const richItems: QuizItem[] = [
  {
    id: 'rich-1',
    optionA: { name: 'Chicken Soup', image: '/images/chicken_soup.png' },
    optionB: { name: 'Mushroom Soup', image: '/images/mushroom_soup.png' },
    intensityA: 2,
    intensityB: 4,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-2',
    optionA: { name: 'Alfredo Pasta', image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=600&fit=crop' },
    optionB: { name: 'Marinara Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-3',
    optionA: { name: 'Croissant', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop' },
    optionB: { name: 'Baguette', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-4',
    optionA: { name: 'Butter Chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=600&fit=crop' },
    optionB: { name: 'Tandoori Chicken', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 3,
    dietary: ['all-good'],
  },
  {
    id: 'rich-5',
    optionA: { name: 'Ice Cream', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop' },
    optionB: { name: 'Sorbet', image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-6',
    optionA: { name: 'Garlic Butter Bread', image: '/images/garlic_butter_bread.png' },
    optionB: { name: 'Plain Bread', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 1,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-7',
    optionA: { name: 'Eggs Benedict (creamy hollandaise sauce)', image: '/images/egg_benedict.png' },
    optionB: { name: 'Poached Eggs', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 3,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-8',
    optionA: { name: 'Chocolate Mousse', image: '/images/chocolate_mousse.png' },
    optionB: { name: 'Fruit Salad', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 1,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-9',
    optionA: { name: 'Mashed Potatoes', image: '/images/mashed_potato.png' },
    optionB: { name: 'Baked Potato', image: '/images/baked_potato.png' },
    intensityA: 7,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-10',
    optionA: { name: 'Carbonara', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=600&fit=crop' },
    optionB: { name: 'Aglio e Olio', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 3,
    dietary: ['all-good'],
  },
  {
    id: 'rich-12',
    optionA: { name: 'Danish Pastry', image: '/images/danish_pastry.png' },
    optionB: { name: 'Bagel', image: '/images/bagel.png' },
    intensityA: 8,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-13',
    optionA: { name: 'Aglio e Olio', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=600&fit=crop' },
    optionB: { name: 'Alfredo Pasta', image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=600&fit=crop' },
    intensityA: 3,
    intensityB: 8,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-14',
    optionA: { name: 'Poached Egg', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=600&fit=crop' },
    optionB: { name: 'Scrambled Egg', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=600&fit=crop' },
    intensityA: 3,
    intensityB: 7,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-15',
    optionA: { name: 'Roasted Chicken', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=600&fit=crop' },
    optionB: { name: 'Korean Fried Chicken', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=600&fit=crop' },
    intensityA: 4,
    intensityB: 8,
    dietary: ['all-good'],
  },
];

// Spicy comparisons (heat tolerance)
export const spicyItems: QuizItem[] = [
  {
    id: 'spicy-1',
    optionA: { name: 'Ghost Pepper Wings', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&h=600&fit=crop' },
    optionB: { name: 'BBQ Wings', image: 'https://images.unsplash.com/photo-1608039829572-25e8182a7a01?w=600&h=600&fit=crop' },
    intensityA: 10,
    intensityB: 2,
    dietary: ['all-good'],
  },
  {
    id: 'spicy-2',
    optionA: { name: 'Thai Green Curry', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=600&fit=crop' },
    optionB: { name: 'Coconut Curry', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'spicy-3',
    optionA: { name: 'Jalapeño Poppers', image: 'https://images.unsplash.com/photo-1548869206-93b036288fa3?w=600&h=600&fit=crop' },
    optionB: { name: 'Mozzarella Sticks', image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=600&h=600&fit=crop' },
    intensityA: 5,
    intensityB: 1,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'spicy-4',
    optionA: { name: 'Szechuan Noodles', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=600&fit=crop' },
    optionB: { name: 'Lo Mein', image: 'https://images.unsplash.com/photo-1634864572865-1cf8ff8bd23d?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'spicy-5',
    optionA: { name: 'Habanero Salsa', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=600&fit=crop' },
    optionB: { name: 'Mild Salsa', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'spicy-6',
    optionA: { name: 'Spicy Ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=600&fit=crop' },
    optionB: { name: 'Tonkotsu Ramen', image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 3,
    dietary: ['all-good'],
  },
  {
    id: 'spicy-7',
    optionA: { name: 'Vindaloo', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=600&fit=crop' },
    optionB: { name: 'Korma', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 2,
    dietary: ['all-good'],
  },
  {
    id: 'spicy-8',
    optionA: { name: 'Wasabi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=600&fit=crop' },
    optionB: { name: 'Mustard', image: 'https://images.unsplash.com/photo-1528750717929-32abb73d3bd9?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 4,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'spicy-9',
    optionA: { name: 'Nashville Hot Chicken', image: 'https://images.unsplash.com/photo-1626645738196-c2a72c7d6e3b?w=600&h=600&fit=crop' },
    optionB: { name: 'Fried Chicken', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 1,
    dietary: ['all-good'],
  },
  {
    id: 'spicy-10',
    optionA: { name: 'Spicy Tuna Roll', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=600&fit=crop' },
    optionB: { name: 'California Roll', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=600&fit=crop' },
    intensityA: 5,
    intensityB: 1,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'spicy-11',
    optionA: { name: 'Kimchi', image: '/images/kimchi.png' },
    optionB: { name: 'Coleslaw', image: '/images/coleslaw.png' },
    intensityA: 6,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'spicy-12',
    optionA: { name: 'Buffalo Cauliflower', image: 'https://images.unsplash.com/photo-1529059356943-4d0aa6c20ace?w=600&h=600&fit=crop' },
    optionB: { name: 'Roasted Cauliflower', image: 'https://images.unsplash.com/photo-1613743983303-b3e8991e050c?w=600&h=600&fit=crop' },
    intensityA: 6,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
];

export const quizDataMap: Record<QuizType, QuizItem[]> = {
  sweet: sweetItems,
  sour: sourItems,
  bitter: bitterItems,
  salty: saltyItems,
  rich: richItems,
  spicy: spicyItems,
};

export const quizLabels: Record<QuizType, { label: string; lowLabel: string; highLabel: string }> = {
  sweet: { label: 'Sweet', lowLabel: 'Less Sweet', highLabel: 'More Sweet' },
  sour: { label: 'Sour', lowLabel: 'Mild', highLabel: 'Tangy' },
  bitter: { label: 'Bitter', lowLabel: 'Subtle', highLabel: 'Bold' },
  salty: { label: 'Salty', lowLabel: 'Light', highLabel: 'Savory' },
  rich: { label: 'Rich & Buttery', lowLabel: 'Light', highLabel: 'Decadent' },
  spicy: { label: 'Spicy', lowLabel: 'Mild', highLabel: 'Fire' },
};

export interface TasteProfile {
  label: string;
  emoji: string;
  description: string;
  level: number;
  percentile: number;
}

export const getTasteProfile = (avgIntensity: number, quizType: QuizType): TasteProfile => {
  const labels = quizLabels[quizType];
  const percentile = Math.round(avgIntensity * 10);
  
  if (avgIntensity <= 3) {
    return {
      label: `${labels.lowLabel} Lover`,
      emoji: '🌿',
      description: `You prefer ${labels.lowLabel.toLowerCase()} flavors with subtle notes.`,
      level: avgIntensity,
      percentile,
    };
  } else if (avgIntensity <= 5) {
    return {
      label: 'Balanced Palate',
      emoji: '⚖️',
      description: `You enjoy a balanced ${labels.label.toLowerCase()} profile with variety.`,
      level: avgIntensity,
      percentile,
    };
  } else if (avgIntensity <= 7) {
    return {
      label: `${labels.highLabel} Enthusiast`,
      emoji: '🔥',
      description: `You lean towards ${labels.highLabel.toLowerCase()} tastes and bold flavors.`,
      level: avgIntensity,
      percentile,
    };
  } else {
    return {
      label: `${labels.highLabel} Champion`,
      emoji: '👑',
      description: `You love bold, ${labels.highLabel.toLowerCase()} flavors at maximum intensity!`,
      level: avgIntensity,
      percentile,
    };
  }
};
