export interface Actions {
  openWebView: string;
  openSections: string;
  call: string;
  showBySchedule: ShowBySchedule[];
}

export interface ShowBySchedule {
  dayStart: '1' | '2' | '3' | '4' | '5' | '6' | '7';
  dayEnd: '1' | '2' | '3' | '4' | '5' | '6' | '7';
  hourStart: number;
  hourEnd: number;
  show: boolean;
}

export function getDayForNumber(
  day: '1' | '2' | '3' | '4' | '5' | '6' | '7'
): string {
  const daysOfWeek = {
    '1': 'Lunes',
    '2': 'Martes',
    '3': 'Miercoles',
    '4': 'Jueves',
    '5': 'Viernes',
    '6': 'Sabado',
    '7': 'Domingo',
  };

  return daysOfWeek[day] || 'Invalid day';
}
