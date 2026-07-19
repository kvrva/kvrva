import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Database, Cpu, Layers, Play, CheckCircle, 
  RefreshCw, FileText, Sparkles, ArrowRight, Terminal, 
  MessageSquare, Settings, AlertCircle, Check, 
  Volume2, VolumeX
} from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  isStreaming?: boolean;
}

export const AILab: React.FC = () => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'assistant' | 'proposal' | 'orchestrator'>('assistant');
  
  // Tab 1: Assistant Chat & TTS State
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'assistant', text: t('lab.assistant.welcome') }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeRag, setActiveRag] = useState<{ active: boolean; file: string; text: string; score: number } | null>(null);
  const [activeTool, setActiveTool] = useState<{ active: boolean; func: string; args: string; ret: string } | null>(null);
  
  // Voice Synthesis States
  const [isMuted, setIsMuted] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Gemini Live API Key configuration
  const [customApiKey] = useState<string>(() => localStorage.getItem('kvrva_gemini_key') || '');
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Tab 2: step-by-step Agent consultation State
  const [consultationStep, setConsultationStep] = useState<number>(0); 
  // steps: 0: Welcome & Name, 1: Problem description, 2: Stack preference, 3: Timeline, 4: Loading sequence, 5: Complete & print PDF
  const [clientName, setClientName] = useState('');
  const [clientProblem, setClientProblem] = useState('');
  const [clientStack, setClientStack] = useState('');
  const [clientTimeline, setClientTimeline] = useState('');

  const [proposalStep, setProposalStep] = useState<number>(0); // sub-steps animation loaders
  const [generatedArch, setGeneratedArch] = useState<{
    db: string;
    fe: string;
    be: string;
    ai: string;
    hours: string;
  } | null>(null);

  // Tab 3: Orchestrator State
  const [orchStep, setOrchStep] = useState<number>(-1); // -1: idle, 0: web, 1: classify, 2: db, 3: notify
  const [orchLogs, setOrchLogs] = useState<string[]>([]);
  const [isOrchRunning, setIsOrchRunning] = useState(false);

  // Speech helper functions
  const speakText = (text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    // Clean string from RAG citations or code tags to make it read naturally
    const cleanText = text.replace(/\[.*?\]/g, '').trim(); 
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
    
    // Softer and friendlier settings
    utterance.pitch = 1.12; // slightly higher pitch to sound more conversational and less robotic/scary
    utterance.rate = 0.95;  // slightly slower pace for clearer comprehension
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    const voices = window.speechSynthesis.getVoices();
    const matches = voices.filter(v => v.lang.startsWith(language === 'es' ? 'es' : 'en'));
    
    if (matches.length > 0) {
      // Prioritize natural or premium sounding voices
      const premiumVoice = matches.find(v => 
        v.name.toLowerCase().includes('google') || 
        v.name.toLowerCase().includes('natural') || 
        v.name.toLowerCase().includes('samantha') || 
        v.name.toLowerCase().includes('helena') || 
        v.name.toLowerCase().includes('paulina')
      );
      utterance.voice = premiumVoice || matches[0];
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Clean voice cancellation on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Auto-scroll chat internally within the container (prevents body window scrolls)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Google Gemini API caller method
  const callGeminiAPI = async (userMessage: string, chatHistory: Message[], apiKey: string): Promise<string> => {
    // We use gemini-1.5-flash which has a generous free tier for developers
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    // Map chat history (excluding loading state if any) to Gemini payload format
    const contents = chatHistory
      .filter(msg => msg.text.trim().length > 0)
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
    
    // Append current message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const systemPrompt = language === 'es'
      ? "Eres el asistente inteligente de KVRVA, un estudio premium de ingeniería de software fundado por Julián Martínez. Ofrecemos desarrollo de software a medida, APIs de alto rendimiento (FastAPI, NestJS), plataformas SaaS e integraciones de IA. Responde de manera concisa (máximo 3 párrafos), profesional, amable y en español. Si te preguntan sobre costos, menciona que pueden cotizar un rango de 40 a 80 horas de desarrollo en la pestaña 'Generador de Requerimientos'."
      : "You are the intelligent assistant for KVRVA, a premium software engineering studio founded by Julián Martínez. We offer custom software development, high-performance APIs (FastAPI, NestJS), SaaS platforms, and AI integrations. Answer concisely (max 3 paragraphs), professionally, friendly, and in English. If asked about pricing, mention that they can estimate a range of 40 to 80 development hours in the 'Requirements Generator' tab.";

    const payload = {
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData?.error?.message || 'Error communicating with Gemini');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  };

  // Tab 1 chatbot handler
  const handleSendChat = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    // Cancel voice on new query input
    stopSpeaking();

    const userMsg = text.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputVal('');
    setIsTyping(true);
    setActiveRag(null);
    setActiveTool(null);

    // Check if real Google Gemini Key is set in environment or custom local storage
    const activeKey = import.meta.env.VITE_GEMINI_API_KEY || customApiKey || '';

    if (activeKey) {
      try {
        const responseText = await callGeminiAPI(userMsg, messages, activeKey);
        setIsTyping(false);

        // Map mockup console visualization cues based on message keywords to keep layout alive
        const lowerMsg = userMsg.toLowerCase();
        if (lowerMsg.includes('stack') || lowerMsg.includes('tecnolog') || lowerMsg.includes('backend') || lowerMsg.includes('pila')) {
          setActiveRag({
            active: true,
            file: 'Tecnologias.pdf',
            text: language === 'en'
              ? 'KVRVA standard tech stack: Python (FastAPI) for data/AI models, NestJS for enterprise microservices, Docker for application containerization.'
              : 'Stack tecnológico estándar de KVRVA: Python (FastAPI) para modelos de datos/IA, NestJS para microservicios empresariales, Docker para contenerización.',
            score: 0.98
          });
        } else if (lowerMsg.includes('sap') || lowerMsg.includes('erp') || lowerMsg.includes('integrac')) {
          setActiveRag({
            active: true,
            file: 'IntegracionesERP.pdf',
            text: language === 'en'
              ? 'Middleware architecture connects custom REST APIs to SAP NetWeaver SOAP/REST endpoints with automated failover queues.'
              : 'La arquitectura middleware conecta APIs REST personalizadas a endpoints SOAP/REST de SAP NetWeaver con colas de contingencia automatizadas.',
            score: 0.94
          });
        } else if (lowerMsg.includes('cost') || lowerMsg.includes('presupuesto') || lowerMsg.includes('preci') || lowerMsg.includes('crm') || lowerMsg.includes('saas')) {
          setActiveTool({
            active: true,
            func: 'calcular_presupuesto',
            args: JSON.stringify({ tipo: 'Custom SaaS', usuarios: 500, db: 'PostgreSQL', securityLevel: 'High' }, null, 2),
            ret: JSON.stringify({ horasEstimadas: '50-70 horas', rangoCostoUsd: '$3,500 - $5,500', backend: 'FastAPI', deployment: 'Docker/AWS' }, null, 2)
          });
        }

        // Stream real response word-by-word
        const words = responseText.split(' ');
        let currentWordIndex = 0;
        let currentText = '';

        setMessages(prev => [...prev, { sender: 'assistant', text: '', isStreaming: true }]);

        const interval = setInterval(() => {
          if (currentWordIndex < words.length) {
            currentText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
            setMessages(prev => {
              const next = [...prev];
              next[next.length - 1] = { sender: 'assistant', text: currentText, isStreaming: true };
              return next;
            });
            currentWordIndex++;
          } else {
            clearInterval(interval);
            setMessages(prev => {
              const next = [...prev];
              next[next.length - 1] = { sender: 'assistant', text: currentText };
              return next;
            });
            speakText(currentText);
          }
        }, 40);

      } catch (err: any) {
        setIsTyping(false);
        const errMsg = language === 'en'
          ? `Gemini API connection error: ${err.message || 'Unknown error'}. Falling back to simulation mode.`
          : `Error de conexión con la API de Gemini: ${err.message || 'Error desconocido'}. Reanudando simulación.`;
        setMessages(prev => [...prev, { sender: 'assistant', text: errMsg }]);
        speakText(errMsg);
      }
    } else {
      // Simulate AI response logic (Fallback Local Simulation)
      setTimeout(() => {
        let reply = '';
        let ragData = null;
        let toolData = null;

        const lowerText = userMsg.toLowerCase();

        if (lowerText.includes('stack') || lowerText.includes('tecnolog') || lowerText.includes('backend') || lowerText.includes('1') || lowerText.includes('pila')) {
          reply = language === 'en' 
            ? 'KVRVA develops backends primarily with Python (FastAPI) and TypeScript (NestJS). We design database schemas on PostgreSQL and MongoDB, and deploy our services using Docker and Kubernetes on AWS or GCP.'
            : 'KVRVA desarrolla backends principalmente con Python (FastAPI) y TypeScript (NestJS). Diseñamos esquemas de bases de datos en PostgreSQL y MongoDB, y desplegamos servicios utilizando Docker y Kubernetes en AWS o GCP.';
          
          ragData = {
            active: true,
            file: 'Tecnologias.pdf',
            text: language === 'en'
              ? 'KVRVA standard tech stack: Python (FastAPI) for data/AI models, NestJS for enterprise microservices, Docker for application containerization.'
              : 'Stack tecnológico estándar de KVRVA: Python (FastAPI) para modelos de datos/IA, NestJS para microservicios empresariales, Docker para contenerización.',
            score: 0.98
          };
        } else if (lowerText.includes('cost') || lowerText.includes('presupuesto') || lowerText.includes('preci') || lowerText.includes('2') || lowerText.includes('crm') || lowerText.includes('saas')) {
          reply = language === 'en'
            ? 'Based on our budget calculator tool, a custom SaaS CRM or business platform generally estimates between 40 to 80 hours of engineering (around $3,000 to $6,000 USD) for a clean, production-ready initial release.'
            : 'Según nuestra herramienta de cálculo de presupuestos, un CRM SaaS o plataforma de negocios a medida estima generalmente entre 40 y 80 horas de ingeniería (aproximadamente $3,000 a $6,000 USD) para un lanzamiento inicial limpio y listo para producción.';
          
          toolData = {
            active: true,
            func: 'calcular_presupuesto',
            args: JSON.stringify({ tipo: 'SaaS CRM', usuarios: 500, db: 'PostgreSQL', securityLevel: 'High' }, null, 2),
            ret: JSON.stringify({ horasEstimadas: '50-70 horas', rangoCostoUsd: '$3,500 - $5,500', backend: 'FastAPI', deployment: 'Docker/AWS' }, null, 2)
          };
        } else if (lowerText.includes('sap') || lowerText.includes('erp') || lowerText.includes('integrac') || lowerText.includes('3') || lowerText.includes('sistema')) {
          reply = language === 'en'
            ? 'We develop secure middleware pipelines that connect custom software with ERPs like SAP. This allows real-time synchronization of transactions, inventory data, and client databases via automated endpoints.'
            : 'Desarrollamos tuberías de middleware seguras que conectan el software a medida con ERPs como SAP. Esto permite la sincronización en tiempo real de transacciones, datos de inventario y bases de datos de clientes mediante endpoints automatizados.';
          
          ragData = {
            active: true,
            file: 'IntegracionesERP.pdf',
            text: language === 'en'
              ? 'Middleware architecture connects custom REST APIs to SAP NetWeaver SOAP/REST endpoints with automated failover queues.'
              : 'La arquitectura middleware conecta APIs REST personalizadas a endpoints SOAP/REST de SAP NetWeaver con colas de contingencia automatizadas.',
            score: 0.94
          };
        } else {
          reply = language === 'en'
            ? 'Excellent question! At KVRVA, we design custom database architectures, develop high-performance APIs, and integrate LLM features (such as semantic search and data classification). Feel free to describe your specific project idea in the next tab to generate a complete software architecture proposal!'
            : '¡Excelente pregunta! En KVRVA diseñamos arquitecturas de bases de datos a medida, desarrollamos APIs de alto rendimiento e integramos funcionalidades de LLM (como búsqueda semántica y clasificación de datos). ¡Siéntete libre de describir tu proyecto en la siguiente pestaña para generar una propuesta de arquitectura de software!';
        }

        setIsTyping(false);
        
        // Activate animations for panels
        if (ragData) setActiveRag(ragData);
        if (toolData) setActiveTool(toolData);

        // Stream response word-by-word
        const words = reply.split(' ');
        let currentWordIndex = 0;
        let currentText = '';

        setMessages(prev => [...prev, { sender: 'assistant', text: '', isStreaming: true }]);

        const interval = setInterval(() => {
          if (currentWordIndex < words.length) {
            currentText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
            setMessages(prev => {
              const next = [...prev];
              next[next.length - 1] = { sender: 'assistant', text: currentText, isStreaming: true };
              return next;
            });
            currentWordIndex++;
          } else {
            clearInterval(interval);
            setMessages(prev => {
              const next = [...prev];
              next[next.length - 1] = { sender: 'assistant', text: currentText };
              return next;
            });
            speakText(currentText);
          }
        }, 50);

      }, 1000);
    }
  };

  // Tab 2 proposal builder step handler
  const handleGenerateProposal = () => {
    if (!clientTimeline.trim() || consultationStep !== 3) return;
    
    setConsultationStep(4);
    setProposalStep(1);
    setGeneratedArch(null);

    // Substep 1 loader
    setTimeout(() => {
      setProposalStep(2);
      
      // Substep 2 loader
      setTimeout(() => {
        setProposalStep(3);

        // Substep 3 loader
        setTimeout(() => {
          setConsultationStep(5);

          // Define generated architecture based on user keywords
          const text = clientProblem.toLowerCase() + " " + clientStack.toLowerCase();
          if (text.includes('logis') || text.includes('transp') || text.includes('envio') || text.includes('ruta') || text.includes('despach')) {
            setGeneratedArch({
              db: 'Tables:\n  - shipments (id, driver_id, status, origin, destination, tracking_num)\n  - vehicles (id, plate, capacity, status)\n  - delivery_logs (id, shipment_id, timestamp, coordinate_gps)',
              fe: 'Views & Components:\n  - Live Tracking Map (leaflet/mapbox integration)\n  - Dispatch Scheduler Dashboard (drag-and-drop order queues)\n  - Driver Dispatch Status Panel (mobile-first responsive view)',
              be: 'API Endpoints:\n  - POST /api/v1/shipments/create (register new delivery order)\n  - PUT /api/v1/vehicles/{id}/status (update truck status)\n  - GET /api/v1/routes/optimize (calculate optimal path mapping)',
              ai: language === 'en'
                ? 'Optional Integration:\n  - LLM parser webhook to extract destination addresses and contact info from delivery PDF invoices automatically.'
                : 'Integración Opcional:\n  - Webhook con LLM para extraer automáticamente direcciones de destino e información de contacto desde facturas PDF de despacho.',
              hours: '45 - 65 hours'
            });
          } else if (text.includes('medic') || text.includes('salud') || text.includes('clinic') || text.includes('pacient') || text.includes('turno')) {
            setGeneratedArch({
              db: 'Tables:\n  - patients (id, name, age, medical_history_summary)\n  - appointments (id, patient_id, doctor_id, appointment_date, status)\n  - prescriptions (id, patient_id, details, signature_key)',
              fe: 'Views & Components:\n  - Clinic Dashboard & Calendar (interactive time slots selection)\n  - Patient Health Portal (documents archive & billing tracking)\n  - Medical Notes Editor (rich text with autosave)',
              be: 'API Endpoints:\n  - POST /api/v1/appointments/schedule (book consultation slots)\n  - GET /api/v1/patients/{id}/records (secure medical records fetch)\n  - POST /api/v1/prescriptions/sign (apply doctor digital key)',
              ai: language === 'en'
                ? 'Optional Integration:\n  - Speech-to-text LLM pipeline that converts patient consultations audio into formatted clinical summary notes.'
                : 'Integración Opcional:\n  - Canalización de LLM de voz a texto para convertir el audio de consultas en notas resumen formateadas para el historial clínico.',
              hours: '55 - 75 hours'
            });
          } else if (text.includes('panad') || text.includes('pasteler') || text.includes('bakery') || text.includes('restaur') || text.includes('food') || text.includes('comid') || text.includes('alimen')) {
            setGeneratedArch({
              db: 'Tables:\n  - inventory_items (id, name, stock_qty, unit_measure)\n  - recipe_ingredients (id, recipe_id, ingredient_id, quantity)\n  - production_batches (id, recipe_id, scheduled_time, status)\n  - store_sales (id, total_amount, payment_method)',
              fe: 'Views & Components:\n  - Real-Time Recipe & Batch Planner\n  - POS Checkout Screen (touch-screen layout)\n  - Low Stock Alerts & Inventory Dashboard',
              be: 'API Endpoints:\n  - POST /api/v1/production/start-batch\n  - GET /api/v1/inventory/low-stock\n  - POST /api/v1/sales/checkout',
              ai: language === 'en'
                ? 'Optional Integration:\n  - AI demand predictor that analyzes historical sales and weather forecasts to suggest daily baking production quantities.'
                : 'Integración Opcional:\n  - Predictor de demanda con IA que analiza ventas históricas y pronósticos del clima para sugerir cantidades diarias de horneado.',
              hours: '40 - 55 hours'
            });
          } else if (text.includes('auto') || text.includes('vehicul') || text.includes('car') || text.includes('dealership') || text.includes('concesionar') || text.includes('moto')) {
            setGeneratedArch({
              db: 'Tables:\n  - vehicles_inventory (id, brand, model, year, price, status)\n  - sales_deals (id, vehicle_id, client_id, price_closed, payment_method)\n  - test_drives (id, customer_name, vehicle_id, date, feedback_rating)',
              fe: 'Views & Components:\n  - Vehicle Catalog Dashboard (with advanced filter toggles)\n  - Deal Pipeline Tracker (sales stages & finance options)\n  - Test Drive Booking Calendar',
              be: 'API Endpoints:\n  - POST /api/v1/vehicles/register (register new inventory vehicle)\n  - GET /api/v1/deals/pipeline (fetch sales deal states)\n  - POST /api/v1/test-drives/schedule (book test drive date)',
              ai: language === 'en'
                ? 'Optional Integration:\n  - Computer vision module that scans car photos to detect paint scratches and dents automatically during vehicle trade-in checkups.'
                : 'Integración Opcional:\n  - Módulo de visión artificial que escanea fotos de autos para detectar rayones y abolladuras automáticamente en las tasaciones.',
              hours: '50 - 70 hours'
            });
          } else if (text.includes('hotel') || text.includes('hostal') || text.includes('habitac') || text.includes('booking') || text.includes('reserv') || text.includes('room')) {
            setGeneratedArch({
              db: 'Tables:\n  - rooms (id, room_number, type, price_per_night, status)\n  - bookings (id, guest_name, room_id, check_in, check_out, status)\n  - billing_records (id, booking_id, amount, status)',
              fe: 'Views & Components:\n  - Interactive Room Grid (live occupancy status visual board)\n  - Guest Booking & Check-in Wizard\n  - Housekeeping chore list & Status Dashboard',
              be: 'API Endpoints:\n  - POST /api/v1/bookings/create (make room reservation)\n  - GET /api/v1/rooms/occupancy (check live rooms booking list)\n  - PUT /api/v1/housekeeping/status (update clean status of room)',
              ai: language === 'en'
                ? 'Optional Integration:\n  - RAG chatbot widget that answers guest queries about check-in rules, parking, and amenities based on internal PDF manuals.'
                : 'Integración Opcional:\n  - Widget de chatbot RAG que responde consultas de huéspedes sobre reglas de check-in, estacionamiento y servicios.',
              hours: '45 - 60 hours'
            });
          } else {
            // Default SaaS / CRM
            setGeneratedArch({
              db: 'Tables:\n  - clients (id, name, email, company, lifecycle_stage)\n  - interactions (id, client_id, note, channel_type, timestamp)\n  - invoices (id, client_id, amount, issue_date, payment_status)',
              fe: 'Views & Components:\n  - CRM Pipeline Board (kanban board for deal progression)\n  - Contact Interaction Timeline (chronological client log list)\n  - Invoice Billing Panel (revenue graphs and stripe checkouts)',
              be: 'API Endpoints:\n  - POST /api/v1/clients/create (register new prospect lead)\n  - GET /api/v1/interactions/history (fetch engagement timeline)\n  - POST /api/v1/billing/checkout (trigger custom Stripe checkout session)',
              ai: language === 'en'
                ? 'Optional Integration:\n  - RAG email assistant module that searches client query history and drafts personalized responses for approval.'
                : 'Integración Opcional:\n  - Módulo asistente RAG que escanea el historial del cliente y redacta borradores de correos personalizados automáticamente.',
              hours: '50 - 70 hours'
            });
          }

        }, 1200);
      }, 1200);
    }, 1200);
  };

  // Tab 3 orchestrator handler
  const handleTriggerPipeline = () => {
    if (isOrchRunning) return;
    setIsOrchRunning(true);
    setOrchStep(0);
    setOrchLogs([]);

    const timestamp = () => new Date().toLocaleTimeString();

    // Step 0: REST API input
    setOrchLogs(prev => [...prev, `[${timestamp()}] 📥 [REST API] Incoming request received: POST /api/v1/inquiry`]);
    
    setTimeout(() => {
      // Step 1: AI Classification
      setOrchStep(1);
      setOrchLogs(prev => [
        ...prev, 
        `[${timestamp()}] ⚙️ [REST API] Request payload parsed. Routing to classification engine...`,
        `[${timestamp()}] 🧠 [AI CLASSIFIER] Processing text metadata through LLM model...`,
        `[${timestamp()}] 🧠 [AI CLASSIFIER] Classification output: Category 'CRM Scope Request' (99.4% confidence)`
      ]);

      setTimeout(() => {
        // Step 2: DB write
        setOrchStep(2);
        setOrchLogs(prev => [
          ...prev,
          `[${timestamp()}] 📦 [POSTGRESQL] Opening transactional session...`,
          `[${timestamp()}] 📦 [POSTGRESQL] INSERT INTO inquiries (name, company, details, category_id) VALUES (...)`,
          `[${timestamp()}] 📦 [POSTGRESQL] Transaction committed successfully. Row ID: ${Math.floor(Math.random() * 9000 + 1000)}`
        ]);

        setTimeout(() => {
          // Step 3: Webhook alert
          setOrchStep(3);
          setOrchLogs(prev => [
            ...prev,
            `[${timestamp()}] 🔔 [ALERT WEBHOOK] Compiling payload...`,
            `[${timestamp()}] 🔔 [ALERT WEBHOOK] Dispatching secure POST payload to Slack webhook URL`,
            `[${timestamp()}] ✅ [ALERT WEBHOOK] Status code 200 OK. Notification sent to #inquiries channel.`,
            `[${timestamp()}] 🚀 [PIPELINE] Execution cycle completed in 3.6 seconds.`
          ]);
          setIsOrchRunning(false);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  // Populate CTA contact form description when clicking requesting proposal
  const handleRequestProposalLink = () => {
    if (!generatedArch) return;
    
    const descField = document.getElementById('message') as HTMLTextAreaElement;
    if (descField) {
      const specText = language === 'en'
        ? `Requesting custom software architecture proposal.
Generated specifications:
[Client Name / Company]: ${clientName}
[Target Timeline]: ${clientTimeline}
[Database Schema]:
${generatedArch.db}
[Frontend Views]:
${generatedArch.fe}
[Backend APIs]:
${generatedArch.be}`
        : `Solicitud de propuesta de arquitectura de software a medida.
Especificaciones generadas:
[Nombre Cliente / Empresa]: ${clientName}
[Plazo Objetivo]: ${clientTimeline}
[Esquema de Base de Datos]:
${generatedArch.db}
[Vistas del Frontend]:
${generatedArch.fe}
[APIs del Backend]:
${generatedArch.be}`;

      // Workaround to update React state programmatically
      const nativeValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
      if (nativeValueSetter) {
        nativeValueSetter.call(descField, specText);
        const event = new Event('input', { bubbles: true });
        descField.dispatchEvent(event);
      } else {
        descField.value = specText;
      }
    }
    
    // Smooth scroll to CTA section
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Browser-native vector PDF Proposal download
  const downloadProposalPDF = () => {
    if (!generatedArch) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Propuesta Técnica - ${clientName}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Inter:wght@300;400;600&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            color: #1f2937;
            line-height: 1.6;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          h1, h2, h3 {
            font-family: 'Outfit', sans-serif;
            color: #111827;
          }
          .header {
            border-bottom: 2px solid #8b5cf6;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .header-left h1 {
            margin: 0 0 5px 0;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.05em;
          }
          .header-left span {
            color: #8b5cf6;
            font-weight: 600;
          }
          .header-right {
            text-align: right;
            font-size: 12px;
            color: #6b7280;
          }
          .meta-info {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
            display: grid;
            grid-template-cols: 1fr 1fr;
            gap: 15px;
            font-size: 13px;
          }
          .meta-label {
            font-weight: 600;
            color: #4b5563;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #8b5cf6;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
            margin-bottom: 12px;
          }
          .section-body {
            font-size: 13px;
            white-space: pre-wrap;
            background-color: #fcfcfd;
            border: 1px dashed #e5e7eb;
            border-radius: 8px;
            padding: 15px;
            font-family: monospace;
            color: #374151;
          }
          .signature-box {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .signature {
            border-top: 1px solid #9ca3af;
            width: 200px;
            text-align: center;
            padding-top: 8px;
            font-size: 12px;
            color: #4b5563;
          }
          .footer {
            margin-top: 60px;
            text-align: center;
            font-size: 11px;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-left">
            <h1>KVRVA <span>Studio</span></h1>
            <p style="margin: 0; font-size: 12px; color: #4b5563;">Premium Software Development & AI Integrations</p>
          </div>
          <div class="header-right">
            <p style="margin: 0;"><strong>PROPOSAL ID:</strong> KV-${Math.floor(Math.random() * 90000 + 10000)}</p>
            <p style="margin: 3px 0 0 0;"><strong>DATE:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div class="meta-info">
          <div>
            <span class="meta-label">Client Name / Company:</span><br>
            ${clientName}
          </div>
          <div>
            <span class="meta-label">Estimated Delivery Time:</span><br>
            ${generatedArch.hours}
          </div>
          <div style="grid-column: span 2;">
            <span class="meta-label">Client Requirements Context:</span><br>
            "${clientProblem}"
          </div>
        </div>

        <div class="section">
          <div class="section-title">1. Database Schema Proposal</div>
          <div class="section-body">${generatedArch.db}</div>
        </div>

        <div class="section">
          <div class="section-title">2. Frontend & User Interface Architecture</div>
          <div class="section-body">${generatedArch.fe}</div>
        </div>

        <div class="section">
          <div class="section-title">3. Backend Services & Custom APIs</div>
          <div class="section-body">${generatedArch.be}</div>
        </div>

        <div class="section">
          <div class="section-title">4. Intelligent AI Integration Addons (Optional)</div>
          <div class="section-body">${generatedArch.ai}</div>
        </div>

        <div class="signature-box">
          <div class="signature">
            Client Authorized Signee
          </div>
          <div class="signature">
            Julián Martínez<br>
            <strong>Lead Engineer, KVRVA Studio</strong>
          </div>
        </div>

        <div class="footer">
          Confidential technical scope. Generated autonomously by KVRVA Lab.
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <section id="lab" className="py-24 px-6 relative overflow-hidden transition-colors duration-300">
      {/* Decorative gradients */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-primary/20 bg-accent-primary/5 text-xs text-accent-primary mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase tracking-wider">Playground</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl tracking-tight text-gradient mb-4"
          >
            {t('lab.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg leading-relaxed font-light"
          >
            {t('lab.subtitle')}
          </motion.p>
        </div>

        {/* Lab Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Tab Selectors & Main Module Panel */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Glassmorphic Tab Bar */}
            <div className="flex border border-border-primary rounded-xl bg-bg-secondary/60 p-1.5 glass relative z-10 w-full overflow-x-auto sm:overflow-visible">
              <button
                onClick={() => setActiveTab('assistant')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeTab === 'assistant' 
                    ? 'bg-linear-to-tr from-accent-primary to-accent-secondary text-white shadow-md' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('lab.tabs.assistant')}</span>
              </button>
              <button
                onClick={() => setActiveTab('proposal')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeTab === 'proposal' 
                    ? 'bg-linear-to-tr from-accent-primary to-accent-secondary text-white shadow-md' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{t('lab.tabs.proposal')}</span>
              </button>
              <button
                onClick={() => setActiveTab('orchestrator')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeTab === 'orchestrator' 
                    ? 'bg-linear-to-tr from-accent-primary to-accent-secondary text-white shadow-md' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>{t('lab.tabs.orchestrator')}</span>
              </button>
            </div>

            {/* Tab Contents Panel */}
            <div className="flex-1 border border-border-primary rounded-2xl bg-bg-secondary/40 p-6 glass flex flex-col justify-between min-h-[500px]">
              
              {/* TAB 1: Chatbot & Assistant */}
              {activeTab === 'assistant' && (
                <div className="flex flex-col h-full justify-between gap-6">
                  
                  {/* Talking Avatar UX layer */}
                  <div className="flex items-center gap-3 bg-bg-tertiary/40 border border-border-primary rounded-xl p-3">
                    <div className="relative w-12 h-12 rounded-full bg-linear-to-tr from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/20 shrink-0">
                      {isSpeaking && (
                        <span className="absolute inset-0 rounded-full bg-accent-primary/30 animate-ping" />
                      )}
                      <Cpu className={`w-6 h-6 text-white ${isSpeaking ? 'animate-bounce' : ''}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-text-primary">KVRVA Assistant</h5>
                      <p className="text-[10px] text-text-secondary truncate">
                        {isSpeaking ? (language === 'es' ? 'Hablando...' : 'Speaking...') : (language === 'es' ? 'En línea' : 'Online')}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        const nextMute = !isMuted;
                        setIsMuted(nextMute);
                        if (nextMute) {
                          stopSpeaking();
                        } else {
                          speakText(messages[messages.length - 1].text);
                        }
                      }}
                      className={`p-2 rounded-lg border transition-all cursor-pointer ${
                        !isMuted 
                          ? 'border-accent-primary/50 bg-accent-primary/10 text-accent-primary' 
                          : 'border-border-primary bg-bg-tertiary/60 text-text-secondary'
                      }`}
                      title={isMuted ? "Unmute Voice" : "Mute Voice"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Chat message list area */}
                  <div ref={chatContainerRef} className="flex-1 overflow-y-auto max-h-[260px] pr-2 flex flex-col gap-4">
                    {messages.map((msg, i) => (
                      <div 
                        key={i} 
                        className={`flex flex-col max-w-[85%] ${
                          msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                        }`}
                      >
                        <div 
                          className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                            msg.sender === 'user' 
                              ? 'bg-accent-primary/25 border border-accent-primary/30 text-text-primary rounded-tr-none' 
                              : 'bg-bg-tertiary/75 border border-border-primary text-text-primary rounded-tl-none'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                          {msg.isStreaming && (
                            <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-accent-primary animate-pulse" />
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="self-start flex items-center gap-1.5 p-3 rounded-2xl bg-bg-tertiary/40 border border-border-primary rounded-tl-none">
                        <span className="w-2 h-2 rounded-full bg-accent-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-accent-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-accent-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>

                  {/* Suggestion questions and text input */}
                  <div className="flex flex-col gap-4">
                    
                    {/* Prompt suggestions pills */}
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleSendChat(t('lab.assistant.suggest1'))}
                        className="text-xs px-3.5 py-2 rounded-full border border-border-primary bg-bg-tertiary/30 hover:border-accent-primary/30 hover:bg-accent-primary/5 text-text-secondary hover:text-text-primary transition-all duration-300 cursor-pointer"
                      >
                        {t('lab.assistant.suggest1')}
                      </button>
                      <button 
                        onClick={() => handleSendChat(t('lab.assistant.suggest2'))}
                        className="text-xs px-3.5 py-2 rounded-full border border-border-primary bg-bg-tertiary/30 hover:border-accent-primary/30 hover:bg-accent-primary/5 text-text-secondary hover:text-text-primary transition-all duration-300 cursor-pointer"
                      >
                        {t('lab.assistant.suggest2')}
                      </button>
                      <button 
                        onClick={() => handleSendChat(t('lab.assistant.suggest3'))}
                        className="text-xs px-3.5 py-2 rounded-full border border-border-primary bg-bg-tertiary/30 hover:border-accent-primary/30 hover:bg-accent-primary/5 text-text-secondary hover:text-text-primary transition-all duration-300 cursor-pointer"
                      >
                        {t('lab.assistant.suggest3')}
                      </button>
                    </div>

                    {/* Chat input box */}
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleSendChat(inputVal); }}
                      className="flex gap-2.5"
                    >
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder={t('lab.assistant.welcome').substring(0, 35) + '...'}
                        className="flex-1 bg-bg-tertiary/50 border border-border-primary rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-accent-primary/50 text-text-primary placeholder:text-text-secondary"
                      />
                      <button 
                        type="submit"
                        disabled={isTyping || !inputVal.trim()}
                        className="p-3 rounded-xl bg-linear-to-tr from-accent-primary to-accent-secondary text-white hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-accent-primary/10"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </div>

                </div>
              )}

              {/* TAB 2: Interactive Requirements Generator */}
              {activeTab === 'proposal' && (
                <div className="flex flex-col h-full justify-between gap-6">
                  
                  {/* Step 0: Welcome & Client Name */}
                  {consultationStep === 0 && (
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex items-start gap-3 bg-accent-primary/5 border border-accent-primary/15 rounded-xl p-3.5">
                        <Cpu className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-text-secondary leading-relaxed font-light">
                          {language === 'en'
                            ? "Hello! I am KVRVA's agent consultant. Let's map your custom software requirement. To start, what is your name and the name of your company?"
                            : "¡Hola! Soy el agente consultor de KVRVA. Diseñemos la arquitectura de tu software a medida. Para empezar, ¿cuál es tu nombre y el de tu empresa?"}
                        </p>
                      </div>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Julian / KVRVA Studio"
                        className="w-full bg-bg-tertiary/50 border border-border-primary rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-accent-primary/50 text-text-primary placeholder:text-text-secondary"
                      />
                      <button
                        onClick={() => setConsultationStep(1)}
                        disabled={!clientName.trim()}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-tr from-accent-primary to-accent-secondary text-white font-medium hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <span>{language === 'en' ? 'Next Question' : 'Siguiente Pregunta'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Step 1: Core Problem description */}
                  {consultationStep === 1 && (
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex items-start gap-3 bg-accent-primary/5 border border-accent-primary/15 rounded-xl p-3.5">
                        <Cpu className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-text-secondary leading-relaxed font-light">
                          {language === 'en'
                            ? `Welcome, ${clientName}! What core business problem, automation need, or custom system (e.g. ERP, SaaS, Client Portal) do you want to develop?`
                            : `¡Bienvenido, ${clientName}! ¿Qué problema de negocio, necesidad de automatización o sistema a medida (ej. ERP, SaaS, Portal) deseas construir?`}
                        </p>
                      </div>
                      <textarea
                        value={clientProblem}
                        onChange={(e) => setClientProblem(e.target.value)}
                        placeholder={t('lab.proposal.placeholder')}
                        rows={3}
                        className="w-full bg-bg-tertiary/50 border border-border-primary rounded-xl p-4 text-sm focus:outline-hidden focus:border-accent-primary/50 text-text-primary leading-relaxed placeholder:text-text-secondary"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => setConsultationStep(0)}
                          className="px-5 py-3 rounded-xl border border-border-primary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                        >
                          {language === 'en' ? 'Back' : 'Atrás'}
                        </button>
                        <button
                          onClick={() => setConsultationStep(2)}
                          disabled={!clientProblem.trim()}
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-tr from-accent-primary to-accent-secondary text-white font-medium hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <span>{language === 'en' ? 'Next Question' : 'Siguiente Pregunta'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Tech Preferences */}
                  {consultationStep === 2 && (
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex items-start gap-3 bg-accent-primary/5 border border-accent-primary/15 rounded-xl p-3.5">
                        <Cpu className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-text-secondary leading-relaxed font-light">
                          {language === 'en'
                            ? "Perfect. Do you have any preferred stacks or deployment channels (e.g. React web app, Mobile app, high-performance PostgreSQL, AWS cloud scaling, or AI / RAG modules)?"
                            : "Perfecto. ¿Tienes alguna preferencia tecnológica (ej. aplicación web en React, app móvil, base de datos PostgreSQL, escalado en la nube de AWS, o módulos RAG de IA)?"}
                        </p>
                      </div>
                      <input
                        type="text"
                        value={clientStack}
                        onChange={(e) => setClientStack(e.target.value)}
                        placeholder={language === 'en' ? 'e.g., Web App with PostgreSQL database' : 'ej. Aplicación Web con base de datos PostgreSQL'}
                        className="w-full bg-bg-tertiary/50 border border-border-primary rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-accent-primary/50 text-text-primary placeholder:text-text-secondary"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => setConsultationStep(1)}
                          className="px-5 py-3 rounded-xl border border-border-primary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                        >
                          {language === 'en' ? 'Back' : 'Atrás'}
                        </button>
                        <button
                          onClick={() => setConsultationStep(3)}
                          disabled={!clientStack.trim()}
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-tr from-accent-primary to-accent-secondary text-white font-medium hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <span>{language === 'en' ? 'Next Question' : 'Siguiente Pregunta'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Target Timeline */}
                  {consultationStep === 3 && (
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex items-start gap-3 bg-accent-primary/5 border border-accent-primary/15 rounded-xl p-3.5">
                        <Cpu className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-text-secondary leading-relaxed font-light">
                          {language === 'en'
                            ? "Got it. Finally, what is your desired timeline or launch window for this system?"
                            : "Comprendido. Por último, ¿cuál es tu plazo estimado o ventana de entrega para este sistema?"}
                        </p>
                      </div>
                      <input
                        type="text"
                        value={clientTimeline}
                        onChange={(e) => setClientTimeline(e.target.value)}
                        placeholder="ej. 1 mes / 2 semanas / Q3"
                        className="w-full bg-bg-tertiary/50 border border-border-primary rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-accent-primary/50 text-text-primary placeholder:text-text-secondary"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => setConsultationStep(2)}
                          className="px-5 py-3 rounded-xl border border-border-primary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                        >
                          {language === 'en' ? 'Back' : 'Atrás'}
                        </button>
                        <button
                          onClick={handleGenerateProposal}
                          disabled={!clientTimeline.trim()}
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-tr from-accent-primary to-accent-secondary text-white font-medium hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Layers className="w-4 h-4" />
                          <span>{t('lab.proposal.btn')}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Loading animations */}
                  {consultationStep === 4 && (
                    <div className="flex flex-col items-center justify-center flex-1 py-12 gap-8">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-border-primary border-t-accent-primary animate-spin" />
                        <Cpu className="w-6 h-6 text-accent-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                      </div>
                      
                      <div className="flex flex-col gap-3 w-full max-w-sm text-sm">
                        <div className="flex items-center gap-3 text-text-primary font-medium">
                          <Check className={`w-4 h-4 text-green-500 transition-opacity ${proposalStep >= 1 ? 'opacity-100' : 'opacity-20'}`} />
                          <span className={proposalStep === 1 ? 'text-accent-primary font-bold animate-pulse' : 'text-text-secondary'}>
                            {t('lab.proposal.step1')}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-text-primary font-medium">
                          <Check className={`w-4 h-4 text-green-500 transition-opacity ${proposalStep >= 2 ? 'opacity-100' : 'opacity-20'}`} />
                          <span className={proposalStep === 2 ? 'text-accent-primary font-bold animate-pulse' : 'text-text-secondary'}>
                            {t('lab.proposal.step2')}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-text-primary font-medium">
                          <Check className={`w-4 h-4 text-green-500 transition-opacity ${proposalStep >= 3 ? 'opacity-100' : 'opacity-20'}`} />
                          <span className={proposalStep === 3 ? 'text-accent-primary font-bold animate-pulse' : 'text-text-secondary'}>
                            {t('lab.proposal.step3')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Finished Proposal with print PDF action */}
                  {consultationStep === 5 && generatedArch && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-6 overflow-y-auto max-h-[400px] pr-1"
                    >
                      <div className="flex items-center justify-between border-b border-border-primary pb-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <h4 className="font-display font-bold text-lg text-text-primary">
                            {t('lab.proposal.archTitle')}
                          </h4>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-full border border-accent-secondary/35 bg-accent-secondary/5 text-accent-secondary font-semibold font-mono">
                          EST. TIME: {generatedArch.hours}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                        
                        <div className="p-3.5 rounded-xl border border-border-primary bg-bg-tertiary/20 flex flex-col gap-1.5">
                          <span className="text-[10px] text-accent-primary uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5" />
                            {t('lab.proposal.dbSection')}
                          </span>
                          <p className="text-text-secondary whitespace-pre-wrap leading-relaxed">{generatedArch.db}</p>
                        </div>
                        
                        <div className="p-3.5 rounded-xl border border-border-primary bg-bg-tertiary/20 flex flex-col gap-1.5">
                          <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            {t('lab.proposal.feSection')}
                          </span>
                          <p className="text-text-secondary whitespace-pre-wrap leading-relaxed">{generatedArch.fe}</p>
                        </div>

                        <div className="p-3.5 rounded-xl border border-border-primary bg-bg-tertiary/20 flex flex-col gap-1.5">
                          <span className="text-[10px] text-green-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <Settings className="w-3.5 h-3.5" />
                            {t('lab.proposal.beSection')}
                          </span>
                          <p className="text-text-secondary whitespace-pre-wrap leading-relaxed">{generatedArch.be}</p>
                        </div>

                        <div className="p-3.5 rounded-xl border border-border-primary bg-bg-tertiary/20 flex flex-col gap-1.5">
                          <span className="text-[10px] text-accent-secondary uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            {t('lab.proposal.aiSection')}
                          </span>
                          <p className="text-text-secondary whitespace-pre-wrap leading-relaxed">{generatedArch.ai}</p>
                        </div>

                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={handleRequestProposalLink}
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-tr from-accent-primary to-accent-secondary text-white font-medium hover:brightness-110 transition-all cursor-pointer shadow-md shadow-accent-primary/10"
                        >
                          <span>{t('lab.proposal.ctaBtn')}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={downloadProposalPDF}
                          className="px-5 py-3 rounded-xl border border-accent-primary/30 bg-accent-primary/10 text-accent-primary font-medium hover:bg-accent-primary/20 transition-all duration-300 cursor-pointer flex items-center gap-2"
                        >
                          <FileText className="w-4.5 h-4.5" />
                          <span>PDF</span>
                        </button>

                        <button
                          onClick={() => { 
                            setConsultationStep(0); 
                            setClientName(''); 
                            setClientProblem(''); 
                            setClientStack(''); 
                            setClientTimeline(''); 
                          }}
                          className="px-5 py-3 rounded-xl border border-border-primary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-all duration-300 cursor-pointer"
                        >
                          <RefreshCw className="w-4.5 h-4.5" />
                        </button>
                      </div>

                    </motion.div>
                  )}

                </div>
              )}

              {/* TAB 3: Pipeline Orchestrator */}
              {activeTab === 'orchestrator' && (
                <div className="flex flex-col h-full justify-between gap-6">
                  
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    {t('lab.orchestrator.prompt')}
                  </p>

                  {/* Horizontal visual node graph */}
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-4 relative py-6">
                    
                    {/* Connector lines in the background */}
                    <div className="absolute top-[38px] left-[12%] right-[12%] h-0.5 bg-border-primary z-0">
                      <div 
                        className="h-full bg-linear-to-r from-accent-primary to-cyan-500 transition-all duration-1000 ease-out" 
                        style={{ width: isOrchRunning ? `${(orchStep / 3) * 100}%` : '0%' }}
                      />
                    </div>

                    {/* Node 1: Web API */}
                    <div className="flex flex-col items-center gap-2 z-10">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                          orchStep === 0 
                            ? 'border-accent-primary bg-accent-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-110' 
                            : orchStep > 0
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-border-primary bg-bg-tertiary/60'
                        }`}
                      >
                        <Layers className={`w-5 h-5 ${orchStep === 0 ? 'text-accent-primary' : orchStep > 0 ? 'text-green-500' : 'text-text-secondary'}`} />
                      </div>
                      <span className="text-[10px] font-semibold text-text-secondary tracking-tight text-center">
                        {t('lab.orchestrator.nodeWeb')}
                      </span>
                    </div>

                    {/* Node 2: AI classification */}
                    <div className="flex flex-col items-center gap-2 z-10">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                          orchStep === 1
                            ? 'border-accent-primary bg-accent-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-110'
                            : orchStep > 1
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-border-primary bg-bg-tertiary/60'
                        }`}
                      >
                        <Cpu className={`w-5 h-5 ${orchStep === 1 ? 'text-accent-primary' : orchStep > 1 ? 'text-green-500' : 'text-text-secondary'}`} />
                      </div>
                      <span className="text-[10px] font-semibold text-text-secondary tracking-tight text-center">
                        {t('lab.orchestrator.nodeClassify')}
                      </span>
                    </div>

                    {/* Node 3: PostgreSQL Database */}
                    <div className="flex flex-col items-center gap-2 z-10">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                          orchStep === 2
                            ? 'border-accent-primary bg-accent-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-110'
                            : orchStep > 2
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-border-primary bg-bg-tertiary/60'
                        }`}
                      >
                        <Database className={`w-5 h-5 ${orchStep === 2 ? 'text-accent-primary' : orchStep > 2 ? 'text-green-500' : 'text-text-secondary'}`} />
                      </div>
                      <span className="text-[10px] font-semibold text-text-secondary tracking-tight text-center">
                        {t('lab.orchestrator.nodeDb')}
                      </span>
                    </div>

                    {/* Node 4: Webhook Notification Alert */}
                    <div className="flex flex-col items-center gap-2 z-10">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                          orchStep === 3
                            ? 'border-accent-primary bg-accent-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-110'
                            : 'border-border-primary bg-bg-tertiary/60'
                        }`}
                      >
                        <AlertCircle className={`w-5 h-5 ${orchStep === 3 ? 'text-green-500' : 'text-text-secondary'}`} />
                      </div>
                      <span className="text-[10px] font-semibold text-text-secondary tracking-tight text-center">
                        {t('lab.orchestrator.nodeNotify')}
                      </span>
                    </div>

                  </div>

                  {/* Terminal console window display logs */}
                  <div className="flex-1 min-h-[160px] max-h-[180px] overflow-y-auto border border-border-primary bg-black/50 p-4 rounded-xl font-mono text-[10px] text-green-400 flex flex-col gap-1 shadow-inner relative select-text">
                    <Terminal className="w-4 h-4 text-green-500/40 absolute top-3.5 right-3.5" />
                    {orchLogs.map((log, index) => (
                      <div key={index} className="leading-relaxed">
                        {log}
                      </div>
                    ))}
                    {isOrchRunning && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-3 bg-green-500 animate-pulse" />
                        <span className="text-green-500/60 animate-pulse">Running process step...</span>
                      </div>
                    )}
                    {orchLogs.length === 0 && (
                      <div className="text-green-500/30 flex items-center justify-center h-full">
                        Console idle. Trigger the pipeline to watch system logs.
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleTriggerPipeline}
                    disabled={isOrchRunning}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-linear-to-tr from-accent-primary to-accent-secondary text-white font-medium hover:brightness-110 transition-all shadow-md shadow-accent-primary/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Play className="w-5 h-5" />
                    <span>{t('lab.orchestrator.triggerBtn')}</span>
                  </button>

                </div>
              )}

            </div>

          </div>

          {/* Right Column: Console Panels (RAG & Tool Calling logs) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Console 1: RAG Context Retrieval Info */}
            <div className="border border-border-primary rounded-2xl bg-bg-secondary/40 p-5 glass flex flex-col gap-4 relative overflow-hidden min-h-[220px]">
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-border-primary pb-3 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                  <Database className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary leading-tight">
                    {t('lab.assistant.ragTitle')}
                  </span>
                  <span className="text-[9px] text-text-secondary leading-none">
                    {t('lab.assistant.ragSub')}
                  </span>
                </div>
              </div>

              {/* Console logs */}
              <div className="flex-1 flex flex-col justify-center text-[10px] font-mono leading-relaxed text-text-secondary z-10 relative">
                <AnimatePresence mode="wait">
                  {activeRag ? (
                    <motion.div 
                      key="active" 
                      initial={{ opacity: 0, x: 5 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -5 }}
                      className="flex flex-col gap-2.5"
                    >
                      <div className="flex justify-between items-center bg-accent-primary/5 px-2.5 py-1.5 rounded-lg border border-accent-primary/15">
                        <span className="text-accent-primary font-bold">
                          📄 {activeRag.file}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 font-semibold font-mono">
                          MATCH: {(activeRag.score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="bg-black/25 p-3 rounded-lg border border-border-primary italic text-text-primary text-[9px] leading-relaxed">
                        "...{activeRag.text}..."
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="text-center py-6 text-text-secondary/40 flex flex-col items-center gap-2"
                    >
                      <FileText className="w-6.5 h-6.5 stroke-1" />
                      <span>RAG engine waiting for search criteria...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Console 2: Tool Calling Logger */}
            <div className="border border-border-primary rounded-2xl bg-bg-secondary/40 p-5 glass flex flex-col gap-4 relative overflow-hidden min-h-[220px] flex-1">
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-border-primary pb-3 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Terminal className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary leading-tight">
                    {t('lab.assistant.toolTitle')}
                  </span>
                  <span className="text-[9px] text-text-secondary leading-none">
                    {t('lab.assistant.toolSub')}
                  </span>
                </div>
              </div>

              {/* Console logs */}
              <div className="flex-1 flex flex-col justify-center text-[9px] font-mono leading-relaxed text-cyan-400 z-10 relative">
                <AnimatePresence mode="wait">
                  {activeTool ? (
                    <motion.div 
                      key="active" 
                      initial={{ opacity: 0, x: 5 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -5 }}
                      className="flex flex-col gap-2.5"
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="text-purple-400">System:</span>
                        <span>{t('lab.assistant.toolCall')} <span className="text-yellow-300 font-bold">{activeTool.func}()</span></span>
                      </div>
                      <div className="bg-black/30 p-2.5 rounded-lg border border-border-primary text-[8px] overflow-x-auto text-text-secondary leading-normal">
                        <span className="text-cyan-500">// {t('lab.assistant.toolInput')}:</span>
                        <pre className="mt-1">{activeTool.args}</pre>
                      </div>
                      <div className="bg-black/30 p-2.5 rounded-lg border border-border-primary text-[8px] overflow-x-auto text-green-400 leading-normal">
                        <span className="text-green-500">// {t('lab.assistant.toolResult')}:</span>
                        <pre className="mt-1">{activeTool.ret}</pre>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-text-secondary/40 flex flex-col items-center gap-2"
                    >
                      <Cpu className="w-6.5 h-6.5 stroke-1" />
                      <span>Console waiting for functions execution...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
