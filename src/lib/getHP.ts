import { CharStats } from "./schemas";

export function getHP(stats: CharStats, actualStamina: number): number {
    const base = ((stats.strength * 0.8) +
        (stats.durability * 0.8) +
        stats.power) / 2;

    return Math.floor(base * (1 + (actualStamina / 10))) + 100;
}
