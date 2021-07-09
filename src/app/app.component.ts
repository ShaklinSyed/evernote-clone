import { AfterViewInit, Component, ViewChild } from '@angular/core';

import Quill from 'quill';
import QuillCursors from "quill-cursors";
import { WebsocketProvider } from 'y-websocket'

import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'

var document: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements AfterViewInit {

  quill: any;
  ydoc: any;
  ytext: any;
  binding: any;

  @ViewChild("editor",{static: false}) editor: any;
  
  ngAfterViewInit() {

    Quill.register('modules/cursors', QuillCursors);
    this.quill = new Quill(this.editor.nativeElement, {
      modules: {
        cursors: true,
        toolbar: [
          // adding some basic Quill content features
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ],
        history: {
          // Local undo shouldn't undo changes
          // from remote users
          userOnly: true
        }
      },
      placeholder: 'Start collaborating...',
      theme: 'snow' // 'bubble' is also great
    })
  
    // // A Yjs document holds the shared data
    // this.ydoc = new Y.Doc();
  
    // // Define a shared text type on the document
    // this.ytext = this.ydoc.getText('quill');
  
    // // Create an editor-binding which
    // // "binds" the quill editor to a Y.Text type. 
    // this.binding = new QuillBinding(this.ytext, this.quill);

    // const provider = new WebsocketProvider(
    //   'wss://demos.yjs.dev', 'quill-demo-room', this.ydoc
    // )

    // this.quill.on('text-change', function(delta: any, oldDelta: any, source: any) {

    //   console.log(delta);
    //   console.log(oldDelta);
    //   console.log(source);
    //   if (source == 'api') {
    //     console.log("An API call triggered this change.");
    //   } else if (source == 'user') {
    //     console.log("A user action triggered this change.");
    //   }
    // });
    
  }
  
}
