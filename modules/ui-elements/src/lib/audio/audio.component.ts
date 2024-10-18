import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'ui-elements-audio',
  standalone: true,
  imports: [CommonModule, MatIcon, MatIconModule, MatTooltip],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss',
})
export class AudioComponent {
  audio = new Audio(); // Instancia de audio
  isPlaying = false; // Estado de la reproducción
  src = input('');

  constructor() {
    // Puedes definir una URL de sonido aquí
  }

  play() {
    this.audio.src = this.src(); // Ruta al archivo de sonido
    this.audio.load();
    this.audio.play();
    this.isPlaying = true;
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0; // Reinicia el sonido
    this.isPlaying = false;
  }

  setVolume(volume: number) {
    this.audio.volume = volume; // Ajustar el volumen entre 0 y 1
  }

  protected readonly parseFloat = parseFloat;
}
