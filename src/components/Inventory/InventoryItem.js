/**
 * Catálogo de items iniciales por tipo de héroe.
 * - Bárbaro: Espada Corta y Botas
 * - Guerrero: Espada Corta, Escudo y Botas
 */
export const INITIAL_ITEMS = {
    Barbaro: [
        { name: 'Espada Corta', type: 'Weapon', bonusAttack: 3, bonusDefense: 0, bonusHealth: 0 },
        { name: 'Botas', type: 'Armor', bonusAttack: 0, bonusDefense: 1, bonusHealth: 0 },
    ],
    Guerrero: [
        { name: 'Espada Corta', type: 'Weapon', bonusAttack: 3, bonusDefense: 0, bonusHealth: 0 },
        { name: 'Escudo', type: 'Armor', bonusAttack: 0, bonusDefense: 4, bonusHealth: 0 },
        { name: 'Botas', type: 'Armor', bonusAttack: 0, bonusDefense: 1, bonusHealth: 0 },
    ],
};