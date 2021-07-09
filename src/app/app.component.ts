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
  showSaveButton: boolean = false;
  
  quillDelta: any;
  change: any;

  @ViewChild("editor", { static: true }) editor: any;
  @ViewChild("tempEditor", { static: true}) tempEditor: any;

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

    this.showSaveButton = true;

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
      vnum: this.data.versions.length + 1
    }

    this.data.versions.push(version); 
    localStorage.setItem('document', JSON.stringify(this.data));
    this.change = new this.quillDelta();
  }

  showDiffVersion(version: any): void {

    this.showSaveButton = false;
    let current = this.quill.getContents();

    let tempQuill = new Quill(this.tempEditor.nativeElement)

    tempQuill.setContents(version.data);
    let tempQullContents = tempQuill.getContents();
    let diff: any = current.diff(tempQullContents);

    for (let i = 0; i < diff.ops.length; i++) {
      var op = diff.ops[i];

      // if the change was an insertion
      if (op.hasOwnProperty('insert')) {
        // color it green
        op.attributes = {
          background: "#cce8cc",
          color: "#003700"
        };
      }

      // if the change was a deletion 
      if (op.hasOwnProperty('delete')) {
        // keep the text
        op.retain = op.delete;
        delete op.delete;

        op.attributes = {
          background: "#e8cccc",
          color: "#370000",
          strike: true
        };
      }
    }
    
    var adjusted = current.compose(diff);

    this.quill.setContents(adjusted);

    this.tempEditor.nativeElement.remove();
    this.quill.enable(false);

  }

  applyOldVersion(version: any): void{
    this.quill.enable(true);
    this.quill.setContents(version.data);
    this.saveVersion();
  }

  resetToCurrentVersion(): void {
    this.quill.enable(true);
    this.quill.setContents(this.data.content);
    this.showSaveButton = true;
  }
  
}
