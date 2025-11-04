import React, { useState, useEffect } from 'react';
import '../../styles/components/inventoryModal.css';
import { getInventory, addItem, removeItem } from '../../api/inventoryApi';
import { INITIAL_ITEMS } from './InventoryItem';

/**
 * Modal que muestra el inventario del héroe.
 * - Permite añadir items iniciales según héroe.
 * - Permite eliminar items.
 */
const InventoryModal = ({ onClose, heroClass }) => {
  const [inventory, setInventory] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventory();
        setInventory(data || []);
      } catch (error) {
        console.error('Error al cargar inventario:', error);
        setMensaje('No se pudo cargar el inventario');
      }
    };
    fetchInventory();
  }, []);

  /**
   * Añadir items iniciales según tipo de héroe.
   * Se puede llamar al inicio del juego o mediante botón.
   */
  const handleAddInitialItems = async () => {
    const itemsToAdd = INITIAL_ITEMS[heroClass] || [];
    try {
      const addedItems = [];
      for (const item of itemsToAdd) {
        const added = await addItem(item);
        addedItems.push(added);
      }
      setInventory((prev) => [...prev, ...addedItems]);
      setMensaje('Items iniciales añadidos correctamente');
    } catch (error) {
      console.error('Error al añadir items iniciales:', error);
      setMensaje('No se pudieron añadir los items iniciales');
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeItem(id);
      setInventory((prev) => prev.filter((item) => item.id !== id));
      setMensaje('Ítem eliminado');
    } catch {
      setMensaje('No se pudo eliminar el ítem');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="inventory-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Inventario</h2>

        {/* Botón para añadir items iniciales del héroe */}
        <button className="inventory-add" onClick={handleAddInitialItems}>
          ➕ Añadir items iniciales
        </button>

        <div className="inventory-grid">
          {inventory.length === 0 ? (
            <p>No tienes ítems en el inventario.</p>
          ) : (
            inventory.map((item) => (
              <div key={item.id} className="inventory-item">
                <p><strong>{item.name}</strong></p>
                <p>Tipo: {item.type}</p>
                <p>Atk: {item.bonusAttack} | Def: {item.bonusDefense} | HP: {item.bonusHealth}</p>
                <button onClick={() => handleRemove(item.id)}>Eliminar</button>
              </div>
            ))
          )}
        </div>

        {mensaje && <p className="inventory-modal__message">{mensaje}</p>}
      </div>
    </div>
  );
};

export default InventoryModal;