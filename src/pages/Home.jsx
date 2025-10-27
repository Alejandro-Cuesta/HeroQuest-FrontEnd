import React, { useState } from 'react';
import Header from '../components/UI/Header';
import CharacterModal from '../components/Character/CharacterModal';
import InventoryModal from '../components/Inventory/InventoryModal';
import RoomModal from '../components/Room/RoomModal';
import '../styles/pages/home.css';

const Home = () => {
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);

  return (
    <div className="home-page">
      <Header />

      <main className="home-page__content">
        <div
          className="home-page__section"
          onClick={() => setShowCharacterModal(true)}
        >
          <img
            src="/assets/images/home/Character 3.jpg"
            alt="Personaje"
            className="home-page__image"
          />
          <p className="home-page__label">Personaje</p>
        </div>

        <div
          className="home-page__section"
          onClick={() => setShowInventoryModal(true)}
        >
          <img
            src="/assets/images/home/Inventory 4.jpg"
            alt="Inventario"
            className="home-page__image"
          />
          <p className="home-page__label">Inventario</p>
        </div>

        <div
          className="home-page__section"
          onClick={() => setShowRoomModal(true)}
        >
          <img
            src="/assets/images/home/Room 1.jpg"
            alt="Habitación"
            className="home-page__image"
          />
          <p className="home-page__label">Habitación</p>
        </div>
      </main>

      {/* Modales */}
      {showCharacterModal && (
        <CharacterModal onClose={() => setShowCharacterModal(false)} />
      )}
      {showInventoryModal && (
        <InventoryModal onClose={() => setShowInventoryModal(false)} />
      )}
      {showRoomModal && (
        <RoomModal onClose={() => setShowRoomModal(false)} />
      )}
    </div>
  );
};

export default Home;