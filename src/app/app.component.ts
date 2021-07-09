import { Component, OnInit, ViewChild } from '@angular/core';

import Quill from 'quill';
import QuillCursors from "quill-cursors";
// import { WebsocketProvider } from 'y-websocket';

// import * as Y from 'yjs';
// import { QuillBinding } from 'y-quill';

var document: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit{

  data: any = {
    content: '',
    versions: []
  };

  quill: any;
  ydoc: any;
  ytext: any;
  binding: any;
  newDoc: boolean = false;
  
  quillDelta: any;
  change: any;

  @ViewChild("editor", { static: true }) editor: any;

  constructor() {}

  getData(): void {

    let localData: any = localStorage.getItem("document");

    
    if (localData !== null) { 
      this.data = JSON.parse(localData);
      this.createNewDocument(this.data.content);
    }
  }

  ngOnInit(): void {
    this.getData();  
  }

  createNewDocument(savedData: any = ""): void {

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
          userOnly: true
        }
      },
      placeholder: 'Start collaborating...',
      theme: 'snow' // 'bubble' is also great
    })

    if (savedData != "") {
      this.quill.setContents(savedData);
    } else {
      this.newDoc = true;
    }

    this.quillDelta = Quill.import('delta');
    this.change = new this.quillDelta();

    let that = this;
    this.quill.on('text-change', function(delta: any) {
      that.change = that.change.compose(delta);
    });

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

  }

  saveVersion() {
    if (this.change.length() === 0) {
      return;
    }

    let contents = this.quill.getContents();
    this.data.content = contents;

    let version = {
      data: contents,
      time: new Date()
    }
    this.data.versions.push(version); 
    localStorage.setItem('document', JSON.stringify(this.data));
    this.change = new this.quillDelta();
  }
  
}
