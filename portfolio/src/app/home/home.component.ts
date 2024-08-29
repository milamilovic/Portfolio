import {AfterViewInit, ChangeDetectorRef, Component, HostListener} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  about = [
    { id: 'about', title: 'O meni', paragraph1: 'Trenutno studiram na Fakultetu tehničkih nauka u Novom Sadu na smeru Softversko inženjerstvo i informacione tehnologije, gde sam postigla prosek 9.59. Tokom studija i rada, stekla sam iskustvo u programiranju koristeći razne jezike, od kojih su istaknuti Java, Python, C# i JavaScript. Bavila sam se web razvojem koristeći Spring Boot in Angular a mobilne aplikacije sam razvijala u Javi. Takođe, radila sam sa Cloud tehnologijama koristeći Docker i AWS servise.',
        paragraph2: 'Pored tehničkih veština, posedujem diplomu FCE nivo C1 sa najvišom ocenom, što mi omogućava napredno znanje engleskog jezika.' }
  ];
  experiences = [
    { id: 'Internship', title: 'Praksa', content: '•\tRadila sam na praksi tokom maja i juna 2024. godine gde smo pravili program koji služi za automatsku procenu rizika. Bila sam zadužena za backend koristeći Java Spring.' },
    { id: 'nti2023', title: 'Takmičenje za najbolju tehnolosku inovaciju 2023', content: '•\tU 2023. godini sam bila mentor srednjoškolskog tima koji je osvojio treće mesto na Takmičenju za Najbolju Tehnološku Inovaciju koje organizuje Ministarstvo nauke, tehnološkog razvoja i inovacija Republike Srbije. Naš projekat je AlgoRythm – program za beskonačno generisanje muzike sa promenljivim parametrima (tonalitet, ključ, ritam…). Moj glavni doprinos je bio razvoj mobiline aplikacije u Unity-ju.' },
    { id: 'nti2024', title: 'Takmičenje za najbolju tehnolosku inovaciju 2024', content: '•\tU 2024 godini sam se sa timom plasirala u finale Takmičenju za Najbolju Tehnološku Inovaciju za studente koje se održava u novembru. Naš projekat je Akcelerator, program zasnovan na veštačkoj inteligenciji koji služi za adaptivno ubrzavanje video snimaka.' },
    { id: 'eestech', title: 'EESTech Hackathon', content: '•\tUčestvovala sam na EESTech AI hakatonu na kom sam sa svojim timom napravila mobilnu aplikaciju za lične finansije koja koristi LLM da bi korisniku dala personalizovane savete.'}
  ];
  projects = [
    { id: 'project1', title: 'Booker', content: '•\tNa fakultetu smo tokom petog semestra u tročlanim timovima pravili platformu za rezervacije smeštaja. Ovo je full-stack Spring Boot, Angular i mobilna aplikacija inspirisana Booking-om. ' },
    { id: 'project2', title: 'Streaming platforma', content: '•\tSa kolegama sam napravila cloud-native platformu za video streaming, inspirisanu Netflixom, koja omogućava korisnicima registraciju, pretragu, pregled, preuzimanje i ocenjivanje video sadržaja, dok administratori upravljaju sadržajem i njegovim transkodiranjem.' },
    { id: 'project3', title: 'Igrice', content: '•\tSamostalno sam u slobodno vreme napravila dve igrice – jednu u Javi a drugu u Unity-ju (C#). Prva je igrica u kojoj protagonista može da šeta po ostrvu, skuplja powerup-ove i priča sa meštanima. Druga je igrica u kojoj astronaut može da skače sa planete na planetu koristeći rotacionu silu.' }
  ];

  sections = {
    about: this.about,
    experiences: this.experiences,
    projects: this.projects
  };

  activeSection = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.setInitialActiveSection();

    // Initialize glow element position after the view is rendered
    const glowElement = document.getElementById('glowEffect');
    if (glowElement) {
      glowElement.style.transform = `translate(-600px, -600px)`;
    }
  }

  setInitialActiveSection() {
    if (this.about.length > 0) {
      this.activeSection = 'about';
      this.cdr.detectChanges();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const glowElement = document.getElementById('glowEffect');
    if (glowElement) {
      // Subtract half of the glow's width and height to center it on the mouse
      const glowSize = 600; // Glow element's size (width/height)
      glowElement.style.transform = `translate(${event.clientX - glowSize / 2}px, ${event.clientY - glowSize / 2}px)`;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const content = document.querySelector('.content') as HTMLElement;
    const scrollTop = content.scrollTop;
    const viewportHeight = content.clientHeight;

    let newActiveSection = '';

    if (scrollTop === 0) {
      newActiveSection = 'about';
    } else {
      // Loop through sections to determine the active one
      Object.keys(this.sections).forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollTop;
          const elementHeight = rect.height;

          // Check if the element is in the viewport
          if (elementTop < (scrollTop + viewportHeight / 2) &&
            (elementTop + elementHeight) > (scrollTop + viewportHeight / 2)) {
            newActiveSection = section;
          }
        }
      });
    }

    if (this.activeSection !== newActiveSection) {
      this.activeSection = newActiveSection;
    }
  }

  scrollTo(section: string) {
    if (section === 'about') {
      // Scroll to the top of the page
      let top = document.getElementById('top');
      if (top !== null) {
        top.scrollIntoView({ behavior: 'smooth', block: 'start' });
        top = null;
      }
      this.activeSection = section;
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.activeSection = section;
      }
    }
  }
}
