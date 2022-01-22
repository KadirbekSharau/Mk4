import { FormService } from './../../../service/form_service/form.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable } from 'rxjs';
import { Form } from '../../components/interface/form.interface';
import { ActivatedRoute, Router } from '@angular/router';

/* Forms page component */
@Component({
  selector: 'forms-page',
  templateUrl: './forms_page.ng.html',
  styleUrls: ['./forms_page.scss']
})
export class FormsPage implements OnInit, OnDestroy {
  title = 'Mk4';
  public tableData: Form[] = [];
  public dataSource!: MatTableDataSource<Form>;
  public displayedColumns: string[] = [
    'no',
    'fullname',
    'cadastral_number',
    'area',
    'address',
    'actions',
  ];
  subscriptions: Subscription = new Subscription();

  constructor(private formsService: FormService, private route: ActivatedRoute,
    private router: Router  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Form>(this.tableData);
    this.updateList();
  }

  updateList(): void {
    this.subscriptions.add(
      this.formsService.getAll().subscribe((result: Form[]) => {
        console.log("Retrieved forms from API: ", result);
        this.tableData = result;
        this.dataSource.data = this.tableData;
      })
    );
  }

  addNewItem() {
    console.log ("Add new item!");
    this.router.navigate(['../']);
  }

  deleteItem(item: Form) {
    console.log ("Deleted item: " + item.last + item.first + item.middle);
  }

  editItem(item: Form) {
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: {id: item.id} });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
