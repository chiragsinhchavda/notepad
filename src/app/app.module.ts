import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { NotepadComponent } from './notepad/notepad.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
	ForgotPasswordComponent,
    HeaderComponent,
    NotepadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	ReactiveFormsModule,
	NgxEditorModule.forRoot({
		locals: {
		  // menu
		  bold: 'Bold',
		  italic: 'Italic',
		  code: 'Code',
		  blockquote: 'Blockquote',
		  underline: 'Underline',
		  strike: 'Strike',
		  bullet_list: 'Bullet List',
		  ordered_list: 'Ordered List',
		  heading: 'Heading',
		  h1: 'Header 1',
		  h2: 'Header 2',
		  h3: 'Header 3',
		  h4: 'Header 4',
		  h5: 'Header 5',
		  h6: 'Header 6',
		  align_left: 'Left Align',
		  align_center: 'Center Align',
		  align_right: 'Right Align',
		  align_justify: 'Justify',
		  text_color: 'Text Color',
		  background_color: 'Background Color',
  
		  // popups, forms, others...
		  url: 'URL',
		  text: 'Text',
		  openInNewTab: 'Open in new tab',
		  insert: 'Insert',
		  altText: 'Alt Text',
		  title: 'Title',
		  remove: 'Remove',
		},
	  }),
	HttpClientModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ] //added to remove error of ngx-editor module
})
export class AppModule { }
