import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.css']
})
export class NotepadComponent {

	notesForm:any
	notesList:any = []
	isEdit:FormControl = new FormControl(null)
	editor: Editor | any;
  	//html = '';
	toolbar: Toolbar = [
		['bold', 'italic'],
		['underline', 'strike'],
		['code', 'blockquote'],
		['ordered_list', 'bullet_list'],
		[{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
		['link', 'image'],
		['text_color', 'background_color'],
		['align_left', 'align_center', 'align_right', 'align_justify'],
	];

	constructor(
		private formBuilder: FormBuilder
	){
		this.createform()
	}

	ngOnInit(){
		this.editor = new Editor();
	}

	save(){
		console.log('this.notesForm.value',this.notesForm.value)
		if(this.notesForm.valid){
			this.notesList.push(this.notesForm.value)
			this.notesForm.reset()
		}
	}

	update(notes?:any){
		console.log('this.isEdit.value : ',this.isEdit.value)
		if(this.isEdit.value){
			let index = this.notesList.indexOf(this.isEdit.value)
			this.notesList.splice(index,1,this.notesForm.value)
			this.isEdit.setValue(null)
			this.notesForm.reset()
		}
	}

	deleteNotes(notes:any, index:any){
		if(notes){
			this.notesList.splice(index,1)
		}
	}

	cancelSave(){
		this.isEdit.setValue(null)
		this.notesForm.reset()
	}

	onClickList(notes:any){
		console.log('notes : ',notes)
		if(notes){
			this.isEdit.setValue(notes)
			this.notesForm.setValue(notes)
		}
	}

	createform(){
		this.notesForm = this.formBuilder.group({
			title: [null, [Validators.required]],
			notes: ['', [Validators.required]]
		})
	}

	ngOnDestroy(): void {
		this.editor.destroy();
	}
}
