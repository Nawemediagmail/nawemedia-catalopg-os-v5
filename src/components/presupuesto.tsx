import React, { useState, useRef, useEffect, useCallback } from 'react'; import html2canvas from 'html2canvas';

// ─── HELPER: DESCARGAR PRESUPUESTO COMO IMAGEN ───────────────────────────────
const descargarPresupuesto = async (clientName: string) => {
  const element = document.getElementById('budget-document');
  if (!element) {
    alert('Error: no se encontró el documento');
    return;
  }
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#080810',
      scale: 2,
      useCORS: true,
      logging: false,
    });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `Presupuesto-NAWEMEDIA-${clientName || 'Sin-nombre'}-${new Date().toISOString().split('T')[0]}.png`;
    link.click();
  } catch (error) {
    console.error('Error descargando presupuesto:', error);
    alert('Error al descargar. Intenta nuevamente.');
  }
};

// ─── HELPER: GENERAR LINK DE WHATSAPP ────────────────────────────────────────
const generarWhatsAppLink = (state: { items: Array<{ precio: number; qty?: number }>; descuento: { valor: number }; cliente: { nombre: string } }) => {
  const subtotal = state.items.reduce((s, i) => s + i.precio * (i.qty || 1), 0);
  const discountAmount = state.descuento.valor > 0 ? subtotal * (state.descuento.valor / 100) : 0;
  const total = subtotal - discountAmount;
  const mensaje = `Hola NAWEMEDIA 👋\n\nAcabo de generar mi presupuesto:\n\nCliente: ${state.cliente.nombre}\nServicios: ${state.items.length} ítems\nTotal: CLP$${total.toLocaleString('es-AR')}\n\nQuiero que hablemos sobre esto. ¿Disponible?`;
  const numeroWhatsApp = '56959985061';
  return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
};

// ─── HELPER: ABRIR MERCADO PAGO ──────────────────────────────────────────────
const abrirPagoMercadoPago = (state: { items: Array<{ precio: number; qty?: number }>; descuento: { valor: number }; cliente: { nombre: string } }) => {
  const subtotal = state.items.reduce((s, i) => s + i.precio * (i.qty || 1), 0);
  const discountAmount = state.descuento.valor > 0 ? subtotal * (state.descuento.valor / 100) : 0;
  const total = subtotal - discountAmount;
  const adelanto = Math.round(total * 0.5);
  alert(`Adelanto requerido: CLP$${adelanto.toLocaleString('es-AR')}\n\nTe enviaremos por WhatsApp los datos de la cuenta.`);
  window.open(generarWhatsAppLink(state), '_blank');
};

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  bg: '#080810',
  bgCard: 'rgba(255,255,255,0.035)',
  bgCardHov: 'rgba(255,255,255,0.06)',
  bgInset: 'rgba(0,0,0,0.35)',
  border: 'rgba(255,255,255,0.07)',
  borderMd: 'rgba(255,255,255,0.12)',
  borderAcc: 'rgba(245,158,11,0.55)',
  acc: '#F59E0B',
  accDark: '#D97706',
  accText: '#080810',
  text: '#F1F5F9',
  textMd: '#CBD5E1',
  textMut: '#94A3B8',
  textFnt: '#475569',
  green: '#22C55E',
  red: '#EF4444',
  purple: '#8B5CF6',
};

// ─── CURRENCY CONVERSION (tasas aproximadas — actualizar mensualmente) ────────
const RATES: Record<string, { flag: string; code: string; rate: number }> = {
  USD: { flag: '🇺🇸', code: 'USD', rate: 0.00115 },   // 1 USD ≈ 870 CLP
  EUR: { flag: '🇪🇺', code: 'EUR', rate: 0.00106 },   // 1 EUR ≈ 940 CLP
  BRL: { flag: '🇧🇷', code: 'BRL', rate: 0.00588 },   // 1 BRL ≈ 170 CLP
  COP: { flag: '🇨🇴', code: 'COP', rate: 4.6    },    // 1 CLP ≈ 4.6 COP
  PEN: { flag: '🇵🇪', code: 'PEN', rate: 0.00426 },   // 1 PEN ≈ 235 CLP
  ARS: { flag: '🇦🇷', code: 'ARS', rate: 1.15   },    // volátil — revisar
};

const fmtFx = (clp: number, key: string) => {
  const r = RATES[key];
  const val = clp * r.rate;
  const decimals = val < 10 ? 2 : val < 1000 ? 0 : 0;
  return `${r.flag} ${val.toLocaleString('es-AR', { maximumFractionDigits: decimals })} ${r.code}`;
};

// ─── CATALOG ──────────────────────────────────────────────────────────────────
const CATALOG: Record<string, Array<{ nombre: string; desc: string; precio: number; modalidad?: string; precioVisible?: string }>> = {
  'Vas a dominar tus redes': [
    {
      nombre: 'Sabés dónde estás parado',
      modalidad: 'Pago único',
      desc: 'Análisis completo del perfil de Instagram. Informe de nicho de mercado. Diagnóstico del negocio. Optimización técnica del perfil, incluyendo nombre, descripción y estructura. Configuración de canal de difusión. Entrega de informe estratégico final.',
      precio: 100000,
    },
    {
      nombre: 'Empezás a crecer en serio',
      modalidad: 'Mensual',
      desc: 'Incluye todo lo del plan anterior. Generación de contenido personalizado. Entrega de piezas listas para publicar. Instrucciones estratégicas de publicación. Recomendaciones de optimización de campañas.',
      precio: 155000,
    },
    {
      nombre: 'Dominás el juego',
      modalidad: 'Mensual',
      desc: 'Incluye todo lo del plan anterior. Gestión completa de publicaciones. Diseño y ejecución de campaña de marketing personalizada. Optimización continua de contenido. Informe mensual de rendimiento y seguimiento.',
      precio: 200000,
    },
  ],
  'Verás crecer tu presencia en redes': [
    {
      nombre: 'Todo conectado, trabajando para vos',
      desc: 'Configuración de Instagram Business. Configuración de Facebook Comercial. Configuración de WhatsApp Business con carrito. Vinculación completa entre plataformas. Configuración de cuenta Meta Business.',
      precio: 140000,
    },
    {
      nombre: 'Imagen + Presencia Potenciadas',
      desc: 'Análisis de identidad actual del negocio. Diseño de nueva identidad visual. Unificación estética en todas las plataformas. Diseño de imágenes de perfil, banners y recursos visuales. Entrega de piezas listas para uso en redes.',
      precio: 130000,
      precioVisible: 'Desde 130000',
    },
    {
      nombre: 'Salís al mundo con todo',
      desc: 'Análisis del negocio. Definición de campaña de 7 días. Diseño de 7 piezas de contenido. Preparación de publicaciones. Automatización y gestión inicial.',
      precio: 110000,
    },
    {
      nombre: 'Sabés exactamente qué hacer',
      desc: 'Análisis del estado actual del negocio. Definición de objetivos. Plan de acción personalizado. Guía de uso de redes. Calendario estratégico de publicaciones.',
      precio: 75000,
    },
  ],
  'Tus eventos van a arder': [
    { nombre: 'Tu evento, una imagen', desc: 'Diseño de flyer estático con identidad visual.', precio: 30000 },
    { nombre: 'Tu evento cobra vida', desc: 'Flyer con elementos en movimiento.', precio: 45000 },
    { nombre: 'Otra versión, mismo impacto', desc: 'Variante de un flyer existente.', precio: 15000 },
    { nombre: 'Un video que para el scroll', desc: 'Video reel cinematográfico de alto impacto para promoción de eventos, fiestas o discotecas. Puede incluir diseños 3D, animaciones exclusivas, motion graphics, integración de personajes digitales 3D, atmósferas visuales personalizadas y una construcción visual mucho más elaborada y premium para redes sociales.', precio: 60000 },
  ],
  'La pantalla cobra vida': [
    { nombre: 'La pantalla despierta', desc: 'Incluye animaciones 3D, loops cortos, animación de títulos y animación de logos del evento. Pensado como una solución base para generar contenido visual dinámico y funcional para pantallas LED en fiestas, discotecas y eventos.', precio: 60000 },
    { nombre: 'La pantalla cuenta tu historia', desc: 'Incluye todo lo del pack anterior. Además suma visuales animadas complementarias desarrolladas con el estilo temático e identidad visual del evento. Aproximadamente 3 videos extra para enriquecer el contenido visual general de la pantalla LED.', precio: 90000 },
    { nombre: 'Una experiencia que no se olvida', desc: 'Incluye todo lo del pack anterior. Además suma fotos de artistas animadas, diseños totalmente personalizados, visuales exclusivas, animaciones temáticas avanzadas y una personalización completa orientada a crear una experiencia visual premium y única para el evento.', precio: 130000 },
    { nombre: 'Ese detalle que marca la diferencia', desc: 'Servicio individual para animar un solo elemento puntual. Puede ser únicamente la animación de un logo, un título, un texto o un elemento visual específico, sin contratar un pack completo.', precio: 20000 },
    { nombre: 'Lo necesitás para mañana', desc: 'Entrega expresa en un plazo de 24 horas para servicios urgentes. Aplicable como adicional cuando el cliente necesita prioridad máxima de producción y entrega acelerada.', precio: 50000 },
  ],
};

// ─── COUPON CODES ────────────────────────────────────────────────────────────
const COUPONS: Record<string, { label: string; discount: number }> = {
  'NUEVO10':      { label: 'Nuevo cliente',     discount: 10 },
  'RECURRENTE15': { label: 'Cliente recurrente', discount: 15 },
  'GRANDE20':     { label: 'Pedido grande',      discount: 20 },
  'ADELANT10':    { label: 'Pago anticipado',    discount: 10 },
};

const CONDITIONS = `1. ALCANCE DEL TRABAJO
Los servicios detallados en este presupuesto son los únicos incluidos. Cualquier entregable adicional será presupuestado por separado.

2. REVISIONES
Se incluye una (1) revisión por cada pieza o animación. Revisiones adicionales o cambios fuera del alcance podrán presupuestarse aparte.

3. FORMA DE PAGO
El pago se realiza en su totalidad al inicio del trabajo. Métodos aceptados: Vita Wallet · PayPal · Prex · Transferencia bancaria · Efectivo.

4. ENTREGA DE MATERIAL
El material del cliente (fotos, videos, logos, textos) debe entregarse antes de iniciar la producción. Demoras en la entrega pueden afectar los plazos acordados.

5. CALIDAD Y ESTILO
NAWEMEDIA se compromete a entregar piezas de calidad cinematográfica con animaciones de alto impacto y un look único, utilizando las mejores herramientas disponibles.

6. PROPIEDAD Y USO
Una vez abonado el total, el cliente recibe los archivos finales en los formatos acordados. NAWEMEDIA podrá usar las piezas en su portafolio y redes sociales, salvo acuerdo de confidencialidad expreso.

7. CANCELACIONES
En caso de cancelación una vez iniciado el trabajo, no se realizan devoluciones por trabajo ya ejecutado. Se podrá acordar un crédito para futuros servicios.

8. ACEPTACIÓN
La firma digital y fotografía adjunta de este documento implica la aceptación plena de los servicios, valores, condiciones y forma de pago aquí detallados.`;

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Cliente {
  nombre: string;
  empresa: string;
  fecha: string;
}

interface Descuento {
  label: string;
  valor: number;
}

interface Item {
  id: number;
  nombre: string;
  desc: string;
  precio: number;
  qty: number;
}

interface BudgetState {
  cliente: Cliente;
  items: Item[];
  descuento: Descuento;
  nota: string;
}

interface SignedData {
  sig: string;
  name: string;
  email: string;
  timestamp: string;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n: number) => `CLP$${Number(n).toLocaleString('es-AR')}`;
const today = () => new Date().toISOString().split('T')[0];
const ts = () => new Date().toLocaleString('es-AR', { dateStyle: 'long', timeStyle: 'short' });

const LS_KEY = 'nw_budget_v3';
function loadState(): BudgetState | null {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || 'null');
  } catch {
    return null;
  }
}
function saveState(s: BudgetState) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
  } catch {}
}

// ─── STYLE HELPERS ───────────────────────────────────────────────────────────
const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: C.bgCard,
  border: `1px solid ${C.border}`,
  borderRadius: 20,
  padding: 18,
  ...extra,
});

const inp = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  width: '100%',
  background: C.bgInset,
  border: `1px solid ${C.border}`,
  borderRadius: 10,
  padding: '10px 12px',
  color: C.text,
  fontSize: 14,
  outline: 'none',
  transition: 'border-color .2s',
  boxSizing: 'border-box' as const,
  ...extra,
});

const btnPrim = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: C.acc,
  color: C.accText,
  border: 'none',
  borderRadius: 12,
  padding: '13px 22px',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  transition: 'all .2s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  ...extra,
});

const btnSec = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: 'transparent',
  color: C.textMut,
  border: `1px solid ${C.border}`,
  borderRadius: 12,
  padding: '11px 18px',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all .2s',
  ...extra,
});

const lbl: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: C.textFnt,
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  display: 'block',
  marginBottom: 5,
};

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <img src="assets/logo-cuadrado.png" alt="NAWEMEDIA" style={{ height: 40, width: 40, objectFit: 'contain', flexShrink: 0 }} />
    <img src="assets/logo-titulo.png" alt="NAWEMEDIA" style={{ height: 28, objectFit: 'contain' }} />
  </div>
);

// ─── FIELD ────────────────────────────────────────────────────────────────────
interface FieldProps {
  lbl: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  multi?: boolean;
}

const Field: React.FC<FieldProps> = ({ lbl: fieldLbl, value, onChange, type = 'text', placeholder = '', multi = false }) => (
  <div>
    <span style={lbl}>{fieldLbl}</span>
    {multi ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{ ...inp(), resize: 'vertical', lineHeight: 1.6 } as React.CSSProperties}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inp()}
      />
    )}
  </div>
);

// ─── CURRENCY ROW ─────────────────────────────────────────────────────────────
const CurrencyRow: React.FC<{ totalCLP: number }> = ({ totalCLP }) => (
  <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: C.textFnt, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>
      Equivalente aproximado
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {Object.keys(RATES).map((key) => (
        <div
          key={key}
          style={{
            background: C.bgInset,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: '4px 10px',
            fontSize: 11,
            color: C.textMut,
            whiteSpace: 'nowrap',
          }}
        >
          {fmtFx(totalCLP, key)}
        </div>
      ))}
    </div>
    <div style={{ fontSize: 10, color: C.textFnt, marginTop: 6 }}>
      Tasas orientativas · Los valores reales pueden variar
    </div>
  </div>
);

// ─── TOP NAV ──────────────────────────────────────────────────────────────────
interface TopBarProps {
  view: number;
  setView: (view: number) => void;
  canGoPreview: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ view, setView, canGoPreview }) => {
  const steps = [
    { id: 0, lbl: 'Armar' },
    { id: 2, lbl: 'Cliente' },
    { id: 3, lbl: 'Firmado' },
  ];

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(8,8,16,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${C.border}`,
        padding: '12px 16px',
      }}
    >
      <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo />
        <div style={{ display: 'flex', gap: 4 }}>
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                if (s.id === 0) setView(0);
                if (s.id === 2 && canGoPreview) setView(2);
              }}
              style={{
                background: view === s.id ? C.acc : 'transparent',
                color: view === s.id ? C.accText : view > s.id ? C.textMut : C.textFnt,
                border: `1px solid ${view === s.id ? C.acc : C.border}`,
                borderRadius: 8,
                padding: '5px 10px',
                fontSize: 11,
                fontWeight: 700,
                cursor: s.id === 0 || (s.id === 2 && canGoPreview) ? 'pointer' : 'default',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                opacity: s.id > 2 && view < s.id ? 0.3 : 1,
              }}
            >
              {s.lbl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── VIEW 0: BUILDER ──────────────────────────────────────────────────────────
interface BuilderViewProps {
  state: BudgetState;
  setState: React.Dispatch<React.SetStateAction<BudgetState>>;
  onPreview: () => void;
}

const BuilderView: React.FC<BuilderViewProps> = ({ state, setState, onPreview }) => {
  const [catOpen, setCatOpen] = useState<string | null>(null);
  const [custom, setCustom] = useState({ nombre: '', desc: '', precio: '' });
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(false);

  const subtotal = state.items.reduce((s, i) => s + i.precio * (i.qty || 1), 0);
  const discountAmount = state.descuento.valor > 0 ? subtotal * (state.descuento.valor / 100) : 0;
  const totalFinal = subtotal - discountAmount;

  const applyCoupon = (code: string) => {
    const normalized = code.toUpperCase().trim();
    setCouponCode(normalized);
    if (COUPONS[normalized]) {
      setState((p) => ({
        ...p,
        descuento: { label: COUPONS[normalized].label, valor: COUPONS[normalized].discount },
      }));
      setCouponError(false);
    } else if (normalized !== '') {
      setCouponError(true);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponError(false);
    setState((p) => ({ ...p, descuento: { label: '', valor: 0 } }));
  };

  const addItem = (item: { nombre: string; desc: string; precio: number }) => {
    setState((p) => ({
      ...p,
      items: [...p.items, { ...item, id: Date.now() + Math.random(), qty: 1 }],
    }));
  };

  const removeItem = (id: number) => {
    setState((p) => ({ ...p, items: p.items.filter((i) => i.id !== id) }));
  };

  const setQty = (id: number, v: number) => {
    setState((p) => ({
      ...p,
      items: p.items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, parseInt(String(v)) || 1) } : i)),
    }));
  };

  const isAdded = (nombre: string) => state.items.some((i) => i.nombre === nombre);

  const addCustom = () => {
    if (!custom.nombre || !custom.precio) return;
    addItem({ nombre: custom.nombre, desc: custom.desc, precio: parseFloat(custom.precio) || 0 });
    setCustom({ nombre: '', desc: '', precio: '' });
  };

  return (
    <div className="fade-in" style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 100px' }}>

      {/* CLIENT */}
      <div style={{ ...card(), marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 14 }}>
          ¿Cómo te llamás?
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <Field
            lbl="Tu nombre"
            value={state.cliente.nombre}
            onChange={(v) => setState((p) => ({ ...p, cliente: { ...p.cliente, nombre: v } }))}
            placeholder="Juan Pérez"
          />
          <Field
            lbl="¿De dónde venís?"
            value={state.cliente.empresa}
            onChange={(v) => setState((p) => ({ ...p, cliente: { ...p.cliente, empresa: v } }))}
            placeholder="Tu marca o proyecto"
          />
        </div>
        <Field
          lbl="Fecha"
          type="date"
          value={state.cliente.fecha}
          onChange={(v) => setState((p) => ({ ...p, cliente: { ...p.cliente, fecha: v } }))}
        />
      </div>

      {/* CATALOG */}
      <div style={{ ...card(), marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 14 }}>
          ¿Qué haremos juntos?
        </div>
        {Object.entries(CATALOG).map(([cat, svcs]) => (
          <div key={cat} style={{ marginBottom: 6 }}>
            <button
              onClick={() => setCatOpen(catOpen === cat ? null : cat)}
              style={{
                width: '100%',
                background: catOpen === cat ? 'rgba(245,158,11,0.08)' : C.bgInset,
                border: `1px solid ${catOpen === cat ? C.borderAcc : C.border}`,
                borderRadius: 10,
                padding: '10px 14px',
                color: catOpen === cat ? C.acc : C.textMd,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all .2s',
                textAlign: 'left' as const,
              }}
            >
              <span>{cat}</span>
              <span style={{ fontSize: 10, opacity: 0.6 }}>{catOpen === cat ? '▲' : '▼'}</span>
            </button>
            {catOpen === cat && (
              <div style={{ border: `1px solid ${C.borderAcc}`, borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
                {svcs.map((s) => (
                  <div
                    key={s.nombre}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 14px',
                      borderBottom: `1px solid ${C.border}`,
                      background: isAdded(s.nombre) ? 'rgba(245,158,11,0.04)' : 'transparent',
                      transition: 'background .2s',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: isAdded(s.nombre) ? C.acc : C.text }}>{s.nombre}</div>
                      <div style={{ fontSize: 11, color: C.textFnt, marginTop: 2, lineHeight: 1.4 }}>{s.desc}</div>
                    </div>
                    {s.modalidad && (
                      <div style={{ fontSize: 12, color: C.textMut, whiteSpace: 'nowrap', marginRight: 8 }}>{s.modalidad}</div>
                    )}
                    <button
                      onClick={() => (isAdded(s.nombre) ? null : addItem(s))}
                      style={{
                        background: isAdded(s.nombre) ? 'rgba(34,197,94,0.15)' : C.acc,
                        color: isAdded(s.nombre) ? C.green : C.accText,
                        border: `1px solid ${isAdded(s.nombre) ? 'rgba(34,197,94,0.3)' : 'transparent'}`,
                        borderRadius: 8,
                        padding: '5px 10px',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: isAdded(s.nombre) ? 'default' : 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {isAdded(s.nombre) ? '✓ Listo' : '+ Agregar'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CUSTOM */}
      <div style={{ ...card(), marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 14 }}>
          Algo a medida
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <Field
            lbl="Nombre del servicio"
            value={custom.nombre}
            onChange={(v) => setCustom((p) => ({ ...p, nombre: v }))}
            placeholder="Pack especial"
          />
          <Field
            lbl="Precio (CLP)"
            type="number"
            value={custom.precio}
            onChange={(v) => setCustom((p) => ({ ...p, precio: v }))}
            placeholder="0"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Field
            lbl="Descripción (opcional)"
            value={custom.desc}
            onChange={(v) => setCustom((p) => ({ ...p, desc: v }))}
            placeholder="Detalle del servicio..."
          />
        </div>
        <button
          onClick={addCustom}
          style={{ ...btnSec({ fontSize: 12, padding: '9px 16px', color: C.acc, borderColor: 'rgba(245,158,11,0.3)' }) }}
        >
          + Agregar servicio
        </button>
      </div>

      {/* SELECTED ITEMS */}
      {state.items.length > 0 && (
        <div style={{ ...card(), marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 14 }}>
            Lo que hacemos juntos
          </div>
          {state.items.map((item) => (
            <div
              key={item.id}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${C.border}` }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{item.nombre}</div>
                {item.desc && <div style={{ fontSize: 11, color: C.textFnt, marginTop: 2 }}>{item.desc}</div>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <button onClick={() => setQty(item.id, (item.qty || 1) - 1)} style={{ ...btnSec({ padding: '3px 8px', fontSize: 14, borderRadius: 6 }) }}>−</button>
                <span style={{ fontSize: 13, fontWeight: 700, minWidth: 16, textAlign: 'center' }}>{item.qty || 1}</span>
                <button onClick={() => setQty(item.id, (item.qty || 1) + 1)} style={{ ...btnSec({ padding: '3px 8px', fontSize: 14, borderRadius: 6 }) }}>+</button>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, minWidth: 64, textAlign: 'right', color: C.text }}>
                {fmt(item.precio * (item.qty || 1))}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                style={{ background: 'none', border: 'none', color: C.textFnt, cursor: 'pointer', fontSize: 17, padding: '0 2px', lineHeight: 1 }}
              >
                ×
              </button>
            </div>
          ))}

          {/* Descuento */}
          <div style={{ marginTop: 14, marginBottom: 10 }}>
            <span style={lbl}>Código de descuento</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                placeholder="Ingresá el código"
                value={couponCode}
                onChange={(e) => applyCoupon(e.target.value)}
                onBlur={() => setCouponError(!!couponCode && !COUPONS[couponCode])}
                style={{ ...inp({ fontSize: 12, flex: 1, borderColor: couponError ? C.red : C.border }) }}
              />
              {state.descuento.valor > 0 && (
                <button onClick={removeCoupon} style={{ ...btnSec({ padding: '8px 12px', fontSize: 11, color: C.red, borderColor: 'rgba(239,68,68,0.3)' }) }}>
                  ×
                </button>
              )}
            </div>
            {couponError && <div style={{ fontSize: 11, color: C.red, marginTop: 4 }}>Código no válido</div>}
            {state.descuento.valor > 0 && (
              <div style={{ fontSize: 11, color: C.green, marginTop: 4 }}>
                ✓ {state.descuento.label} ({state.descuento.valor}% aplicado)
              </div>
            )}
          </div>

          {/* Totals */}
          <div style={{ background: C.bgInset, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.textMut, marginBottom: 6 }}>
              <span>Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            {state.descuento.valor > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.green, marginBottom: 6 }}>
                <span>{state.descuento.label} ({state.descuento.valor}%)</span>
                <span>− {fmt(discountAmount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 900, borderTop: `1px solid ${C.borderMd}`, paddingTop: 10, marginTop: 4 }}>
              <span style={{ color: C.textMd }}>TOTAL</span>
              <span style={{ color: C.acc, letterSpacing: '-0.02em' }}>{fmt(totalFinal)}</span>
            </div>
            <CurrencyRow totalCLP={totalFinal} />
          </div>
        </div>
      )}

      {/* NOTA */}
      <div style={{ ...card(), marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 12 }}>
          Algo más que quieras contarme
        </div>
        <Field
          lbl=""
          value={state.nota}
          onChange={(v) => setState((p) => ({ ...p, nota: v }))}
          placeholder="Fecha de entrega estimada, condiciones especiales, observaciones..."
          multi
        />
      </div>

      {/* CTA */}
      <button
        onClick={() => onPreview()}
        disabled={state.items.length === 0}
        style={{
          ...btnPrim({
            width: '100%',
            fontSize: 14,
            padding: '15px',
            borderRadius: 14,
            opacity: state.items.length === 0 ? 0.4 : 1,
            cursor: state.items.length === 0 ? 'not-allowed' : 'pointer',
          }),
        }}
      >
        Continuar al cliente →
      </button>
    </div>
  );
};

// ─── DOCUMENT BODY (shared between preview + client) ─────────────────────────
interface DocBodyProps {
  state: BudgetState;
}

const DocBody: React.FC<DocBodyProps> = ({ state }) => {
  const subtotal = state.items.reduce((s, i) => s + i.precio * (i.qty || 1), 0);
  const discountAmount = state.descuento.valor > 0 ? subtotal * (state.descuento.valor / 100) : 0;
  const total = subtotal - discountAmount;

  return (
    <div id="budget-document" style={{ background: C.bg }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px' }}>
        {/* Header */}
      <div style={{ textAlign: 'center', padding: '28px 0 20px' }}>
        <img
          src="assets/logo-logotipo.png"
          alt="NAWEMEDIA"
          style={{ maxWidth: 200, width: '70%', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />
        <div style={{ fontSize: 12, color: C.textMut, marginTop: 10 }}>Producción y Diseño Audiovisual</div>
      </div>

      {/* Client info */}
      <div style={{ ...card({ marginBottom: 12 }) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 10, color: C.textFnt, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
              Para
            </div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{state.cliente.nombre || '—'}</div>
            {state.cliente.empresa && <div style={{ fontSize: 13, color: C.textMut, marginTop: 2 }}>{state.cliente.empresa}</div>}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: C.textFnt, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
              Fecha
            </div>
            <div style={{ fontSize: 13, color: C.textMd }}>{state.cliente.fecha}</div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div style={{ ...card({ marginBottom: 12 }) }}>
        <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 12 }}>
          Lo que hacemos juntos
        </div>
        {state.items.map((item) => (
          <div
            key={item.id}
            style={{ padding: '10px 0', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', gap: 10 }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                {item.nombre}{item.qty > 1 ? ` ×${item.qty}` : ''}
              </div>
              {item.desc && <div style={{ fontSize: 11, color: C.textFnt, marginTop: 2, lineHeight: 1.4 }}>{item.desc}</div>}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', color: C.textMd }}>
              {fmt(item.precio * (item.qty || 1))}
            </div>
          </div>
        ))}
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.textMut, marginBottom: 6 }}>
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          {state.descuento.valor > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.green, marginBottom: 6 }}>
              <span>{state.descuento.label} ({state.descuento.valor}%)</span>
              <span>− {fmt(discountAmount)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 900, borderTop: `1px solid ${C.borderMd}`, paddingTop: 10, marginTop: 4 }}>
            <span style={{ color: C.textMd }}>TOTAL</span>
            <span style={{ color: C.acc }}>{fmt(total)}</span>
          </div>
          <CurrencyRow totalCLP={total} />
        </div>
      </div>

      {/* Nota */}
      {state.nota && (
        <div style={{ ...card({ marginBottom: 12 }) }}>
          <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 8 }}>
            Notas
          </div>
          <div style={{ fontSize: 13, color: C.textMd, lineHeight: 1.6 }}>{state.nota}</div>
        </div>
      )}

      {/* Conditions */}
      <div style={{ ...card({ marginBottom: 12 }) }}>
        <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 10 }}>
          Condiciones
        </div>
        <pre style={{ fontSize: 11, color: C.textFnt, lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
          {CONDITIONS}
        </pre>
      </div>
      </div>
    </div>
  );
};

// ─── VIEW 2: CLIENT (sign + email) ───────────────────────────────────────────
interface ClientViewProps {
  state: BudgetState;
  onDone: (data: SignedData) => void;
}

const ClientView: React.FC<ClientViewProps> = ({ state, onDone }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [hasSig, setHasSig] = useState(false);
  const [sigName, setSigName] = useState('');
  const [sigEmail, setSigEmail] = useState('');
  const [step, setStep] = useState<'read' | 'sign'>('read');
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (step !== 'sign') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const getPos = (e: MouseEvent | TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const scaleX = canvas.width / r.width;
      const scaleY = canvas.height / r.height;
      const src = 'touches' in e ? e.touches[0] : (e as MouseEvent);
      return { x: (src.clientX - r.left) * scaleX, y: (src.clientY - r.top) * scaleY };
    };

    const start = (e: MouseEvent | TouchEvent) => { e.preventDefault(); setDrawing(true); const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); lastPos.current = p; };
    const move  = (e: MouseEvent | TouchEvent) => { e.preventDefault(); if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); lastPos.current = p; setHasSig(true); };
    const end   = (e: MouseEvent | TouchEvent) => { e.preventDefault(); setDrawing(false); };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', move);
      canvas.removeEventListener('mouseup', end);
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', move);
      canvas.removeEventListener('touchend', end);
    };
  }, [step, drawing]);

  const clearSig = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    setHasSig(false);
  };

  const handleConfirm = () => {
    if (!sigName.trim()) { alert('Por favor ingresá tu nombre completo.'); return; }
    if (!hasSig)          { alert('Por favor firmá en el recuadro.');      return; }
    if (!sigEmail.trim() || !sigEmail.includes('@')) { alert('Por favor ingresá un correo electrónico válido.'); return; }

    const sig = canvasRef.current?.toDataURL('image/png') || '';
    const timestamp = ts();

    const subtotal = state.items.reduce((s, i) => s + i.precio * (i.qty || 1), 0);
    const discountAmount = state.descuento.valor > 0 ? subtotal * (state.descuento.valor / 100) : 0;
    const total = subtotal - discountAmount;
    const itemsText = state.items.map((i) => `  • ${i.nombre}${i.qty > 1 ? ` ×${i.qty}` : ''}: ${fmt(i.precio * (i.qty || 1))}`).join('\n');

    const body = `PRESUPUESTO NAWEMEDIA — Aceptado y Firmado
==========================================

Cliente: ${state.cliente.nombre}
Empresa: ${state.cliente.empresa || '—'}
Fecha: ${state.cliente.fecha}

SERVICIOS:
${itemsText}
${state.descuento.valor > 0 ? `\nDescuento (${state.descuento.label} - ${state.descuento.valor}%): -${fmt(discountAmount)}` : ''}

TOTAL: ${fmt(total)}
${state.nota ? `\nNotas: ${state.nota}\n` : ''}
──────────────────────────────────────────
Firmado por: ${sigName}
Email cliente: ${sigEmail}
Fecha y hora: ${timestamp}

Este presupuesto fue leído, aceptado y firmado digitalmente.
NAWEMEDIA — Producción y Diseño Audiovisual`;

    const subject = encodeURIComponent(`Presupuesto Aceptado — ${state.cliente.nombre} (${state.cliente.empresa || sigEmail})`);
    window.location.href = `mailto:nawemedia@gmail.com,${sigEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;

    onDone({ sig, name: sigName, email: sigEmail, timestamp });
  };

  return (
    <div className="fade-in" style={{ paddingBottom: 40 }}>
      {step === 'read' && (
        <>
          <DocBody state={state} />
          <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 20px' }}>
            <button onClick={() => setStep('sign')} style={{ ...btnPrim({ width: '100%', padding: '15px', fontSize: 14 }) }}>
              Continuar para firmar →
            </button>
          </div>
        </>
      )}

      {step === 'sign' && (
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 40px' }}>
          <button onClick={() => setStep('read')} style={{ ...btnSec({ marginBottom: 20, fontSize: 12 }) }}>
            ← Volver al documento
          </button>
          <div style={{ ...card({ marginBottom: 16 }) }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: C.acc, letterSpacing: '0.08em', marginBottom: 4 }}>
              Aceptación y firma
            </div>
            <div style={{ fontSize: 13, color: C.textMut, lineHeight: 1.6 }}>
              Al firmar confirmás haber leído y aceptado todos los servicios, valores y condiciones del presupuesto. Recibirás una copia por email.
            </div>
          </div>
          <div style={{ ...card({ marginBottom: 14 }) }}>
            <Field lbl="Nombre completo" value={sigName} onChange={setSigName} placeholder="Tu nombre y apellido" />
          </div>
          <div style={{ ...card({ marginBottom: 14 }) }}>
            <Field lbl="Correo electrónico" type="email" value={sigEmail} onChange={setSigEmail} placeholder="tu@email.com" />
          </div>
          <div style={{ ...card({ marginBottom: 14 }) }}>
            <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 10 }}>
              Firma (dibujá con el dedo)
            </div>
            <div style={{ border: `1px solid ${C.borderMd}`, borderRadius: 12, overflow: 'hidden', background: 'rgba(0,0,0,0.4)' }}>
              <canvas ref={canvasRef} width={680} height={160} style={{ width: '100%', height: 160, display: 'block' }} />
            </div>
            <button onClick={clearSig} style={{ ...btnSec({ fontSize: 11, padding: '7px 14px', marginTop: 8 }) }}>
              Borrar firma
            </button>
          </div>
          {/* Botones de descarga + pago + WhatsApp */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <button
              onClick={() => descargarPresupuesto(state.cliente.nombre)}
              style={{ ...btnSec({ padding: '12px 14px', fontSize: 12, borderColor: 'rgba(245,158,11,0.3)', color: C.acc }) }}
            >
              📥 Descargar
            </button>
            <button
              onClick={() => abrirPagoMercadoPago(state)}
              style={{ ...btnSec({ padding: '12px 14px', fontSize: 12, borderColor: 'rgba(245,158,11,0.3)', color: C.acc }) }}
            >
              💳 Pagar 50%
            </button>
          </div>
          <button
            onClick={() => window.open(generarWhatsAppLink(state), '_blank')}
            style={{ ...btnSec({ width: '100%', padding: '12px', fontSize: 12, marginBottom: 12, borderColor: 'rgba(34,178,51,0.3)', color: '#22B233' }) }}
          >
            💬 Hablar por WhatsApp
          </button>
          <button onClick={handleConfirm} style={{ ...btnPrim({ width: '100%', padding: '15px', fontSize: 14 }) }}>
            ✓ Confirmar y enviar presupuesto
          </button>
        </div>
      )}
    </div>
  );
};

// ─── VIEW 3: SIGNED ───────────────────────────────────────────────────────────
interface SignedViewProps {
  state: BudgetState;
  signed: SignedData;
}

const SignedView: React.FC<SignedViewProps> = ({ state, signed }) => {
  const subtotal = state.items.reduce((s, i) => s + i.precio * (i.qty || 1), 0);
  const discountAmount = state.descuento.valor > 0 ? subtotal * (state.descuento.valor / 100) : 0;
  const total = subtotal - discountAmount;

  return (
    <div className="fade-in" style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 60px' }}>
      <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 20, padding: '20px', marginBottom: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: C.green, letterSpacing: '0.08em' }}>Contrato Firmado</div>
        <div style={{ fontSize: 12, color: C.textMut, marginTop: 4 }}>{signed.timestamp}</div>
      </div>

      <div style={{ ...card({ marginBottom: 14 }) }}>
        <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 12 }}>Resumen</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
          <span style={{ color: C.textMut }}>Cliente</span>
          <span style={{ fontWeight: 600 }}>{state.cliente.nombre}</span>
        </div>
        {state.cliente.empresa && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: C.textMut }}>Proyecto</span>
            <span>{state.cliente.empresa}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
          <span style={{ color: C.textMut }}>Firmado por</span>
          <span style={{ fontWeight: 600 }}>{signed.name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
          <span style={{ color: C.textMut }}>Email</span>
          <span style={{ color: C.textMd }}>{signed.email}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 900, borderTop: `1px solid ${C.borderMd}`, paddingTop: 10, marginTop: 4 }}>
          <span style={{ color: C.textMut }}>TOTAL ACEPTADO</span>
          <span style={{ color: C.acc }}>{fmt(total)}</span>
        </div>
      </div>

      <div style={{ ...card({ marginBottom: 14 }), background: 'rgba(34,197,94,0.06)', borderColor: 'rgba(34,197,94,0.2)' }}>
        <div style={{ fontSize: 10, fontWeight: 900, color: C.green, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>✓ Copia enviada por email</div>
        <div style={{ fontSize: 13, color: C.textMut, lineHeight: 1.6 }}>
          Se abrió tu cliente de correo con el presupuesto firmado. Una copia fue enviada a{' '}
          <strong style={{ color: C.textMd }}>{signed.email}</strong> y a{' '}
          <strong style={{ color: C.textMd }}>nawemedia@gmail.com</strong>.
        </div>
      </div>

      <div style={{ ...card({ marginBottom: 14 }) }}>
        <div style={{ fontSize: 10, fontWeight: 900, color: C.acc, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 12 }}>Firma digital</div>
        <div style={{ fontSize: 12, color: C.textMut, marginBottom: 8 }}>
          <strong style={{ color: C.textMd }}>{signed.name}</strong> — {signed.timestamp}
        </div>
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 10, padding: 8, border: `1px solid ${C.border}` }}>
          <img src={signed.sig} alt="Firma" style={{ width: '100%', maxHeight: 100, objectFit: 'contain', display: 'block' }} />
        </div>
      </div>

      {/* BOTONES DE ACCIÓN FINAL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <button
          onClick={() => descargarPresupuesto(state.cliente.nombre)}
          style={{ ...btnSec({ padding: '12px 14px', fontSize: 12, borderColor: 'rgba(245,158,11,0.3)', color: C.acc }) }}
        >
          📥 Descargar
        </button>
        <button
          onClick={() => abrirPagoMercadoPago(state)}
          style={{ ...btnSec({ padding: '12px 14px', fontSize: 12, borderColor: 'rgba(245,158,11,0.3)', color: C.acc }) }}
        >
          💳 Pagar 50%
        </button>
      </div>
      <button
        onClick={() => window.open(generarWhatsAppLink(state), '_blank')}
        style={{ ...btnSec({ width: '100%', padding: '12px', fontSize: 12, marginBottom: 16, borderColor: 'rgba(34,178,51,0.3)', color: '#22B233' }) }}
      >
        💬 Hablar por WhatsApp
      </button>
      <div style={{ fontSize: 11, color: C.textFnt, textAlign: 'center', lineHeight: 1.6 }}>
        Documento aceptado y firmado digitalmente.
        <br />
        NAWEMEDIA — Producción y Diseño Audiovisual
      </div>
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
const INIT = (): BudgetState =>
  loadState() || {
    cliente: { nombre: '', empresa: '', fecha: today() },
    items: [],
    descuento: { label: '', valor: 0 },
    nota: '',
  };

export default function Presupuesto() {
  const [view, setView] = useState(0);
  const [state, setStateRaw] = useState<BudgetState>(INIT);
  const [signed, setSigned] = useState<SignedData | null>(null);

  const setState = useCallback((updater: React.SetStateAction<BudgetState>) => {
    setStateRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveState(next);
      return next;
    });
  }, []);

  const canGoPreview = state.items.length > 0;

  return (
    <div style={{ background: C.bg, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'url(assets/bg-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <TopBar view={view} setView={setView} canGoPreview={canGoPreview} />
      {view === 0 && <BuilderView state={state} setState={setState} onPreview={() => setView(2)} />}
      {view === 2 && <ClientView state={state} onDone={(data) => { setSigned(data); setView(3); }} />}
      {view === 3 && signed && <SignedView state={state} signed={signed} />}
      </div>
    </div>
  );
}
