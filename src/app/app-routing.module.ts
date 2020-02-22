import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { FileUploadComponent } from './file-upload/file-upload.component';


const routes: Routes = [
 {
  path: '',
  component: LayoutComponent,
  children: [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'leave', loadChildren: './leave/leave.module#LeaveModule' },
    { path: 'user', loadChildren: './user/user.module#UserModule' },
    { path: 'file-upload', component: FileUploadComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule]
})

export class AppRoutingModule { }
