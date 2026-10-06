# UniMind IA

Asistente académico institucional con arquitectura de microservicios.

## Problema

Los estudiantes universitarios pierden tiempo valioso buscando información 
académica y administrativa dispersa en distintas plataformas: reglamentos, 
calendarios, guías de curso y trámites. Esta fragmentación genera confusión, 
retrasos y desmotivación frente a procesos que deberían ser simples.

## Solución propuesta

UniMind IA centraliza esa información y responde las preguntas del estudiante 
en lenguaje natural, en un solo lugar, mediante una arquitectura de 
microservicios que separa responsabilidades: autenticación, gestión de 
documentos institucionales y procesamiento de consultas.

## Integrantes

- Sharon Zamora Alzate
- Juan Jose Agudelo

## Tecnologías utilizadas

- Node.js + Express
- JWT (jsonwebtoken) para autenticación
- bcryptjs para encriptar contraseñas
- Axios para la comunicación entre microservicios
- PostgreSQL como base de datos
- Docker y Docker Compose para levantar la base de datos
- Postman para pruebas de los endpoints

## Arquitectura

El proyecto sigue una arquitectura de microservicios con un API Gateway como 
punto de entrada único, que valida el JWT antes de reenviar las peticiones:
Cliente
│
▼
API Gateway (valida JWT)
│
├──► MS Usuarios (registro, login, perfil)
├──► MS Documentos (CRUD de documentos institucionales)
└──► MS Consultas (procesa preguntas y guarda historial)
Cada microservicio sigue internamente una arquitectura por capas:
Controller → Service → Repository → Base de datos (PostgreSQL)

- **Controller**: recibe la petición HTTP y llama al Service.
- **Service**: contiene la lógica de negocio (validaciones, encriptación, generación de JWT).
- **Repository**: se comunica con la base de datos.

## Endpoints principales

| Servicio    | Método | Endpoint                              | Protegido |
|-------------|--------|----------------------------------------|-----------|
| Usuarios    | POST   | /api/usuarios/registro                | No        |
| Usuarios    | POST   | /api/usuarios/login                   | No        |
| Usuarios    | GET    | /api/usuarios/perfil                  | Sí (JWT)  |
| Documentos  | GET/POST | /api/documentos                     | Sí (JWT)  |
| Documentos  | GET    | /api/documentos/:id                   | Sí (JWT)  |
| Consultas   | POST   | /api/consultas                        | Sí (JWT)  |
| Consultas   | GET    | /api/consultas/historial/:usuarioId   | Sí (JWT)  |

## Cómo levantar el proyecto

1. Clonar el repositorio y entrar a cada carpeta (`gateway`, `microservicio-usuarios`, 
   `microservicio-documentos`, `microservicio-consultas`) para ejecutar `npm install`.
2. Levantar la base de datos: `docker compose up -d`
3. Crear las tablas: `docker exec -i unimind_db psql -U unimind -d unimind < db/init.sql`
4. Correr cada microservicio con `npm run dev` (usuarios: 3001, documentos: 3002, 
   consultas: 3003, gateway: 3000).
5. Probar los endpoints con Postman a través del Gateway (puerto 3000).