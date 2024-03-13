import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MusicItem} from "../model/musicItem";
import {Configuration} from "../model/configuration";
import {MusicalItemComponent} from "../musical-item/musical-item.component";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {pairwise} from "rxjs";
import { OrchestratorService } from '../services/orchestrator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MusicalItemComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [OrchestratorService]
})
export class AppComponent implements OnInit{

  title = 'music-table';
  musicComponents : MusicItem[] = [];
  url = '/assets/music-items.json'
  scenes: number[] = []
  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    this.readFile();
  }

  private readFile() : void {
    this.http.get(this.url).subscribe(res => {
      this.musicComponents = (res as Configuration).music;
      this.title = (res as Configuration).title
      this.scenes = this.musicComponents.map(p => p.scene).filter((a,b,c) => c.findIndex(t => t === a) === b).sort()
    });

  }

  protected readonly pairwise = pairwise;

  getComponentsScene(scene: number) {
    return this.musicComponents.filter(p => p.scene === scene);
  }
}
