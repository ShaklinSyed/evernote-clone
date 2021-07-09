import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // QuillModule.forRoot({
    //   modules: {
    //     cursors: true,
    //     history: {
    //       // Local undo shouldn't undo changes
    //       // from remote users
    //       userOnly: true
    //     }
    //   }
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
