export default [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: [
          '*',
          /*
          'http://localhost:3000', // React Native uygulamanın çalıştığı port
          'http://10.0.2.2:3000', // Emülatör için
          'http://192.168.8.106:3000', // Bilgisayarın yerel IP adresi
          'http://*', // Tüm kaynaklardan erişim için (geliştirme aşamasında kullanılabilir)*/
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
  