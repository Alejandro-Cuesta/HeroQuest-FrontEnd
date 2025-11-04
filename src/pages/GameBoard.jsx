import React, { useEffect, useState } from 'react';
import { ENEMIES } from '../data/enemies';
import { getHero } from '../api/characterApi';
import { getInventory, addItem } from '../api/inventoryApi';
import { INITIAL_ITEMS } from '../components/Inventory/InventoryItem';
import '../styles/pages/gameBoard.css';

/**
 * Componente principal del tablero.
 * - Grid virtual 26x19
 * - Héroe, cofres y enemigos
 * - Movimiento con flechas
 * - Carga automática de items iniciales según tipo de héroe
 */
const GameBoard = () => {
  const GRID_WIDTH = 26;
  const GRID_HEIGHT = 19;

  const [grid, setGrid] = useState([]);
  const [hero, setHero] = useState(null);
  const [heroPos, setHeroPos] = useState({ x: 0, y: 0 });
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState('');
  const [inventory, setInventory] = useState([]);

  /**
   * Carga la habitación seleccionada desde RoomModal
   */
  useEffect(() => {
    const roomData = localStorage.getItem('currentRoom');
    if (roomData) setSession({ room: JSON.parse(roomData) });
  }, []);

  /**
   * Inicializa héroe, grid y enemigos
   * También carga inventario y añade items iniciales automáticamente
   */
  useEffect(() => {
    const init = async () => {
      try {
        const h = await getHero();
        setHero(h);

        // Crear grid vacío
        const newGrid = Array.from({ length: GRID_HEIGHT }, (_, y) =>
          Array.from({ length: GRID_WIDTH }, (_, x) => ({ x, y, type: 'empty' }))
        );

        // Cofres aleatorios
        for (let i = 0; i < 6; i++) {
          let rx, ry;
          do {
            rx = Math.floor(Math.random() * GRID_WIDTH);
            ry = Math.floor(Math.random() * GRID_HEIGHT);
          } while (newGrid[ry][rx].type !== 'empty');
          newGrid[ry][rx].type = 'chest';
        }

        // Enemigos (uno de cada tipo)
        ENEMIES.forEach((enemy) => {
          let rx, ry;
          do {
            rx = Math.floor(Math.random() * GRID_WIDTH);
            ry = Math.floor(Math.random() * GRID_HEIGHT);
          } while (newGrid[ry][rx].type !== 'empty');
          newGrid[ry][rx] = { ...newGrid[ry][rx], type: 'enemy', enemy };
        });

        setGrid(newGrid);
        setHeroPos({ x: 0, y: 0 });

        // Cargar inventario desde backend
        const inv = await getInventory();
        setInventory(inv || []);

        // Añadir items iniciales automáticamente si no los tiene
        const heroClass = h.heroClass;
        const initialItems = INITIAL_ITEMS[heroClass] || [];

        for (const item of initialItems) {
          // Comprobar si ya tiene el item por nombre
          if (!inv.some((i) => i.name === item.name)) {
            const added = await addItem(item);
            setInventory((prev) => [...prev, added]);
          }
        }
      } catch (error) {
        console.error('Error al inicializar juego:', error);
      }
    };
    init();
  }, []);

  /**
   * Maneja el movimiento del héroe por el grid
   */
  const handleMove = (dx, dy) => {
    setHeroPos((prev) => {
      const newX = Math.min(Math.max(prev.x + dx, 0), GRID_WIDTH - 1);
      const newY = Math.min(Math.max(prev.y + dy, 0), GRID_HEIGHT - 1);
      const tile = grid[newY]?.[newX];
      if (!tile) return prev;

      if (tile.type === 'chest') {
        setMessage('¡Has encontrado un cofre! 🎁');
        tile.type = 'empty';
      } else if (tile.type === 'enemy') {
        setMessage(`¡Un ${tile.enemy.name} te desafía al combate ⚔️!`);
      } else {
        setMessage('');
      }

      return { x: newX, y: newY };
    });
  };

  // Listener de teclas para mover héroe
  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'ArrowUp') handleMove(0, -1);
      if (e.key === 'ArrowDown') handleMove(0, 1);
      if (e.key === 'ArrowLeft') handleMove(-1, 0);
      if (e.key === 'ArrowRight') handleMove(1, 0);
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [grid]);

  if (!hero || !session || grid.length === 0) return <p>Cargando partida...</p>;

  return (
    <div className="game-board">
      <h2>{session.room.name}</h2>
      <div className="grid">
        {grid.map((row, y) =>
          row.map((tile, x) => {
            let content = null;
            if (heroPos.x === x && heroPos.y === y) content = <span className="hero">🧙‍♂️</span>;
            else if (tile.type === 'chest') content = <span className="chest">💰</span>;
            else if (tile.type === 'enemy') content = (
              <img src={tile.enemy.image} alt={tile.enemy.name} className="enemy" />
            );

            return (
              <div
                key={`${x}-${y}`}
                className="cell"
                style={{ backgroundColor: (x + y) % 2 === 0 ? '#ddd' : '#bbb' }}
              >
                {content}
              </div>
            );
          })
        )}
      </div>
      <div className="message">{message}</div>

      {/* Inventario rápido del héroe */}
      <div className="inventory-summary">
        <h3>Inventario:</h3>
        {inventory.length === 0 ? (
          <p>Vacío</p>
        ) : (
          <ul>
            {inventory.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameBoard;