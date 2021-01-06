import { Component, Input } from '@angular/core';

import sdk from '@stackblitz/sdk';

const ProjectTemplate = {
  title: 'Clarity Example',
  description: 'Clarity example',
  template: 'angular-cli',
  tags: ['stackblitz', 'clarity', 'typescript', 'angular'],
  dependencies: {
    '@angular/animations': '^10.0.1',
    '@angular/common': '^10.0.1',
    '@angular/compiler': '^10.0.1',
    '@angular/core': '^10.0.1',
    '@angular/forms': '^10.0.1',
    '@angular/platform-browser': '^10.0.1',
    '@angular/platform-browser-dynamic': '^10.0.1',
    '@angular/router': '^10.0.1',
    '@webcomponents/custom-elements': '^1.0.0',
    rxjs: '^6.5.5',
    tslib: '^2.0.0',
    'zone.js': '^0.10.3',
    /* Clarity */
    '@clr/angular': '4.0.8',
    '@clr/core': '4.0.8',
    '@clr/icons': '4.0.8',
    '@clr/ui': '4.0.8',
    /* End of Clarity */
  },
  files: {
    'src/styles.css': '',
    'src/polyfills.ts': `import 'zone.js/dist/zone';`,
  },
};

@Component({
  selector: 'stackblitz',
  template: `
    <button *ngIf="target === 'link'" (click)="open()">Open</button>
    <div *ngIf="target === 'embed'" [id]="id">
      <button (click)="embed()">Embed</button>
    </div>
  `,
})
export class StackBlitz {
  /* Generate random ID so we could find the ID and embed ourself */
  id = Math.random().toString(36).substring(7);

  @Input('options') options: Record<string, any> = {};
  @Input('dependencies') deps: Record<string, string>;
  @Input('filesRaw') filesRaw: [string, string][];
  @Input('fielsContent') filesContent: [string, string][];
  @Input('target') target: 'link' | 'embed' = 'link';
  @Input('embedHeight') height = 520;
  @Input('focusView') view = 'preview';

  // Make a copy of the original template;
  project = { ...ProjectTemplate };

  ngOnInit(): void {
    /* Let me overwrite basic templates props */
    this.project = { ...this.project, ...this.options };

    // Add or overwrite dependencies
    if (this.deps) {
      this.project.dependencies = { ...this.project.dependencies, ...this.deps };
    }

    if (this.filesRaw && Array.isArray(this.filesRaw)) {
      this.filesRaw.forEach(file => {
        // @ts-ignore
        import(`!!raw-loader!./../../migrations/${file[1]}`).then(resolve => {
          this.project.files[file[0]] = resolve.default;
        });
      });
    }

    if (this.filesRaw && Array.isArray(this.filesContent)) {
      this.filesContent.forEach(file => {
        this.project.files[file[0]] = (file[1] || '').trim();
      });
    }
  }

  embed() {
    sdk.embedProject(this.id, this.project, {
      height: this.height,
      view: this.view,
    });
  }

  open() {
    sdk.openProject(this.project);
  }
}
