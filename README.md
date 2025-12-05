# FitCenter Mobile (Expo + Firebase)

Aplicación mobile y panel de administración para reservas en tiempo real de clases de **Funcional** y **Pilates Reformer**. Construida con **Expo (React Native + TypeScript)** y sincronizada mediante **Firebase**.

## Requisitos previos
- Node.js **20.x LTS** (usar `nvm use 20` o descargar desde nodejs.org)
- Gestor de paquetes: **npm** (no mezclar con yarn)
- Expo CLI (`npm install -g expo-cli`) opcional para comodidad
- Android Studio / Xcode configurados para builds nativas
- Cuenta de Firebase con proyecto configurado

## Stack técnico
- **Mobile**: Expo SDK 52, React 19, React Native 0.76, TypeScript.
- **Navegación**: Expo Router.
- **Estado**: Zustand.
- **UI**: styled-components con design tokens básicos.
- **Backend/tiempo real**: Firebase (Firestore) + Firebase Auth + FCM; push con `expo-notifications`.
- **Testing**: Jest + React Native Testing Library; base para E2E con Detox (añadir según plataforma).

## Instalación
1. Clona el repositorio y copia las variables de entorno de ejemplo:
   ```bash
   cp .env.example .env.local
   ```
2. Instala dependencias (usa siempre `npx expo install` para paquetes Expo/Firebase si agregas nuevos):
   ```bash
   npm install
   ```

## Configuración de entorno
Define en `.env.local` las claves de Firebase:
```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```
Estas variables se leen vía `expo-constants` (ver `src/services/firebase.ts`). No subas valores reales al repo.

## Comandos
- Desarrollo (Expo Go / web):
  ```bash
  npm run start
  ```
- Android nativo:
  ```bash
  npm run android
  ```
- iOS nativo (requiere macOS + Xcode):
  ```bash
  npm run ios
  ```
- Linter:
  ```bash
  npm run lint
  ```
- Tests (unitarios + integración):
  ```bash
  npm test
  ```
- Build con EAS (configurable en `eas.json` si se agrega):
  ```bash
  npm run build
  ```

> Nota: para agregar dependencias Expo/Firebase usa **siempre** `npx expo install <paquete>` para evitar incompatibilidades con el SDK. Para dependencias puras de JS/TS usa `npm install <paquete>`.

## Arquitectura
- `app/`: rutas Expo Router. Incluye flujo principal `(app)` y panel `(admin)` protegido.
- `src/components`: UI reutilizable (botones, contenedores).
- `src/features`: lógica por módulo (auth, bookings, classes, admin).
- `src/services`: Firebase, Zustand store y casos de uso.
- `src/styles`: tokens de diseño.
- `src/utils`: tipos compartidos.

Separación de capas:
- **Servicios**: `src/services/firebase.ts`, `bookings.ts`, `auth.ts` manejan comunicación con Firebase (Firestore + Auth) y real-time subscriptions.
- **Estado**: `src/services/store.ts` gestiona usuario, sesiones, reservas y políticas.
- **UI**: pantallas en `app/(app)` y `app/(admin)` consumen la capa de servicios/estado.

## Funcionalidades clave
- Registro/login con email/teléfono/social (Firebase Auth modular; hooks listos para conectar UI).
- Calendario y listado de clases con actualización en tiempo real (suscripción Firestore en `subscribeToClasses`).
- Reservas y cancelaciones con control de cupos (`reserveClass`, `cancelReservation`).
- Políticas de cancelación configurables (`BookingPolicy` en Zustand y helper `isCancellationAllowed`).
- Panel de administración en `app/(admin)` para creación/edición de clases y cupos (UI base + consumo de mismos servicios).
- Notificaciones push previstas con `expo-notifications` + FCM (configurar credenciales en Expo/Firebase).

## Testing
- **Unitarios**: lógica de políticas de cancelación (`src/features/bookings/__tests__/policy.test.ts`).
- **Integración (mocked Firebase)**: suscripción en tiempo real a clases (`src/features/bookings/__tests__/realtime.test.ts`).
- **E2E (pendiente)**: configurar Detox o similar para flujos de registro, reserva, actualización de cupos y cancelación. Añadir scripts en `package.json` al habilitarlo.

Ejecuta todos los tests con:
```bash
npm test
```

## Buenas prácticas
- Estricto TypeScript y ESLint + Prettier incluidos.
- Mantén la sincronización en tiempo real mediante listeners Firestore (`subscribeToClasses`, `subscribeToUserBookings`).
- No envíes claves sensibles; usa `.env.local` y EAS Secrets.
- Gestiona errores y loaders en la UI al integrar los servicios.

## Próximos pasos sugeridos
- Añadir guards de autenticación en rutas protegidas (Expo Router middleware).
- Completar flujos UI de reserva/cancelación con `reserveClass` y `cancelReservation` y mostrar estados de carga/error.
- Integrar Expo Notifications con registros de tokens en Firestore y envío vía FCM.
- Añadir validaciones de reglas de seguridad en Firebase (emuladores) y pruebas E2E.
