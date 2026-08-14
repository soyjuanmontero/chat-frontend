# 💬 Chat App - Frontend

Aplicación de chat en tiempo real construida utilizando **TypeScript nativo**, **Web Components (Shadow DOM)** y una arquitectura de **Single Page Application (SPA)** sin frameworks externos. El cliente maneja persistencia de sesión local y sincronización de mensajes mediante **Firebase Realtime Database** y una API REST alojada en Render.

---

## 🛠️ Arquitectura y Aspectos Técnicos Destacados

Este proyecto implementa patrones de diseño avanzados de desarrollo web cliente utilizando únicamente estándares web nativos y TypeScript:

### 1. 🧩 Web Components Nativos (`CustomElements` & `Shadow DOM`)
* **Encapsulamiento Estricto:** Componentes dinámicos creados mediante la especificación nativa de `HTMLElement` y `attachShadow({ mode: 'open' })`. Esto aísla por completo los estilos CSS evadiendo colisiones globales.
* **Componentes Reutilizables:**
  * `<chat-el>`: Componente visual de burbuja de mensaje con lógica dinámica para alternar entre mensajes enviados (`sent__buble`) o recibidos (`received__buble`).
  * `<form-el>`: Formulario modular con eventos personalizados (`CustomEvent`) que emiten eventos `sendInfo` utilizando `composed: true` para atravesar el Shadow DOM.
  * `<header-el>`: Encabezado global de la aplicación.

### 2. 🗃️ Estado Centralizado Personalizado (Patrón Observer / PubSub)
* **Objeto `state` Unificado:** Toda la información de la aplicación (datos del usuario activo y listado de mensajes) se administra en un único store global expuesto en `state.ts`.
* **Sistema de Suscripción:** Implementación del patrón *Publisher/Subscriber* mediante `state.subscribe(callback)` que notifica a las páginas/vistas para re-renderizar la UI ante cualquier cambio de estado.
* **Persistencia:** Integración con `sessionStorage` para mantener la sesión del usuario (`userId` y `userName`) activa durante las recargas de página.

### 3. 🔀 Router SPA Nativo (History API)
* **Enrutador Custom:** Sistema de rutas basado en expresiones regulares (`RegExp`) e integración directa con `history.pushState` y el evento `popstate` de la ventana.
* **Navegación sin Recargas:** Permite alternar dinámicamente entre las vistas de bienvenida (`initPageWelcome`) y la sala de chat (`initPageStep1`) limpiando e inyectando contenedores en el DOM.

### 4. ⚡ Tiempo Real e Integración Backend
* **Escuchador en Tiempo Real:** Integración directa con **Firebase Realtime Database** a través de `onValue` para sincronizar los mensajes entrantes de la sala (`chatRoom/messages`) de forma instantánea.
* **Conexión REST API:** Peticiones HTTP `fetch` para registrar o validar usuarios contra el servidor en Render (`https://chat-backend-4wx7.onrender.com`).

---

## 🛠️ Tecnologías Utilizadas

* **Lenguaje:** TypeScript / HTML5 / CSS3
* **Arquitectura:** Web Components (Shadow DOM, Custom Events)
* **Base de Datos / Tiempo Real:** Firebase Realtime Database
* **Estilos:** CSS empaquetado e inyectado por componente (Google Fonts: *Roboto*)
* **Compilación / Bundler:** Parcel

---

## ⚙️ Instalación y Ejecución Local

Si deseas ejecutar este proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/soyjuanmontero/chat-frontend.git](https://github.com/soyjuanmontero/chat-frontend.git)
cd chat-frontend

2. Instalar dependencias
Bash
npm install
# o con pnpm
pnpm install
3. Ejecutar en modo desarrollo
Bash
npm run dev
# o con pnpm
pnpm dev
📂 Estructura del Código Fuente
/src/components/: Definición de Custom Elements (chat.ts, form.ts, header.ts).

/src/pages/: Vistas principales de la SPA (welcome.ts, step-1.ts).

/src/router.ts: Lógica del router nativo y control del historial.

/src/state.ts: Store global, métodos de API, referencias a Firebase y suscripciones.

/src/index.ts: Punto de entrada principal e inicialización de componentes.

📡 Backend Relacionado
Este proyecto se conecta con el Backend desarrollado en Node.js, Express y TypeScript:
👉 Repositorio del Backend (chat-backend)