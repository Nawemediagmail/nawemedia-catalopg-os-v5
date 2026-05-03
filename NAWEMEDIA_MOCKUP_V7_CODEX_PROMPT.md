# NAWEMEDIA — MOCKUP V7 CODEX PROMPT

```text
Rediseñá e implementá la app de presupuesto interactivo de NAWEMEDIA usando como referencia principal el mockup visual general ubicado en:

/design/MOCKUP_V7.png

Este mockup NO representa solamente pantallas finales. Representa el sistema visual completo de la interfaz:
- header
- navegación
- stepper
- cards
- inputs
- botones
- badges
- tags
- estados
- iconos
- chips de moneda
- divisores
- marcos
- tarjetas de servicio
- tarjetas de presupuesto
- vista final de confirmación

Tu tarea es convertir este sistema visual en componentes React reutilizables y aplicar esa estética a toda la app.

NO inventes un estilo nuevo.
NO uses diseño genérico SaaS.
NO uses shadcn default sin personalizar.
NO cambies la jerarquía comercial ya definida.
NO conviertas la app en un catálogo complejo.
La interfaz debe verse como el mockup: dark, neon, premium, audiovisual, simple y mobile-first.

---

# OBJETIVO

Transformar la app actual en un cotizador guiado de NAWEMEDIA, claro para clientes no técnicos y visualmente alineado con la identidad gráfica del estudio.

La app debe permitir:
1. elegir servicios,
2. revisar presupuesto,
3. cargar datos,
4. firmar,
5. confirmar / enviar / descargar.

---

# ESTILO VISUAL OBLIGATORIO

Basarse en el mockup general.

## Fondo

Usar fondo oscuro profundo:

- Base: #05070D / #060814 / #080A12
- Superficies: #0B0E18 / #101322 / #141827
- Cards con efecto glass oscuro sutil.
- Nada de fondos blancos.
- Nada de UI gris genérica.

## Gradientes principales

Usar gradiente NAWEMEDIA:

- Magenta / pink: #FF2D95
- Violeta: #7B61FF
- Cyan: #00E5FF
- Naranja: #FF7A00
- Amarillo: #FFC300

Gradiente principal recomendado:

linear-gradient(90deg, #FF2D95 0%, #FF5C39 45%, #FFC300 100%)

Gradiente secundario:

linear-gradient(90deg, #FF2D95 0%, #7B61FF 50%, #00E5FF 100%)

## Bordes y glow

Cards y botones deben tener borde neon suave:

- borde magenta/cyan/naranja según estado
- glow controlado
- no exagerar blur
- no hacer la interfaz ilegible

Ejemplo visual:
- card dark
- border 1px neon
- sombra externa suave
- resplandor interno mínimo

## Tipografía

Usar fuente limpia tipo mobile premium:

- Inter
- SF Pro
- Sora

Pesos:
- 400 texto
- 500 subtítulos
- 600 cards
- 700 títulos / precios / CTA

No usar tipografías decorativas en la UI principal.

---

# ESTRUCTURA GENERAL

La app debe tener 3 estados principales visibles en navegación:

1. Servicios
2. Cotización
3. Listo

También puede mapearse internamente como:

1. Servicios
2. Presupuesto
3. Datos
4. Firma
5. Confirmación

Pero visualmente debe mantenerse simple: Servicios / Cotización / Listo.

---

# HEADER

Crear componente:

AppHeader

Debe incluir:
- logo NAWEMEDIA
- línea visual tipo waveform / barra neon si aplica
- botón menú hamburguesa
- fondo dark
- altura compacta
- borde inferior sutil

El logo debe estar alineado a la izquierda.
El menú a la derecha.
Debe verse como el header del mockup.

---

# STEPPER

Crear componente:

StepperProgress

Debe mostrar:
- círculo activo azul / cyan
- círculos inactivos oscuros
- línea horizontal sutil
- labels:
  - Servicios
  - Cotización
  - Listo

El stepper debe estar visible en las pantallas principales.
Debe ser compacto y mobile-first.

---

# PANTALLA 1 — SERVICIOS

Título:

¿Qué necesitás hoy?

Subtítulo:

Armá tu presupuesto en menos de 3 minutos.

Mostrar cards grandes de categoría con el estilo del mockup:

1. Redes
   Crecé y dominá tus redes

2. Eventos
   Diseños y videos para eventos

3. Visuales LED
   Visuales impactantes en pantallas

4. Campaña completa
   Solución integral para tu marca

5. Personalizado
   Contanos tu idea, lo hacemos real

Cada card debe tener:
- icono cuadrado neon a la izquierda
- título blanco
- descripción gris azulada
- flecha a la derecha
- borde neon sutil
- fondo dark glass
- estado hover/active con glow más fuerte

La card debe verse como el botón “Redes” del mockup general.

Abajo:
StickyFooter

- Total actual: CLP$0
- botón principal: Continuar

---

# PANTALLAS DE CATEGORÍA

No usar acordeones como estructura principal.

Usar cards de servicio simples.

Cada card debe mostrar:
- icono
- título
- descripción corta
- precio
- botón o flecha
- estado seleccionado si se agrega

---

## CATEGORÍA REDES

Título:

Servicios para redes

Subtítulo:

Elegí el servicio que mejor se adapte a vos.

Servicios:

1. Diagnóstico Instagram
   Análisis y optimización del perfil.
   Desde CLP$50.000
   Acción: Ver opciones

2. Gestión inicial de redes
   Configuración y piezas listas para publicar.
   Desde CLP$80.000
   Acción: Ver opciones

3. Gestión completa
   Campaña, contenido y seguimiento.
   Desde CLP$120.000
   Acción: Agregar

---

## CATEGORÍA EVENTOS

Título:

Diseños y videos para eventos

Subtítulo:

Elegí el elemento ideal para tu evento.

Servicios:

1. Flyer estático
   Diseño de flyer con identidad visual.
   Desde CLP$30.000
   Acción: Agregar

2. Flyer animado / Reel
   Video corto para redes.
   Desde CLP$60.000
   Acción: Ver opciones

3. Campaña completa para evento
   Flyer + reel + historias.
   Desde CLP$120.000
   Acción: Ver opciones

4. Versión adicional
   Variante de diseño o video.
   Desde CLP$25.000
   Acción: Agregar

---

## CATEGORÍA VISUALES LED

Título:

Visuales LED para eventos

Subtítulo:

Impacto visual que transforma tu evento.

Servicios:

1. Logo o título animado
   Animación de logo o título 3D.
   Desde CLP$40.000
   Acción: Ver opciones

2. Pack visual LED
   Pack de animaciones LED totales.
   Desde CLP$80.000
   Acción: Agregar

3. Experiencia visual full
   Contenido visual completo para pantallas LED.
   Desde CLP$150.000
   Acción: Ver opciones

4. Entrega urgente 24h
   Producción y entrega prioritaria.
   Desde CLP$50.000
   Acción: Agregar

---

# TARJETAS DE SERVICIO

Crear componente:

ServiceCard

Variantes:
- default
- selected
- compact
- withPrice
- withAction
- removable

Reglas visuales:
- Fondo #0B0E18
- Borde #1C2235 o neon si está activa
- Border radius 16px
- Icono cuadrado 44–56px
- Título blanco 600
- Descripción #8B95AA
- Precio destacado amarillo/naranja
- Botón “Agregar” con gradiente magenta → naranja → amarillo
- Botón “Ver opciones” dark con borde neon
- Flecha derecha cuando sea card de navegación

---

# BOTONES

Crear componente:

GradientButton

Variantes:

1. Primary
   Texto blanco
   Fondo gradiente magenta → naranja → amarillo
   Radius 14–16px
   Glow suave

2. Secondary
   Fondo oscuro
   Borde neon cyan/magenta
   Texto blanco

3. Add
   Texto: + Agregar
   Gradiente magenta → naranja

4. Success
   Texto verde
   Borde verde
   Fondo verde oscuro

5. Danger / remove
   Ícono X
   color gris/rojo suave

Botones del mockup que deben replicarse:
- Continuar →
- Ver opciones
- + Agregar servicio
- ✓ Listo
- Aplicar
- Confirmar
- Cancelar

---

# INPUTS

Crear componente:

InputField

Debe replicar los campos del mockup:

- fondo dark
- borde azul/cyan sutil
- border radius 10–12px
- label en uppercase pequeño
- placeholder gris
- estado focus con borde cyan
- estado error con borde rojo/magenta

Tipos:
- text
- date
- dropdown
- textarea

---

# PANTALLA COTIZACIÓN / PRESUPUESTO

Título:

Lo que hacemos juntos

Subtítulo:

Revisá y personalizá tu presupuesto.

Mostrar servicios seleccionados con:
- icono
- título
- descripción corta
- cantidad con - / +
- precio
- eliminar

Después:

Sección:
Algo a medida

Campos:
- Nombre del servicio
- Precio (CLP)
- Descripción opcional
- Botón: + Agregar servicio

Código de descuento:
- input
- botón Aplicar

Resumen:
- Subtotal
- TOTAL

TOTAL debe estar destacado en amarillo #FFC300.

Equivalente aproximado:
chips con banderas:
- USD
- EUR
- BRL
- COP
- PEN
- ARS

Los chips deben seguir el estilo del mockup:
dark pill, borde sutil, bandera, número.

Botón principal:
Continuar →

---

# PANTALLA DATOS

Título:

Tus datos

Subtítulo:

Completá la información para continuar.

Campos:
- Nombre
- ¿De dónde venís?
- Fecha
- Correo electrónico
- Notas adicionales opcional

Resumen inferior:
- Resumen de tu presupuesto
- cantidad de servicios seleccionados
- Total estimado
- Total destacado en amarillo

Botón:
Continuar a firma →

---

# PANTALLA FIRMA

Título:

Confirmá tu presupuesto

Subtítulo:

Revisá los detalles y confirmá para avanzar.

Mostrar:
- servicios seleccionados
- precios
- TOTAL

Bloque condiciones principales:
- Entrega en los plazos acordados.
- Incluye revisiones según el plan.
- Pago 50% para iniciar el proyecto.
- Material final en formatos acordados.

Dropdown:
Ver condiciones completas

Firma digital:
- canvas oscuro
- borde sutil
- botón limpiar

Botón principal:
Confirmar presupuesto ✓

Botones secundarios:
- Pagar reserva
- WhatsApp
- Descargar PDF

---

# PANTALLA FINAL / LISTO PARA ENVIAR

Título:

Listo para enviar

Subtítulo:

Confirmá tu presupuesto.

Mostrar:
- logo grande NAWEMEDIA
- “Producción y Diseño Audiovisual”
- badge verde: ✓ Listo para enviar

Card de datos:
- Para
- Fecha
- Proyecto

Card de servicios seleccionados:
- Pack visual LED
- Entrega urgente 24h
- subtotal
- TOTAL

Acciones:
- Pagar reserva
- WhatsApp
- Descargar PDF

---

# ICONOGRAFÍA

Usar iconos simples tipo lineal/neon.

Iconos necesarios:
- redes / crecimiento
- Instagram
- calendario/eventos
- video/reel
- LED
- estrella
- rayo
- herramientas
- usuario
- flecha derecha
- volver
- menú
- calendario
- cerrar
- check
- más
- menos

Los iconos deben estar dentro de cuadrados redondeados con gradiente neon como el mockup.

---

# COMPONENTES OBLIGATORIOS

Crear estos componentes:

- AppHeader
- StepperProgress
- CategoryCard
- ServiceCard
- SelectedServiceCard
- CustomServiceForm
- DiscountInput
- PriceSummary
- CurrencyChip
- StickyFooter
- GradientButton
- SecondaryButton
- InputField
- TextAreaField
- Badge
- SignaturePad
- ConditionsBlock
- FinalQuoteCard

---

# REGLAS DE UX

- Una acción principal por pantalla.
- Máximo dos acciones secundarias.
- Textos cortos.
- No mostrar párrafos largos.
- Todo texto legal largo va colapsado.
- Las cards deben ser fáciles de tocar en mobile.
- El precio siempre visible cuando hay servicio.
- El total siempre visible antes de confirmar.
- No usar acordeones como estructura principal.
- El usuario nunca debe perder dónde está dentro del flujo.

---

# RESPONSIVE

Mobile-first obligatorio.

Optimizar para:
- 390px de ancho
- 430px de ancho
- desktop centrado con max-width

En desktop:
- No expandir demasiado.
- Mantener apariencia de app mobile premium centrada.

---

# LÓGICA FUNCIONAL

Mantener o implementar:

- selección de servicios
- agregar servicio
- eliminar servicio
- modificar cantidad
- calcular subtotal
- calcular total
- aplicar descuento
- agregar servicio personalizado
- completar datos del cliente
- firma digital
- descargar PDF
- generar mensaje de WhatsApp
- confirmar presupuesto

---

# CRITERIOS DE ACEPTACIÓN

El resultado debe cumplir:

1. Compila sin errores.
2. UI mobile-first.
3. Visualmente coincide con MOCKUP_V7.
4. El flujo se completa desde servicios hasta listo para enviar.
5. Los servicios seleccionados se reflejan en presupuesto.
6. El total se calcula correctamente.
7. La estética NAWEMEDIA se mantiene en todos los componentes.
8. El código queda componentizado.
9. No se agregan dependencias innecesarias.
10. No se inventa otra estructura visual.

---

# ORDEN DE IMPLEMENTACIÓN

1. Crear tokens visuales.
2. Crear componentes base.
3. Implementar pantalla Servicios.
4. Implementar categorías.
5. Implementar Cotización.
6. Implementar Datos.
7. Implementar Firma.
8. Implementar Confirmación.
9. Pulir responsive.
10. Comparar visualmente con MOCKUP_V7.

---

# ARCHIVOS RECOMENDADOS

Crear o actualizar:

/src/components/AppHeader.tsx
/src/components/StepperProgress.tsx
/src/components/CategoryCard.tsx
/src/components/ServiceCard.tsx
/src/components/GradientButton.tsx
/src/components/InputField.tsx
/src/components/PriceSummary.tsx
/src/components/SignaturePad.tsx
/src/components/FinalQuoteCard.tsx
/src/styles/tokens.ts
/src/data/services.ts

---

# INSTRUCCIÓN FINAL

Leé primero /design/MOCKUP_V7.png.

Extraé de ese mockup:
- colores
- formas
- jerarquía
- tamaños
- estilos de botones
- estilos de cards
- estados visuales
- tipos de iconos
- estructura de pantallas

Después implementá la app siguiendo ese sistema.

El resultado debe sentirse como una app real de NAWEMEDIA, no como un template SaaS genérico.
```

## TIP PRO⭐️

Subí este mockup como:

```text
/design/MOCKUP_V7.png
```

Agregá otro archivo:

```text
/design/IMPLEMENTATION_NOTES.md
```

Con esta frase arriba:

```text
MOCKUP_V7.png es la fuente visual principal. Las pantallas individuales son secundarias. En caso de conflicto visual, seguir MOCKUP_V7.
```
