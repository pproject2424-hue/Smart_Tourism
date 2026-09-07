import { Destination, Review, VirtualTourSpot, Product, EventFestival, EducationMaterial, Booking } from './types';

export const initialDestinations: Destination[] = [
  {
    id: 'puncak-darma',
    name: 'Puncak Darma',
    category: 'hill',
    categoryLabel: 'Bukit & Puncak',
    description: 'Puncak Darma adalah salah satu dataran tertinggi di kawasan Geopark Ciletuh yang berada di ketinggian 230 meter di atas permukaan laut. Dari tempat ini, wisatawan dapat menikmati pemandangan spektakuler teluk Ciletuh yang berbentuk tapal kuda raksasa (Amphitheatre), hamparan sawah, perbukitan hijau, dan pemandangan samudera luas Samudera Hindia secara utuh, terutama di kala matahari terbenam.',
    location: 'Desa Girimukti, Kecamatan Ciemas, Sukabumi',
    latitude: -7.170,
    longitude: 106.496,
    openingHours: '06:00 - 18:00 WIB',
    ticketPrice: 15000,
    contactNumber: '+62 821-2345-0001',
    rating: 4.8,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Area Parkir Luas', 'Warung Kuliner Lokal', 'Mushola', 'Toilet Bersih', 'Spot Foto Instagramable', 'Gazebo Istirahat'],
    spots: ['Gardu Pandang Utama', 'Ayunan Sunset', 'Jembatan Selfie Kayu'],
    weatherRealtime: {
      temp: 26,
      condition: 'Cerah Berawan',
      humidity: 78,
      crowdLevel: 'Medium'
    }
  },
  {
    id: 'curug-cimarinjung',
    name: 'Curug Cimarinjung',
    category: 'waterfall',
    categoryLabel: 'Air Terjun',
    description: 'Curug Cimarinjung dikenal sebagai ikon air terjun terindah di Geopark Ciletuh. Memiliki ketinggian aliran air sektar 50 meter, letaknya tersembunyi di balik persawahan hijau dan tebing batu purba yang berusia jutaan tahun yang berwarna merah bata kemerahan. Tebing batuan di sekeliling air terjun ini terdiri dari lava andesit purba penyusun kawasan Geopark Ciletuh.',
    location: 'Desa Ciwaru, Kecamatan Ciemas, Sukabumi',
    latitude: -7.174,
    longitude: 106.488,
    openingHours: '08:00 - 17:00 WIB',
    ticketPrice: 10000,
    contactNumber: '+62 821-2345-0002',
    rating: 4.7,
    reviewsCount: 289,
    image: 'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Pemandu Lokal', 'Kedai Minuman', 'Toilet & Ruang Ganti', 'Toko Souvenir', 'Jalur Treking Berlevel'],
    spots: ['Dek Pemantau Bawah', 'Tebing Batu Purba Merah', 'Spot Foto Jembatan Curug'],
    weatherRealtime: {
      temp: 28,
      condition: 'Hujan Ringan',
      humidity: 85,
      crowdLevel: 'Low'
    }
  },
  {
    id: 'curug-awang',
    name: 'Curug Awang',
    category: 'waterfall',
    categoryLabel: 'Air Terjun',
    description: 'Sering dijuluki sebagai "Niagara Mini dari Jawa Barat", Curug Awang menyuguhkan lebar tebing aliran air setinggi 40 meter dengan bentang lebar hampir 60 meter. Tatkala musim hujan tiba, keseluruhan tebing batu ditutupi tirai air yang menggila dan menciptakan kabut percikan air yang megah. Tipe batuan penyusun adalah breksi berkomponen batu apung purba.',
    location: 'Desa Cibenda, Kecamatan Ciemas, Sukabumi',
    latitude: -7.218,
    longitude: 106.521,
    openingHours: '08:00 - 17:00 WIB',
    ticketPrice: 10000,
    contactNumber: '+62 821-2345-0003',
    rating: 4.6,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Area Parkir Mobil', 'Sewa Sandal Gunung', 'Kantin Desa Wisata', 'Papan Informasi Geologi'],
    spots: ['Tebing Niagara Utama', 'Spot Pandang Ketinggian', 'Aliran Sungai Ciletuh Purba'],
    weatherRealtime: {
      temp: 27,
      condition: 'Cerah',
      humidity: 74,
      crowdLevel: 'Low'
    }
  },
  {
    id: 'pantai-palangpang',
    name: 'Pantai Palangpang',
    category: 'beach',
    categoryLabel: 'Pantai',
    description: 'Pantai Palangpang adalah pintu gerbang utama ke kepulauan Geopark Ciletuh dari arah laut, sekaligus menjadi pusat berkumpulnya para nelayan tradisional. Pantai pasir hitam kecoklatan yang landai ini membentang luas membentuk sabuk pengaman samudera. Pantai ini juga berfungsi sebagai pendaratan aktivitas paralayang ekstrem dan tempat bersandarnya perahu-perahu wisata untuk berkeliling tebing Geosite di teluk Ciletuh.',
    location: 'Desa Ciwaru, Kecamatan Ciemas, Sukabumi',
    latitude: -7.165,
    longitude: 106.480,
    openingHours: '24 Jam',
    ticketPrice: 5000,
    contactNumber: '+62 821-2345-0004',
    rating: 4.5,
    reviewsCount: 412,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Pusat Informasi Smart Tourism', 'Dermaga Perahu Wisata', 'Pasar Ikan Segar', 'Warung Seafood', 'Mushola Agung', 'Home-stay pinggir pantai'],
    spots: ['Monumen Geopark Ciletuh', 'Dermaga Nelayan Tradisional', 'Area Paralayang Landing Zone'],
    weatherRealtime: {
      temp: 30,
      condition: 'Cerah',
      humidity: 70,
      crowdLevel: 'High'
    }
  },
  {
    id: 'geosite-panenjoan',
    name: 'Amphitheatre Panenjoan',
    category: 'geosite',
    categoryLabel: 'Geosite',
    description: 'Panenjoan merupakan titik pandang tebing tertinggi berbentuk lingkaran raksasa berdiameter sekitar 15 km, menyerupai panggung teater alami (Amphitheater). Tempat ini adalah bukti otentik proses amblasan tektonik jutaan tahun silam yang membentuk struktur graben berbentuk tapal kuda raksasa di Geopark Ciletuh. Di sini, pengunjung bisa melihat seluruh wilayah dataran rendah Geopark, laut samudera Indonesia, dan perbukitan sekaligus.',
    location: 'Desa Tamanjaya, Kecamatan Ciemas, Sukabumi',
    latitude: -7.199,
    longitude: 106.495,
    openingHours: '24 Jam',
    ticketPrice: 10000,
    contactNumber: '+62 821-2345-0005',
    rating: 4.9,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Pusat Konservasi Geologi', 'Teleskop Observasi', 'Papan Interaktif GIS', 'Cinderamata Geopark', 'Penginapan Wisata'],
    spots: ['Menara Pandang Panenjoan', 'Situs Batuan Sedimen Eosen', 'Signage Ikonik Panenjoan'],
    weatherRealtime: {
      temp: 24,
      condition: 'Cerah Berawan',
      humidity: 80,
      crowdLevel: 'High'
    }
  },
  {
    id: 'desa-wisata-hanjeli',
    name: 'Desa Wisata Hanjeli',
    category: 'village',
    categoryLabel: 'Desa Wisata',
    description: 'Sebuah desa wisata edukasi pangan lokal berkelanjutan yang melestarikan tanaman biji-bijian Hanjeli (Job’s Tears). Wisatawan diajak memanen hanjeli secara tradisional dengan cara menumbuk padi purba di lesung kayu, menyosoh kulit biji, hingga mengolah hanjeli menjadi makanan lezat seperti bubur hanjeli mewah, rengginang hanjeli, hingga kerajinan aksesoris manik-manik alam.',
    location: 'Desa Waluran Mandiri, Kecamatan Waluran, Sukabumi',
    latitude: -7.240,
    longitude: 106.512,
    openingHours: '08:00 - 16:00 WIB',
    ticketPrice: 20000,
    contactNumber: '+62 821-2345-0006',
    rating: 4.7,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Saung Edukasi Hanjeli', 'Lesung Tradisional', 'Homestay Syariah', 'Paket Makan Nasi Hanjeli', 'Toko Oleh-oleh Biji Hanjeli'],
    spots: ['Kebun Hanjeli Percontohan', 'Dapur Pengolahan Bubur Hanjeli', 'Galeri Kerajinan Manik-manik'],
    weatherRealtime: {
      temp: 26,
      condition: 'Berawan',
      humidity: 82,
      crowdLevel: 'Medium'
    }
  },
  {
    id: 'kasepuhan-sinarresmi',
    name: 'Kasepuhan Sinar Resmi',
    category: 'culture',
    categoryLabel: 'Wisata Budaya',
    description: 'Masyarakat adat Sundanese Banten Kidul yang masih mempertahankan adat istiadat leluhur mereka, terutama dalam mengelola pertanian padi lokal murni tanpa pupuk kimia. Di sini terdapat lumbung padi (Leuit) yang telah berumur ratusan tahun, rumah tradisional panggung berbahan bambu tali, dan upacara adat tahunan Seren Taun yang dihadiri oleh ribuan wisatawan.',
    location: 'Desa Sirnaresmi, Kecamatan Cisolok, Sukabumi',
    latitude: -7.230,
    longitude: 106.450,
    openingHours: '08:00 - 18:00 WIB',
    ticketPrice: 25000,
    contactNumber: '+62 821-2345-0007',
    rating: 4.8,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Menginap di Rumah Adat', 'Pemandu Budaya', 'Upacara Tradisional', 'Sewa Pakaian Adat Sunda', 'Kantin Kuliner Adat'],
    spots: ['Leuit Si Jimat (Lumbung Adat)', 'Imah Gede Kasepuhan', 'Museum Alat Pertanian Purba'],
    weatherRealtime: {
      temp: 25,
      condition: 'Cerah',
      humidity: 76,
      crowdLevel: 'Medium'
    }
  },
  {
    id: 'ciletuh-hills-resort',
    name: 'Ciletuh Hills Eco-Lodge',
    category: 'accommodation',
    categoryLabel: 'Penginapan',
    description: 'Penginapan kelas premium eksklusif yang memadukan keindahan alam tropis dengan kemewahan modern. Berdiri di lereng tebing tinggi, menghadap langsung ke arah Samudra Hindia dan Air Terjun Cimarinjung, Ciletuh Hills menawarkan jaminan panorama pagi berkabut yang syahdu dan hembusan angin laut Ciletuh yang tenang.',
    location: 'Desa Girimukti, Ciemas, Sukabumi',
    latitude: -7.175,
    longitude: 106.493,
    openingHours: 'Check-in 14:00 | Check-out 12:00 WIB',
    ticketPrice: 750000, // Harga penginapan per malam dijadikan tiket masuk/tarif basic
    contactNumber: '+62 821-2345-0008',
    rating: 4.9,
    reviewsCount: 185,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Infinite Ocean View Pool', 'Restoran Internasional Ciletuh', 'Wi-Fi Kecepatan Tinggi', 'Sewa Sepeda Listrik Resort', 'Area Api Unggun'],
    spots: ['Restoran Teras Kaca', 'Gardu Pandang Air Terjun Private', 'Jogging Area Lereng Tebing'],
    weatherRealtime: {
      temp: 24,
      condition: 'Cerah Berawan',
      humidity: 77,
      crowdLevel: 'Medium'
    }
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    destinationId: 'puncak-darma',
    author: 'Wisnu Pratama',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '2026-05-15',
    comment: 'Pemandangan di Puncak Darma benar-benar tidak tertandingi! Sangat direkomendasikan untuk melihat sunset yang berbentuk tapal kuda raksasa.'
  },
  {
    id: 'rev-2',
    destinationId: 'puncak-darma',
    author: 'Sarah Amelia',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    rating: 4,
    date: '2026-05-20',
    comment: 'Sangat indah namun disarankan membawa jaket atau pakaian hangat karena hembusan angin di atas sangat kencang dan suhu agak dingin jika sore.'
  },
  {
    id: 'rev-3',
    destinationId: 'curug-cimarinjung',
    author: 'Bambang Kusuma',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '2026-05-25',
    comment: 'Luar biasa! Dinding batu purbanya memiliki tekstur merah yang khas. Air mengalir deras bahkan ketika rintik hujan. Destinasi wisata wajib di Ciletuh!'
  }
];

export const initialVirtualTours: VirtualTourSpot[] = [
  {
    id: 'v-cimarinjung',
    name: 'Curug Cimarinjung Virtual 360°',
    description: 'Jelajahi keagungan air terjun ikonik Ciletuh purba dengan latar belakang tebing andesit megah, deburan air, dan visual lingkungan sekitar yang memukau secara virtual.',
    image360: 'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&w=1200&q=80',
    audioGuideUrl: '#audio-cimarinjung',
    droneVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-jungle-waterfall-43184-large.mp4',
    hotspots: [
      { id: 'h1', x: 50, y: 35, title: 'Iringan Aliran Air Purba', description: 'Air terjun meluncur dari sungai berhulu di Ciemas, membentur bebatuan kuarsa merah setinggi 50 meter.' },
      { id: 'h2', x: 30, y: 60, title: 'Tebing Breksi Merah', description: 'Situs batuan gunung api tua penyusun tektonik bawah tanah bumi Jawa Barat sejauh 60 juta tahun ke belakang.' }
    ]
  },
  {
    id: 'v-awang',
    name: 'Curug Awang "Niagara" Java',
    description: 'Saksikan kemegahan bentang tebing aliran horizontal nan luas yang menyembur hebat bak Niagara Falls, dikelilingi hutan hujan asri.',
    image360: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    audioGuideUrl: '#audio-awang',
    droneVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-flowing-into-a-river-in-a-forest-41584-large.mp4',
    hotspots: [
      { id: 'h3', x: 45, y: 40, title: 'Bentangan Lebar Niagara', description: 'Memiliki penampang lebar 60 meter memanjang horisontal melintasi formasi singkapan batu sedimen.' }
    ]
  },
  {
    id: 'v-palangpang',
    name: 'Pantai Palangpang Marine Bay',
    description: 'Telusuri birunya lautan Hindia dan tenangnya pelabuhan kecil tradisonal yang memanjakan mata, dikelilingi monumen-monumen batu.',
    image360: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    audioGuideUrl: '#audio-palangpang',
    droneVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-island-resort-with-sandy-beach-view-40090-large.mp4',
    hotspots: [
      { id: 'h4', x: 20, y: 70, title: 'Perahu Nelayan Warna-Warni', description: 'Armada nelayan tradisional yang siap melayani penjelajahan laut ke Pulau Kunti dan Pulau Batik.' }
    ]
  },
  {
    id: 'v-darma',
    name: 'Puncak Darma Sunsets Point',
    description: 'Menikmati megahnya bentukan Amphitheatre alam tapal kuda yang menghadap langsung ke arah cakrawala samudera lepas.',
    image360: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    audioGuideUrl: '#audio-darma',
    droneVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-green-woods-and-cliffs-41527-large.mp4',
    hotspots: [
      { id: 'h5', x: 80, y: 55, title: 'Amphitheatre Raksasa', description: 'Struktur depresi melingkar hasil dari peluruhan lereng purba tanah Ciletuh membentuk tebing tinggi sekeliling.' }
    ]
  },
  {
    id: 'v-panenjoan',
    name: 'Geosite Amphitheatre Panenjoan',
    description: 'Menjejak tebing observasi Panenjoan dengan panel data geologi murni dan interaktif GIS di genggaman Anda.',
    image360: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    audioGuideUrl: '#audio-panenjoan',
    droneVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-rolling-hills-with-a-deep-green-color-41530-large.mp4',
    hotspots: [
      { id: 'h6', x: 50, y: 25, title: 'Amblasan Tektonik (Graben)', description: 'Ujung tebing amblasan sesar aktif geologis yang terekspos dan mendasari batuan sedimentasi dasar samudera purba.' }
    ]
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Batik Geopark Ciletuh (Sutra Halus)',
    category: 'fashion',
    price: 350000,
    description: 'Kain batik cap sutra premium handmade yang menggambarkan motif keunikan hayati dan batuan purba Geopark Ciletuh, bermotif amonit fosil dan curug ikonik.',
    image: 'https://images.unsplash.com/photo-1590736969955-71cb948017bf?auto=format&fit=crop&w=500&q=80',
    seller: 'Galeri Batik Ciletuh Lestari',
    rating: 4.9,
    stock: 12
  },
  {
    id: 'prod-2',
    name: 'Kerajinan Manik-manik Hanjeli',
    category: 'craft',
    price: 45000,
    description: 'Kalung dan gelang elegan hasil anyaman biji hanjali asli yang memiliki tekstur keras mengkilap secara alami tanpa pernis kimia.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80',
    seller: 'UMKM Mandiri Desa Waluran',
    rating: 4.6,
    stock: 150
  },
  {
    id: 'prod-3',
    name: 'Rengginang Gurih Biji Hanjeli',
    category: 'food',
    price: 25000,
    description: 'Rengginang renyah inovatif dari paduan biji beras ketan dan beras hanjeli organik berkualitas tinggi yang gurih, kaya gizi dan serat pangan alami.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=500&q=80',
    seller: 'Kedai Komunitas Desa Hanjeli',
    rating: 4.8,
    stock: 80
  },
  {
    id: 'prod-4',
    name: 'Minyak Kelapa Murni (VCO) Ciletuh',
    category: 'food',
    price: 65000,
    description: 'Virgin Coconut Oil perasan dingin higienis dari kelapa pesisir pantai Palangpang murni yang memiliki beraneka khasiat bagi kesehatan dan kulit.',
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=500&q=80',
    seller: 'UMKM Kelapa Pesisir Jaya',
    rating: 4.7,
    stock: 50
  },
  {
    id: 'prod-5',
    name: 'Miniatur Tebing Batu Ciletuh Purba',
    category: 'souvenir',
    price: 95000,
    description: 'Pajangan estetis ukiran resin batuan fosil replika sedimen geosite purba Ciletuh, sangat cocok menghiasi ruang kantor atau ruang keluarga.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=80',
    seller: 'Pengrajin Kriya Ciemas',
    rating: 4.5,
    stock: 30
  }
];

export const initialEvents: EventFestival[] = [
  {
    id: 'event-1',
    title: 'Seren Taun Kasepuhan Sinar Resmi',
    date: '2026-08-12',
    time: '08:00 WIB - Selesai',
    location: 'Imah Gede Kasepuhan Sinar Resmi',
    description: 'Festival adat akbar tahunan wujud syukur hasil panen padi melimpah. Menampilkan pertunjukan Lisung pusaka, tari tani sunda kuno, prosesi memasukkan padi ke leuit si jimat, serta pergelaran wayang golek semalam suntuk.',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80',
    category: 'culture',
    status: 'upcoming'
  },
  {
    id: 'event-2',
    title: 'Ciletuh Geopark Ultra Run & Photography Show',
    date: '2026-06-25',
    time: '05:00 - 15:00 WIB',
    location: 'Start: Panenjoan | Finish: Pantai Palangpang',
    description: 'Lomba lari maraton ekstrem melintasi perbukitan curam nan mempesona di sepanjang Amphitheater Ciletuh, diikuti pameran hasil jepretan foto pemandangan terbaik dari fotografer nasional.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    category: 'adventure',
    status: 'upcoming'
  },
  {
    id: 'event-3',
    title: 'Festival Kuliner Pesisir & Kuliner Hanjeli',
    date: '2026-06-02',
    time: '10:00 - 18:00 WIB',
    location: 'Sentra Kuliner Pantai Palangpang',
    description: 'Kemeriahan menyajikan aneka olahan hidangan hasil laut segar tangkapan nelayan Palangpang bergandengan dengan sajian kreasi biji hanjeli Waluran Mandiri bagi seluruh pemirsa.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    category: 'culinary',
    status: 'completed'
  }
];

export const initialEducationMaterials: EducationMaterial[] = [
  {
    id: 'edu-1',
    title: 'Proses Terbentuknya Amphitheatre Ciletuh',
    category: 'geology',
    shortDesc: 'Bagaimana lembah tapal kuda raksasa berdiameter 15 km di Geopark Ciletuh tercipta akibat dinamika patahan bumi purba.',
    content: 'Kawasan Geopark Ciletuh memiliki bentuk lanskap mirip teater terbuka yang sangat besar (Amphitheater). Struktur bentang alam tapal kuda ini terbentuk akibat runtuhnya sabuk batuan purba di atas permukaan laut (graben/amblasan patahan sesar aktif) yang jatuh berangsur-angsur sepanjang sistem patahan melingkar sesar normal. Kejadian tektonik luar biasa ini diperkirakan terjadi puluhan juta tahun yang lalu pasca subduksi purba Lempeng Samudera Hindia dan Lempeng Benua Eurasia.',
    quiz: [
      {
        question: 'Struktur depresi runtuhan patahan geologi tapal kuda di Ciletuh secara saintifik disebut apa?',
        options: ['Graben Melingkar (Amphitheatre)', 'Gunung Api Purba', 'Kawah Meteor', 'Danau Tektonik'],
        answerIndex: 0,
        explanation: 'Betul! Runtuhan patahan geologi melingkar raksasa yang amblas ke bawah membentuk tapal kuda di Geopark Ciletuh disebut Graben atau Amphitheatre.'
      },
      {
        question: 'Lempeng geologi mana saja yang berkontribusi utama dalam formasi subduksi dasar Ciletuh?',
        options: ['Lempeng Pasifik dan Lempeng Nazca', 'Lempeng Samudra Hindia dan Lempeng Benua Eurasia', 'Lempeng Cocos dan Antartika', 'Lempeng Afrika dan Arab'],
        answerIndex: 1,
        explanation: 'Benar sekali! Subduksi lempeng Samudra Hindia (Indo-Australia) yang menahan sabuk tepi Lempeng Benua Eurasia menciptakan batuan malihan bancuh terangkat di dasar Ciletuh.'
      }
    ]
  },
  {
    id: 'edu-2',
    title: 'Pelestarian Hanjeli: Kedaulatan Pangan Lokal',
    category: 'biodiversity',
    shortDesc: 'Membahas pemanfaatan tanaman purba Hanjeli sebagai bahan makanan tinggi zat gizi alternatif pengganti beras dan gandum.',
    content: 'Tanaman Hanjeli (Coix lacryma-jobi) atau grain Job’s Tears merupakan tanaman biji-bijian sereal berkulit keras yang tumbuh subur di iklim tropis berbatu gersang di Waluran Ciletuh. Biji hanjeli memiliki kadar serat laut larut, anti-oksidan tinggi, kalsium, anti-kanker, dan indeks glikemik rendah. Melalui kreativitas warga desa wisata, hanjeli dikembangkan menjadi bahan sereal, tepung kue kering, rengginang lokal khas, bahkan aksesoris buatan tangan anak suku adat.',
    quiz: [
      {
        question: 'Apa nama latin ilmiah tanaman biji hanjeli yang tumbuh subur di Ciletuh?',
        options: ['Oryza sativa', 'Zea mays', 'Coix lacryma-jobi', 'Solanum tuberosum'],
        answerIndex: 2,
        explanation: 'Sempurna! Biji hanjeli secara botani dinamai Coix lacryma-jobi (atau air mata Ayub / Jobs tears).'
      }
    ]
  },
  {
    id: 'edu-3',
    title: 'Adat Kasepuhan Banten Kidul: Kearifan Sawah Tradisional',
    category: 'culture',
    shortDesc: 'Menyelidiki hukum adat luhur Kasepuhan dalam menanam padi lokal hanya sekali setahun dan larangan keras menjual beras.',
    content: 'Masyarakat Kasepuhan Sinar Resmi memandang padi (pare) sebagai perwujudan titisan ibu agung pelindung kehidupan, sehingga tidak dibenarkan menjual beras secara bebas sebagai komoditas bisnis mencari keuntungan semata. Padi hasil panen setahun sekali disimpan rapi dalam puluhan leuit (lumbung padi bambu berpuncak ijuk kayu) yang kokoh, menjamin ketahanan pangan warga selama puluhan tahun mendatang tanpa pernah mengalami kelaparan (paceklik).',
    quiz: [
      {
        question: 'Mengapa masyarakat adat Kasepuhan dilarang keras menjual beras/padi hasil panen mereka?',
        options: ['Karena denda adat yang mahal', 'Karena memandang padi luhur dan suci sebagai nafas hidup, bukan barang bisnis murni', 'Karena padi rasanya tidak enak', 'Karena beras cepat membusuk'],
        answerIndex: 1,
        explanation: 'Tepat sekali! Kasepuhan memandang padi sebagai simbol ketahanan hidup yang luhur demi kerukunan warga, bukan demi mencari uang komersil.'
      }
    ]
  }
];

export const initialBookings: Booking[] = [
  {
    id: 'B001',
    customerName: 'Pratama Wicaksana',
    email: 'wicaksana@example.com',
    phone: '0812-9988-7766',
    serviceId: 'puncak-darma',
    serviceName: 'Paket Tur Jelajah Geopark 1 Hari',
    serviceType: 'tour',
    date: '2026-06-10',
    totalPrice: 250000,
    status: 'confirmed'
  },
  {
    id: 'B002',
    customerName: 'Mega Lestari',
    email: 'mega.l@example.com',
    phone: '0857-4433-2211',
    serviceId: 'ciletuh-hills-resort',
    serviceName: 'Sewa Villa Ciletuh Hills (Premium)',
    serviceType: 'accommodation',
    date: '2026-06-15',
    totalPrice: 750000,
    status: 'pending'
  }
];
