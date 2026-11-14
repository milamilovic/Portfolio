import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener} from '@angular/core';
import {NgForOf} from "@angular/common";

type Lang = 'en' | 'sr';
type Localized = Record<Lang, string>;

interface Card {
  id: string;
  title: Localized;
  content: Localized;
}

interface Project extends Card {
  link?: string;
}

@Component({
  selector: 'app-home',
  imports: [NgForOf],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  lang: Lang = 'en';

  ui = {
    subtitle: {
      en: 'Software engineer and PhD student',
      sr: 'Softverski inženjer i doktorand'
    } as Localized,
    navAbout: { en: 'About me', sr: 'O meni' } as Localized,
    navExperience: { en: 'Experience & achievements', sr: 'Iskustvo i priznanja' } as Localized,
    navProjects: { en: 'Projects', sr: 'Projekti' } as Localized,
    experienceHeading: { en: 'Experience & achievements', sr: 'Iskustvo i priznanja' } as Localized,
    projectsHeading: { en: 'Projects', sr: 'Projekti' } as Localized,
    switchTo: { en: 'Switch language', sr: 'Promeni jezik' } as Localized
  };

  about: { id: string; paragraph1: Localized; paragraph2: Localized }[] = [
    {
      id: 'about',
      paragraph1: {
        en: 'I\'m a PhD student at the Faculty of Technical Sciences in Novi Sad, where I research legacy systems. I completed my MSc in Software Engineering (Multimedia Systems and Computer Games module) with a GPA of 10.0, after a BSc with a GPA of 9.69. My MSc thesis is a tool for analyzing legacy code with a locally run LLM, and it also became a published paper. Alongside my research, I work as a teaching assistant at the faculty, teaching server-side programming, web programming and the Internet of Things.',
        sr: 'Doktorand sam na Fakultetu tehničkih nauka u Novom Sadu, gde istražujem legacy sisteme. Master studije softverskog inženjerstva, modul Multimedijalni sistemi i računarske igre, završila sam sa prosekom 10,0, a osnovne sa 9,69. Moj master rad je alat za analizu legacy koda pomoću lokalno pokretanog LLM-a, a iz njega je nastao i naučni rad. Pored istraživanja, radim kao asistent na fakultetu i držim vežbe iz serverskog i web programiranja i Interneta stvari.'
      },
      paragraph2: {
        en: 'I mostly program in Python and C++, and I also work in Java (Spring Boot), JavaScript (React, Angular) and C#. I work on machine learning, computer vision and computer graphics, and I build games in Unity. I\'ve also worked with Docker and AWS. I hold a Cambridge CAE certificate (level C2).',
        sr: 'Najviše programiram u Python-u i C++-u, a radim i u Javi (Spring Boot), JavaScript-u (React, Angular) i C#-u. Bavim se mašinskim učenjem, računarskom vizijom i računarskom grafikom, a igre pravim u Unity-ju. Radila sam i sa Docker-om i AWS servisima. Imam Cambridge CAE sertifikat (nivo C2), što potvrđuje moje napredno znanje engleskog jezika.'
      }
    }
  ];

  experiences: Card[] = [
    {
      id: 'ta',
      title: {
        en: 'Teaching assistant, Faculty of Technical Sciences (November 2025 – present)',
        sr: 'Asistent, Fakultet tehničkih nauka (novembar 2025 – danas)'
      },
      content: {
        en: '•\tIn 2026/27 (first semester) I teach Server-Side Engineering (Spring Boot) and Internet of Things (sensors, actuators and Raspberry Pi programmed in Python). In 2025/26 I taught Introduction to Computing and Programming for Biomedical Engineering (Python), Server-Side Engineering (Spring Boot) and Web Programming on two study programs (dynamic web programming in Java with React, and Spring Boot with Vue).',
        sr: '•\tU školskoj 2026/27. godini (prvi semestar) držim vežbe iz Serverskog inženjerstva (Spring Boot) i Interneta stvari (senzori, aktuatori i Raspberry Pi programiran u Python-u). U 2025/26. držala sam vežbe iz Uvoda u računarstvo i programiranje za biomedicinsko inženjerstvo (Python), Serverskog inženjerstva (Spring Boot) i Web programiranja na dva studijska programa (dinamičko web programiranje u Javi sa React-om i Spring Boot sa Vue-om).'
      }
    },
    {
      id: 'codolis',
      title: {
        en: 'Software engineer, Codolis (February – August 2025)',
        sr: 'Softverski inženjer, Codolis (februar – avgust 2025)'
      },
      content: {
        en: '•\tBuilt a platform for tracking the progress of young skiers for a client in Austria: backend in Java Spring, frontend in React. Led and mentored an intern on the project: onboarding, code review and task distribution.',
        sr: '•\tRazvijala sam platformu za praćenje napretka mladih skijaša za klijenta iz Austrije: backend u Java Spring-u, frontend u React-u. Bila sam mentor stažisti na projektu: uvođenje u posao, code review i raspodela zadataka.'
      }
    },
    {
      id: 'internship',
      title: {
        en: 'Software engineering intern, Student ventures (May – November 2024)',
        sr: 'Praksa, Student ventures (maj – novembar 2024)'
      },
      content: {
        en: '•\tBuilt the Java Spring backend of a risk assessment application for evaluating money-laundering risk.',
        sr: '•\tRazvila sam Java Spring backend aplikacije za procenu rizika od pranja novca.'
      }
    },
    {
      id: 'paper',
      title: {
        en: 'Publication (2026)',
        sr: 'Naučni rad (2026)'
      },
      content: {
        en: '•\tM. Milović, "Oracle Forms and Reports Legacy Code Analysis for Modernization", Zbornik radova Fakulteta tehničkih nauka, Novi Sad, 2026. The paper grew out of my MSc thesis.',
        sr: '•\tM. Milović, „Oracle Forms and Reports Legacy Code Analysis for Modernization“, Zbornik radova Fakulteta tehničkih nauka, Novi Sad, 2026. Rad je nastao iz mog master rada.'
      }
    },
    {
      id: 'scholarships',
      title: {
        en: 'Scholarships',
        sr: 'Stipendije'
      },
      content: {
        en: '•\tDositeja Scholarship for top students, in the final BSc year and in the MSc year, and the University of Novi Sad scholarship for gifted students and young researchers, 2023/24.',
        sr: '•\tDobitnica sam Dositejeve stipendije za najbolje studente u završnoj godini osnovnih i na master studijama, kao i stipendije Univerziteta u Novom Sadu za darovite studente i mlade istraživače 2023/24.'
      }
    },
    {
      id: 'nti2024',
      title: {
        en: 'Competition for the Best Technological Innovation 2024',
        sr: 'Takmičenje za najbolju tehnološku inovaciju 2024'
      },
      content: {
        en: '•\tIn 2024 my team and I reached the final of the national Competition for the Best Technological Innovation (student category). Our project is Accelerator, an AI-based program for adaptive video acceleration.',
        sr: '•\tU 2024. godini sam se sa timom plasirala u finale Takmičenja za Najbolju Tehnološku Inovaciju za studente. Naš projekat je Akcelerator, program zasnovan na veštačkoj inteligenciji koji služi za adaptivno ubrzavanje video snimaka.'
      }
    },
    {
      id: 'nti2023',
      title: {
        en: 'Competition for the Best Technological Innovation 2023',
        sr: 'Takmičenje za najbolju tehnološku inovaciju 2023'
      },
      content: {
        en: '•\tIn 2023 I mentored a high-school team that won third place at the Competition for the Best Technological Innovation, organized by the Ministry of Science, Technological Development and Innovation of the Republic of Serbia. Our project is AlgoRythm, a program for endless music generation with adjustable parameters (tonality, key, rhythm…). My main contribution was developing the mobile app in Unity.',
        sr: '•\tU 2023. godini sam bila mentor srednjoškolskog tima koji je osvojio treće mesto na Takmičenju za Najbolju Tehnološku Inovaciju koje organizuje Ministarstvo nauke, tehnološkog razvoja i inovacija Republike Srbije. Naš projekat je AlgoRythm – program za beskonačno generisanje muzike sa promenljivim parametrima (tonalitet, ključ, ritam…). Moj glavni doprinos je bio razvoj mobilne aplikacije u Unity-ju.'
      }
    },
    {
      id: 'eestech',
      title: {
        en: 'EESTech Hackathon',
        sr: 'EESTech Hackathon'
      },
      content: {
        en: '•\tI took part in the EESTech AI hackathon, where my team built a personal finance mobile app that uses an LLM to give users personalized advice.',
        sr: '•\tUčestvovala sam na EESTech AI hakatonu na kom sam sa svojim timom napravila mobilnu aplikaciju za lične finansije koja koristi LLM da bi korisniku dala personalizovane savete.'
      }
    }
  ];

  projects: Project[] = [
    {
      id: 'thesis',
      title: {
        en: 'LLM-based legacy code analysis (MSc thesis)',
        sr: 'Analiza legacy koda pomoću LLM-a (master rad)'
      },
      content: {
        en: '•\tA tool (Python, ANTLR, lxml, Ollama with Qwen3-Coder, Cytoscape.js) that converts binary Oracle Forms and Reports modules to XML, parses their PL/SQL with an ANTLR grammar, and builds a knowledge base of entities and dependencies linked to the database ER schema. A locally run LLM answers questions about the code, so no source code ever leaves the machine. On a real 1990s business application it parsed all 141 PL/SQL fragments without errors, reconstructed relations between 23 tables that declare only 3 foreign keys, and found 7 missing modules and 6 unused tables.',
        sr: '•\tAlat (Python, ANTLR, lxml, Ollama sa Qwen3-Coder modelom, Cytoscape.js) koji binarne Oracle Forms and Reports module konvertuje u XML, parsira njihov PL/SQL ANTLR gramatikom i gradi bazu znanja o entitetima i zavisnostima povezanu sa ER šemom baze. Lokalno pokrenut LLM odgovara na pitanja o kodu, tako da izvorni kod nikada ne napušta računar. Na stvarnoj poslovnoj aplikaciji iz 1990-ih parsirano je svih 141 PL/SQL fragment bez grešaka, rekonstruisane su veze između 23 tabele koje deklarišu samo 3 strana ključa, a pronađeno je 7 nedostajućih modula i 6 neiskorišćenih tabela.'
      }
    },
    {
      id: 'lumis',
      link: 'https://github.com/milamilovic/Lumis',
      title: { en: 'Lumis', sr: 'Lumis' },
      content: {
        en: '•\tA 2D pixel-art game (C#) about an astronaut stranded on a radioactive planet who survives with glowing plants that reduce radiation. It features a lighting system, crafting, inventory, a story told through journal entries, and robots the player assembles and assigns tasks such as digging and planting.',
        sr: '•\t2D pixel-art igra (C#) o astronautu nasukanom na radioaktivnoj planeti koji preživljava uz svetleće biljke što smanjuju radijaciju. Sadrži sistem osvetljenja, izradu predmeta, inventar, priču ispričanu kroz stranice dnevnika i robote koje igrač sklapa i kojima dodeljuje zadatke, kao što su kopanje i sađenje.'
      }
    },
    {
      id: 'drone3d',
      link: 'https://github.com/milamilovic/3D-DroneCommand',
      title: { en: '3D DroneCommand', sr: '3D DroneCommand' },
      content: {
        en: '•\tAn interactive 3D control station (C++, OpenGL) for two drones flying over a textured model of Mount Majevica, with live position tracking, battery monitoring, a movable no-fly zone and collision detection. The drone is modeled in Blender.',
        sr: '•\tInteraktivna 3D kontrolna stanica (C++, OpenGL) za dve letelice koje lete iznad teksturiranog modela planine Majevice, sa praćenjem pozicije u realnom vremenu, nadzorom baterije, pomerljivom zabranjenom zonom letenja i detekcijom sudara. Dron je modelovan u Blender-u.'
      }
    },
    {
      id: 'zengarden',
      link: 'https://github.com/milamilovic/ZenGardenWii',
      title: { en: 'VR Zen Garden', sr: 'VR Zen Garden' },
      content: {
        en: '•\tA mobile VR Japanese zen garden for Google Cardboard (Unity): gaze-based interaction, teleportation between torii gates, spatial audio and a reactive environment. The desktop extension adds a kanji drawing canvas controlled with the Wii Remote\'s IR pointer.',
        sr: '•\tMobilno VR iskustvo japanskog zen vrta za Google Cardboard (Unity): interakcija pogledom, teleportacija između torii kapija, prostorni zvuk i reaktivno okruženje. Desktop proširenje dodaje platno za crtanje kanđija koje se kontroliše IR pokazivačem Wii kontrolera.'
      }
    },
    {
      id: 'cosmiccards',
      link: 'https://github.com/milamilovic/CosmicCards',
      title: { en: 'Cosmic Cards', sr: 'Cosmic Cards' },
      content: {
        en: '•\tA space-themed memory card game built in Unity: scoring based on speed, attempts and combos, a configurable grid, a pause menu and a local top-10 leaderboard. Available for PC and Android.',
        sr: '•\tMemorijska igra sa svemirskom temom napravljena u Unity-ju: bodovanje na osnovu brzine, broja pokušaja i kombinacija, podesiva tabla, pauza i lokalna top 10 lista rezultata. Dostupna za PC i Android.'
      }
    },
    {
      id: 'inkdrop',
      link: 'https://github.com/milamilovic/InkDrop',
      title: { en: 'InkDrop', sr: 'InkDrop' },
      content: {
        en: '•\tA system for displaying and sharing images on a 6-color e-ink display. A Flutter mobile app sends images to a Flask server, and a Raspberry Pi shows them using Floyd-Steinberg dithering, together with a QR code anyone can scan to download the original image.',
        sr: '•\tSistem za prikaz i deljenje slika na e-ink ekranu u 6 boja. Mobilna aplikacija (Flutter) šalje slike Flask serveru, a Raspberry Pi ih prikazuje uz Floyd-Steinberg dithering, zajedno sa QR kodom preko kog svako može da preuzme originalnu sliku.'
      }
    },
    {
      id: 'dockerplatform',
      link: 'https://github.com/milamilovic/docker-platform',
      title: {
        en: 'Docker repository hosting platform',
        sr: 'Platforma za hostovanje Docker repozitorijuma'
      },
      content: {
        en: '•\tA platform for hosting Docker repositories: Java backend, PostgreSQL, Redis, a Docker Registry and log analytics with Elasticsearch and Logstash, with the whole system started through Docker Compose.',
        sr: '•\tPlatforma za hostovanje Docker repozitorijuma: Java backend, PostgreSQL, Redis, Docker Registry i analitika logova preko Elasticsearch-a i Logstash-a, a ceo sistem se pokreće pomoću Docker Compose-a.'
      }
    },
    {
      id: 'project2',
      link: 'https://github.com/milamilovic/Netflix',
      title: { en: 'Streaming platform', sr: 'Streaming platforma' },
      content: {
        en: '•\tWith my teammates I built a cloud-native video streaming platform inspired by Netflix, where users can register, search, browse, download and rate video content, while admins manage content and its transcoding. It is built on AWS services (S3, DynamoDB, Lambda, SNS, API Gateway), with infrastructure as code (CDK) and an Angular frontend.',
        sr: '•\tSa kolegama sam napravila cloud-native platformu za video streaming, inspirisanu Netflixom, koja omogućava korisnicima registraciju, pretragu, pregled, preuzimanje i ocenjivanje video sadržaja, dok administratori upravljaju sadržajem i njegovim transkodiranjem. Izgrađena je na AWS servisima (S3, DynamoDB, Lambda, SNS, API Gateway), infrastruktura se opisuje kodom (CDK), a frontend je u Angular-u.'
      }
    },
    {
      id: 'project1',
      link: 'https://github.com/orgs/booker-project-app/repositories',
      title: { en: 'Booker', sr: 'Booker' },
      content: {
        en: '•\tDuring my fifth semester, in teams of three, we built an accommodation booking platform inspired by Booking.com. It consists of a Spring Boot backend, an Angular frontend (designed in Figma) and an Android app in Java with shake-to-sort and a dark mode.',
        sr: '•\tNa fakultetu smo tokom petog semestra u tročlanim timovima pravili platformu za rezervacije smeštaja inspirisanu Booking-om. Sastoji se od Spring Boot backenda, Angular frontenda (dizajniranog u Figmi) i Android aplikacije u Javi sa sortiranjem protresanjem telefona i tamnim režimom.'
      }
    },
    {
      id: 'smarthome',
      link: 'https://github.com/milamilovic/SmartHome',
      title: { en: 'Smart home system', sr: 'Sistem pametne kuće' },
      content: {
        en: '•\tA simulated smart home system for the Internet of Things course: simulated Raspberry Pi devices with sensors and actuators send data over MQTT to a Flask backend, data is stored in InfluxDB and PostgreSQL and visualized in Grafana, and a React app is used for monitoring and control. Everything is containerized with Docker Compose.',
        sr: '•\tSimulirani sistem pametne kuće za predmet Internet stvari: simulirani Raspberry Pi uređaji sa senzorima i aktuatorima šalju podatke preko MQTT-a Flask backendu, podaci se čuvaju u InfluxDB-u i PostgreSQL-u i prikazuju u Grafani, a React aplikacija služi za nadzor i upravljanje. Sve je kontejnerizovano pomoću Docker Compose-a.'
      }
    },
    {
      id: 'travel',
      link: 'https://github.com/milamilovic/sbnz',
      title: { en: 'Travel recommendation system', sr: 'Sistem za preporuku putovanja' },
      content: {
        en: '•\tA rule-based system (Java, Drools, React) that recommends a destination based on trip length, budget, departure city, travelers and interests, with a detailed day-by-day activity plan and cost estimate, and adapts its recommendations to weather conditions. Built in a pair with a classmate.',
        sr: '•\tSistem zasnovan na pravilima (Java, Drools, React) koji na osnovu trajanja, budžeta, mesta polaska, sastava putnika i interesovanja preporučuje destinaciju, uz detaljan plan aktivnosti po danima i procenu troškova, i prilagođava preporuke vremenskim uslovima. Rađen u paru sa koleginicom.'
      }
    },
    {
      id: 'kvengine',
      link: 'https://github.com/milamilovic/Key-Value-engine',
      title: { en: 'Key-value engine', sr: 'Key-value engine' },
      content: {
        en: '•\tA data storage engine in Go (PUT, GET, DELETE, LIST and RANGE SCAN) with a write-ahead log, memtable, SSTables, LSM tree, Bloom filter, Merkle tree, caching and request rate limiting. Built in a team of three.',
        sr: '•\tMašina za skladištenje podataka u Go-u (PUT, GET, DELETE, LIST i RANGE SCAN) sa write-ahead logom, memtable-om, SSTable-ovima, LSM stablom, Bloom filterom, Merkle stablom, keširanjem i ograničavanjem broja zahteva. Rađeno u timu od troje.'
      }
    },
    {
      id: 'mushrooms',
      link: 'https://github.com/milamilovic/MushroomClassification',
      title: { en: 'Mushroom classification', sr: 'Klasifikacija pečuraka' },
      content: {
        en: '•\tClassifying mushroom images into nine genera (Python): a comparison of a CNN, an SVM and a fine-tuned pretrained network.',
        sr: '•\tKlasifikacija slika pečuraka u devet rodova (Python): poređenje CNN-a, SVM-a i fino podešene prethodno istrenirane mreže.'
      }
    },
    {
      id: 'chess960',
      link: 'https://github.com/milamilovic/Chess960',
      title: { en: 'Chess960', sr: 'Chess960' },
      content: {
        en: '•\tThe Fischer random chess (Chess960) piece-arrangement problem solved with a genetic algorithm in Python.',
        sr: '•\tProblem rasporeda figura u Fišerovom slučajnom šahu (Chess960) rešen genetskim algoritmom u Python-u.'
      }
    },
    {
      id: 'mice',
      link: 'https://github.com/milamilovic/Mice',
      title: { en: 'Nine Men\'s Morris', sr: 'Mice (Nine Men\'s Morris)' },
      content: {
        en: '•\tA game against the computer in Python that uses alpha-beta pruning and heuristics.',
        sr: '•\tIgra protiv računara u Python-u koja koristi alfa-beta odsecanje i heuristike.'
      }
    },
    {
      id: 'game1',
      link: 'https://github.com/milamilovic/Put_po_Srbiji',
      title: { en: 'Island Exploration', sr: 'Istraživanje Ostrva' },
      content: {
        en: '•\tA game I developed on my own in Java where the player explores an island. The player can walk around, collect power-ups and talk to villagers.',
        sr: '•\tSamostalno razvijena igra u Javi u kojoj igrač istražuje ostrvo. Igrač može da šeta po ostrvu, prikuplja power-up-ove i razgovara sa meštanima.'
      }
    },
    {
      id: 'game2',
      link: 'https://github.com/milamilovic/AstroSpin',
      title: { en: 'AstroSpin', sr: 'AstroSpin' },
      content: {
        en: '•\tDeveloped in Unity with C#, the game lets players control an astronaut who jumps from planet to planet using rotational force.',
        sr: '•\tRazvijena u Unity-ju koristeći C#, igrica omogućava igračima da upravljaju astronautom koji skače sa planete na planetu koristeći rotacionu silu.'
      }
    }
  ];

  sections = {
    about: this.about,
    experiences: this.experiences,
    projects: this.projects
  };

  activeSection = '';

  constructor(private cdr: ChangeDetectorRef) {
    // english by default
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'sr') {
        this.lang = saved;
      }
    } catch {
    }
    document.documentElement.lang = this.lang;
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

  redirectToLink(link?: string) {
    if (link) {
      window.location.href = link;
    }
  }

  scrollTo(sectionId: string) {
    const content = document.querySelector('.content') as HTMLElement;
    const targetElement = document.getElementById(sectionId);

    if (content && targetElement) {
      const targetPosition = targetElement.offsetTop;
      content.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}