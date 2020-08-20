import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes', // 组件选择器（CSS）
  templateUrl: './heroes.component.html', // 模版文件位置
  styleUrls: ['./heroes.component.css'] // css 文件位置
})
export class HeroesComponent implements OnInit {
  private heroService: HeroService;
  private messageService: MessageService;

  heroes!: Hero[];
  selectedHero!: Hero;

  constructor(heroService: HeroService, messageService: MessageService) {
    this.heroService = heroService;
    this.messageService = messageService;
  }

  ngOnInit(): void {
    this.getHeroes();
  }


  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroComponent: select id=${hero.id}`);
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
    
  }

}
