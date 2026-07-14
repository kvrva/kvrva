import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const translations = {
  en: {
    navbar: {
      services: 'Services',
      projects: 'Projects',
      process: 'Process',
      about: 'About',
      techStack: 'Tech Stack',
      startProject: 'Start a Project',
    },
    hero: {
      badge: 'Software Engineering Studio',
      title1: 'Building software',
      title2: 'that',
      title3: 'scales',
      subtitle: 'KVRVA designs and develops modern web applications, SaaS platforms, backend systems, and AI-powered solutions for companies that need reliable software.',
      btnPrimary: 'Start a Project',
      btnSecondary: 'View our Work',
      fastapiDesc: 'Retrieve cached prediction or evaluate model',
      nestjsDesc: 'Trigger enterprise data pipeline',
      terminalReRun: 'Re-run Deployment',
      terminalCompiling: 'compiling and provisioning resources...',
    },
    trust: {
      title: 'Core Technologies & Ecosystem Partnerships',
    },
    services: {
      title: 'Engineering Services',
      subtitle: 'We design, develop, and deploy scalable solutions crafted for modern business challenges.',
      customDev: {
        title: 'Custom Software Development',
        desc: 'We build business platforms tailored to your operations.',
        detail1: 'Enterprise CRM/ERP',
        detail2: 'Workflow engine setups',
        detail3: 'Custom database integrations',
      },
      backend: {
        title: 'Backend Engineering',
        desc: 'Scalable APIs using FastAPI, NestJS, and modern architectures.',
        detail1: 'Microservices design',
        detail2: 'High-performance databases',
        detail3: 'WebSocket real-time sync',
      },
      saas: {
        title: 'SaaS Platforms',
        desc: 'Design and development of multi-tenant cloud applications.',
        detail1: 'Multi-tenant isolation',
        detail2: 'Stripe Billing integrations',
        detail3: 'Usage tracking & analytics',
      },
      ai: {
        title: 'AI Integration',
        desc: 'Computer Vision, Automation, Machine Learning, and LLM integrations.',
        detail1: 'MediaPipe & OpenCV tracking',
        detail2: 'Large Language Models (LLMs)',
        detail3: 'RAG pipelines & search',
      },
      devops: {
        title: 'Cloud & DevOps',
        desc: 'Docker, CI/CD, Cloud deployments, and infrastructure automation.',
        detail1: 'Kubernetes orchestration',
        detail2: 'AWS & Google Cloud setups',
        detail3: 'GitHub Actions / GitLab CI',
      },
      digital: {
        title: 'Digital Transformation',
        desc: 'Business automation, internal systems, dashboards, and admin portals.',
        detail1: 'Process analytics',
        detail2: 'Visual dashboards',
        detail3: 'Legacy system modernization',
      },
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'A selection of complex backend architectures, responsive applications, and intelligent systems we have built for our partners.',
      veerlow: {
        subtitle: 'Cloud Digital Signage SaaS Platform',
        desc: 'Enterprise cloud platform for remote orchestration of commercial screens. Features sub-second screen synchronization, real-time WebSocket connection channels, drag-and-drop playlist builder, and automated network health monitoring.',
      },
      aiPlatform: {
        subtitle: 'Gesture Recognition & Tracking API',
        desc: 'Computer vision framework that translates dynamic human hand gestures into system input triggers. Built using MediaPipe models, providing latency-optimized coordinate mapping, and robust API endpoints for low-bandwidth client applications.',
      },
      automation: {
        subtitle: 'Distributed Scraping & RPA Platform',
        desc: 'Fault-tolerant robotic process automation engine capable of orchestrating hundreds of Puppeteer browser instances concurrently. Implements smart rate-limiting mitigation, structured HTML layout extraction, and automated webhook alerts.',
      },
      tryon: {
        title: 'Sneaker TryOn',
        subtitle: 'Real-Time 3D Smart Mirror',
        desc: 'Computer vision fitting mirror using Python and DeepAR. Captures real-time camera frames and overlays interactive 3D sneaker models with precise scale, orientation, and shadow mapping for immersive retail experiences.',
      },
    },
    process: {
      title: 'Our Engineering Process',
      subtitle: 'From design constraints to cloud delivery—how we build robust software step-by-step.',
      discovery: {
        title: 'Discovery',
        desc: 'We align deeply with your business team to capture engineering requirements, identify core challenges, assess performance bottlenecks, and refine application scope.',
      },
      architecture: {
        title: 'Architecture',
        desc: 'We map out a microservices schema, schema models, performance-optimized caching strategies, infrastructure design, and CI/CD pipelines to ensure future scalability.',
      },
      development: {
        title: 'Development',
        desc: 'Implementation begins using modern stacks like FastAPI, NestJS, and React. We write clean, linted TypeScript and Python code, backed by strict unit and integration testing.',
      },
      deployment: {
        title: 'Deployment',
        desc: 'Provisioning infrastructure on AWS or Google Cloud via Docker/Kubernetes container systems. Configuring real-time CDN caching and health alerting trackers.',
      },
      support: {
        title: 'Support',
        desc: 'Continuous monitoring, query optimization, security vulnerability auditing, dependency upgrades, and iterative improvements to support your business expansion.',
      },
    },
    whyUs: {
      title: 'Why KVRVA',
      subtitle: 'We operate at the intersection of architectural discipline and execution speed.',
      arch: {
        title: 'Modern Architecture',
        desc: 'We construct applications using microservices, domain-driven patterns, and low-latency API routes designed to support millions of requests.',
      },
      delivery: {
        title: 'Fast Delivery',
        desc: 'Leveraging agile cycles, strict milestones, and robust CI/CD, we accelerate product delivery without sacrificing QA standards.',
      },
      security: {
        title: 'Secure Development',
        desc: 'Security audited from day one. We enforce rigid authorization guards, input validations, SQL injection prevention, and secure credential handling.',
      },
      cloud: {
        title: 'Cloud Native',
        desc: 'Optimized to leverage modern cloud environments (AWS/GCP), using container infrastructure like Docker and Kubernetes for painless horizontal scaling.',
      },
      code: {
        title: 'Clean Code',
        desc: 'We adhere to Python (PEP8) and TypeScript best practices, creating highly maintainable codebases that your internal teams will love to expand.',
      },
      support: {
        title: 'Long-Term Support',
        desc: 'We don’t just deploy and leave. KVRVA provides dedicated retainers for performance tuning, upgrades, and continuous feature development.',
      },
    },
    about: {
      label: 'About the Studio',
      title: 'Architected for reliability. Built for acceleration.',
      p1: 'KVRVA is an independent software engineering studio founded by Software Engineer Julián Martínez. We specialize in transforming complex business workflows into high-performance, maintainable software systems.',
      p2: 'Our mission is to create scalable, maintainable, and modern software solutions that help companies automate processes, improve operations, and accelerate digital transformation.',
      p3: 'We collaborate with select technology startups and mid-market organizations who require engineering excellence, strict quality standards, and predictable delivery times.',
      focus: {
        title: 'Our Focus',
        desc: 'High-throughput APIs, clean React UI components, and reliable data pipelines.',
      },
      phil: {
        title: 'Our Philosophy',
        desc: 'Write clean code that acts as a secure foundation for long-term product iterations.',
      },
    },
    techStack: {
      title: 'Our Technology Stack',
      subtitle: 'We use top-tier tools, programming languages, cloud providers, and frameworks to deliver scalable platforms.',
      checkText: 'All packages are fully maintained, secure, and production-tested.',
      filters: {
        all: 'All Stack',
        languages: 'Languages',
        frameworks: 'Frameworks',
        devops: 'DevOps & Cloud',
        databases: 'Databases',
        aiTools: 'AI & Vision',
      },
    },
    cta: {
      label: 'Get In Touch',
      title: 'Ready to build your next product?',
      subtitle: 'Let’s create something exceptional. Book a call or fill out the scope form, and we will get back to you within 24 hours.',
      nextSteps: 'What happens next?',
      step1: '30-min architecture alignment session',
      step2: 'Detailed scope of work & roadmap proposal',
      step3: 'Agile development kickoff within 7 business days',
      form: {
        name: 'Name / Company',
        namePlaceholder: 'Julian Martinez',
        email: 'Email Address',
        emailPlaceholder: 'julian@example.com',
        scope: 'Project Scope',
        desc: 'Project Description',
        descPlaceholder: 'Tell us about the systems or SaaS platform you want to build...',
        submit: 'Send Inquiry',
        processing: 'Processing...',
        successTitle: 'Inquiry Received!',
        successDesc: 'Thank you for reaching out. Software Engineer Julián Martínez will review your project details and respond via email shortly.',
      },
    },
    footer: {
      desc: 'A premium software engineering studio focused on building scalable cloud solutions, custom business platforms, and AI-powered web applications.',
      quickLinks: 'Studio',
      inquiries: 'Inquiries',
      location: 'Based in South America / Remote',
      availability: 'Available for projects',
    },
  },
  es: {
    navbar: {
      services: 'Servicios',
      projects: 'Proyectos',
      process: 'Proceso',
      about: 'Nosotros',
      techStack: 'Tecnologías',
      startProject: 'Iniciar Proyecto',
    },
    hero: {
      badge: 'Estudio de Ingeniería de Software',
      title1: 'Construimos software',
      title2: 'que',
      title3: 'escala',
      subtitle: 'KVRVA diseña y desarrolla aplicaciones web modernas, plataformas SaaS, sistemas backend y soluciones basadas en IA para empresas que necesitan software confiable.',
      btnPrimary: 'Iniciar Proyecto',
      btnSecondary: 'Ver nuestro Trabajo',
      fastapiDesc: 'Obtener predicción en caché o evaluar modelo',
      nestjsDesc: 'Desencadenar canalización de datos empresarial',
      terminalReRun: 'Volver a Ejecutar',
      terminalCompiling: 'compilando y aprovisionando recursos...',
    },
    trust: {
      title: 'Tecnologías Clave y Alianzas del Ecosistema',
    },
    services: {
      title: 'Servicios de Ingeniería',
      subtitle: 'Diseñamos, desarrollamos e implementamos soluciones escalables creadas para los desafíos empresariales modernos.',
      customDev: {
        title: 'Desarrollo de Software a Medida',
        desc: 'Construimos plataformas de negocios adaptadas a tus operaciones.',
        detail1: 'CRM/ERP Empresarial',
        detail2: 'Motores de flujos de trabajo',
        detail3: 'Integraciones de bases de datos',
      },
      backend: {
        title: 'Ingeniería de Backend',
        desc: 'APIs escalables utilizando FastAPI, NestJS y arquitecturas modernas.',
        detail1: 'Diseño de microservicios',
        detail2: 'Bases de datos de alto rendimiento',
        detail3: 'Sincronización WebSockets en tiempo real',
      },
      saas: {
        title: 'Plataformas SaaS',
        desc: 'Diseño y desarrollo de aplicaciones en la nube multi-inquilino.',
        detail1: 'Aislamiento multi-inquilino',
        detail2: 'Integraciones de cobro con Stripe',
        detail3: 'Seguimiento de uso y analíticas',
      },
      ai: {
        title: 'Integración de IA',
        desc: 'Integración de Visión Artificial, Automatización, Aprendizaje Automático y LLMs.',
        detail1: 'Seguimiento con MediaPipe y OpenCV',
        detail2: 'Modelos de Lenguaje de Gran Escala (LLMs)',
        detail3: 'Búsqueda y flujos de trabajo RAG',
      },
      devops: {
        title: 'Nube y DevOps',
        desc: 'Docker, CI/CD, implementaciones en la nube y automatización de infraestructura.',
        detail1: 'Orquestación con Kubernetes',
        detail2: 'Configuraciones AWS y Google Cloud',
        detail3: 'GitHub Actions / GitLab CI',
      },
      digital: {
        title: 'Transformación Digital',
        desc: 'Automatización de procesos, sistemas internos, tableros y portales de administración.',
        detail1: 'Analíticas de procesos',
        detail2: 'Tableros interactivos visuales',
        detail3: 'Modernización de sistemas legados',
      },
    },
    projects: {
      title: 'Proyectos Destacados',
      subtitle: 'Una selección de arquitecturas complejas de backend, aplicaciones responsivas y sistemas inteligentes que hemos construido.',
      veerlow: {
        subtitle: 'Plataforma SaaS en la Nube para Señalización Digital',
        desc: 'Plataforma en la nube empresarial para la orquestación remota de pantallas comerciales. Cuenta con sincronización de pantallas en sub-segundos, canales de conexión WebSocket en tiempo real, constructor de listas de reproducción interactivo y monitoreo automatizado de salud de red.',
      },
      aiPlatform: {
        subtitle: 'API de Seguimiento y Reconocimiento de Gestos',
        desc: 'Framework de visión por computadora que traduce gestos dinámicos de manos humanas en comandos del sistema. Construido con modelos MediaPipe, proporcionando mapeo de coordenadas optimizado para baja latencia y endpoints API robustos.',
      },
      automation: {
        subtitle: 'Plataforma de RPA y Extracción Distribuida',
        desc: 'Motor de automatización robótica de procesos tolerante a fallas capaz de orquestar cientos de instancias de Puppeteer concurrentemente. Implementa mitigación inteligente de límites de tasa, extracción estructurada de HTML y alertas automatizadas.',
      },
      tryon: {
        title: 'Sneaker TryOn',
        subtitle: 'Espejo Inteligente de Calzado 3D en Tiempo Real',
        desc: 'Espejo de calce interactivo utilizando visión artificial con Python y DeepAR. Captura fotogramas de la cámara en tiempo real y superpone modelos 3D realistas de zapatillas con escala, orientación y mapeo de sombras precisos para retail interactivo.',
      },
    },
    process: {
      title: 'Nuestro Proceso de Ingeniería',
      subtitle: 'Desde las limitaciones de diseño hasta la nube—cómo construimos software robusto paso a paso.',
      discovery: {
        title: 'Descubrimiento',
        desc: 'Nos alineamos profundamente con tu equipo de negocios para capturar los requerimientos de ingeniería, identificar desafíos, evaluar cuellos de botella y definir el alcance.',
      },
      architecture: {
        title: 'Arquitectura',
        desc: 'Diseñamos esquemas de microservicios, modelos de datos, estrategias de caché optimizadas para rendimiento, diseño de infraestructura y pipelines de CI/CD.',
      },
      development: {
        title: 'Desarrollo',
        desc: 'La implementación comienza utilizando stacks modernos como FastAPI, NestJS y React. Escribimos código limpio en TypeScript y Python, respaldado por pruebas unitarias.',
      },
      deployment: {
        title: 'Implementación',
        desc: 'Aprovisionamiento de infraestructura en AWS o Google Cloud usando contenedores Docker/Kubernetes. Configuración de CDN para caché y rastreadores de salud de servicios.',
      },
      support: {
        title: 'Soporte',
        desc: 'Monitoreo continuo, optimización de consultas, auditoría de vulnerabilidades de seguridad, actualizaciones de dependencias y mejoras iterativas para tu crecimiento.',
      },
    },
    whyUs: {
      title: 'Por qué KVRVA',
      subtitle: 'Operamos en la intersección de la disciplina arquitectónica y la velocidad de ejecución.',
      arch: {
        title: 'Arquitectura Moderna',
        desc: 'Construimos aplicaciones utilizando microservicios, patrones guiados por el dominio y rutas API de baja latencia diseñadas para millones de peticiones.',
      },
      delivery: {
        title: 'Entrega Rápida',
        desc: 'Aprovechando ciclos ágiles, hitos estrictos y CI/CD robusto, aceleramos la entrega de productos sin sacrificar los estándares de calidad.',
      },
      security: {
        title: 'Desarrollo Seguro',
        desc: 'Seguridad auditada desde el primer día. Aplicamos guardias de autorización rígidas, validaciones de entrada, prevención de inyección SQL y manejo seguro de credenciales.',
      },
      cloud: {
        title: 'Nube Nativa',
        desc: 'Optimizado para aprovechar entornos de nube modernos (AWS/GCP), utilizando contenedores Docker y Kubernetes para escalado horizontal sin fricciones.',
      },
      code: {
        title: 'Código Limpio',
        desc: 'Nos adherimos a las mejores prácticas de Python (PEP8) y TypeScript, creando repositorios altamente mantenibles que tus equipos internos amarán extender.',
      },
      support: {
        title: 'Soporte a Largo Plazo',
        desc: 'No solo desplegamos y nos vamos. KVRVA ofrece contratos de soporte dedicados para optimización de rendimiento, actualizaciones y desarrollo continuo de funcionalidades.',
      },
    },
    about: {
      label: 'Sobre el Estudio',
      title: 'Arquitectado para la confiabilidad. Construido para la aceleración.',
      p1: 'KVRVA es un estudio de ingeniería de software independiente fundado por el Ingeniero de Software Julián Martínez. Nos especializamos en transformar flujos de trabajo empresariales complejos en sistemas de software altamente mantenibles y de alto rendimiento.',
      p2: 'Nuestra misión es crear soluciones de software escalables, mantenibles y modernas que ayuden a las empresas a automatizar procesos, mejorar operaciones y acelerar la transformación digital.',
      p3: 'Colaboramos con startups tecnológicas selectas y organizaciones medianas que requieren excelencia en ingeniería, estándares estrictos de calidad y tiempos de entrega predecibles.',
      focus: {
        title: 'Enfoque',
        desc: 'APIs de alto rendimiento, componentes de interfaz de usuario limpios en React y canalizaciones de datos confiables.',
      },
      phil: {
        title: 'Filosofía',
        desc: 'Escribir código limpio que sirva como base segura para las iteraciones de producto a largo plazo.',
      },
    },
    techStack: {
      title: 'Nuestra Pila Tecnológica',
      subtitle: 'Utilizamos herramientas, lenguajes, proveedores de nube y frameworks de primer nivel para entregar plataformas escalables.',
      checkText: 'Todos los paquetes están completamente mantenidos, son seguros y están probados en producción.',
      filters: {
        all: 'Toda la Pila',
        languages: 'Lenguajes',
        frameworks: 'Frameworks',
        devops: 'DevOps y Nube',
        databases: 'Bases de Datos',
        aiTools: 'IA y Visión',
      },
    },
    cta: {
      label: 'Contacto',
      title: '¿Listo para construir tu próximo producto?',
      subtitle: 'Creemos algo excepcional. Programa una reunión o completa el formulario de alcance, y te responderemos en un plazo de 24 horas.',
      nextSteps: '¿Qué sucede después?',
      step1: 'Sesión de alineación de arquitectura de 30 minutos',
      step2: 'Propuesta detallada de alcance de trabajo y hoja de ruta',
      step3: 'Inicio del desarrollo ágil dentro de los 7 días hábiles',
      form: {
        name: 'Nombre / Empresa',
        namePlaceholder: 'Julian Martinez',
        email: 'Correo Electrónico',
        emailPlaceholder: 'julian@example.com',
        scope: 'Alcance del Proyecto',
        desc: 'Descripción del Proyecto',
        descPlaceholder: 'Cuéntanos sobre los sistemas o la plataforma SaaS que deseas construir...',
        submit: 'Enviar Consulta',
        processing: 'Procesando...',
        successTitle: '¡Consulta Recibida!',
        successDesc: 'Gracias por ponerte en contacto. El Ingeniero de Software Julián Martínez revisará los detalles del proyecto y responderá por correo electrónico a la brevedad.',
      },
    },
    footer: {
      desc: 'Un estudio de ingeniería de software premium enfocado en construir soluciones escalables en la nube, plataformas de negocios a medida y aplicaciones web con IA.',
      quickLinks: 'Estudio',
      inquiries: 'Consultas',
      location: 'Basado en Sudamérica / Remoto',
      availability: 'Disponible para proyectos',
    },
  },
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'es' || savedLang === 'en') ? savedLang : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (path: string) => {
    const dict = translations[language];
    const value = path.split('.').reduce((acc: any, part) => acc && acc[part], dict);
    return value || path;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
