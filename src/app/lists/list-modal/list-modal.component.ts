import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { BaseComponent } from '../../base/base.component';
import { SelectOption } from '../../model/select.model';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataItemType } from '../../model/data-item-type.model';

@Component({
  selector: 'app-list-modal',
  imports: [
    MessageModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    SelectModule,
    MultiSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './list-modal.component.html',
  styleUrl: './list-modal.component.scss'
})
export class ListModalComponent extends BaseComponent implements OnInit{
  override url = 'lists';
  listForm! : FormGroup;
  visible = model<boolean>(false);

  options = signal<DataItemType[]>([]);
  selections = signal<SelectOption[]>([]);

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.listForm = this.fb.group({
      description: ['', [Validators.required]],
      data_item_type: ['', [Validators.required]],
      entries: [[], [Validators.required]]
    });
  }

  initFormData() {
    this.formService.getInitData(`${this.url}/${this.id()}`).subscribe((response : any) => {
      if(response['data']) {
        let candidate = response['data'];
        this.listForm.patchValue(candidate);
      }

      this.selections.set(response['sources']);
      this.options.set(response['options']);
    });
  }

  onSelectType(event: any) {
    this.apiService.get(`${this.url}/${event.value}/items`).subscribe((res : any) => {
      this.selections.set(res['data']);
    });
  }

  override onSubmit(valid : boolean, value : any) {
    super.onSubmit(valid, value, (message : string) => {
      this.listForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
      this.visible.set(false);
      this.reloadTable.emit(true);
    });
  }
}
