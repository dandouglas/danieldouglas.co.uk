import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  },
  // { path: 'about',
  //   loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
