# Proyecto Fullstack con Node, Express, React, Mongoose y MongoDB

Este proyecto es una aplicación fullstack que utiliza las siguientes tecnologías:

- **Node.js**: Entorno de ejecución para JavaScript en el backend.
- **Express.js**: Framework web para el backend.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario en el frontend.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar los datos de la aplicación.

## Estructura del Proyecto

El proyecto se organiza en dos carpetas principales:

- **client**: Contiene la lógica del frontend, desarrollado con React.
- **src**: Contiene la lógica del backend, desarrollado con Node.js, Express y Mongoose.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

1. **Node.js** (https://nodejs.org)
2. **MongoDB** (https://www.mongodb.com/try/download/community)

Además, asegúrate de que MongoDB esté corriendo localmente en tu máquina. Puedes iniciar MongoDB con el siguiente comando (dependiendo de tu sistema operativo):
## Instalación y Configuración del Proyecto

Sigue estos pasos para clonar y configurar el proyecto:

### 1. Clonar el repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/RodrigoCerezoRolon/bankChallange.git
cd bankChallenge
```
Configurar el Frontend (React)
Navega a la carpeta client, donde se encuentra la lógica del frontend:
```bash
cd client
```
Instala las dependencias necesarias usando npm:
```bash
npm install
npm run dev
```
Esto iniciará la aplicación de React en modo de desarrollo. Por defecto, estará corriendo en http://localhost:5173.

Configurar el Backend (Node.js + Express)
Navega a la carpeta src, donde se encuentra la lógica del backend:
```bash
cd ../src

```
Instala las dependencias del backend con npm:
```bash
npm install
npm run dev
```
Esto iniciará el servidor backend en modo de desarrollo. El servidor estará escuchando en http://localhost:3000

Dentro de src, se encuentra el archivo db.js, que contiene la direccion de conexion de mongoDB

