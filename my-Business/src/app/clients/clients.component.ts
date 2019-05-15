import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  heroes: Hero[];
  
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string, skill: string) : void {

    name = name.trim();

    const newHero: Hero = {
      id: this.heroes.length > 0 ? Math.max(...this.heroes.map(hero => hero.id)) + 1 : 11,
      name: name,
      Skill: skill
    };

    if (!name) { return; } 
    this.heroService.addHero(newHero as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
 
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
 
}
