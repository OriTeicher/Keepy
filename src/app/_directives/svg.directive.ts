import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[svgName]',
  standalone: true,
})
export class SvgDirective implements OnChanges {
  constructor(private el: ElementRef) {}
  @Input() svgName?: string;

  ngOnChanges(): void {
    if (this.svgName) {
      this.loadSvgByName(this.svgName);
    }
  }

  private async loadSvgByName(svgName: string): Promise<void> {
    try {
      const svgUrl = `../../assets/svgs/${svgName}.svg`;
      console.log('svgUrl', svgUrl);
      this.el.nativeElement.innerHTML = `<img src="${svgUrl}" alt="${svgName}"/>`;
    } catch (err) {
      console.error(`Error loading SVG icon: ${svgName}`, err);
      this.el.nativeElement.innerHTML = '';
    }
  }
}
