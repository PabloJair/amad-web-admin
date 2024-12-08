interface Array<T> {
  at(index: number): T | undefined; // Retorna un solo elemento o undefined
}

Array.prototype.at = function <T>(index: number): T | undefined {
  if (index < 0) {
    // Si el índice es negativo, devuelve el último elemento
    return this[this.length + index] ?? undefined;
  }
  return this[index]; // Si el índice es positivo, devuelve el elemento correspondiente
};

declare global {
  interface String {
    isEmpty(): boolean;
  }
}

String.prototype.isEmpty = function () {
  return this.trim().length === 0;
};

export {};
