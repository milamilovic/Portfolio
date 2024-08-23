import {AfterViewInit, Component, HostListener} from '@angular/core';
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
export class HomeComponent{
  chapters = [
    { id: 'chapter1', title: 'Chapter 1', content: 'Bali is predominantly a Hindu country. Bali is known for its elaborate, traditional dancing. The dancing is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil. To watch the dancing is a breathtaking experience. Lombok has some impressive points of interest – the majestic Gunung Rinjani is an active volcano. It is the second highest peak in Indonesia. Art is a Balinese passion. Batik paintings and carved statues make popular souvenirs. Artists can be seen whittling and painting on the streets, particularly in Ubud. It is easy to appreciate each island as an attractive tourist destination. Majestic scenery; rich culture; white sands and warm, azure waters draw visitors like magnets every year. Snorkelling and diving around the nearby Gili Islands is magnificent. Marine fish, starfish, turtles and coral reef are present in abundance. Bali and Lombok are part of the Indonesian archipelago. Bali has some spectacular temples. The most significant is the Mother Temple, Besakih. The inhabitants of Lombok are mostly Muslim with a Hindu minority. Lombok remains the most understated of the two islands. Lombok has several temples worthy of a visit, though they are less prolific. Bali and Lombok are neighbouring islands. Nelson Mandela and Martin Luther King Jr. both fought for racial equality. Although Luther King was an American citizen and Mandela a native South African, their dreams were the same. The intolerance of white people towards black co-inhabitants was the catalyst for years of activism. Their battles were tumultuous – Nelson Mandela was arrested in 1962 for treason. Consequently, he was incarcerated for twenty-seven years. In contrast, although Luther King was detained several times, the longest jail sentence he received was four months. Both Mandela and Luther King have been awarded the Nobel Peace Prize for their dedication to improving civil rights for black people. Martin Luther King Jr. led many demonstrations against racism. He delivered his message in a non-violent manner, although other members of his movement later engaged in less peaceful protests. In contrast, Mandela initially avoided violence, but resorted to it following the government’s massacre of unarmed black Africans. Martin Luther King’s famous 1963 speech, “I Have a Dream”, inspired many African-Americans to envisage a better future. He was assassinated in 1968. During Nelson Mandela’s best known speech he recited “Our Deepest Fear”, an inspirational poem written by Marianne Williamson. In 1994, Mandela became the first black president of South Africa; he was the first president elected by the people.' },
    { id: 'chapter2', title: 'Chapter 2', content: 'Bali and Lombok are neighbouring islands; both are part of the Indonesian archipelago. It is easy to appreciate each island as an attractive tourist destination – majestic scenery; rich culture; white sands and warm, azure waters draw visitors like magnets every year. Snorkelling and diving around the nearby Gili Islands is magnificent, with marine fish, starfish, turtles and coral reef present in abundance. Whereas Bali is predominantly a Hindu country, the inhabitants of Lombok are mostly Muslim with a Hindu minority. Bali is known for its elaborate, traditional dancing which is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil; to watch it is a breathtaking experience. Art is another Balinese passion – batik paintings and carved statues make popular souvenirs. Artists can be seen whittling and painting on the streets, particularly in Ubud. The island is home to some spectacular temples, the most significant being the Mother Temple, Besakih. Lombok, too, has some impressive points of interest – the majestic Gunung Rinjani is an active volcano and the second highest peak in Indonesia. Like Bali, Lombok has several temples worthy of a visit, though they are less prolific. Lombok remains the most understated of the two islands. Several years ago, Channel 4, together with Jo Frost (perhaps better known as Supernanny) conducted an experiment. Forty children, aged six, were invited to a party and divided into two halves. One half was given typical sugary party foods. The other half ate sugar-free foods. The parents were unaware as to which group their child was in. No artificial colourings or flavourings commonly found in sweets were present. Artificial colourings and flavourings have already been linked to hyperactivity. Many parents believe that sugar consumption causes hyperactivity in their children. ‘Sugar highs’ are often blamed for rowdiness or excitability, but is sugar guilty of causing hyperactivity or is it simply a case of ‘normal’ childhood behaviour? As the children ran about and enjoyed the party, the parents were asked whether they believed their own child had been given sugar. The majority believed they had. As the children sat down to watch a magic show, many parents changed their minds. They could not accept that their child was capable of sitting still after consuming sugary foods. The experiment suggested that there was no link between hyperactivity and sugar intake. The children were naturally excited because they were at a party.' },
    { id: 'chapter3', title: 'Chapter 3', content: 'Martin Luther King Jr. led many demonstrations against racism. He delivered his message in a non-violent manner. Some members of his movement later engaged in less peaceful protests. Luther King was detained several times. The longest jail sentence he received was four months. Martin Luther King’s famous 1963 speech, “I Have a Dream”, inspired many African-Americans to envisage a better future. Luther King was an American citizen. Nelson Mandela is a native South African. Their dreams were the same. Their battles were tumultuous. Nelson Mandela was arrested in 1962 for treason. He was incarcerated for twenty-seven years. Nelson Mandela and Martin Luther King Jr. both fought for racial equality. The intolerance of white people towards black co-inhabitants was the catalyst for years of activism. In 1994, Nelson Mandela became the first black president of South Africa. He was the first president elected by the people. Mandela and Luther King have been awarded the Nobel Peace Prize for their dedication to improving civil rights for black people. During Nelson Mandela’s best known speech in 1994, he recited “Our Deepest Fear”, an inspirational poem by Marianne Williamson. Mandela initially avoided violence but ended up resorting to it following the massacre of unarmed black Africans by the government. Martin Luther King Jr. was assassinated in 1968. Many parents believe that sugar consumption causes hyperactivity in their children. Indeed, ‘sugar highs’ are often blamed for rowdiness or excitability – but is sugar the guilty party, or is it simply a case of ‘normal’ childhood behaviour? Several years ago, Channel 4, together with Jo Frost (perhaps better known as Supernanny) conducted an experiment to distinguish the truth. Forty children, aged six, were invited to a party and divided into two halves. One half was given typical sugary party foods; the other half ate sugar-free alternatives. Crucially, the parents of the children were unaware as to which group their child was in. (Incidentally, no artificial colourings or flavourings commonly found in sweets were present, since these have already been linked to hyperactivity.) Subsequently, as the children ran about and enjoyed the party, the parents were asked whether they believed their own child had been given sugar. The majority believed they had. Ironically, as the children then sat down to watch a magic show, most parents changed their minds. Basically, they could not accept that their child was capable of sitting still after consuming sugary foods. To conclude, the experiment suggested that there was no link between hyperactivity and sugar intake, but that the children were naturally excited because they were at a party.' }
  ];

  activeChapter = 'chapter1';

  setInitialActiveChapter() {
    if (this.chapters.length > 0) {
      this.activeChapter = this.chapters[0].id;
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    const content = event.target;
    const scrollTop = content.scrollTop;
    const viewportHeight = content.clientHeight;
    let newActiveChapter = '';

    this.chapters.forEach(chapter => {
      const element = document.getElementById(chapter.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementHeight = rect.height;

        if (elementTop < (scrollTop + viewportHeight / 2) &&
          (elementTop + elementHeight) > (scrollTop + viewportHeight / 2)) {
          newActiveChapter = chapter.id;
        }
      }
    });

    if (this.activeChapter !== newActiveChapter) {
      this.activeChapter = newActiveChapter;
    }
  }

  scrollTo(chapterId: string) {
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      //this.activeChapter = chapterId;
    }
  }
}
