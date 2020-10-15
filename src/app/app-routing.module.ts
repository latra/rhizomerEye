import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AdministratorGuard } from './login-basic/administrator.guard';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AboutComponent } from './about/about.component';
import { ListDatasetComponent } from './dataset/list-dataset/list-dataset.component';
import { DetailDatasetComponent } from './dataset/detail-dataset/detail-dataset.component';
import { DetailClassComponent } from './class/detail-class/detail-class.component';
import { ListFacetComponent } from './facet/list-facet/list-facet.component';
import { CreateDatasetComponent } from './dataset/create-dataset/create-dataset.component';
import { EditDatasetComponent } from './dataset/edit-dataset/edit-dataset.component';
import { WordCloudComponent } from './class/word-cloud/word-cloud.component';
import { ResourceComponent } from './resource/resource.component';
import { LoginFormComponent } from './login-basic/login-form.component';

const routes: Routes = [
  { path: 'datasets/new', component: CreateDatasetComponent, canActivate: [LoggedInGuard] },
  { path: 'datasets/:did/edit', component: EditDatasetComponent, canActivate: [LoggedInGuard] },
  { path: 'datasets/:did/details', component: DetailDatasetComponent, canActivate: [LoggedInGuard] },
  { path: 'datasets/:did/:cid/detail', component: DetailClassComponent, canActivate: [LoggedInGuard] },
  { path: 'datasets/:did/:cid/resource', component: ResourceComponent },
  { path: 'datasets/:did/:cid/edit-resource', loadChildren: () =>
      import('./resource/edit-resource/edit-resource.module').then(m => m.EditResourceModule) },
  { path: 'datasets/:did/:cid', component: ListFacetComponent },
  { path: 'datasets/:did', component: WordCloudComponent },
  { path: 'datasets', component: ListDatasetComponent, canActivate: [LoggedInGuard] },
  { path: 'users/new', component: UserCreateComponent, canActivate: [AdministratorGuard] },
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard] },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AdministratorGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'overview/:cid', component: ListFacetComponent },
  { path: 'overview/:cid/resource', component: ResourceComponent },
  { path: 'overview/:cid/edit-resource', loadChildren: () =>
      import('./resource/edit-resource/edit-resource.module').then(m => m.EditResourceModule) },
  { path: 'edit-resource', loadChildren: () =>
      import('./resource/edit-resource/edit-resource.module').then(m => m.EditResourceModule) },
  { path: 'overview', component: WordCloudComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '**', component: ResourceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
