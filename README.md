# 📦 Proyecto Final - API de Gestión Comercial

Este proyecto es una **API RESTful** construida con **Node.js** y **MongoDB**, que gestiona un sistema completo de ventas y productos para una empresa. Se enfoca en el manejo de dos tipos de usuarios: **Administrador** y **Cliente**, cada uno con sus respectivos permisos y funcionalidades.

## 🧾 Descripción General

La API permite gestionar productos, categorías, usuarios, facturas, y proporciona herramientas para que los clientes puedan explorar productos, realizar compras y administrar su cuenta personal.

---

## 👥 Roles del Sistema

### 🔑 Administrador

- **Gestión de Productos**
  - Agregar, visualizar (individual o catálogo), editar y eliminar productos.
  - Controlar inventario y visualizar productos agotados.
  - Consultar productos más vendidos.

- **Gestión de Categorías**
  - Crear, editar, visualizar y eliminar categorías.
  - Reasignación automática de productos a una categoría predeterminada si su categoría original es eliminada.

- **Gestión de Usuarios**
  - Crear usuarios con rol `ADMIN` o `CLIENT`.
  - Editar información de usuarios (según rol).
  - Eliminar usuarios (con restricciones).

- **Gestión de Facturas**
  - Editar facturas con validación de stock.
  - Consultar facturas por usuario y ver productos incluidos.

---

### 👤 Cliente

- **Autenticación de Usuario**
  - Registro automático con rol CLIENT.
  - Login con validación de credenciales.

- **Exploración de Productos**
  - Ver productos más vendidos.
  - Buscar productos por nombre.
  - Filtrar por categorías.

- **Carrito de Compras**
  - Agregar productos al carrito.
  - Finalizar compra y generar factura.

- **Historial de Compras**
  - Consultar compras anteriores.

- **Gestión de Perfil**
  - Editar datos personales.
  - Eliminar cuenta (con verificación).

---

## 🛠 Tecnologías Utilizadas

- **Node.js** + **Express.js**
- **MongoDB** con **Mongoose**
- **JWT** para autenticación
- **Bcrypt** para encriptación de contraseñas
- **dotenv** para variables de entorno
- **Postman** para pruebas

---

## 🔐 Seguridad
Todas las rutas están protegidas mediante autenticación JWT.

Acceso restringido por rol a rutas específicas.

Validaciones en edición/eliminación de datos sensibles.

## 📬 Autor
Desarrollado por R. López
GitHub: @rlopez-2023066
