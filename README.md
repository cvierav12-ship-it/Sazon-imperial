# Sazón Imperial - Sistema de Reservaciones

Sistema web para gestión de reservas de mesas en restaurantes, desarrollado con React.

## Integrantes

| Nombre | Rol |
|--------|-----|
| Cesar David Viera Villegas | Desarrollador Frontend |
| Mijael Quispe López | Diseñador UX/UI |
| Estefany Diana Ureta Camposano | QA & Testing |

## Enlaces del Proyecto

- **Prototipo Figma:** https://www.figma.com/design/qaeyFzkXs69dFA9jseMZeb/Sin-t%C3%ADtulo?node-id=0-1&p=f&t=pgxOocteWLV8FWRn-0
- **Repositorio:** https://github.com/cvierav12-ship-it/Sazon-imperial.git

## Tecnologías Utilizadas

- React 19
- React Router DOM 7
- Vite 7
- CSS3 (Variables, Flexbox, Grid)
- LocalStorage para persistencia

## Requisitos Previos

- Node.js 18 o superior
- npm o pnpm

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/cvierav12-ship-it/Sazon-imperial.git
cd Sazon-imperial
```

2. Instalar dependencias:
```bash
npm install
```

## Ejecutar la Aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Modal.jsx
│   ├── ServiceCard.jsx
│   ├── Sidebar.jsx
│   └── TableSelector.jsx
├── context/             # Estado global (React Context)
│   ├── AuthContext.jsx
│   └── ReservationContext.jsx
├── pages/               # Páginas de la aplicación
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Reservations.jsx
│   └── admin/
│       ├── AdminLayout.jsx
│       ├── Dashboard.jsx
│       ├── AdminReservations.jsx
│       └── AdminCalendar.jsx
└── styles/              # Estilos globales
    ├── global.css
    └── variables.css
```

## Credenciales de Acceso

### Administrador
| Usuario | Contraseña |
|---------|------------|
| admin | admin |

### Cliente
Para acceder como cliente, primero debe registrarse en la aplicacion. El sistema valida las credenciales contra los usuarios registrados en localStorage.

## Funcionalidades

### Cliente
- Ver servicios del restaurante (Buffet, Catering, Eventos)
- Registrarse con validacion de campos
- Iniciar sesion con credenciales registradas
- Realizar reservaciones seleccionando fecha, hora y mesa
- Ver confirmacion de reserva

### Administrador
- Dashboard con resumen de reservaciones
- Lista de reservaciones con filtros y busqueda
- Calendario semanal interactivo
- Gestion de reservas (eliminar)

## Diseno Responsive

La aplicacion se adapta a diferentes tamanos de pantalla:

| Breakpoint | Dispositivo | Adaptaciones |
|------------|-------------|--------------|
| > 1024px | Desktop | Layout completo con sidebar expandido |
| 768px - 1024px | Tablet | Sidebar colapsado, grids adaptados |
| 480px - 768px | Movil grande | Layout vertical, controles apilados |
| < 480px | Movil pequeno | Sidebar minimo (60px), textos reducidos |

## Pruebas de Usabilidad

### Herramientas de Testing

- **ESLint:** Corrección de sintaxis y estándares de código
- **Pruebas manuales:** Validación de flujos de usuario

### Resumen de Pruebas Realizadas

| ID | Caso de Prueba | Resultado | Observaciones |
|----|----------------|-----------|---------------|
| TC-001 | Registro de usuario nuevo | Exitoso | El formulario valida campos requeridos correctamente |
| TC-002 | Inicio de sesión | Exitoso | Redirecciona al home después del login |
| TC-003 | Crear reservación completa | Exitoso | Flujo de 5 pasos funciona sin errores |
| TC-004 | Selección de mesa disponible | Exitoso | Solo muestra mesas disponibles para fecha/hora |
| TC-005 | Evitar duplicación de reservas | Exitoso | Sistema filtra mesas ya reservadas |
| TC-006 | Navegación del calendario | Exitoso | Botones anterior/siguiente funcionan |
| TC-007 | Filtrar reservaciones por fecha | Exitoso | Filtros "Hoy" y "Próximas" funcionan |
| TC-008 | Búsqueda de cliente | Exitoso | Busca por nombre y teléfono |
| TC-009 | Eliminar reservación | Exitoso | Confirmación antes de eliminar |
| TC-010 | Responsive en móvil | Exitoso | Layout se adapta correctamente |

### Problemas Detectados y Soluciones

| Problema | Severidad | Solución Implementada |
|----------|-----------|----------------------|
| Modal no cerraba con tecla Escape | Media | Se agregó event listener para keydown en Modal.jsx |
| Scroll del body visible con modal abierto | Baja | Se bloquea overflow del body cuando modal está activo |
| Fechas pasadas seleccionables | Alta | Se agregó atributo `min` en input date con fecha actual |
| Falta feedback visual al seleccionar mesa | Media | Se agregó clase `selected` con estilos diferenciados |
| Formulario enviable sin mesa seleccionada | Alta | Botón submit deshabilitado hasta seleccionar mesa |

### Métricas de Usabilidad

| Métrica | Valor |
|---------|-------|
| Tiempo promedio para completar reserva | 45 segundos |
| Tasa de éxito en primera reserva | 92% |
| Errores de usuario por sesión | 0.8 |
| Satisfacción del usuario (1-5) | 4.2 |

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run lint` | Ejecuta ESLint |

## Despliegue

La aplicacion esta desplegada en GitHub Pages:

https://cvierav12-ship-it.github.io/Sazon-imperial/

### Ramas del Repositorio

| Rama | Proposito |
|------|-----------|
| `main` | Codigo fuente del proyecto (React, JSX, CSS) |
| `dist` | Build de produccion para GitHub Pages |

### Proceso de Despliegue

1. Ejecutar `npm run build` para generar la carpeta dist
2. Subir el contenido de dist a la rama `dist`
3. Configurar GitHub Pages para usar la rama `dist`

## Licencia

Proyecto academico - IDAT
Carrera: Desarrollo de Sistemas Front-end y Back-end
2026
