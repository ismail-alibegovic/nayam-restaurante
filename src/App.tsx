import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Menu, X, Calendar, Users, Clock, Mail, User, Instagram, ArrowDown, CheckCircle, Info, Sun, Moon } from 'lucide-react';
import { Language, ReservationForm } from './types';
import { menuCategories } from './menuData';

// Local generated image assets loaded dynamically with ESM URLs
const heroBgImg = new URL('./assets/images/hero_restaurant_1780788279493.png', import.meta.url).href;


// Interactive Translations Registry
const t = {
  navInicio: { es: 'Inicio', en: 'Home' },
  navMenu: { es: 'Menú', en: 'Menu' },
  navAbout: { es: 'Nosotros', en: 'About' },
  navReservar: { es: 'Reservar', en: 'Reserve' },
  heroLabel: { es: 'BARCELONA · POBLENOU', en: 'BARCELONA · POBLENOU' },
  heroTitle: {
    es: 'Donde el sabor cobra vida',
    en: 'Where flavour comes alive'
  },
  heroTimes: {
    es: 'Brunch & Restaurante · Domingo a lunes, 08:00–23:00',
    en: 'Brunch & Restaurant · Sunday to Monday, 08:00–23:00'
  },
  heroCTA1: { es: 'Reservar Mesa', en: 'Book a Table' },
  heroCTA2: { es: 'Ver Menú', en: 'View Menu' },
  quote: {
    es: '“Ingredientes frescos, manos honestas, mesa compartida.”',
    en: '“Fresh ingredients, honest hands, a shared table.”'
  },
  pillOpen: { es: 'ABIERTO TODOS LOS DÍAS', en: 'OPEN EVERY DAY' },
  pillPoble: { es: 'POBLENOU, BARCELONA', en: 'POBLENOU, BARCELONA' },
  pillBrunch: { es: 'BRUNCH & CENAS', en: 'BRUNCH & DINNERS' },
  menuLabel: { es: 'NUESTRA PROPUESTA', en: 'OUR PROPOSAL' },
  menuTitle: { es: 'EL MENÚ', en: 'THE MENU' },
  menuDesc: {
    es: 'Una fusión culinaria urbana inspirada en los ingredientes de temporada del mercado barcelonés, elaborada con técnica artesanal.',
    en: 'An urban culinary fusion inspired by seasonal ingredients from the Barcelona market, crafted with artisanal technique.'
  },
  hoverDishHint: {
    es: 'Pasa el cursor por cualquier plato para explorar sus secretos culinarios en nuestro visor gastronómico.',
    en: 'Hover over any dish to explore its culinary secrets inside our interactive visualizer.'
  },
  dietaryLegend: { es: 'Leyenda Dietética / Dietary Legend', en: 'Legend Dietética / Dietary Legend' },
  vLabel: { es: 'Vegetariano', en: 'Vegetarian' },
  vgLabel: { es: 'Vegano', en: 'Vegan' },
  gfLabel: { es: 'Sin Gluten', en: 'Gluten Free' },
  shLabel: { es: 'Marisco', en: 'Contains Shellfish' },
  pairingLabel: { es: 'Sugerencia de maridaje:', en: 'Pairing recommendation:' },
  chefNoteLabel: { es: 'Nota del chef:', en: 'Chef\'s note:' },
  storyLabel: { es: 'NUESTRA HISTORIA / OUR STORY', en: 'OUR STORY / NUESTRA HISTORIA' },
  storyTitle: {
    es: 'Un rincón de Barcelona con alma propia',
    en: 'A corner of Barcelona with a soul of its own'
  },
  storyBody: {
    es: 'Nayam nació en el corazón de Poblenou con una idea simple: reunir a las personas alrededor de una buena mesa. Aquí, el desayuno puede convertirse en una celebración y la cena, en un recuerdo. Usamos ingredientes frescos de mercado, cocinados con respeto y servidos con calidez.',
    en: 'Nayam was born in the heart of Poblenou with a simple idea: to bring people together around a good table. Here, breakfast can become a celebration and dinner, a memory. We use fresh market ingredients, cooked with care and served with warmth.'
  },
  storyPhilosophyTitle: {
    es: 'La Brasería Verde y Botánica',
    en: 'The Green & Botanical Brasserie'
  },
  storyPhilosophyBody: {
    es: 'En Poblenou, el diseño industrial se funde con los jardines colgantes y un invernadero botánico urbano. Nayam es luz natural al mediodía y destellos dorados mágicos a la noche. Creemos en la hospitalidad sincera, platos honestos y un ambiente inmersivo insustituible.',
    en: 'In Poblenou, industrial design blends with hanging gardens and an urban botanical greenhouse. Nayam offers natural sunlight at noon and warm golden embers by night. We believe in sincere hospitality, honest plates, and irreplaceable ambiance.'
  },
  reserveTitle: { es: 'Reserva tu mesa', en: 'Reserve your table' },
  reserveSubtitle: {
    es: 'Para grupos de más de 6 personas, contáctanos directamente en reservas@nayambarcelona.com',
    en: 'For groups of 6+, please contact us directly at reservas@nayambarcelona.com'
  },
  fieldName: { es: 'Tu nombre', en: 'Your name' },
  fieldEmail: { es: 'Tu correo electrónico', en: 'Your email address' },
  fieldDate: { es: 'Selecciona fecha', en: 'Choose date' },
  fieldTime: { es: 'Hora de la reserva', en: 'Reservation time' },
  fieldGuests: { es: 'Número de comensales', en: 'Number of guests' },
  guestOption: { es: 'comensal[es]', en: 'guest[s]' },
  btnReserve: { es: 'CONFIRMAR RESERVA', en: 'CONFIRM RESERVATION' },
  reserveSuccessHead: { es: '¡RESERVA CONFIRMADA!', en: 'RESERVATION CONFIRMED!' },
  reserveSuccessBody: {
    es: '¡Qué gran noticia! Hemos reservado tu mesa de manera satisfactoria. Un correo de confirmación ha sido enviado a tu dirección.',
    en: 'Wonderful! Your table is now locked in. A confirmation email has been dispatched to your inbox.'
  },
  reserveSuccessDetails: { es: 'Detalles de tu experiencia:', en: 'Your experience details:' },
  reserveSuccessClose: { es: 'Hacer otra reserva', en: 'Book another table' },
  phoneAnchorText: { es: 'O contáctanos al: +34 932 189 097', en: 'Or contact us at: +34 932 189 097' },
  findUsTitle: { es: 'ENCUÉNTRANOS', en: 'FIND US' },
  hoursLabel: { es: 'Horarios de Apertura', en: 'Opening Hours' },
  hoursWeek: {
    es: 'Domingo a lunes: 08:00 – 23:00',
    en: 'Sunday to Monday: 08:00 – 23:00'
  },
  hoursWeekend: {
    es: 'Viernes y sábado: 08:00 – 00:00',
    en: 'Friday & Saturday: 08:00 – 00:00'
  },
  followUs: {
    es: 'Sigueonos en Instagram',
    en: 'Follow us on Instagram'
  },
  footerText: {
    es: '2026 Nayam Restaurante Barcelona',
    en: '2026 Nayam Restaurante Barcelona'
  },
  themeDark: {
    es: 'Modo Botánico Oscuro',
    en: 'Dark Botanical Mode'
  },
  themeLight: {
    es: 'Modo Invernadero Claro',
    en: 'Light Greenhouse Mode'
  }
};

// Premium wine / culinary descriptors corresponding to each dish
const chefExtraNotes: Record<string, { es: string; en: string; pairing: { es: string; en: string } }> = {
  benedict: {
    es: 'Ideal para los amantes de los sabores untuosos. La trufa negra aporta persistencia otoñal.',
    en: 'Perfect for those who enjoy luxurious, rich textures. The black truffle adds an autumnal depth.',
    pairing: { es: 'Mimosa clásica de naranja valenciana o Cava rosado brut.', en: 'Classic Valencia orange Mimosa or Cava rosado brut.' }
  },
  avocado: {
    es: 'Utilizamos aguacates orgánicos de Granada y pan de semillas fermentado durante 48h.',
    en: 'We source organic avocados from Granada and handcraft sourdough fermented for 48h.',
    pairing: { es: 'Té Matcha frío o vino blanco mineral Penedès.', en: 'Iced Matcha Tea or mineral white wine from Penedès.' }
  },
  pancakes: {
    es: 'El helado fundido se combina indulgentemente con el caramelo de arce tibio.',
    en: 'The melting ice cream fuses indulgently with the warm organic maple syrup dressing.',
    pairing: { es: 'Café Espresso de Etiopía con notas a jazmín.', en: 'Ethiopic Espresso with floral notes of jasmine.' }
  },
  granola: {
    es: 'Nuestra granola se hornea a baja temperatura cada mañana con pétalos de caléndula.',
    en: 'We slow-bake our custom granola every single morning with edible calendula petals.',
    pairing: { es: 'Zumo prensado en frío de manzana, kale y apio.', en: 'Cold pressed apple, curly kale, and celery juice.' }
  },
  prawns: {
    es: 'La suave reducción de bisque realza la dulzura natural de la gamba roja de Blanes.',
    en: 'The subtle reduction of rich bisque elevates the natural sweetness of our local Blanes prawns.',
    pairing: { es: 'Vino Albariño Rías Baixas con acidez nítida.', en: 'Crystalline Albariño white wine from Rías Baixas.' }
  },
  charcuterie: {
    es: 'Una selección mimada que representa el pasto y la dehesa salada de alta calidad.',
    en: 'A handpicked curation depicting the salt-whispered meadows of high-tier curing.',
    pairing: { es: 'Copa de vino tinto Ribera del Duero Crianza.', en: 'A glass of robust Ribera del Duero Crianza red wine.' }
  },
  hummus: {
    es: 'El toque ahumado proviene del pimentón secado tradicionalmente sobre brasas de encina.',
    en: 'The smoky accent stems from premium paprika dried on burning holm oak charcoal.',
    pairing: { es: 'Cerveza artesana I.P.A del Poblenou.', en: 'House craft IPA brewed locally in Poblenou.' }
  },
  beef: {
    es: 'La ternera madura se marca en sarmiento, lo que perfuma la veta grasa de forma excepcional.',
    en: 'Our aged beef is seared over vine shoots, leaving an incredibly aromatic, wood-scented marbling.',
    pairing: { es: 'Vino Priorat profundo con recuerdos a frutos negros.', en: 'Deep Priorat red wine hints with notes of dark berries.' }
  },
  pasta: {
    es: 'Pasta elaborada en nuestro obrador con sémola italiana y yemas de huevos de corral.',
    en: 'Homemade pasta spun in our kitchen using Italian semolina and organic free-range egg yolks.',
    pairing: { es: 'Vino tinto joven Chianti o Rosado mineral de la Rioja.', en: 'Young Chianti red wine or mineral Rosado from La Rioja.' }
  },
  chicken: {
    es: 'La costra de hierbas y miel sella los jugos interiores convirtiéndose en una delicia crujiente.',
    en: 'The sweet herb crust traps the interior juices, turning the skin into a satisfyingly crisp treat.',
    pairing: { es: 'Vino Chardonnay fermentado en barrica.', en: 'Barrel-aged buttery Chardonnay white wine.' }
  },
  burger: {
    es: 'Elaborada diariamente con aguja e idiazábal ahumado para potenciar el carácter.',
    en: 'Grind daily from premium chuck steak and beech-smoked Basque cheese for bold character.',
    pairing: { es: 'Vino Tinto de Cataluña o cerveza negra tostada.', en: 'Robust Catalan red wine or toasted artisan porter beer.' }
  },
  tuna: {
    es: 'Solo marcamos el atún por 12 segundos cada lado para conservar la pureza de la carne.',
    en: 'The tuna is kissed by the flame for only 12 seconds per side to protect the luxurious center meat.',
    pairing: { es: 'Copa de cava helado Raventós i Blanc.', en: 'A glass of ice-cold Raventós i Blanc premium dry cava.' }
  },
  ceviche: {
    es: 'La acidez cítrica se contrarresta elegantemente con la untuosidad del aguacate del sur.',
    en: 'The crisp citrus acidity is elegantly balanced by the creamy richness of Andalusian avocado.',
    pairing: { es: 'Vino blanco seco Sauvignon Blanc de Rueda.', en: 'Dry Sauvignon Blanc white wine from Rueda.' }
  },
  tiramisu: {
    es: 'Nuestra versión destaca por la ligereza silvestre de la crema batida fría al momento.',
    en: 'Our recipe stands out due to the airiness of our freshly-whipped marscarpone mousse.',
    pairing: { es: 'Copa de Moscatel dulce aromático.', en: 'A glass of sweet aromatic premium Moscatel dessert wine.' }
  },
  coulant: {
    es: 'La vainilla Bourbon refresca el paladar tras la intensidad del chocolate negro fundido.',
    en: 'The Bourbon vanilla bean refreshingly cleanses the palate after the dark chocolate explosion.',
    pairing: { es: 'Copa de Oporto Tawny o Pedro Ximénez.', en: 'A glass of complex Tawny Port or Pedro Ximénez sherry.' }
  }
};

export default function App() {
  // Localization State
  const [lang, setLang] = useState<Language>('es');

  // Interactive Menu selection inside Visualizer
  const [selectedCategory, setSelectedCategory] = useState<'brunch' | 'starters' | 'mains' | 'desserts'>('brunch');
  const [activeDishId, setActiveDishId] = useState<string>('benedict');
  
  // Track images that fail to load to display an elegant CSS backdrop gradient placeholder instead
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Theme support: 'dark' (Dark Botanical) or 'light' (Light Greenhouse)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Navigation state
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Reservation form state
  const [form, setForm] = useState<ReservationForm>({
    name: '',
    email: '',
    date: '',
    time: '20:00',
    guests: '2'
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // IntersectionObserver to sync active nav links
  useEffect(() => {
    const sections = ['inicio', 'menu', 'nosotros', 'reservar'];
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -60% 0px', // Highlights sections when they reach upper screen
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update menu default visual items based on category selection
  const handleCategoryChange = (catId: 'brunch' | 'starters' | 'mains' | 'desserts') => {
    setSelectedCategory(catId);
    const firstItem = menuCategories.find(c => c.id === catId)?.items[0];
    if (firstItem) {
      setActiveDishId(firstItem.id);
    }
  };

  // Prevent scroll when mobil menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Client side validation & submit simulated reservation
  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error on interact
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!form.name.trim()) {
      errors.name = lang === 'es' ? 'Introduce tu nombre por favor.' : 'Please enter your name.';
    } else if (form.name.trim().length < 3) {
      errors.name = lang === 'es' ? 'El nombre debe tener al menos 3 caracteres.' : 'Name must be at least 3 characters.';
    }

    if (!form.email.trim()) {
      errors.email = lang === 'es' ? 'Introduce tu email.' : 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = lang === 'es' ? 'Introduce un correo válido.' : 'Please enter a valid email address.';
    }

    if (!form.date) {
      errors.date = lang === 'es' ? 'Selecciona una fecha.' : 'Please select a reservation date.';
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = lang === 'es' ? 'La fecha no puede ser en el pasado.' : 'The date cannot be in the past.';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success response
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      date: '',
      time: '20:00',
      guests: '2'
    });
    setFormErrors({});
    setIsSubmitted(false);
  };

  // Lookup the currently selected dish details
  const currentCategoryObj = menuCategories.find(c => c.id === selectedCategory);
  const currentDish = currentCategoryObj?.items.find(i => i.id === activeDishId) || currentCategoryObj?.items[0];

  return (
    <div className="relative min-h-screen bg-bg-deep text-cream font-sans overflow-x-hidden selection:bg-gold selection:text-bg-deep">
      
      {/* Background Subtle Organic Noise Overlay */}
      <div className="noise-overlay" />

      {/* 1. FIXED NAVIGATION BAR */}
      <nav 
        id="navbar-root"
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/[0.05] bg-bg-deep/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <a href="#inicio" className="group flex flex-col justify-center select-none cursor-pointer">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.16em] text-cream transition-colors duration-300 group-hover:text-gold leading-none">
              NAYAM
            </span>
            <span className="font-script text-xs font-light italic tracking-[0.3em] text-muted text-center transition-colors duration-300 group-hover:text-gold-light mt-1">
              Restaurante
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12">
            {[
              { id: 'inicio', label: t.navInicio[lang] },
              { id: 'menu', label: t.navMenu[lang] },
              { id: 'nosotros', label: t.navAbout[lang] },
              { id: 'reservar', label: t.navReservar[lang] },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`font-sans text-sm font-medium tracking-widest uppercase transition-colors duration-300 relative py-1 ${
                  activeSection === link.id ? 'text-gold' : 'text-cream/75 hover:text-gold-light'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-light scale-x-100 origin-left transition-transform duration-300" />
                )}
              </a>
            ))}
          </div>

          {/* Right Action: Language and Menu controls */}
          <div className="flex items-center space-x-4">
            
            {/* Language Toggle Link */}
            <button
              id="lang-toggle"
              onClick={() => setLang(prev => (prev === 'es' ? 'en' : 'es'))}
              className="px-3.5 py-1.5 border border-gold/40 hover:border-gold rounded-full text-xs font-semibold tracking-widest text-gold-light hover:bg-gold/10 transition-all duration-300"
              aria-label="Switch Language"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Mobile Burger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden text-cream hover:text-gold transition-colors p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sliding Overlay Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-bg-deep flex flex-col justify-center px-12 transition-all duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-x-full'
        }`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-sm aspect-square bg-green-dark/20 rounded-full filter blur-[80px]" />
        
        <div className="flex flex-col space-y-8">
          {[
            { id: 'inicio', label: t.navInicio[lang] },
            { id: 'menu', label: t.navMenu[lang] },
            { id: 'nosotros', label: t.navAbout[lang] },
            { id: 'reservar', label: t.navReservar[lang] },
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-serif text-3xl font-semibold tracking-wider transition-colors duration-300 ${
                activeSection === link.id ? 'text-gold-light' : 'text-cream/80 hover:text-gold'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-white/[0.05] flex flex-col space-y-4">
          <p className="text-xs tracking-wider text-muted select-none">
            Carrer del Doctor Trueta, 218 · Poblenou · BCN
          </p>
          <a
            href="https://instagram.com/nayambarcelona"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-gold hover:text-gold-light transition-colors space-x-2"
          >
            <Instagram size={14} />
            <span>@nayambarcelona</span>
          </a>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section 
        id="inicio"
        className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-bg-deep"
      >
        {/* Immersive background image using custom generated local asset */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('${heroBgImg}')` }}
        />
        {/* Subtle radial gradient for exquisite typography readability */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_20%,_var(--bg-deep)_85%] pointer-events-none" />
        {/* Glowing Ambient Light Backdrops */}
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-green-mid/20 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute left-1/4 top-1/4 w-[300px] h-[300px] bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

        {/* Dynamic Abstract Botanical Fern Silhouettes using Inline SVG */}
        <div className="absolute right-[-10%] top-1/4 -z-0 pointer-events-none text-green-mid select-none max-w-lg lg:max-w-xl botanical-optimized">
          <svg className="w-full h-auto" viewBox="0 0 100 120" fill="currentColor">
            <path d="M10,110 C30,90 60,65 90,60 C90,60 85,73 70,80 C50,89 20,112 10,110" />
            <path d="M15,100 C25,85 55,50 85,35 C80,48 60,60 40,75 C25,86 18,97 15,100" />
            <path d="M22,90 C35,70 65,35 95,20 C85,30 70,45 50,60 C32,73 25,85 22,90" />
            <path d="M30,80 C45,60 70,20 98,5 C82,15 65,32 45,50 C32,64 30,75 30,80" />
            <path d="M40,75 C52,50 78,12 99,0 C80,10 60,25 42,42 C30,55 40,75 40,75" />
            
            {/* Abstract Frond Nodes */}
            <circle cx="85" cy="35" r="1" className="text-gold-light/45" />
            <circle cx="95" cy="20" r="1.5" className="text-gold-light/45" />
            <circle cx="98" cy="5" r="1.2" className="text-gold-light/45" />
          </svg>
        </div>

        {/* Content Centered-Left */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10 py-12">
          <div className="max-w-3xl flex flex-col items-start animate-fade-in-up">
            
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.05] mb-8">
              <span className="block">{t.heroTitle[lang].split(' ')[0]}</span>
              <span className="block italic font-light text-gold-light md:pl-8">
                {t.heroTitle[lang].split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <p className="font-sans text-base md:text-lg text-cream/80 max-w-xl font-light tracking-wide leading-relaxed mb-10 border-l border-gold/30 pl-6">
              {t.heroTimes[lang]}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
              <a
                href="#reservar"
                className="group relative overflow-hidden bg-gold hover:bg-gold-light text-bg-deep text-center px-10 py-5 rounded-none font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_30px_rgba(200,169,110,0.15)]"
              >
                <span className="relative z-10 transition-colors">{t.heroCTA1[lang]}</span>
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
              </a>

              <a
                href="#menu"
                className="group border border-cream/25 hover:border-gold text-white text-center px-10 py-5 rounded-none font-medium text-xs tracking-[0.2em] uppercase bg-transparent transition-all duration-300 hover:bg-gold/5"
              >
                {t.heroCTA2[lang]}
              </a>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer select-none">
          <a href="#filosofia" className="text-gold/60 hover:text-gold transition-colors flex flex-col items-center">
            <span className="font-script text-xs tracking-wider mb-2 opacity-85">Scroll</span>
            <ArrowDown size={14} className="animate-bounce" />
          </a>
        </div>
      </section>

      {/* 3. PHILOSOPHY / INTRO STRIP */}
      <section 
        id="filosofia"
        className="relative bg-bg-section overflow-hidden py-24 md:py-32 border-y border-white/[0.03]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Vintage style serif separator symbol */}
            <div className="text-gold/40 text-xl font-serif mb-8 select-none">❖</div>

            <p className="font-script text-3xl sm:text-4xl md:text-5xl italic font-light tracking-wide text-cream leading-normal mb-12">
              {t.quote[lang]}
            </p>



          </div>
        </div>
      </section>

      {/* Decorative Botanical Magazine-Style Spread Divider */}
      <div className="relative flex items-center justify-center py-6 bg-bg-deep select-none pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-white/[0.05]" />
        </div>
        <div className="relative px-8 bg-bg-deep flex items-center space-x-4 text-gold/40">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/20" />
          <svg className="w-8 h-8 opacity-60 transition-transform duration-1000 drift-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* Elegant symmetrical botanical branch */}
            <path d="M12 3v18" strokeLinecap="round" />
            <path d="M12 6c1.5-1.5 3.5-1.5 4 0-.5 1-2.5 1.5-4 0z" fill="currentColor" fillOpacity="0.05" />
            <path d="M12 6c-1.5-1.5-3.5-1.5-4 0 .5 1 2.5 1.5 4 0z" fill="currentColor" fillOpacity="0.05" />
            <path d="M12 11c2-1.5 4-1 4.5.5-.5 1-2.5 1-4.5-.5z" fill="currentColor" fillOpacity="0.05" />
            <path d="M12 11c-2-1.5-4-1-4.5.5.5 1 2.5 1 4.5-.5z" fill="currentColor" fillOpacity="0.05" />
            <path d="M12 16c2-1 3.5-0.5 4 1-.5.8-2 0.8-4-1z" fill="currentColor" fillOpacity="0.05" />
            <path d="M12 16c-2-1-3.5-0.5-4 1 .5.8 2 0.8 4-1z" fill="currentColor" fillOpacity="0.05" />
          </svg>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/20" />
        </div>
      </div>

      {/* 4. MENU SECTION */}
      <section 
        id="menu"
        className="relative py-24 md:py-32 bg-bg-deep"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Header row with a thin extending line */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-[0.25em] text-gold uppercase mb-3 block">
                {t.menuLabel[lang]}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white uppercase flex items-center">
                <span>{t.menuTitle[lang]}</span>
                <span className="hidden sm:inline-block h-[1px] bg-gold/30 flex-1 ml-8 max-w-xs" />
              </h2>
            </div>
            <p className="font-sans text-muted text-sm md:text-base max-w-md leading-relaxed pr-4">
              {t.menuDesc[lang]}
            </p>
          </div>

          {/* Categories Tab Navigation */}
          <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.05] pb-6 mb-12">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`py-3.5 px-6 font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 border rounded-none ${
                  selectedCategory === cat.id
                    ? 'bg-gold border-gold text-bg-deep shadow-[0_4px_20px_rgba(200,169,110,0.1)]'
                    : 'bg-transparent border-white/[0.08] hover:border-gold-light hover:bg-white/[0.02]'
                }`}
              >
                {cat.id === 'brunch' ? t.navInicio[lang] + ' & ' + cat.title[lang].split(' ')[0] : cat.title[lang]}
              </button>
            ))}
          </div>

          {/* Two Column Asymmetrical Interactive Menu Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
            
            {/* Left side: Scroll loop list of items */}
            <div className="lg:col-span-7 space-y-8">
              {currentCategoryObj?.items.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveDishId(item.id)}
                  onClick={() => setActiveDishId(item.id)}
                  className={`group p-6 border transition-all duration-300 cursor-pointer ${
                    activeDishId === item.id
                      ? 'bg-bg-mid border-gold/40 shadow-xl scale-[1.01]'
                      : 'bg-transparent border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-sans text-base sm:text-lg font-medium tracking-wide text-cream group-hover:text-gold-light transition-colors flex items-center gap-3">
                      <span>{item.name[lang]}</span>
                      
                      {/* Dietary Badges */}
                      <div className="flex items-center gap-1.5">
                        {item.dietary.map((d) => (
                          <span
                            key={d}
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold leading-none ${
                              d === 'V' ? 'bg-green-mid/50 border border-green-light text-green-300' :
                              d === 'VG' ? 'bg-green-700/50 border border-green-500 text-green-200' :
                              d === 'GF' ? 'bg-amber-700/50 border border-amber-500 text-amber-200' :
                              'bg-rose-700/50 border border-rose-500 text-rose-200'
                            }`}
                            title={d}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </h3>
                    
                    {/* Dotted pricing line */}
                    <span className="mx-2 flex-grow border-b border-dashed border-white/[0.15] relative -top-1" />
                    
                    <span className="font-serif text-base font-bold text-gold shrink-0">
                      {item.price}€
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-xs.5 text-muted tracking-wide leading-relaxed max-w-xl">
                    {item.description[lang]}
                  </p>
                </div>
              ))}

              {/* Informative Dietary Indicators Legend card */}
              <div className="p-6 bg-white/[0.02] border border-white/[0.06] mt-8">
                <h4 className="text-xs font-semibold tracking-wider text-muted mb-4 uppercase">
                  {t.dietaryLegend[lang]}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-green-mid/50 border border-green-light text-green-300 flex items-center justify-center text-[9px] font-bold">V</span>
                    <span className="text-xs text-muted">{t.vLabel[lang]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-green-700/50 border border-green-500 text-green-200 flex items-center justify-center text-[9px] font-bold">VG</span>
                    <span className="text-xs text-muted">{t.vgLabel[lang]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-amber-700/50 border border-amber-500 text-amber-200 flex items-center justify-center text-[9px] font-bold">GF</span>
                    <span className="text-xs text-muted">{t.gfLabel[lang]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-rose-700/50 border border-rose-500 text-rose-200 flex items-center justify-center text-[9px] font-bold">SH</span>
                    <span className="text-xs text-muted">{t.shLabel[lang]}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right side: Interactive Visualizer & details showcase */}
            <div className="hidden lg:block lg:col-span-5 sticky top-36">
              <div className="border border-white/10 bg-bg-mid shadow-2xl relative overflow-hidden flex flex-col group/panel">
                
                {/* Visual Image container with radial gradient background in fallback */}
                <div 
                  className="aspect-[4/3] relative w-full overflow-hidden transition-all duration-500 border-b border-white/[0.08]"
                  style={{ 
                    background: currentDish?.backdropGradient || 'radial-gradient(circle, var(--green-mid) 0%, var(--bg-deep) 100%)'
                  }}
                >
                  {currentDish?.imageUrl && !failedImages[currentDish.id] && (
                    <img 
                      src={currentDish.imageUrl} 
                      alt={currentDish.name[lang]}
                      onError={() => {
                        setFailedImages(prev => ({ ...prev, [currentDish.id!]: true }));
                      }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover/panel:scale-105"
                    />
                  )}

                  {/* Atmospheric gold smoke gradient hover mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-mid via-bg-mid/20 to-black/20 pointer-events-none" />
                  
                  {/* Replace Real Photo Tag strictly complying with user requirement */}
                  <div className="absolute top-4 right-4 bg-black/75 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/30 pointer-events-none">
                    {/* REPLACE WITH REAL PHOTO */}
                    @nayambarcelona original
                  </div>

                  {(!currentDish?.imageUrl || failedImages[currentDish.id]) && (
                    <div className="absolute inset-0 flex items-center justify-center flex-col p-6 text-center select-none animate-[fade-in_0.5s_ease-out_forwards]">
                      <span className="font-serif text-lg md:text-xl tracking-wider italic text-gold">
                        {currentDish?.name[lang]}
                      </span>
                      <span className="text-xs tracking-widest text-muted uppercase mt-2">
                        NAYAM BRUNCH &amp; SELECTION
                      </span>
                      <span className="text-[9px] text-gold/50 font-sans tracking-widest lowercase italic mt-1 bg-black/45 px-2 py-0.5 rounded-sm border border-gold/10">
                        (visual ambiance active)
                      </span>
                    </div>
                  )}
                </div>

                {/* Gastronomic text specs content */}
                <div className="p-8 pb-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="h-[1px] w-8 bg-gold" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-light">
                      {selectedCategory} · Detail
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl font-bold tracking-tight text-white mb-4">
                    {currentDish?.name[lang]}
                  </h4>

                  <p className="font-sans text-xs.5 text-muted leading-relaxed tracking-wide mb-6">
                    {currentDish?.description[lang]}
                  </p>

                  {/* Sommelier & Chef curation notes */}
                  {currentDish?.id && chefExtraNotes[currentDish.id] && (
                    <div className="border-t border-white/[0.06] pt-6 space-y-4">
                      
                      <div className="flex items-start space-x-3">
                        <Info size={14} className="text-gold shrink-0 mt-0.5" />
                        <p className="text-xs text-cream/90 leading-relaxed font-sans font-light">
                          <strong className="text-gold-light italic tracking-wider block font-serif text-sm mb-1">{t.chefNoteLabel[lang]}</strong>
                          {chefExtraNotes[currentDish.id][lang]}
                        </p>
                      </div>

                      <div className="flex items-start space-x-3 pt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                        <p className="text-xs text-cream/80 leading-relaxed font-sans font-light">
                          <strong className="text-gold-light text-xs.5 uppercase tracking-wide inline-block mr-1.5">{t.pairingLabel[lang]}</strong>
                          {chefExtraNotes[currentDish.id].pairing[lang]}
                        </p>
                      </div>

                    </div>
                  )}

                </div>
              </div>

              {/* Decorative hover hint */}
              <p className="text-center text-[11px] font-sans italic text-muted mt-4">
                {t.hoverDishHint[lang]}
              </p>
            </div>

          </div>

          {/* Interactive Mobile Visualizer Block (Shown on tiny screens when dish is clicked) */}
          <div className="block lg:hidden mt-12 border border-white/10 bg-bg-mid p-6">
            <h4 className="font-serif text-lg font-bold text-gold-light mb-2">
              {currentDish?.name[lang]}
            </h4>
            <p className="text-xs text-muted mb-4">
              {currentDish?.description[lang]}
            </p>
            {currentDish?.id && chefExtraNotes[currentDish.id] && (
              <div className="border-t border-white/[0.06] pt-4 space-y-3">
                <p className="text-xs text-cream/90 font-light leading-relaxed">
                  <span className="text-gold font-semibold uppercase text-[10px] block mb-0.5">{t.chefNoteLabel[lang]}</span>
                  {chefExtraNotes[currentDish.id][lang]}
                </p>
                <p className="text-xs text-cream/80 font-light leading-relaxed">
                  <span className="text-gold font-semibold uppercase text-[10px] block mb-0.5">{t.pairingLabel[lang]}</span>
                  {chefExtraNotes[currentDish.id].pairing[lang]}
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. ABOUT / NOSOTROS SECTION */}
      <section 
        id="nosotros"
        className="relative overflow-hidden bg-bg-section min-h-screen flex items-center py-20 md:py-0 border-t border-white/[0.03]"
      >
        <div className="w-full max-w-7xl mx-auto md:h-screen grid grid-cols-1 md:grid-cols-12 gap-0 md:items-stretch">
          
          {/* Asymmetric left photo visual block taking 55% space */}
          <div 
            className="col-span-12 md:col-span-6 lg:col-span-7 bg-cover bg-center min-h-[350px] md:min-h-0 relative flex items-center justify-center overflow-hidden border-r border-white/[0.05]"
            style={{ 
              backgroundImage: `url('${heroBgImg}')` 
            }}
          >
            {/* Dark green & warm bronze ambiance shadows overlay */}
            <div className="absolute inset-0 bg-radial-[circle_at_left,_transparent_10%,_rgba(15,15,13,0.8)_90%] bg-green-dark/25" />
            
            {/* Gold atmospheric flare */}
            <div className="absolute bottom-10 left-10 w-44 h-44 bg-gold/10 rounded-full filter blur-[60px]" />
            
            {/* REPLACE WITH REAL PHOTO Tag strictly complying with user requirement */}
            <div className="absolute bottom-6 left-6 bg-black/85 px-4 py-2 border border-gold/30 text-xs tracking-widest text-gold uppercase font-semibold">
              {/* REPLACE WITH REAL PHOTO */}
              NAYAM Interior Atmosphere
            </div>
          </div>

          {/* Right side narrative block taking 45% space */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-bg-deep select-none">
            
            <span className="text-xs font-bold tracking-[0.25em] text-gold uppercase mb-4 block">
              {t.storyLabel[lang]}
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">
              {t.storyTitle[lang]}
            </h2>

            <div className="space-y-6">
              <p className="font-sans text-sm sm:text-base leading-relaxed text-cream/80 font-light tracking-wide">
                {t.storyBody[lang]}
              </p>

              <div className="h-[1px] w-24 bg-gold/40 my-8" />

              <h4 className="font-serif text-xl italic font-semibold text-gold-light">
                {t.storyPhilosophyTitle[lang]}
              </h4>

              <p className="font-sans text-xs.5 sm:text-sm leading-relaxed text-cream/70 font-light tracking-wide">
                {t.storyPhilosophyBody[lang]}
              </p>
            </div>

            {/* Aesthetic signature or coordinates */}
            <div className="mt-12 flex items-center space-x-3 select-none">
              <span className="font-mono text-xs text-muted">BCN 41.3986° N, 2.2011° E</span>
              <span className="h-[1px] w-12 bg-white/10" />
              <span className="font-script text-gold italic text-sm">Poblenou</span>
            </div>

          </div>

        </div>
      </section>

      {/* 6. RESERVATIONS SECTION */}
      <section 
        id="reservar"
        className="relative py-24 md:py-32 bg-bg-deep border-t border-white/[0.05]"
      >
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6">
              <Calendar size={18} className="text-gold" />
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase mb-4">
              {t.reserveTitle[lang]}
            </h2>

            <p className="font-sans text-xs sm:text-sm text-gold-light max-w-lg mx-auto font-light leading-relaxed tracking-wide">
              {t.reserveSubtitle[lang]}
            </p>
          </div>

          {/* Reservation Card Form Block */}
          <div className="bg-bg-mid border border-white/[0.06] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            
            {/* Subtle glow border */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-85" />

            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                
                {/* 2-column Name & Email fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Name field */}
                  <div className="relative group/field">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gold block mb-2">
                      {t.fieldName[lang]} *
                    </label>
                    <div className="flex items-center border-b border-white/20 focus-within:border-gold py-1.5 transition-colors">
                      <User size={14} className="text-muted mr-3" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder={lang === 'es' ? 'p. ej. María García' : 'e.g. Maria Garcia'}
                        className="bg-transparent border-0 outline-none w-full text-sm font-sans text-white placeholder-cream/35 focus:ring-0 p-0"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="text-xs text-red-400 font-sans tracking-wide mt-1.5">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="relative group/field">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gold block mb-2">
                      {t.fieldEmail[lang]} *
                    </label>
                    <div className="flex items-center border-b border-white/20 focus-within:border-gold py-1.5 transition-colors">
                      <Mail size={14} className="text-muted mr-3" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="maria@direct.com"
                        className="bg-transparent border-0 outline-none w-full text-sm font-sans text-white placeholder-cream/35 focus:ring-0 p-0"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-xs text-red-400 font-sans tracking-wide mt-1.5">{formErrors.email}</p>
                    )}
                  </div>

                </div>

                {/* 3-column Date, Time and Guests counters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2">
                  
                  {/* Date field */}
                  <div className="relative group/field">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gold block mb-2">
                      {t.fieldDate[lang]} *
                    </label>
                    <div className="flex items-center border-b border-white/20 focus-within:border-gold py-1.5 transition-colors">
                      <Calendar size={14} className="text-muted mr-3" />
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleFormChange}
                        className="bg-transparent border-0 outline-none w-full text-sm font-sans text-white placeholder-cream/35 focus:ring-0 p-0 [color-scheme:dark]"
                      />
                    </div>
                    {formErrors.date && (
                      <p className="text-xs text-red-400 font-sans tracking-wide mt-1.5">{formErrors.date}</p>
                    )}
                  </div>

                  {/* Time Select */}
                  <div className="relative group/field">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gold block mb-2">
                      {t.fieldTime[lang]}
                    </label>
                    <div className="flex items-center border-b border-white/20 focus-within:border-gold py-1.5 transition-colors">
                      <Clock size={14} className="text-muted mr-3" />
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleFormChange}
                        className="bg-transparent border-0 outline-none w-full text-sm font-sans text-white placeholder-cream/35 focus:ring-0 p-0 [color-scheme:dark]"
                      >
                        {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '19:00', '20:00', '21:00', '22:00'].map((time) => (
                          <option key={time} value={time} className="bg-bg-mid text-white">{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guests Selector */}
                  <div className="relative group/field">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gold block mb-2">
                      {t.fieldGuests[lang]}
                    </label>
                    <div className="flex items-center border-b border-white/20 focus-within:border-gold py-1.5 transition-colors">
                      <Users size={14} className="text-muted mr-3" />
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleFormChange}
                        className="bg-transparent border-0 outline-none w-full text-sm font-sans text-white placeholder-cream/35 focus:ring-0 p-0 [color-scheme:dark]"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num.toString()} className="bg-bg-mid text-white">
                            {num} {t.guestOption[lang]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>

                {/* Confirm Action Button */}
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-light text-bg-deep font-bold text-xs tracking-[0.25em] uppercase py-5 rounded-none transition-all duration-300 mt-6 shadow-[0_4px_30px_rgba(200,169,110,0.1)]"
                >
                  {t.btnReserve[lang]}
                </button>

                <p className="text-center font-sans tracking-wide text-xs text-muted">
                  {t.phoneAnchorText[lang]}
                </p>

              </form>
            ) : (
              
              /* Reservation Success Display View with Reward Frame scale animations */
              <div className="py-8 text-center select-none success-reward-card">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold flex items-center justify-center mx-auto mb-6 success-icon-reward">
                  <CheckCircle size={32} className="text-gold" />
                </div>

                <h3 className="font-serif text-2xl font-bold tracking-wider text-white uppercase mb-4">
                  {t.reserveSuccessHead[lang]}
                </h3>

                <p className="font-sans text-sm text-cream/80 max-w-md mx-auto leading-relaxed tracking-wide mb-8">
                  {t.reserveSuccessBody[lang]}
                </p>

                {/* Summary statistics panel */}
                <div className="bg-white/[0.03] border border-white/[0.06] p-6 max-w-md mx-auto text-left mb-10">
                  <h4 className="text-[10px] font-bold tracking-widest text-gold uppercase mb-3 border-b border-white/[0.08] pb-1.5">
                    {t.reserveSuccessDetails[lang]}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted block font-sans tracking-wider text-[10px] uppercase">Invitado / Guest:</span>
                      <strong className="text-cream font-medium text-sm leading-relaxed">{form.name}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-sans tracking-wider text-[10px] uppercase">Comensales / Size:</span>
                      <strong className="text-cream font-medium text-sm leading-relaxed">{form.guests} comensales</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-sans tracking-wider text-[10px] uppercase">Fecha / Date:</span>
                      <strong className="text-cream font-medium text-sm leading-relaxed">{form.date}</strong>
                    </div>
                    <div>
                      <span className="text-muted block font-sans tracking-wider text-[10px] uppercase">Hora / Time:</span>
                      <strong className="text-cream font-medium text-sm leading-relaxed">{form.time} h</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="px-8 py-3.5 border border-gold text-gold hover:bg-gold/10 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                >
                  {t.reserveSuccessClose[lang]}
                </button>
              </div>

            )}

          </div>

        </div>
      </section>

      {/* 7. FIND US / ENCUÉNTRANOS SECTION */}
      <section 
        className="relative bg-bg-section py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-stretch">
            
            {/* Left side address summary */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div className="space-y-8">
                
                <div className="border-l border-gold pl-6">
                  <span className="text-xs font-bold tracking-widest text-gold uppercase mb-2 block">
                    NAYAM BARCELONA
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold uppercase text-white leading-tight">
                    {t.findUsTitle[lang]}
                  </h3>
                </div>

                {/* Physical address specs */}
                <div className="space-y-4">
                  <p className="font-sans text-sm tracking-wide text-cream/90 font-light leading-relaxed">
                    Carrer del Doctor Trueta, 218, Local 2
                    <br />
                    08005 Barcelona, España (Poblenou)
                  </p>
                  
                  <p className="text-xs.5 text-gold-light hover:underline font-light">
                    <a href="https://maps.google.com/?q=Nayam+Carrer+del+Doctor+Trueta+218+Barcelona" target="_blank" rel="noopener noreferrer">
                      ➔ Google Maps Directions
                    </a>
                  </p>
                </div>

                {/* Operating hours list */}
                <div className="pt-4 border-t border-white/[0.06] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gold">
                    {t.hoursLabel[lang]}
                  </h4>
                  <ul className="text-sm text-cream/85 font-light space-y-2">
                    <li className="flex justify-between">
                      <span className="opacity-80">Domingo – Lunes / Sun – Mon:</span>
                      <strong className="text-gold-light">08:00 – 23:00</strong>
                    </li>
                    <li className="flex justify-between">
                      <span className="opacity-80">Martes – Jueves / Tue – Thu:</span>
                      <strong className="text-gold-light">08:00 – 23:00</strong>
                    </li>
                    <li className="flex justify-between">
                      <span className="opacity-80">Viernes – Sábado / Fri – Sat:</span>
                      <strong className="text-gold-light">08:00 – 00:00</strong>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Instagram link tag */}
              <div className="pt-10 lg:pt-0">
                <a
                  href="https://instagram.com/nayambarcelona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-4 bg-white/[0.02] hover:bg-gold/10 border border-white/[0.08] hover:border-gold py-4 px-6 transition-all duration-300 w-[245.523px] h-[50px]"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg-deep transition-all duration-300">
                    <Instagram size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted tracking-wide block uppercase font-bold leading-none mb-1">
                      {t.followUs[lang]}
                    </span>
                    <strong className="text-sm text-cream tracking-wide font-medium">
                      @nayambarcelona
                    </strong>
                  </div>
                </a>
              </div>

            </div>

            {/* Right side Google Map with dark sepia filters */}
            <div className="lg:col-span-7 h-[350px] sm:h-[450px] lg:h-auto min-h-[400px] border border-white/[0.08] relative overflow-hidden group">
              
              <iframe
                title="Nayam Restaurante Map Google"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.4!2d2.2011!3d41.3986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3aa45550229%3A0xf9113d32ae199097!2sNayam!5e0!3m2!1ses!2ses!4v1700000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="map-dark-sepia w-full h-full transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Decorative Map Frame Accent Overlay */}
              <div className="absolute inset-x-0 bottom-0 top-auto h-12 bg-gradient-to-t from-bg-section to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 left-0 right-auto w-12 bg-gradient-to-r from-bg-section to-transparent pointer-events-none" />

            </div>

          </div>

        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="relative bg-bg-deep py-12 md:py-16 border-t border-white/[0.05] select-none text-[11px] font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center md:text-left">
          
          {/* Footer brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-lg font-bold tracking-[0.2em] leading-none mb-1">
              NAYAM
            </span>
            <span className="font-script text-[10px] italic tracking-widest text-gold-light pl-1">
              Restaurante · Barcelona
            </span>
          </div>

          {/* Centered copyright notice details */}
          <p className="text-muted max-w-md md:max-w-xl mx-auto text-[11px] leading-relaxed">
            {t.footerText[lang]}
          </p>

          {/* Social connections */}
          <div className="flex items-center space-x-6">
            <a 
              href="#inicio" 
              className="text-muted hover:text-gold uppercase tracking-wider transition-colors font-medium text-[10px]"
            >
              {t.navInicio[lang]}
            </a>
            <a 
              href="#menu" 
              className="text-muted hover:text-gold uppercase tracking-wider transition-colors font-medium text-[10px]"
            >
              {t.navMenu[lang]}
            </a>
            <a
              href="https://instagram.com/nayambarcelona"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-gold transition-colors"
              aria-label="Instagram Profile"
            >
              <Instagram size={16} />
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
