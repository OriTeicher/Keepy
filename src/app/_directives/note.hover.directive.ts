import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
} from '@angular/core'

@Directive({
  selector: '[noteHover]',
  standalone: true,
})
export class HoverDirective {
  @Input('noteHover') noteId!: string

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') onMouseOver() {
    this.renderer.addClass(this.el.nativeElement, 'hovered')
  }

  @HostListener('mouseout') onMouseOut() {
    this.renderer.removeClass(this.el.nativeElement, 'hovered')
  }
}
