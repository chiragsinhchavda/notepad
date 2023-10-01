import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { AuthenticationService } from '../services/authentication.service';
import { finalize } from 'rxjs';

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
		private formBuilder: FormBuilder,
		public authenticationService: AuthenticationService
	){
		this.createform()
	}

	ngOnInit(){
		this.editor = new Editor();
		this.getAllNotes()
	}

	getAllNotes(){
		try{
			this.authenticationService.apiCall('get','http://localhost:3000/api/get-all-notes').pipe(finalize(() => {
				console.log('all notes get confirm....')
			})).subscribe((res:any) => {
				if(res){
					this.notesList = res
				}
			},(err:any) => {
				console.log('API ERROR : ',err)
			})
		}catch(e:any){
			console.log('Error : ',e)
		}
	}

	save(){
		console.log('this.notesForm.value',this.notesForm.value)
		try{
			if(this.notesForm.valid){
				this.authenticationService.apiCall('post', 'http://localhost:3000/api/add-note', this.notesForm.value).pipe(finalize(() => {
					console.log('called confirm..')
				})).subscribe((res:any) => {
					if(res){
						this.getAllNotes()
						//this.notesList.push(this.notesForm.value)
						this.notesForm.reset()
					}
				},(err:any) => {
					console.log('API ERROR : ',err)
				})
			}
		}catch(e:any){
			console.log('Error : ',e)
		}
	}

	update(notes?:any){
		try{
			console.log('this.isEdit.value : ',this.isEdit.value)
			if(this.isEdit.value){
				this.authenticationService.apiCall('put',`/api/update-note/${this.isEdit.value._id}`, this.notesForm.value).pipe(finalize(() => {
					console.log('update confirm...')
				})).subscribe((res:any) => {
					console.log('update res : ',res)
					this.getAllNotes()
					this.isEdit.setValue(null)
					this.notesForm.reset()
				},(err:any) => {
					console.log('API ERROR : ',err)
				})
				//let index = this.notesList.indexOf(this.isEdit.value)
				//this.notesList.splice(index,1,this.notesForm.value)
			}
		}catch(e:any){
			console.log('Error : ', e)
		}
	}

	deleteNotes(notes:any, index:any){
		try{
			console.log('note to delete : ',notes)
			if(notes){
				this.authenticationService.apiCall('delete',`/api/delete-note/${notes._id}`).pipe(finalize(() => {
					console.log('delete confirm...')
				})).subscribe((res:any) => {
					console.log('delete res : ',res)
					this.getAllNotes()
				},(err:any) => {
					console.log('API ERROR : ',err)
				})
			}
		}catch(e:any){
			console.log('Error : ', e)
		}
	}

	cancelSave(){
		this.isEdit.setValue(null)
		this.notesForm.reset()
	}

	onClickList(notes:any){
		if(notes){
			this.isEdit.setValue(notes)
			this.notesForm.setValue(notes)
		}
	}

	createform(){
		this.notesForm = this.formBuilder.group({
			title: [null, [Validators.required]],
			description: ['', [Validators.required]]
		})
	}

	ngOnDestroy(): void {
		this.editor.destroy();
	}
}
