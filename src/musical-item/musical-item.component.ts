import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatRipple} from "@angular/material/core";
import { OrchestratorService } from '../services/orchestrator.service';

@Component({
  selector: 'app-musical-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatRipple
  ],
  templateUrl: './musical-item.component.html',
  styleUrl: './musical-item.component.scss'
})
export class MusicalItemComponent implements AfterViewInit{


  @Input()
  public title : string;

  @Input()
  public scene : number;

  @Input()
  public audioSource : string;

  @Input()
  public description: string;

  @Output() playing = new EventEmitter<string | undefined>();

  @ViewChild('audio')
  private audio!: ElementRef;


  public constructor(private orchestratorService : OrchestratorService) {
    this.title = "";
    this.audioSource = "";
    this.scene = 0;
    this.description = "";
    
    orchestratorService.playersShouldStop$.subscribe((playerId: string) => 
    {
      if(this.isNot(playerId))
      {
        this.stopPlaying();
      }
    });
  }
  ngAfterViewInit(): void {
    
  }

  stopPlaying() {
    console.log(this.audio);
    this.audio.nativeElement.pause();
    this.audio.nativeElement.load();
  }
  
  isNot(playerId: string) : boolean{
    return playerId != 'audio-'+this.title;
  }


  onPlay(event: Event) {
    this.orchestratorService.stopOtherPlayers((event.currentTarget as Element)?.id);
  }
    

}

