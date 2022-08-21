import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FilenamePipe } from './pipes/filename.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SideNavComponent,
    ExplorerComponent,
    TopNavComponent,
    FilenamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
