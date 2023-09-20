import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.css']
})
export class NotepadComponent {

	notesForm:any
	notesList:any = []
	isEdit:FormControl = new FormControl(null)

	constructor(
		private formBuilder: FormBuilder
	){
		this.createform()
	}

	save(){
		console.log('this.notesForm.value',this.notesForm.value)
		if(this.notesForm.value){
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
			title: [null, Validators.required],
			notes: [null, Validators.required]
		})
	}
}
