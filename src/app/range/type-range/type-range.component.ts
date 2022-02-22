import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BreadcrumbService } from '../../breadcrumb/breadcrumb.service';
import { Facet } from '../../facet/facet';
import { Range } from '../range';
import { Value } from '../value';
import { DatasetService } from '../../dataset/dataset.service';

enum RangeStatus {UNEXPANDED, LOADING, EXPANDED}

@Component({
  selector: 'app-type-range',
  templateUrl: './type-range.component.html',
  styleUrls: ['./type-range.component.css']
})
export class TypeRangeComponent implements OnInit {
  @Input() range: Range = new Range();
  @Input() facet: Facet = new Facet();
  @Input() datasetId: string;
  @Input() text: BehaviorSubject<string>;
  @Input() ngUnsubscribe: Subject<void> = new Subject<void>();
  status = RangeStatus.EXPANDED;
  rangeStatus = RangeStatus;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private datasetService: DatasetService) {
  }

  ngOnInit() {
    this.range.expanded = true;
    this.text.subscribe((text: string) => this.first100Values(this.range, text));
  }

  first100Values(range: Range, text: string) {
    this.status = RangeStatus.LOADING;
    this.datasetService.searchTypesFacetValues(this.datasetId, text).subscribe(
      (values: Value[]) => {
        range.values = values.map(value => new Value(value, this.facet, []));
        this.status = RangeStatus.EXPANDED;
      });
  }

  valueToolTip(value: Value) {
    let text: string = value.value;
    if (text.startsWith('"') && text.endsWith('"')) {
      text = text.slice(1, text.length - 1);
    }
    if (text !== value.label) {
      return text;
    } else {
      return '';
    }
  }

  exploreType(value: Value) {
  }
}
