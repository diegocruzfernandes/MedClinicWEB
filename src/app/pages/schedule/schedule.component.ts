import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  inscricao: Subscription;
  
  constructor(private router:Router, private route: ActivatedRoute,) {
    
      
  }
  ngOnInit() {
    this.router.navigateByUrl("/schedule/list");
  }

}
