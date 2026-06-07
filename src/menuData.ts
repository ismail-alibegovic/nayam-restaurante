import { MenuCategory } from './types';

const benedictImg = new URL('./assets/images/breakfast_benedict_1780788299820.png', import.meta.url).href;
const prawnsImg = new URL('./assets/images/appetizer_prawns_1780788344763.png', import.meta.url).href;
const beefImg = new URL('./assets/images/dinner_beef_1780788315769.png', import.meta.url).href;
const coulantImg = new URL('./assets/images/dessert_coulant_1780788330825.png', import.meta.url).href;

export const menuCategories: MenuCategory[] = [
  {
    id: 'brunch',
    title: {
      es: 'Brunch (10:00–16:00)',
      en: 'Brunch (10:00–16:00)'
    },
    items: [
      {
        id: 'benedict',
        name: {
          es: 'Huevos Benedictinos Nayam',
          en: 'Nayam Eggs Benedict'
        },
        description: {
          es: 'Huevos poché en brioche artesanal con jamón serrano crujiente, espárragos trigueros y holandesa de trufa negra.',
          en: 'Poached eggs on artisanal brioche with crispy serrano ham, wild asparagus, and black truffle hollandaise.'
        },
        price: 14,
        dietary: [],
        imageUrl: benedictImg,
        backdropGradient: 'radial-gradient(circle, var(--green-mid) 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'avocado',
        name: {
          es: 'Tostadas de Aguacate y Rábano',
          en: 'Avocado & Radish Toast'
        },
        description: {
          es: 'Pan de masa madre con crema de aguacate fresco, rábano laminado, sésamo negro, mix de semillas y un toque de limón.',
          en: 'Sourdough bread with fresh avocado spread, sliced radish, black sesame, seed mix, and a hint of lemon.'
        },
        price: 11,
        dietary: ['VG'],
        imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #2a402a 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'pancakes',
        name: {
          es: 'Pancakes Esponjosos de Temporada',
          en: 'Fluffy Seasonal Pancakes'
        },
        description: {
          es: 'Torre de pancakes esponjosos servidos con frutos rojos frescos, sirope de arce ecológico y helado de vainilla Bourbon.',
          en: 'Fluffy pancake stack served with fresh forest berries, organic maple syrup, and Bourbon vanilla ice cream.'
        },
        price: 12,
        dietary: ['V'],
        imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #4a3e2a 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'granola',
        name: {
          es: 'Bowl de Granola Silvestre',
          en: 'Wild Granola Bowl'
        },
        description: {
          es: 'Yogur griego cremoso, granola casera tostada con miel, láminas de mango fresco y semillas de maracuyá golosas.',
          en: 'Creamy Greek yoghurt, homemade honey-toasted granola, fresh mango slices, and luscious passion fruit seeds.'
        },
        price: 10,
        dietary: ['V'],
        imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #3a2a30 0%, var(--bg-deep) 100%)'
      }
    ]
  },
  {
    id: 'starters',
    title: {
      es: 'Entrantes / Starters',
      en: 'Entrantes / Starters'
    },
    items: [
      {
        id: 'prawns',
        name: {
          es: 'Gamba al Ajillo con Bisque',
          en: 'Garlic Prawns in Bisque'
        },
        description: {
          es: 'Gambas de costa salteadas en suave ajillo con emulsión de bisque de crustáceos y aceite de hierbas botánicas.',
          en: 'Local coastal prawns sautéed in gentle garlic with a rich crustacean bisque emulsion and botanical herb oil.'
        },
        price: 16,
        dietary: ['SH', 'GF'],
        imageUrl: prawnsImg,
        backdropGradient: 'radial-gradient(circle, var(--terracotta) 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'charcuterie',
        name: {
          es: 'Tabla de Embutidos y Quesos',
          en: 'Charcuterie & Cheese Board'
        },
        description: {
          es: 'Selección premium de paleta ibérica de bellota, chorizo artesano, quesos artesanos catalanes madurados, mermelada e higos.',
          en: 'Premium selection of Iberian acorn-fed ham, cured chorizo, aged artisan Catalan cheeses, fruit chutney, and fresh figs.'
        },
        price: 18,
        dietary: ['GF'],
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #3c2317 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'hummus',
        name: {
          es: 'Hummus Ahumado de Garbanzo',
          en: 'Smoked Chickpea Hummus'
        },
        description: {
          es: 'Hummus de garbanzo ahumado con pimentón de la Vera, sésamo dorado, granada fresca y pan de pita plano artesano recién horneado.',
          en: 'Smoked chickpea hummus with pimentón de la Vera, toasted sesame, fresh pomegranate, and warm house-baked pita bread.'
        },
        price: 9,
        dietary: ['VG'],
        imageUrl: 'https://images.unsplash.com/photo-1577906122119-14af675bba8f?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #332d20 0%, var(--bg-deep) 100%)'
      }
    ]
  },
  {
    id: 'mains',
    title: {
      es: 'Principales / Mains',
      en: 'Principales / Mains'
    },
    items: [
      {
        id: 'beef',
        name: {
          es: 'Entrecot de Ternera a la Brasa',
          en: 'Grilled Beef Entrecôte'
        },
        description: {
          es: 'Corte premium Angus madurado marcado a la brasa, servido con chimichurri casero, espárragos trigueros y zanahorias baby glaseadas.',
          en: 'Premium dry-aged Angus cut griled to perfection, paired with homemade chimichurri, wild asparagus, and glazed baby carrots.'
        },
        price: 26,
        dietary: ['GF'],
        imageUrl: beefImg,
        backdropGradient: 'radial-gradient(circle, #3d1b1b 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'pasta',
        name: {
          es: 'Pasta Fresca al Pomodoro y Burrata',
          en: 'Fresh Pasta al Pomodoro & Burrata'
        },
        description: {
          es: 'Tallarines elaborados a mano salteados en salsa de tomate cherry San Marzano madura, burrata de Puglia cremosa y albahaca fresca.',
          en: 'Hand-pulled fresh tagliatelle tossed in ripe San Marzano cherry tomato sauce, topped with creamy Apulian burrata and sweet basil.'
        },
        price: 17,
        dietary: ['V'],
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #3c1e2d 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'chicken',
        name: {
          es: 'Suprema de Pollo Crujiente',
          en: 'Crispy Chicken Suprema'
        },
        description: {
          es: 'Pollo de granja marinado, asado al punto con piel crujiente, acompañado de puré de patata cremoso, mix de brócoli rústico y aliño cítrico de miel de Poblenou.',
          en: 'Marinated farm chicken, roasted to juicy perfection with crispy skin, served with smooth potato mash, rustic broccoli, and Poblenou honey-citrus glaze.'
        },
        price: 15,
        dietary: [],
        imageUrl: 'https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #3d3326 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'burger',
        name: {
          es: 'Burger Nayam Gourmet',
          en: 'Nayam Gourmet Burger'
        },
        description: {
          es: '180g de ternera del Pirineo, queso cheddar vintage fundido, cebolla caramelizada al vino tinto y brotes frescos en brioche glaseado con patatas gajo.',
          en: '180g dry-aged Pyrenees beef, melted vintage cheddar, red-wine caramelized onions, and tender greens in glazed brioche with potato wedges.'
        },
        price: 16,
        dietary: [],
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #442a1a 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'tuna',
        name: {
          es: 'Tataki de Atún Rojo Sésamo',
          en: 'Seared Bluefin Tuna Tataki'
        },
        description: {
          es: 'Lomo de atún rojo marcado en costra de sésamo con puré de calabaza sedoso, espárragos trigueros a la plancha y brotes de sésamo crujientes.',
          en: 'Premium bluefin tuna loin seared in sesame crust, paired with silky pumpkin mash, pan-fired green asparagus, and crisp sesame shoots.'
        },
        price: 22,
        dietary: ['GF'],
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #1a2a30 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'ceviche',
        name: {
          es: 'Ceviche de Langostinos y Aguacate',
          en: 'Crispy Prawn & Avocado Ceviche'
        },
        description: {
          es: 'Langostinos curados en cítricos con cubitos de aguacate, manzana ácida verde, tomates cherry, aceite de oliva y escamas de Grana Padano.',
          en: 'Citrus-cured prawns tossed with fresh avocado cubes, crisp green apple, cherry tomatoes, extra virgin olive oil, and Grana Padano flakes.'
        },
        price: 19,
        dietary: ['SH', 'GF'],
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #253325 0%, var(--bg-deep) 100%)'
      }
    ]
  },
  {
    id: 'desserts',
    title: {
      es: 'Postres / Desserts',
      en: 'Postres / Desserts'
    },
    items: [
      {
        id: 'tiramisu',
        name: {
          es: 'Tiramisú de Especialidad Nayam',
          en: 'Nayam Espresso Tiramisu'
        },
        description: {
          es: 'Bizcocho savoiardi empapado en café espresso de especialidad, licor de Amaretto, crema batida de mascarpone artesano y cacao puro.',
          en: 'Savoiardi ladyfingers soaked in specialty single-origin espresso, Amaretto liqueur, whipped artisan mascarpone, and organic dark cocoa.'
        },
        price: 8,
        dietary: ['V'],
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
        backdropGradient: 'radial-gradient(circle, #2a201a 0%, var(--bg-deep) 100%)'
      },
      {
        id: 'coulant',
        name: {
          es: 'Coulant de Chocolate Lava',
          en: 'Warm Chocolate Lava Coulant'
        },
        description: {
          es: 'Volcán de chocolate negro 70% Ecuador templado con corazón fundido y helado artesanal de vainilla Bourbon de Madagascar.',
          en: 'Warm 70% Ecuadorian dark chocolate sponge with a molten liquid core, served with organic Madagascar Bourbon vanilla bean ice cream.'
        },
        price: 9,
        dietary: ['V'],
        imageUrl: coulantImg,
        backdropGradient: 'radial-gradient(circle, #3a1515 0%, var(--bg-deep) 100%)'
      }
    ]
  }
];
