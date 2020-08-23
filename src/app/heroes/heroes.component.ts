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

  heroes!: Hero[];

  constructor(heroService: HeroService) {
    this.heroService = heroService;
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  /**
   * 初始化 查询 hero-list
   */
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(
      hero => { this.heroes.push(hero) }
    )
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h.id !== hero.id);
    this.heroService.deleteHero(hero).subscribe(); // 如果不subscribe 则什么都不会做，包括发送 http
  }
}
