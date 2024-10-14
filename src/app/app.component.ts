import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import confetti from 'canvas-confetti';  
import { heroes } from '../data/Heroes';
import { heroSelected } from '../data/CardData';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}


  title = 'HeroPruebaFront';
  heroSelected = heroSelected
  heroes = heroes
    

  showVoteNowButton = false;
  votoRegistrado = false;
  VotoDislike = false;
  Votolike = false;
  lastVoteType: 'positivo' | 'negativo' | null = null;

  ngOnInit() {
    const votosPGuardados = localStorage.getItem('votosP');
    const votosNGuardados = localStorage.getItem('votosN');

    this.heroSelected.votosP = votosPGuardados ? parseInt(votosPGuardados) : 88;
    this.heroSelected.votosN = votosNGuardados ? parseInt(votosNGuardados) : 12;
  }

  votarPositivo() {
    this.lastVoteType = 'positivo'; 
    this.showVoteNowButton = true;  
    this.piñataExplosion();  
  }

  volverAVotar() {
    this.votoRegistrado = false;  
  }

  votarNegativo() {
    this.lastVoteType = 'negativo'; 
    this.showVoteNowButton = true;  
    this.piñataExplosionSad();  
  }

  votarAhora() {
    if (this.lastVoteType === 'positivo') {
      this.heroSelected.votosP++; 
      this.Votolike = true;
      this.VotoDislike = false; 
    } else if (this.lastVoteType === 'negativo') {
      this.heroSelected.votosN++;
      this.VotoDislike = true; 
      this.Votolike = false; 
    }
    
    this.actualizarLocalStorage();
    this.votoRegistrado = true;
    this.showVoteNowButton = false; 
  }

  actualizarLocalStorage() {
    localStorage.setItem('votosP', this.heroSelected.votosP.toString());
    localStorage.setItem('votosN', this.heroSelected.votosN.toString());
  }

  
  piñataExplosion(): void {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 } , 
      scalar: 1.5
    });
  }

  piñataExplosionSad(): void {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#000000'],  
      scalar: 2
    });
  }

  getBarraLikesWidth(): number {
    const totalVotos = this.heroSelected.votosP + this.heroSelected.votosN;
    const porcentajeLikes = totalVotos ? (this.heroSelected.votosP / totalVotos) * 100 : 0;
    return Math.min(porcentajeLikes, 90); 
    
  }
  

  getBarraDislikesWidth(): number {
    const totalVotos = this.heroSelected.votosP + this.heroSelected.votosN;
    const porcentajeDislikes = totalVotos ? (this.heroSelected.votosN / totalVotos) * 100 : 0;    
    return Math.min(porcentajeDislikes, 90); 
  }
  
}
