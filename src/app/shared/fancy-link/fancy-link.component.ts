import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-fancy-link',
  templateUrl: './fancy-link.component.html',
  styleUrls: ['./fancy-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FancyLinkComponent {

  @Input() link: string;

}
