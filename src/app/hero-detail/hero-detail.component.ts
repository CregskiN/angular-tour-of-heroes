import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  /**
   * 从参数化路由中获取 id，并向 http server 查询
   */
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
    })
  }

  /**
   * 保存更改数据，并提交至 http server
   */
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(
      () => this.goBack()
    )
  }

  /**
   * 返回
   */
  goBack(): void {
    this.location.back();
  }

}
