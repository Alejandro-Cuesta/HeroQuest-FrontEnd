# HeroQuest Frontend

Frontend de la aplicación **HeroQuest**, un juego de aventuras RPG basado en navegador, desarrollado con **React**. Permite a los usuarios crear personajes, explorar habitaciones, combatir enemigos y gestionar inventario.

---

## 📂 Estructura del Proyecto
```bash
heroquest-frontend/
├── public/
│ ├── index.html
│ └── assets/
│ ├── video/
│ │ └── intro.mp4
│ ├── images/
│ │ ├── characters/
│ │ ├── enemies/
│ │ └── rooms/
│ └── icons/
├── src/
│ ├── api/
│ │ ├── axiosConfig.js
│ │ ├── authApi.js
│ │ ├── characterApi.js
│ │ ├── roomApi.js
│ │ └── inventoryApi.js
│ ├── components/
│ │ ├── Auth/
│ │ │ ├── LoginForm.jsx
│ │ │ └── RegisterForm.jsx
│ │ ├── Character/
│ │ │ ├── CharacterCard.jsx
│ │ │ └── CharacterModal.jsx
│ │ ├── Room/
│ │ │ ├── RoomSelector.jsx
│ │ │ └── RoomModal.jsx
│ │ ├── Inventory/
│ │ │ ├── InventoryGrid.jsx
│ │ │ └── InventoryItem.jsx
│ │ └── UI/
│ │ ├── Navbar.jsx
│ │ ├── Button.jsx
│ │ └── Modal.jsx
│ ├── context/
│ │ ├── AuthContext.jsx
│ │ ├── GameContext.jsx
│ │ └── ThemeContext.jsx
│ ├── hooks/
│ │ ├── useAuth.js
│ │ ├── useCharacter.js
│ │ └── useInventory.js
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Game.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── NotFound.jsx
│ ├── router/
│ │ └── AppRouter.jsx
│ ├── styles/
│ │ ├── global.css
│ │ └── components/
│ │ ├── character.css
│ │ └── inventory.css
│ ├── App.jsx
│ └── main.jsx
├── package.json
└── README.md
```


## ⚡ Tecnologías

- **React 18** – Librería principal para el frontend.
- **React Router** – Navegación entre páginas.
- **Axios** – Comunicación con el backend.
- **Context API** – Gestión de estado global (Auth, Game, Theme).
- **CSS puro / modular** – Estilos globales y por componente.
- **Vite / Create React App** – Configuración del proyecto (según se use).
- **Figma** - Diseño del proyecto
---



## 🚀 Instalación

1. Clonar el repositorio:


git clone https://github.com/Alejandro-Cuesta/heroquest-frontend.git



##  Cobertura de Tests
![Cobertura de Tests](./public/assets/Cobertura.png)



##  Autor

Alejandro Cuesta Cabeza

https://github.com/Alejandro-Cuesta