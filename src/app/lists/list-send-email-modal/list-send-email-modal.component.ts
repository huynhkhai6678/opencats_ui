import { Component, EventEmitter, inject, model, OnInit, Output, signal, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { BaseComponent } from '../../base/base.component';
import { CKEditorModule, loadCKEditorCloud, CKEditorCloudResult } from '@ckeditor/ckeditor5-angular';
import type { ClassicEditor, EditorConfig } from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-send-email-modal',
  imports: [
    CommonModule,
    MessageModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    SelectModule,
    CKEditorModule,
    MultiSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './list-send-email-modal.component.html',
  styleUrl: './list-send-email-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ListSendEmailModalComponent extends BaseComponent implements OnInit {
  override url = 'lists';
  listForm! : FormGroup;
  visible = model<boolean>(false);
  lists = signal<any[]>([]);
  type = signal<string>('');

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  public Editor: typeof ClassicEditor | null = null;
	public config: EditorConfig | null = null;

  ngOnInit(): void {
    this.listForm = this.fb.group({
      list_id: [null, [Validators.required]],
      email_subject: ['', [Validators.required]],
      email_body: [[], [Validators.required]]
    });

    loadCKEditorCloud( {
			version: '46.0.0',
		} ).then( this._setupEditor.bind( this ) );
  }

  initFormData() {
    this.formService.getInitData(`${this.url}/${this.id()}/email?type=${this.type()}`).subscribe((response : any) => {
      if(response['data']) {
        this.listForm.patchValue(response['data']);
        const type = this.type() === 'employee' ?  'Candidates' : 'Job';  
        this.header.set(`Sending ${type} List: ${response['data'].description}`);
      }
      
      this.lists.set(response['entries'] || []);
    });
  }

  override onSubmit(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    value.type = this.type();
    this.apiService.post(`${this.url}/send-email`, value).subscribe({
      next: (res : any) => {
        this.isSubmitted = false;
        this.visible.set(false);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
        this.listForm.reset();
      },
    });
  }

  private _setupEditor ( cloud: CKEditorCloudResult<{ version: '46.0.0', premium: true }> ) {
		const {
      ClassicEditor,
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      Autosave,
      Base64UploadAdapter,
      BlockQuote,
      Bold,
      Essentials,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      SelectAll,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      SimpleUploadAdapter,
      SourceEditing,
      GeneralHtmlSupport,
      Undo
    } = cloud.CKEditor;

    this.Editor = ClassicEditor;
    this.config = {
        licenseKey: environment.ckeditorKey,
        plugins: [ 
          AccessibilityHelp,
          Autoformat,
          AutoImage,
          Autosave,
          Base64UploadAdapter,
          BlockQuote,
          Bold,
          Essentials,
          Heading,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          Paragraph,
          SelectAll,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
          SimpleUploadAdapter,
          SourceEditing,
          GeneralHtmlSupport,
          Undo
        ],
        htmlSupport: {
            allow: [ 
              {
                name: 'div',
                styles: true
              },
            ],
            disallow: [ /* HTML features to disallow. */ ]
        },
        toolbar: [ 
          'undo',
          'redo',
          '|',
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'insertImage',
          'insertTable',
          'blockQuote',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent',
          'sourceEditing'
        ],
        heading: {
          options: [
            {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph'
            },
            {
                model: 'heading1',
                view: 'h1',
                title: 'Heading 1',
                class: 'ck-heading_heading1'
            },
            {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                class: 'ck-heading_heading2'
            },
            {
                model: 'heading3',
                view: 'h3',
                title: 'Heading 3',
                class: 'ck-heading_heading3'
            },
            {
                model: 'heading4',
                view: 'h4',
                title: 'Heading 4',
                class: 'ck-heading_heading4'
            },
            {
                model: 'heading5',
                view: 'h5',
                title: 'Heading 5',
                class: 'ck-heading_heading5'
            },
            {
                model: 'heading6',
                view: 'h6',
                title: 'Heading 6',
                class: 'ck-heading_heading6'
            }
          ]
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
    };
	}
}
