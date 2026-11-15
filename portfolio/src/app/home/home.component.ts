import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, ViewChild} from '@angular/core';

type Lang = 'en' | 'sr';
type Localized = Record<Lang, string>;
type Category = 'games' | 'ai' | 'systems';
type Filter = 'all' | Category;

interface Photo {
  src: string;
  alt: Localized;
  caption?: Localized;
}

interface Entry {
  id: string;
  role: Localized;
  org?: Localized;
  period: Localized;
  bullets: Record<Lang, string[]>;
  tags?: string[];
  photos?: Photo[];
}

interface Project {
  id: string;
  title: Localized;
  summary: Localized;
  highlight?: Localized;
  badge?: Localized;
  tags: string[];
  category: Category;
  link?: string;
  image?: string;
  imageAlt?: Localized;
  images?: Photo[];
}

interface Award {
  id: string;
  label: Localized;
  title: Localized;
  description: Localized;
  photos?: Photo[];
}

interface SkillGroup {
  id: string;
  title: Localized;
  items: Localized[];
}

const L = (en: string, sr: string): Localized => ({ en, sr });
const same = (text: string): Localized => ({ en: text, sr: text });
const LB = (en: string[], sr: string[]): Record<Lang, string[]> => ({ en, sr });

const INITIAL_PROJECTS = 8;

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  lang: Lang = 'en';

  ui = {
    subtitle: L('Software engineer and PhD student', 'Softverski inženjer i student doktorskih studija'),
    navLabel: L('Sections', 'Sekcije'),
    switchLang: L('Switch language', 'Promeni jezik'),
    filterLabel: L('Filter projects', 'Filtriraj projekte'),
    showAll: L('Show all {n} projects', 'Prikaži svih {n} projekata'),
    showLess: L('Show fewer projects', 'Prikaži manje projekata'),
    viewOnGithub: L('View on GitHub', 'Pogledaj na GitHub-u'),
    openPhoto: L('View photo', 'Pogledaj fotografiju'),
    close: L('Close', 'Zatvori'),
    prev: L('Previous photo', 'Prethodna fotografija'),
    next: L('Next photo', 'Sledeća fotografija'),
    viewPhotos: L('View photos', 'Pogledaj fotografije')
  };

  sections: { id: string; label: Localized; heading: Localized }[] = [
    { id: 'about',      label: L('About', 'O meni'),             heading: L('About me', 'O meni') },
    { id: 'experience', label: L('Experience', 'Iskustvo'),       heading: L('Experience', 'Iskustvo') },
    { id: 'projects',   label: L('Projects', 'Projekti'),         heading: L('Projects', 'Projekti') },
    { id: 'education',  label: L('Education', 'Obrazovanje'),     heading: L('Education', 'Obrazovanje') },
    { id: 'skills',     label: L('Skills', 'Veštine'),            heading: L('Skills', 'Veštine') },
    { id: 'awards',     label: L('Competitions', 'Takmičenja'),   heading: L('Competitions', 'Takmičenja') }
  ];

  heading(id: string): string {
    return this.t(this.sections.find(s => s.id === id)!.heading);
  }

  profile: Photo = {
    src: 'photos/profile.png',
    alt: L('Portrait of Mila Milović', 'Portret Mile Milović')
  };

  lightboxSet: Photo[] = [];
  lightboxIndex = 0;

  get lightbox(): Photo | null {
    return this.lightboxSet[this.lightboxIndex] ?? null;
  }

  about: Localized[] = [
    L(
      'I\'m a PhD student at the Faculty of Technical Sciences in Novi Sad, where I research legacy systems. I completed my MSc in Software Engineering (Multimedia Systems and Computer Games module) with a GPA of 10.0, after a BSc with a GPA of 9.69. My MSc thesis is a tool for analyzing legacy code. Alongside that, I work as a teaching assistant at the faculty, teaching web programming and the Internet of Things.',
      'Student sam doktorskih studija na Fakultetu tehničkih nauka u Novom Sadu, gde istražujem legacy sisteme. Master studije softverskog inženjerstva, modul Multimedijalni sistemi i računarske igre, završila sam sa prosekom 10,0, a osnovne sa 9,69. Moj master rad je alat za analizu legacy koda. Pored toga, radim kao asistent na fakultetu i držim vežbe iz web programiranja i Interneta stvari (IoT).'
    )
  ];

  experience: Entry[] = [
    {
      id: 'ta',
      role: L('Teaching assistant', 'Asistent'),
      org: L('Faculty of Technical Sciences', 'Fakultet tehničkih nauka'),
      period: L('Nov 2025 – Present', 'nov 2025 – danas'),
      bullets: LB(
        [
          'I teach Server-Side Engineering, Web programming and Internet of Things.',
          'I also taught Introduction to Computing and Programming.'
        ],
        [
          'Držim vežbe iz Inženjerstva serverskog sloja, Web programiranja i Interneta stvari (IoT).',
          'Držala sam vežbe iz Uvoda u računarstvo i programiranje.'
        ]
      ),
      tags: ['Spring Boot', 'Python', 'React', 'Vue', 'Raspberry Pi']
    },
    {
      id: 'codolis',
      role: L('Software engineer', 'Softverski inženjer'),
      org: same('Codolis'),
      period: L('Feb – Aug 2025', 'feb – avg 2025'),
      bullets: LB(
        [
          'Built a platform for tracking the progress of young skiers for a client in Austria',
          'Backend in Java Spring, frontend in React',
          'Led and mentored an intern on the project: onboarding, code review and task distribution'
        ],
        [
          'Razvijala sam platformu za praćenje napretka mladih skijaša za klijenta iz Austrije',
          'Backend u Java Spring-u, frontend u React-u',
          'Bila sam mentor stažisti na projektu: uvođenje u posao, code review i raspodela zadataka'
        ]
      ),
      tags: ['Java', 'Spring', 'React']
    },
    {
      id: 'internship',
      role: L('Software engineering intern', 'Praksa'),
      period: L('May – Nov 2024', 'maj – nov 2024'),
      bullets: LB(
        ['Built the Java Spring backend of a risk assessment application for evaluating money-laundering risk'],
        ['Razvila sam Java Spring backend aplikacije za procenu rizika od pranja novca']
      ),
      tags: ['Java', 'Spring']
    }
  ];

  filters: { id: Filter; label: Localized }[] = [
    { id: 'all',     label: L('All', 'Sve') },
    { id: 'games',   label: L('Games & graphics', 'Igre i grafika') },
    { id: 'ai',      label: L('AI & research', 'AI i istraživanje') },
    { id: 'systems', label: L('Web, cloud & systems', 'Web, cloud i sistemi') }
  ];

  projects: Project[] = [
    {
      id: 'thesis',
      category: 'ai',
      badge: L('MSc thesis', 'Master rad'),
      title: L('LLM-based legacy code analysis', 'Analiza legacy koda pomoću LLM-a'),
      images: [
        { src: 'projects/legacy1.png', alt: L('Dependency graph', 'Graf zavisnosti') },
        { src: 'projects/legacy2.png', alt: L('ER diagram', 'ER dijagram') },
        { src: 'projects/legacy3.png', alt: L('COde relations', 'Povezanosti u kodu') },
        { src: 'projects/legacy4.png', alt: L('Missing modules', 'Nedostajuci moduli') }
      ],
      summary: L(
        'A tool that converts binary Oracle Forms and Reports modules to XML, parses their PL/SQL and builds a knowledge base of entities and dependencies. A locally run LLM answers questions about the code, so no source code leaves the machine.',
        'Alat koji binarne Oracle Forms and Reports module konvertuje u XML, parsira njihov PL/SQL i gradi bazu znanja o entitetima i zavisnostima. Lokalno pokrenut LLM odgovara na pitanja o kodu, tako da izvorni kod nikada ne napušta računar.'
      ),
      highlight: L(
        'On a real 1990s business application it parsed all 141 PL/SQL fragments without errors, reconstructed relations between 23 tables that declare only 3 foreign keys, and found 7 missing modules and 6 unused tables.',
        'Na stvarnoj poslovnoj aplikaciji iz 1990-ih parsirano je svih 141 PL/SQL fragment bez grešaka, rekonstruisane su veze između 23 tabele koje deklarišu samo 3 strana ključa, a pronađeno je 7 nedostajućih modula i 6 neiskorišćenih tabela.'
      ),
      tags: ['Python', 'ANTLR', 'lxml', 'Ollama', 'Qwen3-Coder', 'Cytoscape.js']
    },
    {
      id: 'lumis',
      category: 'games',
      link: 'https://github.com/milamilovic/Lumis',
      images: [
        { src: 'projects/lumis1.png', alt: L('Screenshot of Lumis', 'Snimak ekrana igre Lumis') },
        { src: 'projects/lumis2.png', alt: L('Lumis: gameplay', 'Lumis: igranje') },
        { src: 'projects/lumis3.png', alt: L('Lumis: inventory and crafting', 'Lumis: inventar i izrada predmeta') }
      ],
      title: same('Lumis'),
      summary: L(
        'A 2D pixel-art game about an astronaut stranded on a radioactive planet who survives with glowing plants that reduce radiation. It has a lighting system, crafting, inventory, a story told through journal entries and robots the player assembles and assigns tasks to.',
        '2D pixel-art igra o astronautu nasukanom na radioaktivnoj planeti koji preživljava uz svetleće biljke što smanjuju radijaciju. Sadrži sistem osvetljenja, izradu predmeta, inventar, priču ispričanu kroz stranice dnevnika i robote koje igrač sklapa i kojima dodeljuje zadatke.'
      ),
      tags: ['C#', 'Pixel art']
    },
    {
      id: 'zengarden',
      category: 'games',
      link: 'https://github.com/milamilovic/ZenGardenWii',
      images: [
        { src: 'projects/zen3.png', alt: L('Zen garden: screenshot from the mobile version', 'Zen bašta: scena iz mobilne verzije') },
        { src: 'projects/zen1.png', alt: L('Zen garden: Painting scene', 'Zen bašta: Scena za slikanje') },
        { src: 'projects/zen2.png', alt: L('Zen garden: Drawing kanji', 'Zen bašta: Crtanje kanji zankova') },
        { src: 'projects/zen5.png', alt: L('Zen garden: using the rake', 'Zen bašta: grabuljanje') },
        { src: 'projects/zen6.png', alt: L('Zen garden: screenshot from the game', 'Zen bašta: snimak ekrana iz igre') }
      ],
      title: same('VR Zen Garden'),
      summary: L(
        'A mobile VR Japanese zen garden with gaze-based interaction, teleportation and spatial audio. The desktop extension adds a kanji drawing canvas controlled with the Wii Remote\'s IR pointer.',
        'Mobilni VR japanski zen vrt sa interakcijom pogledom, teleportacijom i prostornim zvukom. Desktop proširenje dodaje platno za crtanje kanđija koje se kontroliše IR pokazivačem Wii kontrolera.'
      ),
      tags: ['Unity', 'C#', 'VR', 'Wii Remote']
    },
    {
      id: 'cosmiccards',
      category: 'games',
      link: 'https://github.com/milamilovic/CosmicCards',
      images: [
        { src: 'projects/cosmic-cards1.png', alt: L('Start of the game', 'Početak igre') },
        { src: 'projects/cosmic-cards2.png', alt: L('Mid game', 'Sredina igre') }
      ],
      title: same('Cosmic Cards'),
      summary: L(
        'A space-themed memory card game with combo scoring, a configurable grid, a pause menu and a local top-10 leaderboard. Available for PC and Android.',
        'Memorijska igra sa svemirskom temom, sa bodovanjem po kombinacijama, podesivom tablom, pauzom i lokalnom top 10 listom rezultata. Dostupna za PC i Android.'
      ),
      tags: ['Unity', 'C#', 'Android']
    },
    {
      id: 'inkdrop',
      category: 'systems',
      link: 'https://github.com/milamilovic/InkDrop',
      images: [
        { src: 'projects/inkdrop1.jpeg', alt: L('E-ink screen', 'E-ink ekran') },
        { src: 'projects/inkdrop2.jpg', alt: L('Application screenshot', 'Snimak ekrana aplikacije') }
      ],
      title: same('InkDrop'),
      summary: L(
        'Sends images from a mobile app to a 6-color e-ink display using Floyd-Steinberg dithering, together with a QR code that lets anyone download the original image.',
        'Šalje slike iz mobilne aplikacije na e-ink ekran u 6 boja uz Floyd-Steinberg dithering, zajedno sa QR kodom preko kog svako može da preuzme originalnu sliku.'
      ),
      tags: ['Flutter', 'Flask', 'Raspberry Pi', 'Python']
    },
    {
      id: 'drone3d',
      category: 'games',
      link: 'https://github.com/milamilovic/3D-DroneCommand',
      images: [
        { src: 'projects/drone1.png', alt: L('Drone model', 'Model drona') },
        { src: 'projects/drone2.png', alt: L('Majevica model with google maps', 'Model Majevice sa google mapa') },
        { src: 'projects/drone3.png', alt: L('Majevica model with height map', 'Model majevice sa visinskom mapom') },
        { src: 'projects/drone4.png', alt: L('Screenshot from the simulation', 'Snimak ekrana iz simulacije') }
      ],
      title: same('3D DroneCommand'),
      summary: L(
        'An interactive 3D control station for two drones flying over a textured model of Mount Majevica, with live position tracking, battery monitoring, a movable no-fly zone and collision detection.',
        'Interaktivna 3D kontrolna stanica za dve letelice koje lete iznad teksturiranog modela planine Majevice, sa praćenjem pozicije u realnom vremenu, nadzorom baterije, pomerljivom zabranjenom zonom letenja i detekcijom sudara.'
      ),
      tags: ['C++', 'OpenGL', 'Blender']
    },
    {
      id: 'dockerplatform',
      category: 'systems',
      link: 'https://github.com/milamilovic/docker-platform',
      images: [
        { src: 'projects/docker1.png', alt: L('Screenshot of the Docker hosting platform', 'Snimak ekrana platforme za hostovanje docker repozitorijuma') },
        { src: 'projects/docker2.png', alt: L('DockerHub: analytics 1', 'DockerHub: analitika 1') },
        { src: 'projects/docker3.png', alt: L('DockerHub: analytics 2', 'DockerHub: analitika 2') }
      ],
      imageAlt: L('Screenshot of the Docker hosting platform', 'Snimak ekrana platforme za hostovanje Docker repozitorijuma'),
      title: L('Docker repository hosting platform', 'Platforma za hostovanje Docker repozitorijuma'),
      summary: L(
        'A platform for hosting Docker repositories with log analytics, started as a whole through Docker Compose.',
        'Platforma za hostovanje Docker repozitorijuma sa analitikom logova, koja se ceo pokreće preko Docker Compose-a.'
      ),
      tags: ['Java', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Docker']
    },
    /*{
      id: 'island',
      category: 'games',
      link: 'https://github.com/milamilovic/Put_po_Srbiji',
      image: 'projects/island.jpg',
      imageAlt: L('Screenshot of Island Exploration', 'Snimak ekrana igre Istraživanje Ostrva'),
      title: L('Island Exploration', 'Istraživanje Ostrva'),
      summary: L(
        'A game I built on my own in which the player explores an island, collects power-ups and talks to villagers.',
        'Igra koju sam samostalno razvila, u kojoj igrač istražuje ostrvo, prikuplja power-up-ove i razgovara sa meštanima.'
      ),
      tags: ['Java']
    }*/
  ];

  filter: Filter = 'all';
  showAll = false;
  visibleProjects: Project[] = [];
  collapsible = false;
  filteredCount = 0;
  showFilters = this.projects.length > INITIAL_PROJECTS;
  private failedImages = new Set<string>();

  education: Entry[] = [
    {
      id: 'phd',
      role: L('PhD, Computer and Electrical Engineering', 'Doktorske studije, Računarstvo i elektrotehnika'),
      org: L('Faculty of Technical Sciences, University of Novi Sad', 'Fakultet tehničkih nauka, Univerzitet u Novom Sadu'),
      period: L('2026 – Present', '2026 – danas'),
      bullets: LB(['Research area: legacy systems'], ['Oblast istraživanja: legacy sistemi'])
    },
    {
      id: 'msc',
      role: L('MSc, Software Engineering', 'Master studije, Softversko inženjerstvo'),
      org: L('Faculty of Technical Sciences, University of Novi Sad', 'Fakultet tehničkih nauka, Univerzitet u Novom Sadu'),
      period: same('2025 – 2026'),
      bullets: LB(
        ['Module: Multimedia Systems and Computer Games', 'GPA 10.0 / 10'],
        ['Modul: Multimedijalni sistemi i računarske igre', 'Prosek 10,0 / 10']
      ),
      /*photos: [
        {
          src: 'photos/msc-defense.jpg',
          alt: L('MSc thesis defense', 'Odbrana master rada'),
          caption: L('MSc thesis defense', 'Odbrana master rada')
        }
      ]*/
    },
    {
      id: 'bsc',
      role: L('BSc, Software Engineering', 'Osnovne studije, Softversko inženjerstvo'),
      org: L('Faculty of Technical Sciences, University of Novi Sad', 'Fakultet tehničkih nauka, Univerzitet u Novom Sadu'),
      period: same('2021 – 2025'),
      bullets: LB(['GPA 9.69 / 10'], ['Prosek 9,69 / 10'])
    }
  ];

  skills: SkillGroup[] = [
    {
      id: 'programming',
      title: L('Programming', 'Programiranje'),
      items: ['Python', 'C++', 'Java', 'JavaScript', 'HTML', 'CSS', 'SQL'].map(same)
    },
    {
      id: 'graphics',
      title: L('Graphics & games', 'Grafika i igre'),
      items: ['Unity', 'OpenGL', 'Blender'].map(same)
    },
    {
      id: 'ai',
      title: L('AI & machine learning', 'AI i mašinsko učenje'),
      items: [
        same('OpenCV'),
        same('CNNs'),
        same('SVMs'),
        L('Fine-tuning pretrained networks', 'Fino podešavanje prethodno istreniranih mreža'),
        L('Local LLM pipelines (Ollama, Qwen3-Coder, Llama)', 'Lokalni LLM pipeline-ovi (Ollama, Qwen3-Coder, Llama)')
      ]
    },
    {
      id: 'web',
      title: L('Web & cloud', 'Web i cloud'),
      items: ['Spring Boot', 'React', 'Angular', 'Vue', 'Django', 'Flutter', 'Docker', 'AWS', 'Git'].map(same)
    },
    {
      id: 'languages',
      title: L('Languages', 'Jezici'),
      items: [
        L('Serbian (native)', 'Srpski (maternji)'),
        L('English (Cambridge CAE, C2)', 'Engleski (Cambridge CAE, C2)')
      ]
    }
  ];

  awards: Award[] = [
    {
      id: 'nti2024',
      label: same('2024'),
      title: L(
        'Finalist, Competition for the Best Technological Innovation',
        'Finalista, Takmičenje za najbolju tehnološku inovaciju'
      ),
      description: L(
        'National student competition. Our project, Accelerator, is an AI-based program for adaptive video acceleration.',
        'Nacionalno takmičenje za studente. Naš projekat, Akcelerator, je program zasnovan na veštačkoj inteligenciji za adaptivno ubrzavanje video snimaka.'
      ),
      /*photos: [
        {
          src: 'photos/nti-2024.jpg',
          alt: L('Photo from the 2024 competition', 'Fotografija sa takmičenja 2024'),
          caption: L(
            'Competition for the Best Technological Innovation, 2024',
            'Takmičenje za najbolju tehnološku inovaciju, 2024'
          )
        }
      ]*/
    },
    {
      id: 'nti2023',
      label: same('2023'),
      title: L(
        'Mentor of the third-place team, Competition for the Best Technological Innovation',
        'Mentor tima osvajača trećeg mesta, Takmičenje za najbolju tehnološku inovaciju'
      ),
      description: L(
        'I mentored a high-school team at the competition organized by Serbia\'s Ministry of Science, Technological Development and Innovation. Our project, AlgoRythm, generates endless music with adjustable parameters; I developed its mobile app in Unity.',
        'Bila sam mentor srednjoškolskom timu na takmičenju koje organizuje Ministarstvo nauke, tehnološkog razvoja i inovacija Republike Srbije. Naš projekat, AlgoRythm, beskonačno generiše muziku sa promenljivim parametrima, a ja sam razvila njegovu mobilnu aplikaciju u Unity-ju.'
      ),
      /*photos: [
        {
          src: 'photos/nti-2023.jpg',
          alt: L('Photo from the 2023 competition', 'Fotografija sa takmičenja 2023'),
          caption: L(
            'Competition for the Best Technological Innovation, 2023',
            'Takmičenje za najbolju tehnološku inovaciju, 2023'
          )
        }
      ]*/
    }
  ];

  activeSection = 'about';

  @ViewChild('glow') private glow?: ElementRef<HTMLElement>;
  @ViewChild('sectionNav') private sectionNav?: ElementRef<HTMLElement>;
  @ViewChild('lightboxDialog') private lightboxDialog?: ElementRef<HTMLDialogElement>;

  private sectionEls: HTMLElement[] = [];
  private ticking = false;
  private lockedId: string | null = null;

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'sr') {
        this.lang = saved;
      }
    } catch {
    }
    document.documentElement.lang = this.lang;
    this.refreshProjects();
  }

  t(text: Localized): string {
    return text[this.lang];
  }

  setLang(lang: Lang) {
    this.lang = lang;
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
    }
  }

  count(filter: Filter): number {
    return filter === 'all' ? this.projects.length : this.projects.filter(p => p.category === filter).length;
  }

  setFilter(filter: Filter) {
    this.filter = filter;
    this.showAll = false;
    this.refreshProjects();
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.refreshProjects();
  }

  showAllLabel(): string {
    return this.t(this.ui.showAll).replace('{n}', String(this.filteredCount));
  }

  photoOk(photo: Photo): boolean {
    return !this.failedImages.has(photo.src);
  }

  okPhotos(photos?: Photo[]): Photo[] {
    return photos ? photos.filter(p => this.photoOk(p)) : [];
  }

  onPhotoError(photo: Photo) {
    this.failedImages.add(photo.src);
  }

  openPhoto(photo: Photo, set?: Photo[]) {
    const dialog = this.lightboxDialog?.nativeElement;
    if (!dialog) {
      return;
    }
    const list = this.okPhotos(set);
    const index = list.indexOf(photo);
    this.lightboxSet = index >= 0 ? list : [photo];
    this.lightboxIndex = Math.max(index, 0);
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = 'hidden';
    root.style.paddingRight = scrollbar > 0 ? `${scrollbar}px` : '';
    if (!dialog.open) {
      dialog.showModal();
    }
  }

  closeLightbox() {
    this.lightboxDialog?.nativeElement.close();
  }

  onLightboxClosed() {
    this.lightboxSet = [];
    this.lightboxIndex = 0;
    this.unlockPageScroll();
  }

  stepLightbox(delta: number) {
    const n = this.lightboxSet.length;
    if (n > 1) {
      this.lightboxIndex = (this.lightboxIndex + delta + n) % n;
    }
  }

  onLightboxKey(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.stepLightbox(-1);
    } else if (event.key === 'ArrowRight') {
      this.stepLightbox(1);
    }
  }

  onLightboxClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeLightbox();
    }
  }

  private unlockPageScroll() {
    const root = document.documentElement;
    root.style.overflow = '';
    root.style.paddingRight = '';
  }

  projectShots(project: Project): Photo[] {
    const list: Photo[] = project.images?.length
      ? project.images
      : project.image
        ? [{ src: project.image, alt: project.imageAlt ?? project.title }]
        : [];
    return this.okPhotos(list);
  }

  private refreshProjects() {
    const list = this.filter === 'all' ? this.projects : this.projects.filter(p => p.category === this.filter);
    this.filteredCount = list.length;
    this.collapsible = list.length > INITIAL_PROJECTS;
    this.visibleProjects = this.showAll ? list : list.slice(0, INITIAL_PROJECTS);
  }

  goTo(id: string, event: Event) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.lockedId = id;
      this.setActive(id);
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      this.releaseLockSoon();
    }
  }

  private setActive(id: string) {
    if (this.activeSection !== id) {
      this.zone.run(() => {
        this.activeSection = id;
        this.cdr.markForCheck();
        requestAnimationFrame(() => this.scrollNavToActive(id));
      });
    }
  }

  private scrollNavToActive(id: string) {
    const nav = this.sectionNav?.nativeElement;
    const active = nav?.querySelector<HTMLElement>(`a[href="#${id}"]`);
    if (nav && active && nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: active.offsetLeft - nav.clientWidth / 2 + active.clientWidth / 2, behavior: 'smooth' });
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    const glow = this.glow?.nativeElement;
    if (glow) {
      const size = 600;
      glow.style.transform = `translate(${event.clientX - size / 2}px, ${event.clientY - size / 2}px)`;
    }
  };

  private onUserInput = () => {
    this.lockedId = null;
  };

  private lockTimer?: number;

  private releaseLockSoon() {
    window.clearTimeout(this.lockTimer);
    this.lockTimer = window.setTimeout(() => {
      this.lockedId = null;
      this.scheduleUpdate();
    }, 200);
  }

  private onScroll = () => {
    if (this.lockedId) {
      this.releaseLockSoon();
    }
    this.scheduleUpdate();
  };

  private scheduleUpdate = () => {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(this.updateActiveSection);
    }
  };

  private updateActiveSection = () => {
    this.ticking = false;
    if (this.lockedId || !this.sectionEls.length) {
      return;
    }

    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    let activeId = this.sectionEls[0].id;

    if (atBottom) {
      activeId = this.sectionEls[this.sectionEls.length - 1].id;
    } else {
      const line = window.innerHeight * 0.35;
      for (const el of this.sectionEls) {
        if (el.getBoundingClientRect().top <= line) {
          activeId = el.id;
        } else {
          break;
        }
      }
    }

    this.setActive(activeId);
  };

  ngAfterViewInit() {
    this.sectionEls = this.sections
      .map(s => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    this.zone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.onMouseMove, { passive: true });
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.scheduleUpdate, { passive: true });
      window.addEventListener('wheel', this.onUserInput, { passive: true });
      window.addEventListener('touchstart', this.onUserInput, { passive: true });
      window.addEventListener('keydown', this.onUserInput);
      window.addEventListener('pointerdown', this.onUserInput, { passive: true });
    });

    this.scheduleUpdate();

    const glow = this.glow?.nativeElement;
    if (glow) {
      glow.style.transform = 'translate(-600px, -600px)';
    }
  }

  ngOnDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('scroll', this.onScroll);
    window.clearTimeout(this.lockTimer);
    this.unlockPageScroll();
    window.removeEventListener('resize', this.scheduleUpdate);
    window.removeEventListener('wheel', this.onUserInput);
    window.removeEventListener('touchstart', this.onUserInput);
    window.removeEventListener('keydown', this.onUserInput);
    window.removeEventListener('pointerdown', this.onUserInput);
  }
}