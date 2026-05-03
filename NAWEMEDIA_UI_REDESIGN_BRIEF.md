# NAWEMEDIA UI Redesign Brief

## Objetivo general

Rediseñar completamente la app de presupuesto interactivo de **NAWEMEDIA** con una interfaz **mobile-first**, premium, simple y clara para clientes no técnicos.

La app actual funciona como un catálogo interno de servicios. El nuevo objetivo es convertirla en un **flujo guiado de cotización**, entendible en menos de 2 minutos.

La prioridad es reducir fricción, ordenar la información y hacer que el cliente entienda rápidamente:

1. Qué necesita.
2. Qué incluye.
3. Cuánto cuesta.
4. Cómo confirma.

---

## Dirección estética

Usar la identidad visual real de NAWEMEDIA como base.

### Estilo visual

- Fondo dark midnight / negro profundo.
- Gradientes cyan, magenta, violet, orange, yellow.
- Glassmorphism sutil.
- Cards redondeadas.
- Bordes con glow controlado.
- Botones tipo pill con gradiente.
- Estética premium multimedia / audiovisual / nightlife-tech.
- Buena legibilidad por encima de decoración.
- Evitar exceso de glow, ruido visual o fondos que compitan con el texto.

### Sensación general

La interfaz debe sentirse:

- Premium.
- Clara.
- Moderna.
- Comercial.
- Visualmente ligada a NAWEMEDIA.
- Fácil de usar para clientes comunes.
- No técnica.
- No saturada.

---

## Nueva arquitectura de flujo

Reemplazar el flujo actual por este recorrido:

1. **Servicios**
2. **Presupuesto**
3. **Datos**
4. **Firma**
5. **Confirmación / vista final**

### Renombrar tabs

- `ARMAR` pasa a `Servicios`
- `CLIENTE` pasa a `Presupuesto`
- `FIRMADO` pasa a `Firma`

Usar un indicador claro de progreso:

```text
Paso 1 de 3
Servicios / Presupuesto / Firma
```

O visual equivalente con stepper.

---

## Reglas UX obligatorias

- Una acción principal por pantalla.
- Textos cortos.
- Nada de párrafos largos visibles.
- Las condiciones completas deben estar ocultas en desplegable.
- Equivalencias internacionales plegadas por defecto.
- Mobile-first.
- Mantener responsive para desktop.
- Componentizar todo.
- No mostrar todos los servicios completos al mismo tiempo.
- Evitar acordeones largos como patrón principal.
- Usar cards simples y escaneables.
- El total debe estar siempre claro.
- El cliente nunca debe tener que adivinar qué hacer después.

---

# Pantallas requeridas

## 1. Pantalla Servicios / selección de intención

Crear una primera pantalla de intención.

### Header

Debe incluir:

- Logo NAWEMEDIA.
- Nombre NAWEMEDIA.
- Stepper o indicador de progreso.

### Título principal

```text
¿Qué necesitás hoy?
```

### Subtítulo

```text
Armá tu presupuesto en menos de 2 minutos.
```

### Cards principales

Mostrar cards grandes con ícono, título y descripción breve:

```text
Redes
Crecé y dominá tus redes.
```

```text
Eventos
Diseños y videos para eventos.
```

```text
Visuales LED
Visuales impactantes en pantallas.
```

```text
Campaña completa
Solución integral para tu marca.
```

```text
Personalizado
Contanos tu idea, lo hacemos real.
```

### Barra inferior sticky

Debe mostrar:

```text
Total actual: CLP$0
```

Botón principal:

```text
Continuar
```

---

## 2. Pantallas de categoría

Crear pantallas de categoría o estados filtrados según la intención elegida.

Patrón de cada card:

- Título funcional claro.
- Descripción corta.
- Precio `Desde CLP$...`.
- Botón `Ver opciones` o `Agregar`.
- Ícono simple.
- Estética card premium.

No mostrar textos extensos de entrada.

---

## Categoría Redes

### Título

```text
Servicios para redes
```

### Subtítulo

```text
Elegí el servicio que mejor se adapte a vos.
```

### Cards

```text
Diagnóstico Instagram
Análisis y optimización del perfil.
Desde CLP$50.000
Ver opciones
```

```text
Gestión inicial de redes
Configuración y piezas listas para publicar.
Desde CLP$80.000
Ver opciones
```

```text
Gestión completa
Campaña, contenido y seguimiento.
Desde CLP$120.000
Agregar
```

---

## Categoría Eventos

### Título

```text
Diseños y videos para eventos
```

### Subtítulo

```text
Elegí el formato ideal para tu evento.
```

### Cards

```text
Flyer estático
Diseño de flyer con identidad visual.
Desde CLP$30.000
Ver opciones
```

```text
Flyer animado / Reel
Video corto para redes.
Desde CLP$60.000
Ver opciones
```

```text
Campaña completa para evento
Flyer + reel + historias.
Desde CLP$120.000
Ver opciones
```

```text
Versión adicional
Variante de diseño o video.
Desde CLP$25.000
Agregar
```

---

## Categoría Visuales LED

### Título

```text
Visuales LED para eventos
```

### Subtítulo

```text
Impacto visual que transforma tu evento.
```

### Cards

```text
Logo o título animado
Animación de logo o título 3D.
Desde CLP$40.000
Ver opciones
```

```text
Pack visual LED
Loops y animaciones listas para pantalla.
Desde CLP$80.000
Agregar
```

```text
Experiencia visual full
Contenido visual completo para pantallas LED.
Desde CLP$150.000
Ver opciones
```

```text
Entrega urgente 24h
Producción prioritaria.
Desde CLP$50.000
Agregar
```

---

## 3. Pantalla Presupuesto

Esta pantalla debe ser extremadamente clara.

### Stepper

Debe destacar:

```text
Presupuesto
```

### Título

```text
Tu presupuesto
```

### Servicios seleccionados

Mostrar cada servicio seleccionado con:

- Nombre.
- Descripción corta.
- Cantidad.
- Precio.
- Botón eliminar.

Ejemplo:

```text
Pack visual LED
Loops y animaciones listas para pantalla.
Cantidad: 1
CLP$80.000
```

```text
Entrega urgente 24h
Producción prioritaria.
Cantidad: 1
CLP$50.000
```

### Código de descuento

Campo:

```text
Ingresá tu código
```

Botón:

```text
Aplicar
```

### Notas del proyecto

Campo:

```text
Contanos detalles importantes...
```

### Resumen

Mostrar:

```text
Subtotal
CLP$130.000
```

```text
TOTAL
CLP$130.000
```

El total debe ser grande, destacado y fácil de ver.

### Equivalentes internacionales

Mostrar plegado por defecto:

```text
Ver equivalentes internacionales
```

Al desplegar, mostrar:

- USD
- EUR
- BRL
- COP
- PEN
- ARS

### Botón principal

```text
Confirmar datos
```

---

## 4. Pantalla Datos

### Título

```text
Tus datos
```

### Subtítulo

```text
Completá la información para continuar.
```

### Campos

```text
Nombre completo
```

```text
Ciudad / País
```

```text
Fecha
```

```text
Correo electrónico
```

```text
Notas adicionales opcionales
```

Placeholder recomendado:

```text
Contanos algo más sobre tu proyecto...
```

### Resumen compacto

Mostrar:

```text
Resumen de tu presupuesto
2 servicios seleccionados
Total estimado: CLP$130.000
```

### Botón principal

```text
Continuar a firma
```

---

## 5. Pantalla Firma

### Stepper

Debe destacar:

```text
Firma
```

### Título

```text
Confirmá tu presupuesto
```

### Subtítulo

```text
Revisá los detalles y confirmá para avanzar.
```

### Resumen compacto

Ejemplo:

```text
Pack visual LED — CLP$80.000
Entrega urgente 24h — CLP$50.000
TOTAL — CLP$130.000
```

### Condiciones principales

Mostrar solo 4 bullets visibles:

```text
Entrega en los plazos acordados.
Incluye revisiones según el plan.
Pago 50% para iniciar el proyecto.
Material final en formatos acordados.
```

### Condiciones completas

Mostrar oculto bajo desplegable:

```text
Ver condiciones completas
```

### Firma digital

Agregar un campo dibujable:

```text
Firma digital
```

Botón secundario:

```text
Limpiar
```

### Botón principal

```text
Confirmar presupuesto
```

### Botones secundarios

Debajo, más pequeños:

```text
Pagar reserva
WhatsApp
Descargar PDF
```

Estos botones no deben competir visualmente con el botón principal.

---

## 6. Pantalla Confirmación / vista final

Esta pantalla debe verse como un documento final premium, listo para enviar al cliente.

### Header

- Logo NAWEMEDIA grande.
- Texto:

```text
Producción y Diseño Audiovisual
```

### Badge de estado

```text
Listo para enviar
```

### Datos del cliente

```text
Cliente: Juan Pérez
Fecha: 26 / 04 / 2026
Proyecto: Evento Corporativo 2026
```

### Servicios seleccionados

```text
Pack visual LED — CLP$80.000
Entrega urgente 24h — CLP$50.000
```

### Totales

```text
Subtotal — CLP$130.000
TOTAL — CLP$130.000
```

### Footer

```text
Gracias por confiar en NAWEMEDIA.
Hacemos que tu visión se vea.
```

### Acciones secundarias

- Compartir.
- Descargar PDF.
- WhatsApp.

---

# Componentes requeridos

Crear o refactorizar componentes reutilizables:

```text
AppHeader
StepProgress
CategoryCard
ServiceCard
SelectedServiceItem
PriceSummary
StickyTotalBar
GradientButton
GlassCard
CurrencyEquivalents
SignaturePad
ConditionsSummary
FinalQuotePreview
```

---

# Sistema visual sugerido

## Colores base

```text
Background principal: #05060D
Panel dark: #0B0D16
Panel elevated: rgba(255,255,255,0.04)
Border subtle: rgba(255,255,255,0.10)
Text primary: #F4F7FB
Text secondary: #9AA7BA
Text muted: #5F6B80
```

## Gradientes de marca

```text
Magenta → Orange → Yellow
Cyan → Blue → Violet
Pink → Violet → Cyan
```

## Botón principal

Debe usar gradiente fuerte:

```text
linear-gradient(90deg, #FF2FB3, #FF7A18, #FFD233)
```

Texto claro, alto contraste, borde redondeado tipo pill.

## Botón secundario

Fondo oscuro, borde sutil, posible glow leve:

```text
rgba(255,255,255,0.04)
border: 1px solid rgba(255,255,255,0.12)
```

## Cards

- Border radius alto.
- Fondo oscuro.
- Glow muy sutil.
- Hover / active con borde gradiente.
- Íconos en contenedor cuadrado redondeado con gradiente.

---

# Criterios de aceptación

La implementación debe cumplir:

- La app compila sin errores.
- No se rompe la lógica actual de cálculo.
- El flujo puede completarse desde selección hasta firma.
- Se ve correctamente en 390px de ancho móvil.
- Mantiene estética NAWEMEDIA.
- El código queda limpio, componentizado y fácil de editar.
- Los textos son más claros y cortos que en la versión actual.
- La interfaz ya no se siente como catálogo interno.
- El cliente entiende qué hacer en cada paso.
- Hay una sola acción principal por pantalla.

---

# Instrucción principal para Codex

```text
Leé este archivo NAWEMEDIA_UI_REDESIGN_BRIEF.md y rediseñá la app siguiendo este documento como fuente de verdad. No improvises la estructura comercial. No agregues servicios nuevos fuera de los definidos. No cambies precios sin indicación. Priorizá claridad, mobile-first, componentes reutilizables, flujo simple y estética premium NAWEMEDIA.
```

---

# Orden recomendado de trabajo para Codex

## Tarea 1 — Auditoría inicial

```text
Analizá la estructura actual del proyecto y explicame qué archivos controlan la UI, la lógica de servicios, el cálculo del total, la firma, WhatsApp y PDF. No edites todavía.
```

## Tarea 2 — Sistema visual

```text
Implementá solamente el nuevo sistema visual: colores, botones, cards, layout, header, stepper y componentes base. No cambies todavía la lógica de negocio.
```

## Tarea 3 — Nuevo flujo

```text
Reemplazá el flujo ARMAR / CLIENTE / FIRMADO por Servicios / Presupuesto / Datos / Firma / Confirmación, manteniendo la lógica actual funcionando.
```

## Tarea 4 — Servicios simplificados

```text
Reorganizá los servicios en categorías simples y cards: Redes, Eventos, Visuales LED, Campaña completa y Personalizado. Eliminá acordeones largos como patrón principal.
```

## Tarea 5 — Finalización

```text
Pulí responsive, PDF, WhatsApp, firma digital, equivalentes internacionales plegados y vista final del presupuesto. Verificá que todo funcione en mobile.
```

---

# Nota estratégica

El objetivo no es decorar la app actual. El objetivo es transformarla en un sistema guiado de cotización comercial.

La estética NAWEMEDIA debe reforzar claridad. Si el diseño se ve premium pero el cliente no entiende qué hacer, el rediseño fracasó.
