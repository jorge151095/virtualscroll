import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';
import { AnimationBuilder, AnimationMetadata } from '@angular/animations';
import {
  style,
  animate,
  keyframes
} from '@angular/animations';
import { timer } from 'rxjs';

@Directive({
  selector: '[appBoundingScroll]'
})
export class BoundingScrollDirective {

  constructor(private _elementRef: ElementRef,
              private _builder: AnimationBuilder,
              private _renderer: Renderer2) {
    this._renderer.listen(_elementRef.nativeElement, 'wheel', (e) => {
      if (e.deltaX > 0) {
        e.preventDefault();
      }
    });

    this._renderer.listen(_elementRef.nativeElement, 'scroll', (e) => {
      console.log('scroll')
    });
  }

  public blockScroll = false;
  @Input() position = 'vertical';

  @HostListener('scroll', ['$event']) scrolling(e: any) {
    if (this.position === 'horizontal') {
      if (e.target.scrollLeft === 0) {
        this.playAnimation(this.bounceLeft());
      }
      if ( Math.round(e.target.scrollWidth - e.target.scrollLeft) === e.target.clientWidth && !this.blockScroll) {
        this.blockScroll = true;
        this.playAnimation(this.bounceRight());
        timer(900).subscribe(() => {
          this.blockScroll = false;
        });
      }
    } else {
      if (e.target.scrollTop === 0) {
        this.playAnimation(this.bounceLeft());
      }
      if (Math.round(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight && !this.blockScroll) {
        this.playAnimation(this.bounceRight());
        this.blockScroll = true;
        timer(900).subscribe(() => this.blockScroll = false);
      }
    }
  }

  playAnimation(metadata: any) {
    const factory = this._builder.build(metadata);
    let player;
    for (const child of this._elementRef.nativeElement.children) {
      player = factory.create(child);
      player.play();
    }
  }

  private bounceTop(): AnimationMetadata[] {
    return [
        animate('0.8s', keyframes([
          style({ transform: `translateY(0)` }),
          style({ transform: `translateY(10px)` }),
          style({ transform: `translateY(0)` })
        ]))
    ];
  }

  private bounceBottom(): AnimationMetadata[] {
    return [
        animate('0.8s', keyframes([
          style({ transform: `translateY(0)` }),
          style({ transform: `translateY(-10px)` }),
          style({ transform: `translateY(0)` })
        ]))
    ];
  }

  private bounceRight(): AnimationMetadata[] {
    return [
        animate('0.8s', keyframes([
          style({ transform: `translateX(0)` }),
          style({ transform: `translateX(-10px)` }),
          style({ transform: `translateX(0)` })
        ]))
    ];
  }

  private bounceLeft(): AnimationMetadata[] {
    return [
        animate('0.8s', keyframes([
          style({ transform: `translateX(0)` }),
          style({ transform: `translateX(10px)` }),
          style({ transform: `translateX(0)` })
        ]))
    ];
  }
}
