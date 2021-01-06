import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
})
export class AlertPage {
  d1 = [
    ['src/index.html', '4.0.0/alerts/sb/index.html'],
    ['angular.json', '4.0.0/alerts/sb/angular.txt'] /* json files are hard to import without errors */,
    [
      'src/main.ts',
      '4.0.0/alerts/sb/main.txt',
    ] /* imported file try to resolve internal imports so that why it's txt */,
    ['src/app/app.module.ts', '4.0.0/alerts/sb/app.module.ts'],
    ['src/app/alert.ng.html', '4.0.0/alerts/sb/alert.ng.html'],
  ];

  code = [
    {
      ng: {
        files: ['4.0.0/alerts/basic/alert.ng.html', '4.0.0/alerts/basic/alert.ng.ts'],
        component: '4.0.0/alerts/basic/alert.ng.ts',
        title: 'Angular basic alert',
      },
      core: {
        files: ['4.0.0/alerts/basic/alert.core.html', '4.0.0/alerts/basic/alert.core.ts'],
        component: '4.0.0/alerts/basic/alert.core.ts',
        title: 'Core basic alert',
      },
    },
    {
      ng: {
        files: ['4.0.0/alerts/group/alert.ng.html', '4.0.0/alerts/group/alert.ng.ts'],
        component: '4.0.0/alerts/group/alert.ng.ts',
        title: 'Angular grouped alert',
      },
      core: {
        files: ['4.0.0/alerts/group/alert.core.html', '4.0.0/alerts/group/alert.core.ts'],
        component: '4.0.0/alerts/group/alert.core.ts',
        title: 'Core grouped alert',
      },
    },
    {
      ng: {
        files: ['4.0.0/alerts/banner/alert.ng.html', '4.0.0/alerts/banner/alert.ng.ts'],
        component: '4.0.0/alerts/banner/alert.ng.ts',
        title: 'Angular banner alert',
      },
      core: {
        files: ['4.0.0/alerts/banner/alert.core.html', '4.0.0/alerts/banner/alert.core.ts'],
        component: '4.0.0/alerts/banner/alert.core.ts',
        title: 'Core banner alert',
      },
    },
  ];

  eslintSetup = `
"plugins": ["@clr/clarity-migration"],
"rules": {
  "@clr/clarity-migration/no-clr-alert": "warn",
},
"overrides": [
  {
    "files": ["*.html"],
    "parser": "@clr/eslint-plugin-clarity-migration/dist/src/html-parser"
  }
]
`;
}
