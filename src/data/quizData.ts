import orangeImg from '@/assets/orange.jpg.asset.json';
import caramelPopcornImg from '@/assets/caramel_popcorn.png.asset.json';
import popcornImg from '@/assets/popcorn.png.asset.json';
import clearTofuSoupImg from '@/assets/clear_tofu_soup.jpg.asset.json';
import fishClearSoupImg from '@/assets/fish_clear_soup.jpg';
import truffleMushroomPasteImg from '@/assets/truffle_mushroom_paste.jpg.asset.json';
import prosciuttoImg from '@/assets/prosciutto.png.asset.json';
import mozzarellaImg from '@/assets/mozzarella.png';
import caramelImg from '@/assets/caramel.png';
import lemonCandyImg from '@/assets/lemon-candy.png';
import fetaCheeseImg from '@/assets/feta-cheese.png.asset.json';
import almondCroissantImg from '@/assets/almond_croissant.jpg.asset.json';
import brownieImg from '@/assets/brownie.jpg.asset.json';
import fudgeImg from '@/assets/fudge.jpg.asset.json';
import cucumberImg from '@/assets/cucumber.jpg.asset.json';
import sparklingWaterImg from '@/assets/sparkling_water.png.asset.json';
import limeCevicheImg from '@/assets/lime_ceviche.jpg.asset.json';
import bbqWingsImg from '@/assets/bbq_wings.jpg.asset.json';
import buffaloWingsImg from '@/assets/buffalo_wings.jpg.asset.json';
import buldakRamenImg from '@/assets/buldak_hot_chicken_ramen.jpg.asset.json';
import nashvilleImg from '@/assets/nashville_chicken.jpg.asset.json';
import sichuanNoodleImg from '@/assets/sichuan_noodle.jpg.asset.json';
import mustardImg from '@/assets/mustard.jpg.asset.json';
import habaneroSalsaImg from '@/assets/habanero_salsa.jpg.asset.json';
import tomatoSalsaImg from '@/assets/tomato_salsa.jpg.asset.json';
import wasabiImg from '@/assets/wasabi.jpg.asset.json';
import baconImg from '@/assets/bacon.jpg.asset.json';
import saltedCaramelImg from '@/assets/salted_caramel.png.asset.json';
import plainCrackerImg from '@/assets/plain_cracker.png.asset.json';
import ricottaImg from '@/assets/ricotta_cheese.png.asset.json';
import greekYogurtImg from '@/assets/greek-yogurt.jpg.asset.json';
import plainYogurtImg from '@/assets/plain-yogurt.jpg.asset.json';
import datePalmImg from '@/assets/date_palm.png';
import coconutCrackerImg from '@/assets/coconut_cracker.png';
import bananaBreadImg from '@/assets/banana_bread.png';
import balsamicVinegarImg from '@/assets/balsamic_vinegar_2.png.asset.json';
import vegetableBrothImg from '@/assets/vegetable_broth.png.asset.json';
import dashiImg from '@/assets/dashi.png.asset.json';
import avocadoToastAsset from '@/assets/smashed_avocado_toast.png.asset.json';
import shiitakeMushroomImg from '@/assets/shiitake_mushroom.jpg.asset.json';
import buttonMushroomImg from '@/assets/button_mushroom.jpg.asset.json';
const avocadoToastImg = avocadoToastAsset.url;
import butterImg from '@/assets/butter.png';
import oliveOilImg from '@/assets/olive_oil.png';
import butternutSquashSoupImg from '@/assets/butternut_squash_soup.png';
import peanutButterNoodleImg from '@/assets/peanut_butter_noodle.png.asset.json';

export interface QuizItem {
  id: string;
  optionA: {
    name: string;
    image: string;
    vegan?: boolean; // true = treated as a "vegan version" of this option
  };
  optionB: {
    name: string;
    image: string;
    vegan?: boolean; // true = treated as a "vegan version" of this option
  };
  // If user swipes right (prefers A), their intensity goes toward intensityA
  // If user swipes left (prefers B), their intensity goes toward intensityB
  intensityA: number; // 1-10 scale
  intensityB: number; // 1-10 scale
  dietary: ('vegan' | 'vegetarian' | 'pescatarian' | 'all-good')[];
}

export type QuizType = 'sweet' | 'sour' | 'bitter' | 'salty' | 'rich' | 'spicy' | 'umami';

// Sweet comparisons (comparing sweetness preferences)
// Key items overlap across questions to help users calibrate their preferences
export const sweetItems: QuizItem[] = [
  {
    id: 'sweet-1',
    optionA: { name: 'White Chocolate', image: '/images/white_chocolate.png', vegan: true },
    optionB: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop', vegan: true },
    intensityA: 9,
    intensityB: 7,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-1b',
    optionA: { name: 'Fruit Flavored Yogurt', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop' },
    optionB: { name: 'Natural Yogurt', image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&h=600&fit=crop' },
    intensityA: 5,
    intensityB: 1,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-1c',
    optionA: { name: 'Caramel Popcorn', image: caramelPopcornImg.url },
    optionB: { name: 'Popcorn', image: popcornImg.url },
    intensityA: 6,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-2',
    optionA: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop', vegan: true },
    optionB: { name: 'Dark Chocolate (70%)', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop', vegan: true },
    intensityA: 7,
    intensityB: 4,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-3',
    optionA: { name: 'White Chocolate', image: '/images/white_chocolate.png', vegan: true },
    optionB: { name: 'Caramel', image: caramelImg },
    intensityA: 9,
    intensityB: 6,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-3b',
    optionA: { name: 'Caramel', image: caramelImg },
    optionB: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop', vegan: true },
    intensityA: 6,
    intensityB: 7,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-3c',
    optionA: { name: 'White Chocolate', image: '/images/white_chocolate.png', vegan: true },
    optionB: { name: 'Baklava', image: '/images/baklava.png', vegan: true },
    intensityA: 9,
    intensityB: 8,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-3d',
    optionA: { name: 'Dark Chocolate (70%)', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop', vegan: true },
    optionB: { name: 'Dark Chocolate (85%)', image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=600&h=600&fit=crop', vegan: true },
    intensityA: 4,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-4',
    optionA: { name: 'Chocolate Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop', vegan: true },
    optionB: { name: 'Cheesecake', image: '/images/cheese_cake.png' },
    intensityA: 8,
    intensityB: 6,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-5',
    optionA: { name: 'Cheesecake', image: '/images/cheese_cake.png' },
    optionB: { name: 'Carrot Cake', image: '/images/carrot_cake.png', vegan: true },
    intensityA: 6,
    intensityB: 5,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-6',
    optionA: { name: 'Cotton Candy', image: '/images/cotton_candy.png' },
    optionB: { name: 'Caramel', image: caramelImg },
    intensityA: 10,
    intensityB: 6,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-7',
    optionA: { name: 'Caramel', image: caramelImg },
    optionB: { name: 'Honey', image: '/images/honey.png' },
    intensityA: 6,
    intensityB: 8,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-8',
    optionA: { name: 'Glazed Donut', image: '/images/glazed_donuts.png', vegan: true },
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
    optionA: { name: 'Pancakes', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop', vegan: true },
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
  {
    id: 'sweet-14',
    optionA: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop', vegan: true },
    optionB: { name: 'Honey', image: '/images/honey.png' },
    intensityA: 7,
    intensityB: 8,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-15',
    optionA: { name: 'Almond Croissant', image: almondCroissantImg.url },
    optionB: { name: 'Plain Croissant', image: '/images/plain_croissant.png' },
    intensityA: 6,
    intensityB: 3,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-16',
    optionA: { name: 'Fudge', image: fudgeImg.url, vegan: true },
    optionB: { name: 'Brownie', image: brownieImg.url, vegan: true },
    intensityA: 9,
    intensityB: 8,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-17',
    optionA: { name: 'Brownie', image: brownieImg.url, vegan: true },
    optionB: { name: 'Chocolate Cookie', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 7,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-18',
    optionA: { name: 'Date Palm (Medjool Date)', image: datePalmImg },
    optionB: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop', vegan: true },
    intensityA: 8,
    intensityB: 7,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-19',
    optionA: { name: 'Coconut Cracker', image: coconutCrackerImg },
    optionB: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop', vegan: true },
    intensityA: 4,
    intensityB: 7,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-20',
    optionA: { name: 'Banana Bread', image: bananaBreadImg, vegan: true },
    optionB: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop', vegan: true },
    intensityA: 6,
    intensityB: 7,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-21',
    optionA: { name: 'Grapefruit', image: 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=600&h=600&fit=crop' },
    optionB: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop', vegan: true },
    intensityA: 2,
    intensityB: 7,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-22',
    optionA: { name: 'Orange', image: orangeImg.url },
    optionB: { name: 'Banana Bread', image: bananaBreadImg, vegan: true },
    intensityA: 4,
    intensityB: 6,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-23',
    optionA: { name: 'Peach', image: '/images/peach.png' },
    optionB: { name: 'Banana Bread', image: bananaBreadImg, vegan: true },
    intensityA: 5,
    intensityB: 6,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sweet-24',
    optionA: { name: 'Mango', image: '/images/mango.png' },
    optionB: { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=600&h=600&fit=crop', vegan: true },
    intensityA: 7,
    intensityB: 7,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
];

// Sour comparisons
export const sourItems: QuizItem[] = [
  {
    id: 'sour-1',
    optionA: { name: 'Fresh Lemon', image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&h=600&fit=crop' },
    optionB: { name: 'Orange', image: orangeImg.url },
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
    optionB: { name: 'Cucumber', image: cucumberImg.url },
    intensityA: 6,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-6',
    optionA: { name: 'Kombucha', image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&h=600&fit=crop' },
    optionB: { name: 'Sparkling Water', image: sparklingWaterImg.url },
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
    optionA: { name: 'Greek Yogurt', image: greekYogurtImg.url },
    optionB: { name: 'Plain Yogurt', image: plainYogurtImg.url },
    intensityA: 5,
    intensityB: 2,
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
    optionA: { name: 'Lemon Candy', image: lemonCandyImg },
    optionB: { name: 'Caramel', image: caramelImg },
    intensityA: 8,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'sour-11',
    optionA: { name: 'Lime Ceviche', image: limeCevicheImg.url },
    optionB: { name: 'Grilled Fish', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 1,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'sour-12',
    optionA: { name: 'Balsamic Vinegar', image: balsamicVinegarImg.url },
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
    optionA: { name: 'Buffalo Wings', image: buffaloWingsImg.url },
    optionB: { name: 'BBQ Wings', image: bbqWingsImg.url },
    intensityA: 7,
    intensityB: 3,
    dietary: ['all-good'],
  },
  {
    id: 'sour-15',
    optionA: { name: 'Buffalo Wings', image: buffaloWingsImg.url },
    optionB: { name: 'Nashville Spicy Chicken', image: nashvilleImg.url },
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
  },
  {
    id: 'bitter-2',
    optionA: { name: '85% Cacao', image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=600&h=600&fit=crop', vegan: true },
    optionB: { name: '70% Dark Chocolate', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop', vegan: true },
    intensityA: 8,
    intensityB: 5,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
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
    optionB: { name: 'Orange', image: orangeImg.url },
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
    optionB: { name: 'Plain Crackers', image: plainCrackerImg.url },
    intensityA: 7,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'salty-2',
    optionA: { name: 'Prosciutto', image: prosciuttoImg.url },
    optionB: { name: 'Roast Turkey', image: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 3,
    dietary: ['all-good'],
  },
  {
    id: 'salty-3',
    optionA: { name: 'Parmesan', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=600&fit=crop' },
    optionB: { name: 'Mozzarella', image: mozzarellaImg },
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
    optionA: { name: 'Feta Cheese', image: fetaCheeseImg.url },
    optionB: { name: 'Ricotta', image: ricottaImg.url },
    intensityA: 6,
    intensityB: 1,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'salty-7',
    optionA: { name: 'Bacon', image: baconImg.url },
    optionB: { name: 'Grilled Chicken', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 2,
    dietary: ['all-good'],
  },
  {
    id: 'salty-8',
    optionA: { name: 'Salted Pretzels', image: '/__l5e/assets-v1/5c3d5458-5071-4a8b-9c7f-7c931764b748/salted_pretzel.jpg' },
    optionB: { name: 'Breadsticks', image: '/__l5e/assets-v1/4a9f0e32-63c2-405a-8aea-fcdb6bb5a9b7/breadstick.jpg' },
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
    optionB: { name: 'Vegetable Broth', image: vegetableBrothImg.url },
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
  {
    id: 'salty-13',
    optionA: { name: 'Salted Caramel', image: saltedCaramelImg.url },
    optionB: { name: 'Caramel', image: caramelImg },
    intensityA: 6,
    intensityB: 1,
    dietary: ['vegetarian', 'all-good'],
  },
];

// Rich & Buttery comparisons (creaminess/heaviness/butter)
export const richItems: QuizItem[] = [
  {
    id: 'rich-1',
    optionA: { name: 'Chicken Soup', image: '/images/chicken_soup.png' },
    optionB: { name: 'Mushroom Soup', image: '/images/mushroom_soup.png', vegan: true },
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
    optionA: { name: 'Mashed Potatoes', image: '/images/mashed_potato.png', vegan: true },
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
  {
    id: 'rich-16',
    optionA: { name: 'Coconut Curry', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop', vegan: true },
    optionB: { name: 'Chicken Soup', image: '/images/chicken_soup.png' },
    intensityA: 8,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-17',
    optionA: { name: 'Smashed Avocado on Toast', image: avocadoToastImg },
    optionB: { name: 'Plain Bread', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-18',
    optionA: { name: 'Butter', image: butterImg },
    optionB: { name: 'Olive Oil', image: oliveOilImg },
    intensityA: 10,
    intensityB: 5,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-19',
    optionA: { name: 'Butternut Squash Soup', image: butternutSquashSoupImg, vegan: true },
    optionB: { name: 'Chicken Soup', image: '/images/chicken_soup.png' },
    intensityA: 6,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-20',
    optionA: { name: 'Peanut Butter Noodles', image: peanutButterNoodleImg.url, vegan: true },
    optionB: { name: 'Aglio e Olio', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 3,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'rich-21',
    optionA: { name: 'Fish Clear Soup', image: fishClearSoupImg },
    optionB: { name: 'Tofu Soup', image: clearTofuSoupImg.url },
    intensityA: 1,
    intensityB: 3,
    dietary: ['pescatarian', 'all-good'],
  },
];

// Spicy comparisons (heat tolerance)
export const spicyItems: QuizItem[] = [
  {
    id: 'spicy-1',
    optionA: { name: 'Ghost Pepper Wings', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&h=600&fit=crop' },
    optionB: { name: 'BBQ Wings', image: bbqWingsImg.url },
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
    optionA: { name: 'Sichuan Noodle', image: sichuanNoodleImg.url },
    optionB: { name: 'Lo Mein', image: 'https://images.unsplash.com/photo-1634864572865-1cf8ff8bd23d?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'spicy-5',
    optionA: { name: 'Habanero Salsa', image: habaneroSalsaImg.url },
    optionB: { name: 'Tomato Salsa', image: tomatoSalsaImg.url },
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
    optionA: { name: 'Wasabi', image: wasabiImg.url },
    optionB: { name: 'Mustard', image: mustardImg.url },
    intensityA: 8,
    intensityB: 4,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'spicy-9',
    optionA: { name: 'Nashville Spicy Chicken', image: nashvilleImg.url },
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
    dietary: ['vegan', 'vegetarian', 'pescatarian'],
  },
  {
    id: 'spicy-13',
    optionA: { name: 'Buldak Hot Chicken Ramen', image: buldakRamenImg.url },
    optionB: { name: 'Spicy Ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 7,
    dietary: ['all-good'],
  },
];

// Umami comparisons (savory depth)
export const umamiItems: QuizItem[] = [
  {
    id: 'umami-1',
    optionA: { name: 'Miso Soup', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=600&fit=crop' },
    optionB: { name: 'Clear Broth', image: clearTofuSoupImg.url },
    intensityA: 8,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-2',
    optionA: { name: 'Parmesan Cheese', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=600&fit=crop' },
    optionB: { name: 'Mozzarella', image: mozzarellaImg },
    intensityA: 9,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-3',
    optionA: { name: 'Anchovies', image: 'https://images.unsplash.com/photo-1599084993091-6c4fd023714a?w=600&h=600&fit=crop' },
    optionB: { name: 'Grilled White Fish', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 2,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'umami-4',
    optionA: { name: 'Soy Sauce', image: 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=600&h=600&fit=crop' },
    optionB: { name: 'Rice Vinegar', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop' },
    intensityA: 10,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-5',
    optionA: { name: 'Shiitake Mushrooms', image: shiitakeMushroomImg.url },
    optionB: { name: 'Button Mushrooms', image: buttonMushroomImg.url },
    intensityA: 7,
    intensityB: 3,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-6',
    optionA: { name: 'Sun-dried Tomatoes', image: 'https://images.unsplash.com/photo-1592187270271-9a4e6e4e0e2a?w=600&h=600&fit=crop' },
    optionB: { name: 'Fresh Tomatoes', image: 'https://images.unsplash.com/photo-1592924357228-91a030470d0c?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-7',
    optionA: { name: 'Seaweed Snacks', image: 'https://images.unsplash.com/photo-1590759485510-0a1d02fcd0c6?w=600&h=600&fit=crop' },
    optionB: { name: 'Rice Cakes', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop' },
    intensityA: 6,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-8',
    optionA: { name: 'Bacon', image: baconImg.url },
    optionB: { name: 'Turkey Breast', image: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 2,
    dietary: ['all-good'],
  },
  {
    id: 'umami-9',
    optionA: { name: 'Aged Cheddar', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=600&fit=crop' },
    optionB: { name: 'Cream Cheese', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 2,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-10',
    optionA: { name: 'Fish Sauce', image: 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=600&h=600&fit=crop' },
    optionB: { name: 'Lime Juice', image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 1,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'umami-11',
    optionA: { name: 'Marmite', image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=600&h=600&fit=crop' },
    optionB: { name: 'Honey', image: '/images/honey.png' },
    intensityA: 8,
    intensityB: 1,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-12',
    optionA: { name: 'Beef Stew', image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600&h=600&fit=crop' },
    optionB: { name: 'Steamed Chicken', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 1,
    dietary: ['all-good'],
  },
  {
    id: 'umami-13',
    optionA: { name: 'Dashi', image: dashiImg.url },
    optionB: { name: 'Vegetable Broth', image: vegetableBrothImg.url },
    intensityA: 9,
    intensityB: 2,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'umami-14',
    optionA: { name: 'Natto', image: 'https://images.unsplash.com/photo-1564834724105-918b3d7417b1?w=600&h=600&fit=crop' },
    optionB: { name: 'Plain Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 1,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-15',
    optionA: { name: 'Porcini Mushrooms', image: 'https://images.unsplash.com/photo-1576076567699-247103a75b10?w=600&h=600&fit=crop' },
    optionB: { name: 'Button Mushrooms', image: buttonMushroomImg.url },
    intensityA: 8,
    intensityB: 3,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-16',
    optionA: { name: 'Truffle Oil', image: 'https://images.unsplash.com/photo-1604329760661-e71e83bb5f6e?w=600&h=600&fit=crop' },
    optionB: { name: 'Olive Oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 2,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-17',
    optionA: { name: 'Shiitake Miso', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=600&fit=crop' },
    optionB: { name: 'Plain Miso', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 4,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-18',
    optionA: { name: 'Sun-dried Tomato', image: 'https://images.unsplash.com/photo-1592187270271-9a4e6e4e0e2a?w=600&h=600&fit=crop' },
    optionB: { name: 'Tomato', image: 'https://images.unsplash.com/photo-1592924357228-91a030470d0c?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 3,
    dietary: ['vegan', 'vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-19',
    optionA: { name: 'Anchovy Pasta', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=600&fit=crop' },
    optionB: { name: 'Aglio e Olio', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 4,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'umami-20',
    optionA: { name: 'Mushroom Cream Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=600&fit=crop' },
    optionB: { name: 'Aglio e Olio', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 4,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-21',
    optionA: { name: 'Classic Carbonara with Pork', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=600&fit=crop' },
    optionB: { name: 'Aglio e Olio', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=600&fit=crop' },
    intensityA: 8,
    intensityB: 4,
    dietary: ['all-good'],
  },
  {
    id: 'umami-22',
    optionA: { name: 'Pollock Roe (Mentaiko)', image: 'https://images.unsplash.com/photo-1564834724105-918b3d7417b1?w=600&h=600&fit=crop' },
    optionB: { name: 'Plain Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 1,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'umami-23',
    optionA: { name: 'Anchovy', image: 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=600&h=600&fit=crop' },
    optionB: { name: 'Olive', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 2,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'umami-24',
    optionA: { name: 'Katsuobushi', image: 'https://images.unsplash.com/photo-1569058242253-92a9c0a0d9a7?w=600&h=600&fit=crop' },
    optionB: { name: 'Plain Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 1,
    dietary: ['pescatarian', 'all-good'],
  },
  {
    id: 'umami-25',
    optionA: { name: 'Garlic Butter', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&h=600&fit=crop' },
    optionB: { name: 'Butter', image: 'https://images.unsplash.com/photo-1628088062854-d187c5a5b122?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 4,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-26',
    optionA: { name: 'Seaweed Butter', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&h=600&fit=crop' },
    optionB: { name: 'Butter', image: 'https://images.unsplash.com/photo-1628088062854-d187c5a5b122?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 4,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-27',
    optionA: { name: 'Truffle Butter', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&h=600&fit=crop' },
    optionB: { name: 'Butter', image: 'https://images.unsplash.com/photo-1628088062854-d187c5a5b122?w=600&h=600&fit=crop' },
    intensityA: 7,
    intensityB: 4,
    dietary: ['vegetarian', 'pescatarian', 'all-good'],
  },
  {
    id: 'umami-28',
    optionA: { name: 'Truffle Mushroom Paste', image: truffleMushroomPasteImg.url },
    optionB: { name: 'Plain Toast', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop' },
    intensityA: 9,
    intensityB: 2,
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
  umami: umamiItems,
};

export const quizLabels: Record<QuizType, { label: string; lowLabel: string; highLabel: string }> = {
  sweet: { label: 'Sweet', lowLabel: 'Less Sweet', highLabel: 'More Sweet' },
  sour: { label: 'Sour', lowLabel: 'Mild', highLabel: 'Tangy' },
  bitter: { label: 'Bitter', lowLabel: 'Subtle', highLabel: 'Bold' },
  salty: { label: 'Salty', lowLabel: 'Light', highLabel: 'Savory' },
  rich: { label: 'Rich & Buttery', lowLabel: 'Light', highLabel: 'Decadent' },
  spicy: { label: 'Spicy', lowLabel: 'Mild', highLabel: 'Fire' },
  umami: { label: 'Umami', lowLabel: 'Subtle', highLabel: 'Savory Depth' },
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
